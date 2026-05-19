import { AssessmentType, AssessmentSeverity } from "@prisma/client";

export const PHQ9 = {
  type: "PHQ9" as AssessmentType,
  name: "Patient Health Questionnaire (PHQ-9)",
  clinicalPurpose: "Screening tool for measuring the severity of depression.",
  estimatedMinutes: 3,
  questions: [
    { id: "q1", text: "Little interest or pleasure in doing things" },
    { id: "q2", text: "Feeling down, depressed, or hopeless" },
    { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much" },
    { id: "q4", text: "Feeling tired or having little energy" },
    { id: "q5", text: "Poor appetite or overeating" },
    { id: "q6", text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
    { id: "q7", text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
    { id: "q8", text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
    { id: "q9", text: "Thoughts that you would be better off dead or of hurting yourself in some way", isCrisisTrigger: true }
  ],
  options: [
    { score: 0, text: "Not at all" },
    { score: 1, text: "Several days" },
    { score: 2, text: "More than half the days" },
    { score: 3, text: "Nearly every day" }
  ],
  calculateScore: (answers: Record<string, number>) => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  },
  classifySeverity: (score: number): AssessmentSeverity => {
    if (score <= 4) return "MINIMAL";
    if (score <= 9) return "MILD";
    if (score <= 14) return "MODERATE";
    if (score <= 19) return "MODERATELY_SEVERE";
    return "SEVERE";
  },
  checkCrisis: (answers: Record<string, number>): boolean => {
    // Question 9 evaluates suicidal ideation
    return answers["q9"] > 0;
  }
};
