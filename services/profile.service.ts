import { PrismaClient, Prisma } from "@prisma/client";
import { studentOnboardingSchema, StudentOnboardingInput } from "../lib/validations/profile.schema";
import { createAuditLog } from "./audit.service";

import prisma from "@/lib/prisma";

/**
 * Validates ownership securely server-side.
 */
export async function validateProfileOwnership(sessionUserId: string, targetUserId: string) {
  if (sessionUserId !== targetUserId) {
    throw new Error("Unauthorized profile access");
  }
  return true;
}

/**
 * Handles the initial minimal onboarding step for students.
 */
export async function completeStudentOnboarding(userId: string, data: StudentOnboardingInput) {
  // Validate strict schema bounds
  const parsed = studentOnboardingSchema.parse(data);

  // Update or Create the profile
  const profile = await prisma.studentProfile.upsert({
    where: { userId },
    update: {
      firstName: parsed.firstName,
      ageRange: parsed.ageRange,
      preferredLanguage: parsed.preferredLanguage,
      ...(parsed.gender && { gender: parsed.gender as any }),
      ...(parsed.grade && { grade: parsed.grade }),
      ...(parsed.mobile && { mobile: parsed.mobile }),
      ...(parsed.district && { district: parsed.district }),
      ...(parsed.institutionId && { institutionId: parsed.institutionId }),
    },
    create: {
      userId,
      firstName: parsed.firstName,
      ageRange: parsed.ageRange,
      preferredLanguage: parsed.preferredLanguage,
      ...(parsed.gender && { gender: parsed.gender as any }),
      ...(parsed.grade && { grade: parsed.grade }),
      ...(parsed.mobile && { mobile: parsed.mobile }),
      ...(parsed.district && { district: parsed.district }),
      ...(parsed.institutionId && { institutionId: parsed.institutionId }),
    },
  });

  // Since step 1 satisfies minimal requirements, sync language
  await prisma.user.update({
    where: { id: userId },
    data: { 
      language: parsed.preferredLanguage
    }
  });

  await createAuditLog({
    userId,
    action: "PROFILE_DEMOGRAPHICS_SAVED",
    resourceType: "StudentProfile",
  });

  return profile;
}

/**
 * Marks onboarding completely finished only after consent is legally recorded.
 */
export async function acceptComplianceAndCompleteOnboarding(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      termsAcceptedAt: new Date(),
      privacyAcceptedAt: new Date(),
      clinicalConsentGivenAt: new Date(),
      profileCompleted: true
    }
  });

  await createAuditLog({
    userId,
    action: "CONSENT_ACCEPTED",
    resourceType: "User",
    resourceId: userId
  });
}

/**
 * Handles progressive enrichment without altering completion status.
 */
export async function enrichStudentProfile(userId: string, data: Partial<Prisma.StudentProfileUpdateInput>) {
  // Ownership checked at action level
  const profile = await prisma.studentProfile.update({
    where: { userId },
    data,
  });

  await createAuditLog({
    userId,
    action: "PROFILE_ENRICHED",
    resource: "StudentProfile",
  });

  return profile;
}

export async function updateCounsellorProfile(userId: string, data: Partial<Prisma.CounsellorProfileUpdateInput>) {
  // Prevent arbitrary verification by counsellors themselves
  if ('isVerified' in data) {
    delete data.isVerified;
  }

  const profile = await prisma.counsellorProfile.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      specializations: (data.specializations as string[]) || [],
      languages: (data.languages as string[]) || [],
      ...data,
    } as any, // Type assertion for initial scaffold
  });

  await createAuditLog({
    userId,
    action: "COUNSELLOR_PROFILE_UPDATED",
    resource: "CounsellorProfile",
  });

  return profile;
}
