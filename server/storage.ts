import { db } from "./db";
import {
  sponsors,
  messages,
  type Sponsor,
  type InsertSponsor,
  type Message,
  type InsertMessage,
} from "@shared/schema";

export interface IStorage {
  getSponsors(): Promise<Sponsor[]>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getSponsors(): Promise<Sponsor[]> {
    return await db.select().from(sponsors);
  }

  async createSponsor(insertSponsor: InsertSponsor): Promise<Sponsor> {
    const [sponsor] = await db.insert(sponsors).values(insertSponsor).returning();
    return sponsor;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
