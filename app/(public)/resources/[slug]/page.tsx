import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getResourceBySlug } from "@/services/resource.service";
import MarkdownRenderer from "@/components/resources/MarkdownRenderer";
import CrisisSupportBanner from "@/components/resources/CrisisSupportBanner";
import HelpfulWidget from "@/components/resources/HelpfulWidget";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
 
  if (!resource || !resource.isPublished) {
    return { title: 'Resource Not Found' }
  }
 
  return {
    title: `${resource.seoTitle || resource.title} | Counselling Portal`,
    description: resource.seoDescription || resource.excerpt,
    openGraph: {
      images: resource.featuredImage ? [resource.featuredImage] : [],
    },
  }
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource || !resource.isPublished) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 md:px-0">
      <div className="mb-8">
        <span className="text-sm uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {resource.category.replace("_", " ")}
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-4 leading-tight">
          {resource.title}
        </h1>
        {resource.excerpt && (
          <p className="text-xl text-slate-600 leading-relaxed">
            {resource.excerpt}
          </p>
        )}
      </div>

      <CrisisSupportBanner />

      <div className="mt-8">
        <MarkdownRenderer content={resource.content} />
      </div>

      <HelpfulWidget resourceId={resource.id} initialCount={resource.helpfulCount} />
    </article>
  );
}
