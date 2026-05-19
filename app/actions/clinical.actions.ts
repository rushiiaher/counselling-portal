"use server";

import { requireAuth } from "@/lib/auth/session";
import { createClinicalNote, editClinicalNote } from "@/services/clinical.service";
import { ClinicalNoteType } from "@prisma/client";

export async function createNoteAction(patientId: string, content: string, type: ClinicalNoteType, elevated: boolean) {
  try {
    const session = await requireAuth();
    if (session.role !== "COUNSELLOR") return { success: false, error: "Unauthorized" };
    
    await createClinicalNote(session.id, patientId, content, type, elevated);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
