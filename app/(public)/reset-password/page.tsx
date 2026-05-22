"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { resetPasswordAction } from "@/app/actions/auth.actions";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid reset link.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (password !== confirm) return setError("Passwords do not match");

    setIsLoading(true);
    try {
      const res = await resetPasswordAction(token, password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2500);
      } else {
        setError(res.error || "Failed to reset password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">Set New Password</h1>
        <p className="text-center text-slate-500 mb-6 text-sm">Enter your new password below.</p>

        {success ? (
          <div className="text-center">
            <div className="p-3 bg-green-50 text-green-700 border border-green-100 rounded mb-4 text-sm">
              Password updated! Redirecting to login...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-2 pr-10 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
                  required
                  disabled={isLoading || !token}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" tabIndex={-1}>
                  {showPw
                    ? <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
                required
                disabled={isLoading || !token}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !token}
              className="w-full bg-slate-900 text-white py-2 rounded shadow hover:bg-slate-800 transition disabled:opacity-70"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
            <div className="text-center">
              <Link href="/login" className="text-sm text-slate-600 hover:underline">Back to login</Link>
            </div>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
