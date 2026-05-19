import { NextResponse } from "next/server";
import { logger } from "@/services/logger.service";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { encryptMessage, decryptMessage } from "@/services/encryption.service";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  // Protect deep health checks to prevent DDoS or recon
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}` && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      database: "unknown",
      redis: "unknown",
      encryption: "unknown",
      environment: process.env.NODE_ENV
    }
  };

  // 1. Database Ping
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = "ok";
  } catch (error) {
    health.services.database = "failed";
    health.status = "degraded";
    logger.error("Deep Health: DB failed", error);
  }

  // 2. Redis Ping
  try {
    if (redis) {
      await redis.ping();
      health.services.redis = "ok";
    } else {
      health.services.redis = "not_configured";
      health.status = "degraded"; // We consider missing Redis in prod a degradation
    }
  } catch (error) {
    health.services.redis = "failed";
    health.status = "degraded";
    logger.error("Deep Health: Redis failed", error);
  }

  // 3. Encryption Service Ping
  try {
    const testString = "healthcheck_test";
    const encrypted = encryptMessage(testString);
    const decrypted = decryptMessage(encrypted);
    
    if (decrypted !== testString) throw new Error("Decryption mismatch");
    health.services.encryption = "ok";
  } catch (error) {
    health.services.encryption = "failed";
    health.status = "degraded";
    logger.error("Deep Health: Encryption failed", error);
  }

  if (health.status === "degraded") {
    return NextResponse.json(health, { status: 503 });
  }

  return NextResponse.json(health, { status: 200 });
}
