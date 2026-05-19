export async function sendEmail(to: string, subject: string, html: string) {
  // In production:
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: "noreply@peaceportal.com", to, subject, html });

  console.log(`[EMAIL PROVIDER] Sent to: ${to} | Subject: ${subject}`);
  return { success: true };
}
