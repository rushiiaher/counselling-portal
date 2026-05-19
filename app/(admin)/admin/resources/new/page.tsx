"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourceSchema, ResourceInput } from "@/lib/validations/resource.schema";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { Feedback } from "@/lib/feedback";
import { createResourceAction } from "@/app/actions/resource.actions";
import { ResourceCategory } from "@prisma/client";

export default function AdminNewResource() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResourceInput>({
    resolver: zodResolver(resourceSchema),
    defaultValues: { language: "en", category: "GENERAL", isPublished: false, tags: [] }
  });

  const onSubmit = async (data: ResourceInput) => {
    setIsLoading(true);
    try {
      const res = await createResourceAction(data);
      if (res.success) {
        Feedback.success("Resource created successfully");
        router.push("/admin/resources");
      } else {
        Feedback.error(res.error || "Failed to create resource");
      }
    } catch (err) {
      Feedback.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Create New Resource</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input 
                {...register("title")}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
              <input 
                {...register("slug")}
                placeholder="e.g. managing-anxiety-tips"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select 
                {...register("category")}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              >
                {Object.keys(ResourceCategory).map(cat => (
                  <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
              <select 
                {...register("language")}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Markdown Content</label>
            <textarea 
              {...register("content")}
              rows={15}
              placeholder="# Introduction..."
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none font-mono text-sm"
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt (Short Description)</label>
            <textarea 
              {...register("excerpt")}
              rows={2}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="isPublished"
              {...register("isPublished")}
              className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-slate-700">
              Publish immediately
            </label>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-slate-900 text-white px-8 py-2.5 rounded shadow hover:bg-slate-800 transition disabled:opacity-70"
            >
              {isLoading ? "Saving..." : "Save Resource"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
