"use server";

import { createUser } from "@/services/auth.service";
import { signupSchema, SignupInput } from "@/lib/validations/auth.schema";

export async function registerAction(data: SignupInput) {
  try {
    const user = await createUser(data);
    return { success: true, message: "Registration successful. You can now log in." };
  } catch (error: any) {
    // Return generic error as requested
    return { success: false, error: "Registration failed. Please check your details and try again." };
  }
}
