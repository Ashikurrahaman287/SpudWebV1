import { logger } from "./logger";

type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string;
  telegram: string;
  company: string;
  website: string;
  stage: string;
  budget: string;
  message: string;
  source: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env["SENDGRID_API_KEY"];
  const toEmail = process.env["CONTACT_NOTIFICATION_EMAIL"];
  const fromEmail = process.env["SENDGRID_FROM_EMAIL"];

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      sent: false,
      reason:
        "SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, and CONTACT_NOTIFICATION_EMAIL must be set",
    };
  }

  const subject = `New SpudBlocks lead: ${payload.name}${
    payload.company ? ` (${payload.company})` : ""
  }`;

  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Telegram / WhatsApp", payload.telegram],
    ["Company", payload.company],
    ["Website", payload.website],
    ["Project Stage", payload.stage],
    ["Budget", payload.budget],
    ["Source", payload.source],
    ["Phone", payload.phone],
  ].filter(([, v]) => v && v.trim().length > 0) as Array<[string, string]>;

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">${escapeHtml(
          k,
        )}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto;padding:32px 24px;background:#fff">
      <h2 style="margin:0 0 8px;font-size:22px;color:#111">New ${escapeHtml(payload.source)} submission</h2>
      <p style="margin:0 0 24px;color:#666;font-size:14px">A new lead just came in from the SpudBlocks website.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border-top:1px solid #eee">${tableRows}</table>
      <h3 style="margin:0 0 8px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:0.05em">Message</h3>
      <div style="padding:16px;background:#f7f7fa;border-radius:8px;color:#111;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(payload.message)}</div>
    </div>`;

  const textLines = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const text = `New ${payload.source} submission\n\n${textLines}\n\nMessage:\n${payload.message}`;

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: toEmail }] }],
        from: { email: fromEmail, name: "SpudBlocks" },
        reply_to: { email: payload.email, name: payload.name },
        subject,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      logger.warn({ status: res.status, body }, "SendGrid send failed");
      return { sent: false, reason: `SendGrid ${res.status}: ${body}` };
    }
    return { sent: true };
  } catch (err) {
    logger.warn({ err }, "SendGrid send threw");
    return { sent: false, reason: String(err) };
  }
}
