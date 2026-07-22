import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import { getVisibility, setVisibility } from "./visibility-store";
import { getNotification, setNotification } from "./notification-store";

/**
 * VISIBILITY (NOW PERSISTENT — FIXED BUG)
 */
// ❌ removed memory-based state completely

/**
 * ✅ Properly typed visitor sessions (fixes red squiggles)
 */
type VisitorSession = {
  messageId: string;
  pages: Set<string>;
};

const visitorSessions: Record<string, VisitorSession> = {};

/**
 * Format routes into readable names
 * "/" → home
 * "/sponsors" → sponsors
 */
function formatPage(page: string) {
  if (!page || page === "/") return "home";
  return page.replace("/", "").toLowerCase();
}

/**
 * Geo-locate an IP and return a human-readable location string.
 * Returns "🤖 Replit Bot" if the request comes from Replit infrastructure,
 * "📍 Local / Dev" for loopback addresses, or "City, Region, Country" otherwise.
 */
async function getLocation(ip: string): Promise<string> {
  // Loopback / private
  if (!ip || ip === "Unknown" || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return "📍 Local / Dev";
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,countryCode,isp,org`);
    if (!res.ok) return ip;
    const data = await res.json() as any;
    if (data.status !== "success") return ip;

    // Detect bots from cloud providers (Replit runs on GCP)
    const org: string = (data.org || "").toLowerCase();
    const isp: string = (data.isp || "").toLowerCase();
    const combined = org + " " + isp;

    if (combined.includes("replit")) return "🤖 Replit Bot";
    if (combined.includes("google") && (combined.includes("cloud") || combined.includes("llc"))) return "🤖 Replit Bot (GCP)";
    if (combined.includes("amazon") || combined.includes("aws")) return "🤖 Bot (AWS)";
    if (combined.includes("microsoft") || combined.includes("azure")) return "🤖 Bot (Azure)";
    if (combined.includes("digitalocean")) return "🤖 Bot (DigitalOcean)";
    if (combined.includes("linode") || combined.includes("akamai")) return "🤖 Bot (Linode)";

    const parts = [data.city, data.regionName, data.countryCode].filter(Boolean);
    return parts.length ? parts.join(", ") : ip;
  } catch {
    return ip;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {

  /**
   * DISCORD DOMAIN VERIFICATION
   */
  app.get("/.well-known/discord", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send("dh=bb90efd0f331899fdabf7e73813990fe5d86e7d3");
  });

  /**
   * NOTIFICATION BANNER API
   */
  app.get("/api/notification", (req, res) => {
    res.json(getNotification());
  });

  app.post("/api/notification", (req, res) => {
    const { message, active } = req.body ?? {};
    const update: Record<string, unknown> = {};
    if (typeof message === "string") update.message = message.trim();
    if (typeof active === "boolean") update.active = active;
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No valid fields provided" });
    }
    const result = setNotification(update);
    res.json({ ok: true, ...result });
  });

  /**
   * VISIBILITY API (FIXED — NOW USES FILE STORAGE)
   */

  app.get("/api/visibility", (req, res) => {
    res.json(getVisibility());
  });

  app.post("/api/visibility", (req, res) => {
    const { sectionId, visible } = req.body ?? {};

    if (
      typeof sectionId !== "string" ||
      typeof visible !== "boolean"
    ) {
      return res.status(400).json({ message: "Invalid request" });
    }

    setVisibility(sectionId, visible);

    res.json({
      ok: true,
      sectionId,
      visible,
    });
  });

  /**
   * VISITOR TRACKING (Discord single-message system)
   */
  app.post("/api/visit", async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(200).json({ ok: true });
    }

    const { page, isAdmin } = req.body;

    const ip = String(
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "Unknown",
    )
      .split(",")[0]
      .trim();

    const location = await getLocation(ip);

    if (isAdmin) {
      return res.status(200).json({ ok: true });
    }

    const formattedPage = formatPage(page);
    const existing = visitorSessions[ip];

    if (existing) {
      existing.pages.add(formattedPage);

      const pagesList = Array.from(existing.pages)
        .map((p) => `• ${p}`)
        .join("\n");

      try {
        await fetch(
          `${webhookUrl}/messages/${existing.messageId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              embeds: [
                {
                  title: "👀 Visitor Activity",
                  color: 0x00b0f4,
                  fields: [
                    { name: "IP", value: ip, inline: true },
                    { name: "Location", value: location, inline: true },
                    { name: "Pages Visited", value: pagesList },
                  ],
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          },
        );
      } catch {}

      return res.status(200).json({
        ok: true,
        messageId: existing.messageId,
      });
    }

    const pages = new Set<string>([formattedPage]);

    const pagesList = Array.from(pages)
      .map((p) => `• ${p}`)
      .join("\n");

    try {
      const response = await fetch(
        `${webhookUrl}?wait=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            embeds: [
              {
                title: "👀 Visitor Activity",
                color: 0x00b0f4,
                fields: [
                  { name: "IP", value: ip, inline: true },
                  { name: "Location", value: location, inline: true },
                  { name: "Pages Visited", value: pagesList },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        visitorSessions[ip] = {
          messageId: data.id,
          pages,
        };

        return res.status(200).json({
          ok: true,
          messageId: data.id,
        });
      }
    } catch {}

    res.status(200).json({ ok: true });
  });

  /**
   * DELETE VISITOR MESSAGE
   */
  app.post("/api/visit/delete", async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const { messageId } = req.body ?? {};

    if (webhookUrl && messageId) {
      try {
        await fetch(
          `${webhookUrl}/messages/${messageId}`,
          { method: "DELETE" },
        );
      } catch {}
    }

    res.status(200).json({ ok: true });
  });

  /**
   * CONTACT FORM → DISCORD ONLY
   */
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input =
        api.contact.submit.input.parse(req.body);

      const webhookUrl =
        process.env.DISCORD_WEBHOOK_URL;

      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
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
        } catch {}
      }

      res.status(201).json({
        id: 0,
        ...input,
        createdAt: new Date().toISOString(),
      });

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

  return httpServer;
}