import React from "react";
import { Metadata } from "next";
import PageContainer from "@/components/shared/PageContainer";
import ResourceCard from "@/components/resources/ResourceCard";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { getPublishedResources } from "@/services/resource.service";

export const metadata: Metadata = {
  title: 'Mental Health Resources | Counselling Portal',
  description: 'Explore our library of structured clinical resources, articles, and self-help guides for mental well-being.',
};

export default async function ResourcesHubPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
  const { q, category } = await searchParams;
  
  const resources = await getPublishedResources(category as any, q);

  return (
    <PageContainer className="py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Mental Health Resources</h1>
        <p className="text-lg text-slate-600">Educational materials, guides, and tools to support your mental well-being. All content is clinically reviewed.</p>
        
        {/* Simple Search Bar */}
        <form className="mt-8 max-w-xl mx-auto flex gap-2">
          <input 
            name="q"
            defaultValue={q}
            placeholder="Search for anxiety, sleep, etc..."
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none"
          />
          <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition">
            Search
          </button>
        </form>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500">No resources found matching your search.</p>
        </div>
      ) : (
        <DashboardGrid columns={3}>
          {resources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </DashboardGrid>
      )}
    </PageContainer>
  );
}
