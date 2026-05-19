"use client";
import ErrorState from "@/components/shared/ErrorState";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return <ErrorState message={error.message || "An error occurred in the staff console."} onRetry={reset} />;
}
