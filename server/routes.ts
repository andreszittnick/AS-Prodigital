import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";
import { storage } from "./storage";
import { insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {

  app.use('/HTML_NEU', express.static(path.join(process.cwd(), 'HTML_NEU')));

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);

      try {
        await sendContactNotification(validatedData);
        console.log("Email notification sent for inquiry:", inquiry.id);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      res.json({
        success: true,
        message: "Vielen Dank für Ihre Nachricht! Ich melde mich bald bei Ihnen.",
        id: inquiry.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Please check your form for errors",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "Sorry, there was an error sending your message. Please try again."
        });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
