import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import {
  CreateContactBody,
  PatchContactStatusBody,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/admin-auth";
import { sendContactNotification } from "../lib/email";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function serialize(row: typeof contactSubmissionsTable.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    telegram: row.telegram,
    company: row.company,
    website: row.website,
    stage: row.stage,
    budget: row.budget,
    message: row.message,
    source: row.source,
    status: row.status,
    submittedAt: row.submittedAt.toISOString(),
  };
}

router.post("/contacts", async (req, res) => {
  const parsed = CreateContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  try {
    const [inserted] = await db
      .insert(contactSubmissionsTable)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        telegram: data.telegram ?? "",
        company: data.company ?? "",
        website: data.website ?? "",
        stage: data.stage ?? "",
        budget: data.budget ?? "",
        message: data.message,
        source: data.source ?? "contact",
      })
      .returning();

    if (!inserted) {
      res.status(500).json({ error: "Insert failed" });
      return;
    }

    sendContactNotification({
      name: inserted.name,
      email: inserted.email,
      phone: inserted.phone,
      telegram: inserted.telegram,
      company: inserted.company,
      website: inserted.website,
      stage: inserted.stage,
      budget: inserted.budget,
      message: inserted.message,
      source: inserted.source,
    })
      .then((r) => {
        if (!r.sent) logger.info({ reason: r.reason }, "Email skipped");
      })
      .catch((err) => logger.warn({ err }, "Email error"));

    res.status(201).json(serialize(inserted));
  } catch (err) {
    logger.error({ err }, "createContact failed");
    res.status(500).json({ error: "Failed to create contact" });
  }
});

router.get("/contacts", requireAdmin, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(contactSubmissionsTable)
      .orderBy(desc(contactSubmissionsTable.submittedAt));
    res.json(rows.map(serialize));
  } catch (err) {
    logger.error({ err }, "listContacts failed");
    res.status(500).json({ error: "Failed to list contacts" });
  }
});

router.patch("/contacts/:id", requireAdmin, async (req, res) => {
  const parsed = PatchContactStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  try {
    const [updated] = await db
      .update(contactSubmissionsTable)
      .set({ status: parsed.data.status })
      .where(eq(contactSubmissionsTable.id, String(req.params["id"])))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(serialize(updated));
  } catch (err) {
    logger.error({ err }, "patchContactStatus failed");
    res.status(500).json({ error: "Failed to update" });
  }
});

router.delete("/contacts/:id", requireAdmin, async (req, res) => {
  try {
    await db
      .delete(contactSubmissionsTable)
      .where(eq(contactSubmissionsTable.id, String(req.params["id"])));
    res.status(204).end();
  } catch (err) {
    logger.error({ err }, "deleteContact failed");
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
