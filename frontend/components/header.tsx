import { BrainCircuit, LineChart, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyanIQ/30 bg-cyanIQ/10 shadow-glow">
          <BrainCircuit className="h-5 w-5 text-cyanIQ" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-wide">InvestIQ</p>
          <p className="text-xs text-slate-400">AI stock learning</p>
        </div>
      </div>
      <nav className="hidden items-center gap-2 text-sm text-slate-300 md:flex">
        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2"><LineChart className="h-4 w-4 text-cyanIQ" /> Markets</span>
        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2"><ShieldCheck className="h-4 w-4 text-mintIQ" /> Learn safely</span>
      </nav>
    </header>
  );
}
