import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminResourcesPage() {
  await verifyAdminAccess();

  const resources = await prisma.resource.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      language: true,
      isPublished: true,
      publishedAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Resource Manager</h1>
          <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
            <BookOpen className="w-4 h-4 text-indigo-500" /> {resources.length} resources in library.
          </p>
        </div>
        <Link
          href="/admin/resources/new"
          className="flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          <Plus className="w-4 h-4" /> New Resource
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Title</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Category</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Language</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {resources.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-400 text-sm">
                  No resources yet. <Link href="/admin/resources/new" className="text-blue-600 hover:underline font-bold">Add one →</Link>
                </td>
              </tr>
            )}
            {resources.map(r => (
              <tr key={r.id} className="hover:bg-slate-50 transition">
                <td className="p-5">
                  <div className="font-bold text-slate-800">{r.title}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{r.slug}</div>
                </td>
                <td className="p-5">
                  <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">
                    {r.category}
                  </span>
                </td>
                <td className="p-5 text-sm text-slate-600 uppercase font-bold">{r.language}</td>
                <td className="p-5">
                  {r.isPublished ? (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">Published</span>
                  ) : (
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">Draft</span>
                  )}
                </td>
                <td className="p-5 text-xs text-slate-500 font-mono">
                  {r.createdAt.toISOString().slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
