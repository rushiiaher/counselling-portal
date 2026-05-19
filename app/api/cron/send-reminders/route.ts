import { NextResponse } from "next/server";
import { emitEvent } from "@/services/event.service";

import prisma from "@/lib/prisma";

import { env } from "@/lib/env";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}` && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const in24HoursAnd15Mins = new Date(in24Hours.getTime() + 15 * 60 * 1000);

    // Find appointments happening exactly 24 hours from now
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        status: "CONFIRMED",
        startTime: {
          gte: in24Hours,
          lt: in24HoursAnd15Mins
        }
      }
    });

    for (const appointment of upcomingAppointments) {
      // Dispatch reminder event to the centralized event router
      await emitEvent("appointment.reminder_24h", { appointmentId: appointment.id });
    }

    return NextResponse.json({ success: true, processed: upcomingAppointments.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
