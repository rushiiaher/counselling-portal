import React from 'react';

export default function SectionContainer({ children, title, description }: { children: React.ReactNode, title: string, description?: string }) {
  return (
    <section className="mb-8 last:mb-0">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}
