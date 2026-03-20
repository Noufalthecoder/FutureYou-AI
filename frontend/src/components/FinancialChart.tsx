import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProjectionPoint } from "../services/financeService";

interface Props {
  currentProjection: ProjectionPoint[];
  improvedProjection: ProjectionPoint[];
}

function formatY(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

// Merge two projections by year for recharts
function mergeProjections(current: ProjectionPoint[], improved: ProjectionPoint[]) {
  return current.map((c, i) => ({
    year: `Y${c.year}`,
    Current: c.value,
    Improved: improved[i]?.value ?? 0,
  }));
}

export default function FinancialChart({ currentProjection, improvedProjection }: Props) {
  const data = mergeProjections(currentProjection, improvedProjection);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} />
          <YAxis tickFormatter={formatY} tick={{ fill: "#64748b", fontSize: 11 }} width={60} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
            labelStyle={{ color: "#94a3b8" }}
            formatter={(value: number) => [formatY(value), ""]}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
          <Line
            type="monotone"
            dataKey="Current"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Improved"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 3"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
