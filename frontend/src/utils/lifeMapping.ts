/**
 * Maps financial values to life outcome labels and avatar emotional states.
 */

export type LifeOutcome = "Risk" | "Moderate" | "Secure";
export type EmotionalState = "low" | "medium" | "high";

export function mapLifeOutcome(value: number): LifeOutcome {
  if (value < 500000) return "Risk";
  if (value < 1500000) return "Moderate";
  return "Secure";
}

export function mapEmotionalState(outcome: LifeOutcome): EmotionalState {
  if (outcome === "Risk") return "low";
  if (outcome === "Moderate") return "medium";
  return "high";
}

export function getOutcomeColor(outcome: LifeOutcome): string {
  if (outcome === "Risk") return "text-red-400";
  if (outcome === "Moderate") return "text-yellow-400";
  return "text-emerald-400";
}

export function getOutcomeBg(outcome: LifeOutcome): string {
  if (outcome === "Risk") return "bg-red-500/10 border-red-500/30";
  if (outcome === "Moderate") return "bg-yellow-500/10 border-yellow-500/30";
  return "bg-emerald-500/10 border-emerald-500/30";
}
