import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <div className="text-6xl mb-6">🔮</div>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight">
          Future<span className="text-indigo-400">You</span> AI
        </h1>
        <p className="text-slate-400 text-lg mb-2">Financial Time Machine</p>
        <p className="text-slate-500 text-sm mb-10 max-w-sm mx-auto">
          Simulate your financial future, visualize life outcomes, and get AI-driven insights to make smarter decisions today.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-lg transition-all hover:scale-105 active:scale-95"
        >
          Start Simulation →
        </button>

        <div className="flex justify-center gap-8 mt-12 text-center">
          {[
            { icon: "📈", label: "Dual Scenarios" },
            { icon: "🤖", label: "AI Insights" },
            { icon: "🗣️", label: "Voice Output" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs text-slate-500">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
