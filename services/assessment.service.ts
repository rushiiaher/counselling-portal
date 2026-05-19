import { PrismaClient, AssessmentType } from "@prisma/client";
import { getAssessment } from "../lib/assessments/registry";
import { emitEvent } from "./event.service";
import { createAuditLog } from "./audit.service";

import prisma from "@/lib/prisma";

export async function submitAssessment(
  type: AssessmentType, 
  answers: Record<string, number>, 
  context: { patientId?: string, anonymousSessionToken?: string }
) {
  const assessment = getAssessment(type);
  
  // Scoring Engine
  const score = assessment.calculateScore(answers);
  const severity = assessment.classifySeverity(score);
  const isCrisis = assessment.checkCrisis(answers);

  let anonymousSessionId = undefined;
  if (context.anonymousSessionToken) {
    const session = await prisma.anonymousSession.findUnique({ where: { token: context.anonymousSessionToken }});
    if (session) anonymousSessionId = session.id;
  }

  // Persist Result
  const result = await prisma.assessmentResult.create({
    data: {
      assessmentType: type,
      patientId: context.patientId,
      anonymousSessionId,
      answers,
      score,
      severity,
      triggeredCrisis: isCrisis
    }
  });

  // Audit Hooks
  if (context.patientId) {
    await createAuditLog({
      userId: context.patientId, 
      action: "ASSESSMENT_COMPLETED",
      resource: `AssessmentResult:${result.id}`
    });
  }

  // Crisis Escalation Integration
  if (isCrisis) {
    await createAuditLog({
      action: "ASSESSMENT_CRISIS_TRIGGERED",
      resource: `AssessmentResult:${result.id}`
    });

    if (anonymousSessionId) {
      await emitEvent("crisis.escalation", { sessionId: anonymousSessionId, severity: "CRITICAL" });
      
      // Auto-escalate anonymous session
      await prisma.anonymousSession.update({
        where: { id: anonymousSessionId },
        data: { crisisSeverity: "CRITICAL", status: "ESCALATED" }
      });
    } else if (context.patientId) {
      // Dispatch clinical crisis event for authenticated patients
      await emitEvent("assessment.crisis", { patientId: context.patientId, resultId: result.id });
    }
  }

  return result;
}

export async function getPatientAssessments(patientId: string) {
  return prisma.assessmentResult.findMany({
    where: { patientId },
    orderBy: { createdAt: "desc" }
  });
}
