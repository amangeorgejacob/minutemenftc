import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  members,
  sponsors,
  messages,
  type Member,
  type InsertMember,
  type Sponsor,
  type InsertSponsor,
  type Message,
  type InsertMessage,
} from "@shared/schema";

export interface IStorage {
  getMembers(): Promise<Member[]>;
  createMember(member: InsertMember): Promise<Member>;
  getSponsors(): Promise<Sponsor[]>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  updateMember(id: number, member: Partial<InsertMember>): Promise<Member>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getMembers(): Promise<Member[]> {
    return await db.select().from(members).orderBy(members.id);
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const [member] = await db.insert(members).values(insertMember).returning();
    return member;
  }

  async updateMember(id: number, update: Partial<InsertMember>): Promise<Member> {
    const [member] = await db
      .update(members)
      .set(update)
      .where(eq(members.id, id))
      .returning();
    if (!member) throw new Error("Member not found");
    return member;
  }

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
