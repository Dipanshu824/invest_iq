import { ReactNode } from "react";

export function StatCard({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: string; icon?: ReactNode }) {
  return (
    <div className="glass group rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-cyanIQ/40 hover:shadow-glow">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</p>
        {icon}
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      {hint ? <p className="mt-2 text-sm leading-5 text-slate-400">{hint}</p> : null}
    </div>
  );
}
