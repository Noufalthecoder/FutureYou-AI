import React, { useState } from "react";
import { SimulationInput } from "../services/financeService";

interface Props {
  onSubmit: (data: SimulationInput) => void;
  loading: boolean;
}

const defaultValues: SimulationInput = {
  gender: "male",
  salary: 50000,
  expenses: 30000,
  sip: 5000,
  age: 28,
  years: 10,
};

export default function InputForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<SimulationInput>(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "gender" ? value : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields: { label: string; name: keyof SimulationInput; min: number; max: number; step: number }[] = [
    { label: "Monthly Salary (₹)", name: "salary", min: 10000, max: 1000000, step: 1000 },
    { label: "Monthly Expenses (₹)", name: "expenses", min: 0, max: 900000, step: 1000 },
    { label: "Monthly SIP (₹)", name: "sip", min: 500, max: 500000, step: 500 },
    { label: "Current Age", name: "age", min: 18, max: 60, step: 1 },
    { label: "Investment Duration (Years)", name: "years", min: 1, max: 40, step: 1 },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Gender */}
      <div>
        <label className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">Gender</label>
        <div className="flex gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setForm((p) => ({ ...p, gender: g }))}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                form.gender === g
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-indigo-500"
              }`}
            >
              {g === "male" ? "👨 Male" : "👩 Female"}
            </button>
          ))}
        </div>
      </div>

      {/* Numeric fields */}
      {fields.map(({ label, name, min, max, step }) => (
        <div key={name}>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-slate-400 uppercase tracking-widest">{label}</label>
            <span className="text-xs text-indigo-400 font-mono">
              {name === "age" || name === "years"
                ? form[name]
                : `₹${Number(form[name]).toLocaleString("en-IN")}`}
            </span>
          </div>
          <input
            type="range"
            name={name}
            min={min}
            max={max}
            step={step}
            value={form[name] as number}
            onChange={handleChange}
            className="w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-0.5">
            <span>{min}</span><span>{max}</span>
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide transition-all"
      >
        {loading ? "Simulating..." : "Generate My Future →"}
      </button>
    </form>
  );
}
