export function buildAppointmentBookedEmail(studentName: string, dateStr: string, counsellorName: string) {
  return `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #0f172a;">Appointment Confirmed</h2>
      <p>Hello ${studentName},</p>
      <p>Your session with <strong>${counsellorName}</strong> has been successfully booked.</p>
      <p><strong>Date & Time:</strong> ${dateStr}</p>
      <p style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px;">
        You can view and manage your appointment directly from your dashboard.
      </p>
      <p>Take care,<br>The Peace Portal Team</p>
    </div>
  `;
}
