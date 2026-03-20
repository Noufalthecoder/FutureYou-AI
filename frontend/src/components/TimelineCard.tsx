import { formatCurrency } from "../utils/calculations";
import { LifeOutcome, getOutcomeColor, getOutcomeBg } from "../utils/lifeMapping";

interface Props {
  label: string;
  value: number;
  outcome: LifeOutcome;
  sip: number;
  isImproved?: boolean;
}

export default function TimelineCard({ label, value, outcome, sip, isImproved }: Props) {
  return (
    <div className={`rounded-xl border p-4 transition-all ${getOutcomeBg(outcome)}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 uppercase tracking-widest">{label}</span>
        {isImproved && (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            +30% SIP
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{formatCurrency(value)}</p>
      <div className="flex items-center justify-between mt-2">
        <span className={`text-sm font-semibold ${getOutcomeColor(outcome)}`}>{outcome}</span>
        <span className="text-xs text-slate-500">SIP ₹{sip.toLocaleString("en-IN")}/mo</span>
      </div>
    </div>
  );
}
