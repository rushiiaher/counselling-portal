import { PHQ9 } from "./phq9";
import { AssessmentType } from "@prisma/client";

export const AssessmentRegistry = {
  [PHQ9.type]: PHQ9,
};

export function getAssessment(type: AssessmentType) {
  const assessment = AssessmentRegistry[type];
  if (!assessment) throw new Error(`Assessment ${type} not found in registry`);
  return assessment;
}
