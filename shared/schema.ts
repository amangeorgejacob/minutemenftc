import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const sponsors = pgTable("sponsors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tier: text("tier").notNull(), // e.g., "Gold", "Silver", "Bronze"
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertSponsorSchema = createInsertSchema(sponsors).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === EXPLICIT TYPES ===

export type Sponsor = typeof sponsors.$inferSelect;
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
