import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  telegram: text("telegram").notNull().default(""),
  company: text("company").notNull().default(""),
  website: text("website").notNull().default(""),
  stage: text("stage").notNull().default(""),
  budget: text("budget").notNull().default(""),
  message: text("message").notNull(),
  source: text("source").notNull().default("contact"),
  status: text("status", {
    enum: ["new", "contacted", "qualified", "closed", "rejected"],
  })
    .notNull()
    .default("new"),
  submittedAt: timestamp("submitted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(
  contactSubmissionsTable,
).omit({ id: true, status: true, submittedAt: true });

export const selectContactSubmissionSchema = createSelectSchema(
  contactSubmissionsTable,
);

export type InsertContactSubmission = z.infer<
  typeof insertContactSubmissionSchema
>;
export type ContactSubmissionRow = typeof contactSubmissionsTable.$inferSelect;
