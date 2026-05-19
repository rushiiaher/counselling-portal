import * as Sentry from "@sentry/nextjs";

type LogLevel = "info" | "warn" | "error" | "fatal" | "perf";

interface LogPayload {
  level: LogLevel;
  event: string;
  actorId?: string;
  resourceId?: string;
  metadata?: any;
  error?: Error | unknown;
}

export const logger = {
  info: (event: string, meta?: any) => log({ level: "info", event, metadata: meta }),
  warn: (event: string, meta?: any) => log({ level: "warn", event, metadata: meta }),
  error: (event: string, err: any, meta?: any) => log({ level: "error", event, error: err, metadata: meta }),
  fatal: (event: string, err: any, meta?: any) => log({ level: "fatal", event, error: err, metadata: meta }),
  performance: (event: string, durationMs: number, meta?: any) => log({ level: "perf", event, metadata: { ...meta, durationMs } })
};

function log(payload: LogPayload) {
  const timestamp = new Date().toISOString();
  
  // Route to Sentry on backend if exception exists
  if ((payload.level === "error" || payload.level === "fatal") && payload.error) {
    Sentry.captureException(payload.error, {
      extra: {
        event: payload.event,
        metadata: payload.metadata,
        resourceId: payload.resourceId,
        actorId: payload.actorId
      }
    });
  }

  const logEntry = {
    timestamp,
    level: payload.level.toUpperCase(),
    event: payload.event,
    actorId: payload.actorId || "SYSTEM",
    resourceId: payload.resourceId,
    metadata: payload.metadata || {},
    error: payload.error instanceof Error ? { message: payload.error.message, stack: payload.error.stack } : payload.error
  };

  // In production, emit structured JSON for Datadog / Axiom / CloudWatch
  // Locally, print cleanly
  if (process.env.NODE_ENV !== "production") {
    console.log(`[${logEntry.timestamp}] [${logEntry.level}] ${logEntry.event}`, logEntry.metadata);
    if (logEntry.error) console.error(logEntry.error);
  } else {
    console.log(JSON.stringify(logEntry));
  }
}
