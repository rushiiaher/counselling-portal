import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import Link from "next/link";
import { User, Languages } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function CounsellorBrowserPage() {
  const counsellors = await prisma.counsellorProfile.findMany({
    where: { isVerified: true, acceptingPatients: true },
    include: {
      user: { select: { name: true, image: true } }
    }
  });

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Find a Counsellor</h1>
        <p className="text-slate-500 text-sm mt-1">Browse our verified professionals and schedule a session.</p>
      </div>

      <DashboardGrid columns={3}>
        {counsellors.map(c => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                {c.user.image ? <img src={c.user.image} alt="Avatar" className="w-full h-full object-cover" /> : <User className="text-slate-400" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{c.user.name}</h3>
                <p className="text-xs text-blue-600 font-medium">{c.specializations.slice(0,2).join(", ")}</p>
              </div>
            </div>

            <div className="text-sm text-slate-600 mb-6 flex flex-col gap-2">
              <span className="flex items-center gap-2"><Languages className="w-4 h-4" /> {c.languages.join(", ")}</span>
              {c.yearsOfExperience && <span>{c.yearsOfExperience} years experience</span>}
            </div>

            <Link 
              href={`/student/counsellors/${c.id}/book`}
              className="block w-full text-center bg-slate-900 text-white py-2 rounded shadow hover:bg-slate-800 transition text-sm font-medium"
            >
              Check Availability
            </Link>
          </div>
        ))}
      </DashboardGrid>
    </PageContainer>
  );
}
