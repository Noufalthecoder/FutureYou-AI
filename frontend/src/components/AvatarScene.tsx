import { EmotionalState } from "../utils/lifeMapping";

interface Props {
  gender: "male" | "female";
  emotionalState: EmotionalState;
  hasHouse: boolean;
  hasCar: boolean;
}

const avatarEmoji = {
  male: { low: "😔", medium: "😐", high: "😄" },
  female: { low: "😔", medium: "😐", high: "😄" },
};

const stateStyles: Record<EmotionalState, string> = {
  low: "opacity-50 grayscale",
  medium: "opacity-80",
  high: "opacity-100 drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]",
};

const stateLabel: Record<EmotionalState, string> = {
  low: "Struggling",
  medium: "Stable",
  high: "Thriving",
};

const stateLabelColor: Record<EmotionalState, string> = {
  low: "text-red-400",
  medium: "text-yellow-400",
  high: "text-emerald-400",
};

export default function AvatarScene({ gender, emotionalState, hasHouse, hasCar }: Props) {
  const emoji = avatarEmoji[gender][emotionalState];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs text-slate-500 uppercase tracking-widest">Life Snapshot</p>

      {/* Avatar */}
      <div className={`transition-all duration-700 ${stateStyles[emotionalState]}`}>
        <div className="text-8xl select-none">{emoji}</div>
      </div>

      <span className={`text-sm font-semibold ${stateLabelColor[emotionalState]}`}>
        {stateLabel[emotionalState]}
      </span>

      {/* Assets row */}
      <div className="flex gap-6 mt-2">
        {/* House */}
        <div className={`flex flex-col items-center gap-1 transition-all duration-700 ${hasHouse ? "opacity-100" : "opacity-20 grayscale"}`}>
          <span className="text-4xl">🏠</span>
          <span className="text-xs text-slate-400">House</span>
          {!hasHouse && <span className="text-xs text-red-400">Delayed</span>}
        </div>

        {/* Car */}
        <div className={`flex flex-col items-center gap-1 transition-all duration-700 ${hasCar ? "opacity-100" : "opacity-20 grayscale"}`}>
          <span className="text-4xl">🚗</span>
          <span className="text-xs text-slate-400">Car</span>
          {!hasCar && <span className="text-xs text-red-400">Out of reach</span>}
        </div>
      </div>
    </div>
  );
}
