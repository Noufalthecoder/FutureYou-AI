import { post } from "./api";

export interface SimulationInput {
  salary: number;
  expenses: number;
  sip: number;
  age: number;
  years: number;
  gender: "male" | "female";
}

export interface ProjectionPoint {
  year: number;
  value: number;
}

export interface SimulationResult {
  current: number;
  improved: number;
  improvedSip: number;
  currentOutcome: "Risk" | "Moderate" | "Secure";
  improvedOutcome: "Risk" | "Moderate" | "Secure";
  currentProjection: ProjectionPoint[];
  improvedProjection: ProjectionPoint[];
  assets: {
    current: { house: boolean; car: boolean };
    improved: { house: boolean; car: boolean };
  };
  regret: {
    houseDelayed: boolean;
    educationRisk: boolean;
    retirementQuality: string;
  };
  inputs: SimulationInput;
}

export interface AIInsight {
  explanation: string;
  recommendation: string;
  sipRatio: string;
  growth: string;
}

export async function runSimulation(input: SimulationInput): Promise<SimulationResult> {
  return post<SimulationResult>("/simulate", input);
}

export async function getAIInsight(
  input: SimulationInput,
  result: SimulationResult
): Promise<AIInsight> {
  return post<AIInsight>("/ai-insight", {
    salary: input.salary,
    sip: input.sip,
    years: input.years,
    current: result.current,
    improved: result.improved,
    currentOutcome: result.currentOutcome,
  });
}
