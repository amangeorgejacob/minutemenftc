import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
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

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
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
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300"
    });
    await storage.createMember({
      name: "Sarah Jones",
      role: "Lead Builder",
      bio: "Sarah specializes in CAD design and 3D printing custom parts.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
    });
    await storage.createMember({
      name: "David Smith",
      role: "Outreach Coordinator",
      bio: "David organizes our community events and manages sponsor relations.",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300"
    });
     await storage.createMember({
      name: "Emily Wong",
      role: "Driver",
      bio: "Emily is our main driver and strategist for competition matches.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300"
    });
  }

  const existingSponsors = await storage.getSponsors();
  if (existingSponsors.length === 0) {
    await storage.createSponsor({
      name: "TechCorp",
      tier: "Gold",
      websiteUrl: "https://example.com",
    });
    await storage.createSponsor({
      name: "Local Machine Shop",
      tier: "Silver",
      websiteUrl: "https://example.com",
    });
    await storage.createSponsor({
      name: "Community Bank",
      tier: "Bronze",
      websiteUrl: "https://example.com",
    });
  }
}
