import * as z from "zod";

export const studentOnboardingSchema = z.object({
  firstName: z.string().min(2, "First name is required").trim(),
  ageRange: z.enum(["13-17", "18-24", "25+"], {
    errorMap: () => ({ message: "Please select a valid age range" })
  }),
  preferredLanguage: z.enum(["en", "ur"], {
    errorMap: () => ({ message: "Please select a preferred language" })
  }),
});

export const studentEnrichmentSchema = z.object({
  school: z.string().optional(),
  guardianPhone: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "NON_BINARY", "PREFER_NOT_TO_SAY"]).optional(),
  district: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export const counsellorProfileSchema = z.object({
  specializations: z.array(z.string()).min(1, "At least one specialization is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  yearsOfExperience: z.number().min(0).optional(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
});

export type StudentOnboardingInput = z.infer<typeof studentOnboardingSchema>;
export type StudentEnrichmentInput = z.infer<typeof studentEnrichmentSchema>;
export type CounsellorProfileInput = z.infer<typeof counsellorProfileSchema>;
