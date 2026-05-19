import { NextResponse } from "next/server";
import { logger } from "@/services/logger.service";

import prisma from "@/lib/prisma";

export async function GET() {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      database: "unknown",
      environment: process.env.NODE_ENV
    }
  };

  try {
    // Ping DB to ensure connectivity
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = "ok";
  } catch (error) {
    health.services.database = "failed";
    health.status = "degraded";
    logger.error("Health check failed on Database connectivity", error);
  }

  // Send 503 if crucial services are failing so load balancers / monitoring tools can alert
  if (health.status === "degraded") {
    return NextResponse.json(health, { status: 503 });
  }

  return NextResponse.json(health, { status: 200 });
}
