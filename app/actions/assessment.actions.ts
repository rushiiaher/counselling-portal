"use server";

import { submitAssessment } from "@/services/assessment.service";
import { AssessmentType } from "@prisma/client";
import { requireAuth } from "@/lib/auth/session";
import prisma from "@/lib/prisma";

export async function submitAssessmentAction(
  type: AssessmentType, 
  answers: Record<string, number>, 
  anonToken?: string | null
) {
  try {
    let patientId = undefined;
    try {
      const session = await requireAuth();
      if (session.role === "STUDENT") {
        const profile = await prisma.studentProfile.findUnique({ where: { userId: session.id } });
        if (profile) patientId = profile.id;
      }
    } catch {
      // User is anonymous
    }

    const result = await submitAssessment(type, answers, { patientId, anonymousSessionToken: anonToken || undefined });
    
    return { success: true, resultId: result.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
