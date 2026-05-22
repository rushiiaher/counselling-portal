import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    console.log(`[EMAIL] No API key — skipping. To: ${to} | Subject: ${subject}`);
    return { success: true };
  }
  try {
    await resend.emails.send({
      from: "Counselling Portal <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (err) {
    console.error("[EMAIL] Failed to send:", err);
    return { success: false };
  }
}
