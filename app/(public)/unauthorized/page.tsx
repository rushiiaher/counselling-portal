import React from "react";
import Link from "next/link";
import PageContainer from "@/components/shared/PageContainer";

export default function UnauthorizedPage() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full p-8 bg-white border border-slate-100 rounded-xl shadow-sm text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          ✋
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h1>
        <p className="text-slate-600 mb-8">
          You don't have permission to view this page. If you believe this is an error, please contact support.
        </p>
        <Link 
          href="/"
          className="bg-slate-900 text-white px-6 py-2 rounded shadow hover:bg-slate-800 transition block w-full text-center"
        >
          Return Home
        </Link>
      </div>
    </PageContainer>
  );
}
