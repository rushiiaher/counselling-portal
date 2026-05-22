"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validations/auth.schema";
import Link from "next/link";
import PageContainer from "@/components/shared/PageContainer";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      const { requestPasswordResetAction } = await import("@/app/actions/auth.actions");
      await requestPasswordResetAction(data.email);
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">Reset Password</h1>
        <p className="text-center text-slate-500 mb-6 text-sm">
          Enter your email to receive a password reset link.
        </p>
        
        {success ? (
          <div className="text-center">
            <div className="p-3 bg-green-50 text-green-700 border border-green-100 rounded mb-6 text-sm">
              If an account with that email exists, we've sent a reset link.
            </div>
            <Link href="/login" className="text-blue-600 hover:underline text-sm font-medium">
              Return to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-2 rounded shadow hover:bg-slate-800 transition disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
            
            <div className="text-center mt-4">
              <Link href="/login" className="text-sm text-slate-600 hover:underline">
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
