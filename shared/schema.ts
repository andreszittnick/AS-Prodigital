import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  companyName: text("company_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).pick({
  firstName: true,
  lastName: true,
  companyName: true,
  email: true,
  phone: true,
  service: true,
  message: true,
}).extend({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "Bitte wählen Sie einen Service"),
  message: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.enum(["webdesign", "seo"]),
  author: z.string(),
  publishedAt: z.string(),
  readTime: z.number(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  metaDescription: z.string(),
  metaKeywords: z.array(z.string()),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
