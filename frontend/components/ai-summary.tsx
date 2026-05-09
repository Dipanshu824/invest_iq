import { BrainCircuit } from "lucide-react";
// import { Insight } from "@/types/stock";
export function AiSummary({ insight }: { insight: any }) {
  return (
    <section className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-violetIQ/15 text-violetIQ">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Beginner-friendly AI summary</p>
          <h2 className="text-xl font-semibold">What this stock means</h2>
        </div>
      </div>
      <div className="space-y-4 text-sm leading-6 text-slate-300">
        <p>{insight.summary}</p>
        <p>{insight.risk}</p>
        <p>{insight.perspective}</p>
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-cyanIQ">{insight.profile}</div>
    </section>
  );
}
