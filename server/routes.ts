import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";

/**
 * VISIBILITY (memory only)
 */
const DEFAULT_VISIBILITY: Record<string, boolean> = {
  youtube: true,
  sponsors: true,
  community: true,
  faq: true,
  portfolio: true,
  social: true,
};

let sectionVisibility: Record<string, boolean> = {
  ...DEFAULT_VISIBILITY,
};

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

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {

  /**
   * VISIBILITY API
   */
  app.get("/api/visibility", (req, res) => {
    res.json(sectionVisibility);
  });

  app.post("/api/visibility", (req, res) => {
    const { sectionId, visible } = req.body ?? {};

    if (
      typeof sectionId !== "string" ||
      typeof visible !== "boolean"
    ) {
      return res.status(400).json({ message: "Invalid request" });
    }

    sectionVisibility[sectionId] = visible;

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

    // Admin log only (no tracking)
    if (isAdmin) {
      try {
        await fetch(`${webhookUrl}?wait=true`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            embeds: [
              {
                title: "🔑 Admin Logged In",
                color: 0xffd700,
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch {}

      return res.status(200).json({ ok: true });
    }

    const formattedPage = formatPage(page);
    const existing = visitorSessions[ip];

    /**
     * UPDATE EXISTING VISITOR MESSAGE
     */
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
                    {
                      name: "IP",
                      value: ip,
                      inline: true,
                    },
                    {
                      name: "Pages Visited",
                      value: pagesList,
                    },
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

    /**
     * FIRST VISIT → create Discord message
     */
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
                  {
                    name: "IP",
                    value: ip,
                    inline: true,
                  },
                  {
                    name: "Pages Visited",
                    value: pagesList,
                  },
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