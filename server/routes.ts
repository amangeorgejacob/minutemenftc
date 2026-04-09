import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { members, sponsors } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Members
  app.get(api.members.list.path, async (req, res) => {
    const members = await storage.getMembers();
    res.json(members);
  });

  app.patch("/api/members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const member = await storage.updateMember(id, req.body);
      res.json(member);
    } catch (err) {
      res.status(500).json({ message: "Failed to update member" });
    }
  });

  // Sponsors
  app.get(api.sponsors.list.path, async (req, res) => {
    const sponsors = await storage.getSponsors();
    res.json(sponsors);
  });

  // Visit tracker
  app.post("/api/visit", async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      const { page } = req.body;
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "👀 New Website Visitor",
              color: 0x00b0f4,
              fields: [
                { name: "Page", value: page || "/", inline: true },
                { name: "IP", value: String(ip).split(",")[0].trim(), inline: true },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }
    res.status(200).json({ ok: true });
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);

      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (webhookUrl) {
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
      }

      res.status(201).json(message);
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

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingMembers = await storage.getMembers();
  if (existingMembers.length === 0) {
    await storage.createMember({
      name: "Alex Chen",
      role: "Team Captain & Lead Programmer",
      bio: "Alex has been in robotics for 4 years and loves Java and control theory.",
      imageUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300",
    });
    await storage.createMember({
      name: "Sarah Jones",
      role: "Lead Builder",
      bio: "Sarah specializes in CAD design and 3D printing custom parts.",
      imageUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    });
    await storage.createMember({
      name: "David Smith",
      role: "Outreach Coordinator",
      bio: "David organizes our community events and manages sponsor relations.",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300",
    });
    await storage.createMember({
      name: "Emily Wong",
      role: "Driver",
      bio: "Emily is our main driver and strategist for competition matches.",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300",
    });
  }

  const existingSponsors = await storage.getSponsors();
  if (existingSponsors.length <= 3) {
    // If we only have the example sponsors (or fewer), clear and seed with real ones
    await db.delete(sponsors);
    await storage.createSponsor({
      name: "Boeing",
      tier: "Gold",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/Boeing_full_logo.svg",
      websiteUrl: "https://www.boeing.com",
    });
    await storage.createSponsor({
      name: "Microsoft",
      tier: "Gold",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      websiteUrl: "https://www.microsoft.com",
    });
    await storage.createSponsor({
      name: "FIRST Washington",
      tier: "Gold",
      logoUrl: "/FirstWashington.png",
      websiteUrl: "https://firstwa.org",
    });
    await storage.createSponsor({
      name: "Issaquah Schools Foundation",
      tier: "Gold",
      logoUrl: "/FirstWashington.png",
      websiteUrl: "https://isfdn.org",
    });
    await storage.createSponsor({
      name: "Maywood Middle School PTSA",
      tier: "Gold",
      logoUrl: "/FirstWashington.png",
      websiteUrl: "https://maywoodptsa.org",
    });
  }

  // Final check to ensure we have the custom members if the above seed didn't run
  const membersAfterSeed = await storage.getMembers();
  if (membersAfterSeed.length <= 4) {
    // Re-inserting the 15 custom members to ensure persistence after publish/restart
    await db.delete(members);
    await storage.createMember({
      name: "Kevin Krien",
      role: "Head mentor",
      bio: "CAD expert and lead mechanical designer.",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Ted Griebling",
      role: "Total Chaos mentor",
      bio: "Autonomous systems specialist.",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Aman Jacob",
      role: "Portfolio/web lead",
      bio: "Chassis specialist and precision driver.",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Darren Zhou",
      role: "Hardware/Secondary Driver",
      bio: "Focused on intake systems and custom components.",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Gordon Mathis",
      role: "Hardware/Human Player",
      bio: "Coordinates community workshops.",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Liam Krell",
      role: "Hardware/Primary Driver",
      bio: "Develops custom dashboard tools.",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Oslo Griebling",
      role: "Hardware/CAD helper",
      bio: "Machining and assembly specialist.",
      imageUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Romeo Duncan",
      role: "Prototype tester",
      bio: "Branding and engineering portfolio lead.",
      imageUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Ethan Vital",
      role: "Hardware/Secondary Driver",
      bio: "Reliable power distribution systems.",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Peter Hutton",
      role: "Hardware",
      bio: "Sponsor relations and logistics.",
      imageUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Vihaan Srinivasan",
      role: "Software/Primary Driver",
      bio: "Match strategy and data analysis.",
      imageUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Nathaniel Woodcock",
      role: "Hardware",
      bio: "Robot reliability testing.",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Spencer Levy",
      role: "Hardware",
      bio: "Learning CAD and basic programming.",
      imageUrl:
        "https://images.unsplash.com/photo-1542343633-ce3256f2183e?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Abby Soliven",
      role: "Portfolio",
      bio: "Specializes in drive train assembly.",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    });
    await storage.createMember({
      name: "Grace Hopper",
      role: "Portfolio",
      bio: "Sensor integration and path planning.",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    });
  }
}
