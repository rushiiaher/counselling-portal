import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { AlertTriangle, Info, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import BookAppointmentButton from "@/components/shared/BookAppointmentButton";

import prisma from "@/lib/prisma";

export default async function AssessmentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await prisma.assessmentResult.findUnique({ where: { id } });
  
  if (!result) return <PageContainer>Result not found.</PageContainer>;

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-600 mb-8 flex gap-3 leading-relaxed shadow-sm">
          <Info className="w-5 h-5 shrink-0 text-blue-500" />
          <p>
            <strong>Clinical Disclaimer:</strong> This assessment is a screening tool and not a clinical diagnosis. 
            The results are meant to provide context and help guide professional support.
          </p>
        </div>

        {result.triggeredCrisis && (
          <div className="bg-rose-50 border border-rose-200 p-8 rounded-xl mb-8 flex flex-col items-center text-center shadow-sm">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4 ring-4 ring-rose-50">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-rose-900 mb-2">You are not alone.</h3>
            <p className="text-rose-700 mb-6 max-w-md font-medium leading-relaxed">
              Based on your answers, you may be experiencing significant distress or thoughts of self-harm. 
              Please connect with emergency services or our crisis support immediately.
            </p>
            <div className="flex gap-4 w-full md:w-auto">
              <Link href="/chat" className="flex-1 md:flex-none bg-rose-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-md hover:bg-rose-700 transition">
                Start Anonymous Chat
              </Link>
              <a href="tel:112" className="flex-1 md:flex-none bg-white text-rose-600 border-2 border-rose-200 px-6 py-3.5 rounded-xl font-bold hover:bg-rose-50 transition">
                Call Helpline
              </a>
            </div>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-10 text-center border-b border-slate-100 bg-slate-900 text-white relative overflow-hidden">
            <h2 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">{result.assessmentType} Screening Result</h2>
            <div className="text-7xl font-extrabold mb-5 drop-shadow-sm">{result.score}</div>
            <span className={`inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
              result.severity === 'SEVERE' || result.severity === 'MODERATELY_SEVERE' ? 'bg-rose-500 text-white' :
              result.severity === 'MODERATE' ? 'bg-orange-500 text-white' :
              'bg-emerald-500 text-white'
            }`}>
              {result.severity.replace("_", " ")}
            </span>
          </div>

          <div className="p-8 space-y-6">
            <h3 className="font-extrabold text-slate-800 text-xl">Recommended Next Steps</h3>
            
            {(result.severity === "MINIMAL" || result.severity === "MILD") && !result.triggeredCrisis && (
              <div className="flex gap-4 p-5 border border-slate-100 rounded-xl bg-slate-50">
                <ShieldCheck className="w-7 h-7 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Self-Guided Resources</h4>
                  <p className="text-sm text-slate-500 mt-1 mb-4 leading-relaxed">Your score indicates mild symptoms. Exploring our clinical resource hub may provide helpful coping strategies.</p>
                  <Link href="/resources" className="text-sm font-bold text-blue-600 flex items-center gap-1.5 hover:text-blue-800 transition">Browse Resources <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            )}

            {(result.severity === "MODERATE" || result.severity === "MODERATELY_SEVERE" || result.severity === "SEVERE") && !result.triggeredCrisis && (
              <div className="flex gap-4 p-5 border border-blue-100 rounded-xl bg-blue-50">
                <ShieldCheck className="w-7 h-7 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 text-lg">Professional Support Recommended</h4>
                  <p className="text-sm text-blue-700 mt-1 mb-4 leading-relaxed">Your score suggests you may benefit from speaking with a clinical professional to explore what you're experiencing.</p>
                  <div className="flex gap-3">
                    <BookAppointmentButton
                      label="Book Session"
                      className="text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition"
                    />
                    <Link href="/chat" className="text-sm font-bold text-blue-700 bg-white border border-blue-200 px-5 py-2.5 rounded-lg hover:bg-blue-50 transition">Chat Anonymously</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
