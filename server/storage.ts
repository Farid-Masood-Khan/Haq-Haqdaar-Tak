import { users, type User, type InsertUser, donations, type Donation, type InsertDonation, contacts, type Contact, type InsertContact, newsletters, type Newsletter, type InsertNewsletter } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pkg from "pg";
const { Pool } = pkg;

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Donation operations
  getDonation(id: number): Promise<Donation | undefined>;
  getDonationsByUserId(userId: number): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: number, status: string): Promise<Donation | undefined>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Newsletter operations
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Session store
  sessionStore: any; // Using any to avoid SessionStore type issues
}

// In-memory storage implementation for fallback
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private donationsMap: Map<number, Donation>;
  private contactsMap: Map<number, Contact>;
  private newslettersMap: Map<number, Newsletter>;
  
  sessionStore: any;
  
  userCurrentId: number;
  donationCurrentId: number;
  contactCurrentId: number;
  newsletterCurrentId: number;

  constructor() {
    this.usersMap = new Map();
    this.donationsMap = new Map();
    this.contactsMap = new Map();
    this.newslettersMap = new Map();
    
    this.userCurrentId = 1;
    this.donationCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    const phone = insertUser.phone || null; // Ensure phone is never undefined
    const user: User = { ...insertUser, id, createdAt, phone };
    this.usersMap.set(id, user);
    return user;
  }
  
  // Donation operations
  async getDonation(id: number): Promise<Donation | undefined> {
    return this.donationsMap.get(id);
  }
  
  async getDonationsByUserId(userId: number): Promise<Donation[]> {
    return Array.from(this.donationsMap.values()).filter(
      (donation) => donation.userId === userId
    );
  }
  
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.donationCurrentId++;
    const date = new Date();
    const message = insertDonation.message || null; // Ensure message is never undefined
    const status = insertDonation.status || 'pending';
    const userId = insertDonation.userId || 0; // Default userId if not provided
    const donation: Donation = { 
      ...insertDonation, 
      id, 
      date, 
      message,
      status,
      userId
    };
    this.donationsMap.set(id, donation);
    return donation;
  }
  
  async updateDonationStatus(id: number, status: string): Promise<Donation | undefined> {
    const donation = this.donationsMap.get(id);
    if (!donation) return undefined;
    
    const updatedDonation = { ...donation, status };
    this.donationsMap.set(id, updatedDonation);
    return updatedDonation;
  }
  
  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const phone = insertContact.phone || null; // Ensure phone is never undefined
    const subject = insertContact.subject || null; // Ensure subject is never undefined
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt,
      phone,
      subject 
    };
    this.contactsMap.set(id, contact);
    return contact;
  }
  
  // Newsletter operations
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterCurrentId++;
    const createdAt = new Date();
    const active = true;
    const newsletter: Newsletter = { ...insertNewsletter, id, active, createdAt };
    this.newslettersMap.set(id, newsletter);
    return newsletter;
  }
}

// PostgreSQL database storage implementation
export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  private pool: any; // Using any to avoid Pool type issues
  sessionStore: any; // Using any to avoid SessionStore type issues

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    
    this.db = drizzle(this.pool);
    
    this.sessionStore = new PostgresSessionStore({ 
      pool: this.pool,
      createTableIfMissing: true
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Donation operations
  async getDonation(id: number): Promise<Donation | undefined> {
    const result = await this.db.select().from(donations).where(eq(donations.id, id));
    return result[0];
  }
  
  async getDonationsByUserId(userId: number): Promise<Donation[]> {
    return await this.db.select().from(donations).where(eq(donations.userId, userId));
  }
  
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const result = await this.db.insert(donations).values(insertDonation).returning();
    return result[0];
  }
  
  async updateDonationStatus(id: number, status: string): Promise<Donation | undefined> {
    const result = await this.db.update(donations)
      .set({ status })
      .where(eq(donations.id, id))
      .returning();
    
    return result[0];
  }
  
  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contacts).values(insertContact).returning();
    return result[0];
  }
  
  // Newsletter operations
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const result = await this.db.insert(newsletters).values(insertNewsletter).returning();
    return result[0];
  }
}

// Create and export a database storage instance
export const storage = new DatabaseStorage();
