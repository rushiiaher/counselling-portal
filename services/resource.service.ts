import { PrismaClient, Prisma, ResourceCategory } from "@prisma/client";
import { resourceSchema } from "../lib/validations/resource.schema";
import { z } from "zod";

import prisma from "@/lib/prisma";

export async function getPublishedResources(category?: ResourceCategory, search?: string) {
  return prisma.resource.findMany({
    where: {
      isPublished: true,
      deletedAt: null,
      ...(category ? { category } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { tags: { has: search } },
          { excerpt: { contains: search, mode: "insensitive" } },
        ]
      } : {})
    },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      featuredImage: true,
      readingMinutes: true,
      publishedAt: true,
      helpfulCount: true,
      language: true,
    }
  });
}

export async function getResourceBySlug(slug: string) {
  return prisma.resource.findUnique({
    where: { slug }
  });
}

export async function incrementHelpfulCount(id: string) {
  return prisma.resource.update({
    where: { id },
    data: { helpfulCount: { increment: 1 } }
  });
}

export async function createResource(authorId: string, data: z.infer<typeof resourceSchema>) {
  // Validate
  const parsed = resourceSchema.parse(data);

  return prisma.resource.create({
    data: {
      ...parsed,
      authorId,
      publishedAt: parsed.isPublished ? new Date() : null,
    }
  });
}
