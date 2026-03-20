interface RegretData {
  houseDelayed: boolean;
  educationRisk: boolean;
  retirementQuality: string;
}

interface Props {
  regret: RegretData;
}

export default function RegretPanel({ regret }: Props) {
  const items = [
    {
      label: "Home Ownership",
      status: regret.houseDelayed ? "Delayed" : "On Track",
      icon: "🏠",
      risk: regret.houseDelayed,
    },
    {
      label: "Education Fund",
      status: regret.educationRisk ? "At Risk" : "Covered",
      icon: "🎓",
      risk: regret.educationRisk,
    },
    {
      label: "Retirement Quality",
      status: regret.retirementQuality,
      icon: "🌅",
      risk: regret.retirementQuality === "Risk",
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Life Impact Analysis</p>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800/60 border border-slate-700/50"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm text-slate-300">{item.label}</span>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              item.risk
                ? "bg-red-500/20 text-red-400"
                : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}
