"use client";

import React, { useState, use } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { AssessmentRegistry } from "@/lib/assessments/registry";
import { submitAssessmentAction } from "@/app/actions/assessment.actions";
import { useRouter } from "next/navigation";
import { AssessmentType } from "@prisma/client";

export default function TakeAssessmentPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  const router = useRouter();
  
  const assessmentType = type.toUpperCase() as AssessmentType;
  const assessment = AssessmentRegistry[assessmentType];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!assessment) return <PageContainer>Assessment not found.</PageContainer>;

  const handleSelect = (score: number) => {
    const q = assessment.questions[currentStep];
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);
    
    if (currentStep < assessment.questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("anon_session_token");
    
    const res = await submitAssessmentAction(assessment.type, answers, token);
    if (res.success) {
      router.push(`/assessments/results/${res.resultId}`);
    } else {
      setIsSubmitting(false);
    }
  };

  const q = assessment.questions[currentStep];
  const progress = ((currentStep + 1) / assessment.questions.length) * 100;
  const canSubmit = Object.keys(answers).length === assessment.questions.length;

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-3">{assessment.name}</h1>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs font-bold text-slate-400 mt-2 text-right uppercase tracking-wider">Question {currentStep + 1} of {assessment.questions.length}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm min-h-[350px] flex flex-col justify-center">
          <h2 className="text-lg font-medium text-slate-500 mb-8 text-center leading-relaxed">
            Over the last 2 weeks, how often have you been bothered by:
            <br />
            <span className="font-extrabold text-2xl text-slate-800 mt-4 block">"{q.text}"</span>
          </h2>

          <div className="space-y-3">
            {assessment.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt.score)}
                className={`w-full p-4 rounded-xl border text-left transition ${
                  answers[q.id] === opt.score 
                    ? "border-slate-900 bg-slate-900 text-white shadow-md transform scale-[1.01]" 
                    : "border-slate-200 hover:border-slate-400 bg-slate-50 text-slate-700"
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center px-2">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="text-slate-500 font-medium disabled:opacity-30 hover:text-slate-900 transition"
          >
            &larr; Previous
          </button>
          
          {currentStep === assessment.questions.length - 1 && canSubmit && (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition"
            >
              {isSubmitting ? "Processing..." : "View Results"}
            </button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
