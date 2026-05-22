import * as z from "zod";

const RESOURCE_CATEGORIES = ["ANXIETY","DEPRESSION","PTSD","EXAM_STRESS","ADDICTION","FAMILY_CONFLICT","GRIEF","SLEEP","SELF_HARM","GENERAL"] as const;

export const resourceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(200).optional(),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.enum(RESOURCE_CATEGORIES),
  tags: z.array(z.string()).default([]),
  language: z.enum(["en", "ur"]),
  readingMinutes: z.number().min(1).optional(),
  isPublished: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160).optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
});

export type ResourceInput = z.infer<typeof resourceSchema>;
