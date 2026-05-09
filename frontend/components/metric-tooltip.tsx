import { Info } from "lucide-react";

const copy: Record<string, string> = {
  "P/E Ratio": "Price compared with yearly earnings. A high P/E can mean investors expect growth.",
  "Market Cap": "The total value of all shares. It helps compare company size.",
  EPS: "Earnings per share. It shows profit for each share.",
  "Dividend Yield": "Cash dividends compared with the stock price.",
  Volatility: "How much the price tends to move. Higher means bumpier rides."
};

export function MetricTooltip({ label }: { label: string }) {
  return (
    <span className="group relative inline-flex">
      <Info className="h-4 w-4 text-slate-500" />
      <span className="pointer-events-none absolute bottom-6 right-0 z-20 w-56 rounded-xl border border-white/10 bg-slate-950 p-3 text-xs leading-5 text-slate-300 opacity-0 shadow-2xl transition group-hover:opacity-100">
        {copy[label]}
      </span>
    </span>
  );
}
