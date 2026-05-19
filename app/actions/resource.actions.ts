"use server";

import { incrementHelpfulCount } from "@/services/resource.service";
import { cookies } from "next/headers";

export async function markResourceHelpful(resourceId: string) {
  try {
    // Abuse prevention via a simple secure cookie for MVP
    // In production, use Redis or a DB table tracking hashed IPs + resourceIds
    const cookieStore = await cookies();
    const voteKey = `voted_${resourceId}`;
    
    if (cookieStore.get(voteKey)) {
      return { success: false, error: "Already voted" };
    }

    await incrementHelpfulCount(resourceId);
    
    // Set cookie for 1 year to prevent double voting from this browser
    cookieStore.set(voteKey, "true", { maxAge: 60 * 60 * 24 * 365, httpOnly: true, secure: true });

    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to submit feedback" };
  }
}

import { createResource } from "@/services/resource.service";
import { requireAuth } from "@/lib/auth/session";

export async function createResourceAction(data: any) {
  try {
    const session = await requireAuth();
    if (session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const resource = await createResource(session.id, data);
    return { success: true, id: resource.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create resource" };
  }
}
