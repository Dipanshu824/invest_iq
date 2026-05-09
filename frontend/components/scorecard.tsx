import { Insight } from "@/types/stock";

const labels = [
  ["Growth", "growth", "bg-cyanIQ"],
  ["Stability", "stability", "bg-mintIQ"],
  ["Dividend", "dividend", "bg-violetIQ"],
  ["Risk", "risk", "bg-dangerIQ"]
] as const;

export function Scorecard({ insight }: { insight: Insight }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">AI Investment Scorecard</p>
          <h2 className="text-xl font-semibold">Signal quality</h2>
        </div>
        <span className="rounded-full border border-cyanIQ/30 px-3 py-1 text-xs text-cyanIQ">Beta AI</span>
      </div>
      <div className="grid gap-4">
        {labels.map(([label, key, color]) => (
          <div key={key}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-300">{label}</span>
              <span className="font-semibold">{insight.scores[key]}/100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${insight.scores[key]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
