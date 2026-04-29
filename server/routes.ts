import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { sponsors } from "@shared/schema";

const FALLBACK_SPONSORS = [
  {
    id: 1,
    name: "Boeing",
    tier: "Gold",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/Boeing_full_logo.svg",
    websiteUrl: "https://www.boeing.com",
  },
  {
    id: 2,
    name: "Microsoft",
    tier: "Gold",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    websiteUrl: "https://www.microsoft.com",
  },
  {
    id: 3,
    name: "FIRST Washington",
    tier: "Gold",
    logoUrl: "/FirstWashington.png",
    websiteUrl: "https://firstwa.org",
  },
  {
    id: 4,
    name: "Issaquah Schools Foundation",
    tier: "Gold",
    logoUrl: "/FirstWashington.png",
    websiteUrl: "https://isfdn.org",
  },
  {
    id: 5,
    name: "Maywood Middle School PTSA",
    tier: "Gold",
    logoUrl: "/FirstWashington.png",
    websiteUrl: "https://maywoodptsa.org",
  },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Sponsors — fall back to hardcoded list if DB is unavailable
  app.get(api.sponsors.list.path, async (req, res) => {
    try {
      const list = await storage.getSponsors();
      if (list.length === 0) {
        return res.json(FALLBACK_SPONSORS);
      }
      res.json(list);
    } catch (err) {
      console.error("Sponsors DB unavailable, serving fallback:", err);
      res.json(FALLBACK_SPONSORS);
    }
  });

  // Visit tracker
  app.post("/api/visit", async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    let messageId: string | null = null;
    if (webhookUrl) {
      const { page, isAdmin } = req.body;
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
      const embed = isAdmin
        ? {
            title: "🔑 Admin Logged In",
            color: 0xffd700,
            fields: [],
            timestamp: new Date().toISOString(),
          }
        : {
            title: "👀 New Website Visitor",
            color: 0x00b0f4,
            fields: [
              { name: "Page", value: page || "/", inline: true },
              { name: "IP", value: String(ip).split(",")[0].trim(), inline: true },
            ],
            timestamp: new Date().toISOString(),
          };
      try {
        const r = await fetch(`${webhookUrl}?wait=true`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ embeds: [embed] }),
        });
        if (r.ok) {
          const data = await r.json();
          messageId = data?.id ?? null;
        }
      } catch {}
    }
    res.status(200).json({ ok: true, messageId });
  });

  // Delete a previous visitor ping (used when an admin logs in)
  app.post("/api/visit/delete", async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const { messageId } = req.body ?? {};
    if (webhookUrl && messageId) {
      try {
        await fetch(`${webhookUrl}/messages/${messageId}`, { method: "DELETE" });
      } catch {}
    }
    res.status(200).json({ ok: true });
  });

  // Contact — succeeds via Discord even if DB is unavailable
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);

      let savedMessage: any = null;
      try {
        savedMessage = await storage.createMessage(input);
      } catch (err) {
        console.error("Contact DB write failed (continuing via Discord):", err);
      }

      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              embeds: [
                {
                  title: "📬 New Contact Form Submission",
                  color: 0x5865f2,
                  fields: [
                    { name: "Name", value: input.name, inline: true },
                    { name: "Email", value: input.email, inline: true },
                    { name: "Message", value: input.message },
                  ],
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          });
        } catch (err) {
          console.error("Discord webhook failed:", err);
        }
      }

      res.status(201).json(
        savedMessage ?? {
          id: 0,
          ...input,
          createdAt: new Date().toISOString(),
        },
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Seed in background — never block startup or crash on DB failure
  seedDatabase().catch((err) => {
    console.error("Database seed skipped (DB unavailable):", err?.message ?? err);
  });

  return httpServer;
}

export async function seedDatabase() {
  const existingSponsors = await storage.getSponsors();
  if (existingSponsors.length <= 3) {
    // If we only have the example sponsors (or fewer), clear and seed with real ones
    await db.delete(sponsors);
    for (const s of FALLBACK_SPONSORS) {
      await storage.createSponsor({
        name: s.name,
        tier: s.tier,
        logoUrl: s.logoUrl,
        websiteUrl: s.websiteUrl,
      });
    }
  }
}
