import { PrismaClient } from "@prisma/client";
import { env } from "./env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Enable query logging in development or if explicitly requested in production for profiling
const logLevels: any = process.env.NODE_ENV === "development" || process.env.LOG_PRISMA_QUERIES === "true" 
  ? ['query', 'warn', 'error'] 
  : ['warn', 'error'];

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logLevels,
    datasources: {
      db: { url: env.DATABASE_URL }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
