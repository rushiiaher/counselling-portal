import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(), // Used for migrations if pooling
  
  NEXTAUTH_SECRET: isProd 
    ? z.string().min(32) 
    : z.string().min(1).default("dev-secret"),
    
  ENCRYPTION_KEY: isProd 
    ? z.string().length(64, "AES-256 keys must be exactly 32 bytes (64 hex characters)") 
    : z.string().min(1).default("development_fallback_key_do_not_use_in_prod"),
    
  CRON_SECRET: isProd 
    ? z.string().min(16, "Cron secret must be secure") 
    : z.string().optional().default("dev-cron-secret"),

  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  
  RESEND_API_KEY: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
