"use server";

import { completeStudentOnboarding, acceptComplianceAndCompleteOnboarding } from "@/services/profile.service";
import { studentOnboardingSchema, StudentOnboardingInput } from "@/lib/validations/profile.schema";
import { requireAuth } from "@/lib/auth/session";

export async function saveStudentOnboardingAction(data: StudentOnboardingInput) {
  try {
    const session = await requireAuth();
    
    // Ownership is implicit because we pull ID strictly from the secure session
    await completeStudentOnboarding(session.id, data);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to save profile. Please check your inputs." };
  }
}

export async function acceptComplianceAction() {
  try {
    const session = await requireAuth();
    await acceptComplianceAndCompleteOnboarding(session.id);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to save consent." };
  }
}
