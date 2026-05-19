import { CrisisSeverity } from "@prisma/client";

const CRISIS_KEYWORDS = {
  CRITICAL: ["suicide", "kill myself", "end my life", "want to die", "خداحافظ", "مرنا چاہتا ہوں", "I am going to jump"],
  HIGH: ["self harm", "cut myself", "overdose", "hurt myself", "خود کو نقصان"],
  MEDIUM: ["desperate", "hopeless", "can't go on", "giving up", "ناامید"],
};

/**
 * Keyword-based crisis severity detection pipeline.
 * Multilingual support built-in for English and Urdu.
 */
export function detectCrisisSeverity(message: string): CrisisSeverity {
  const text = message.toLowerCase();
  
  for (const keyword of CRISIS_KEYWORDS.CRITICAL) {
    if (text.includes(keyword)) return "CRITICAL";
  }
  for (const keyword of CRISIS_KEYWORDS.HIGH) {
    if (text.includes(keyword)) return "HIGH";
  }
  for (const keyword of CRISIS_KEYWORDS.MEDIUM) {
    if (text.includes(keyword)) return "MEDIUM";
  }
  
  return "LOW";
}
