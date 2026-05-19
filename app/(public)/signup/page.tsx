"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/lib/validations/auth.schema";
import { registerAction } from "@/app/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/shared/PageContainer";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const res = await registerAction(data);
      if (res.success) {
        setSuccess(res.message!);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(res.error!);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[70vh] py-12">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">Create an Account</h1>
        <p className="text-center text-slate-500 mb-6 text-sm">Join the counselling portal to get started.</p>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-100 rounded mb-6 text-sm">
            {success} Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading || !!success}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading || !!success}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading || !!success}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <input 
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              disabled={isLoading || !!success}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !!success}
            className="w-full bg-slate-900 text-white py-2 rounded shadow hover:bg-slate-800 transition disabled:opacity-70 mt-2"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </PageContainer>
  );
}
