"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { createUser } from "@/services/auth.service";
import { signupSchema, SignupInput } from "@/lib/validations/auth.schema";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/providers/resend.provider";
import { redis } from "@/lib/redis";

export async function registerAction(data: SignupInput) {
  try {
    const user = await createUser(data);
    return { success: true, message: "Registration successful. You can now log in." };
  } catch (error: any) {
    return { success: false, error: "Registration failed. Please check your details and try again." };
  }
}

export async function requestPasswordResetAction(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user || !user.isActive || !user.email) return { success: true }; // silent — no enumeration

    if (!redis) {
      console.warn("[AUTH] Redis unavailable — password reset requires Redis");
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString("hex");
    await redis.set(`pw_reset:${token}`, user.id, { ex: 3600 });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await sendEmail(
      user.email,
      "Reset your password — Counselling Portal",
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
        <h2 style="color:#0f172a;">Reset your password</h2>
        <p style="color:#64748b;">Click below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0;">Reset Password</a>
        <p style="color:#94a3b8;font-size:12px;">If you didn't request this, ignore this email.</p>
      </div>`
    );

    return { success: true };
  } catch {
    return { success: true }; // never reveal errors
  }
}

export async function resetPasswordAction(token: string, newPassword: string) {
  try {
    if (!redis) return { success: false, error: "Service unavailable" };

    const userId = await redis.get<string>(`pw_reset:${token}`);
    if (!userId) return { success: false, error: "Reset link expired or invalid" };

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
    await redis.del(`pw_reset:${token}`);

    return { success: true };
  } catch {
    return { success: false, error: "Failed to reset password" };
  }
}
