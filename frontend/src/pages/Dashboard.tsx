import { useState, useCallback } from "react";
import InputForm from "../components/InputForm";
import AvatarScene from "../components/AvatarScene";
import FinancialChart from "../components/FinancialChart";
import TimelineCard from "../components/TimelineCard";
import RegretPanel from "../components/RegretPanel";
import { runSimulation, getAIInsight, SimulationInput, SimulationResult, AIInsight } from "../services/financeService";
import { mapEmotionalState } from "../utils/lifeMapping";
import { formatCurrency } from "../utils/calculations";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // What-if SIP slider state
  const [whatIfSip, setWhatIfSip] = useState<number | null>(null);
  const [whatIfResult, setWhatIfResult] = useState<SimulationResult | null>(null);

  const handleSubmit = useCallback(async (input: SimulationInput) => {
    setLoading(true);
    setError(null);
    setInsight(null);
    setWhatIfSip(null);
    setWhatIfResult(null);
    try {
      const sim = await runSimulation(input);
      setResult(sim);
      setWhatIfSip(input.sip);

      // Fetch AI insight in parallel
      setInsightLoading(true);
      getAIInsight(input, sim)
        .then(setInsight)
        .catch(() => {})
        .finally(() => setInsightLoading(false));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Simulation failed");
    } finally {
      setLoading(false);
    }
  }, []);

  // What-if slider handler
  const handleWhatIfChange = useCallback(
    async (newSip: number) => {
      if (!result) return;
      setWhatIfSip(newSip);
      try {
        const sim = await runSimulation({ ...result.inputs, sip: newSip });
        setWhatIfResult(sim);
      } catch {
        // silent fail on what-if
      }
    },
    [result]
  );

  // Voice output
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const activeResult = whatIfResult ?? result;
  const emotionalState = activeResult
    ? mapEmotionalState(activeResult.currentOutcome)
    : "medium";

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">
            Future<span className="text-indigo-400">You</span> AI
          </h1>
          <p className="text-slate-500 text-sm mt-1">Financial Time Machine</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* LEFT — Input */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-5">Your Profile</p>
              <InputForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {/* Avatar */}
            {activeResult && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <AvatarScene
                  gender={activeResult.inputs.gender}
                  emotionalState={emotionalState}
                  hasHouse={activeResult.assets.current.house}
                  hasCar={activeResult.assets.current.car}
                />
              </div>
            )}
          </div>

          {/* RIGHT — Results */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {activeResult && (
              <>
                {/* Scenario cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TimelineCard
                    label="Current Path"
                    value={activeResult.current}
                    outcome={activeResult.currentOutcome}
                    sip={whatIfSip ?? activeResult.inputs.sip}
                  />
                  <TimelineCard
                    label="Improved Path"
                    value={activeResult.improved}
                    outcome={activeResult.improvedOutcome}
                    sip={activeResult.improvedSip}
                    isImproved
                  />
                </div>

                {/* Chart */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                    Wealth Projection
                  </p>
                  <FinancialChart
                    currentProjection={activeResult.currentProjection}
                    improvedProjection={activeResult.improvedProjection}
                  />
                </div>

                {/* What-if slider */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                    What-If Engine
                  </p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Adjust Monthly SIP</span>
                    <span className="text-sm text-indigo-400 font-mono">
                      ₹{(whatIfSip ?? activeResult.inputs.sip).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={100000}
                    step={500}
                    value={whatIfSip ?? activeResult.inputs.sip}
                    onChange={(e) => handleWhatIfChange(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-indigo-500 cursor-pointer"
                  />
                  {whatIfResult && (
                    <p className="text-xs text-emerald-400 mt-2">
                      Projected corpus: {formatCurrency(whatIfResult.current)} at this SIP
                    </p>
                  )}
                </div>

                {/* Regret panel */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                  <RegretPanel regret={activeResult.regret} />
                </div>

                {/* AI Insight */}
                <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">AI Insight</p>
                    {insight && (
                      <button
                        onClick={() => speak(`${insight.explanation} ${insight.recommendation}`)}
                        className="text-xs bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 px-3 py-1 rounded-full transition-all"
                      >
                        🔊 Listen
                      </button>
                    )}
                  </div>

                  {insightLoading && (
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <span className="animate-spin">⚙️</span> Generating insight...
                    </div>
                  )}

                  {insight && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-indigo-400 mb-1 font-semibold">Analysis</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{insight.explanation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-400 mb-1 font-semibold">Recommendation</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{insight.recommendation}</p>
                      </div>
                      <div className="flex gap-4 pt-2 border-t border-slate-800">
                        <div>
                          <p className="text-xs text-slate-500">SIP Ratio</p>
                          <p className="text-sm font-bold text-white">{insight.sipRatio}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Potential Growth</p>
                          <p className="text-sm font-bold text-emerald-400">+{insight.growth}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                <span className="text-5xl mb-4">📊</span>
                <p className="text-sm">Fill in your profile and click Generate to see your future</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
