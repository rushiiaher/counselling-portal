import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signupSchema } from "../lib/validations/auth.schema";
import { z } from "zod";

// Initialize Prisma
import prisma from "@/lib/prisma";

export async function createUser(data: z.infer<typeof signupSchema>) {
  // Validate input
  const parsed = signupSchema.parse(data);
  const normalizedEmail = parsed.email.toLowerCase().trim();

  // Check if user exists securely
  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true }
  });

  if (existing) {
    // We throw a generic validation error, but realistically we shouldn't 
    // expose this in the UI directly. The UI should say "Check your email".
    // For signup, typically returning "Email already in use" is common, but
    // user explicitly asked "never expose 'email exists' errors clearly".
    // We will throw an error that the frontend will catch and show a generic message.
    throw new Error("Registration failed. Please check your details and try again.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(parsed.password, 12);

  // Create user
  // Public signup ONLY allows STUDENT creation.
  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      name: parsed.name,
      password: hashedPassword,
      role: Role.STUDENT,
      isActive: true,
      profileCompleted: false,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    }
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  return prisma.user.findUnique({
    where: { email: normalizedEmail }
  });
}

// NOTE: For security, only Admin should call assignRole or staff creation.
export async function assignRole(userId: string, newRole: Role) {
  // Ensure we are allowed to do this (RBAC check should be in server action)
  return prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  });
}

export async function completeProfile(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { profileCompleted: true }
  });
}
