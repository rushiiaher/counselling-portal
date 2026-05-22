import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const profile = await prisma.studentProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json([]);

  const appointments = await prisma.appointment.findMany({
    where: { studentId: profile.id },
    include: {
      counsellor: { include: { user: { select: { name: true } } } }
    },
    orderBy: { startTime: "desc" },
  });

  return NextResponse.json(appointments.map(a => ({
    id: a.id,
    startTime: a.startTime.toISOString(),
    endTime: a.endTime.toISOString(),
    mode: a.mode,
    status: a.status,
    counsellorName: a.counsellor.user.name,
  })));
}
