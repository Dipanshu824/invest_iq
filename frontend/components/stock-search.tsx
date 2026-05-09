"use client";

import { Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { stocks } from "@/lib/mock-data";

export function StockSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => stocks.filter((stock) => `${stock.symbol} ${stock.name}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    [query]
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const symbol = query.trim() || "AAPL";
    router.push(`/stock/${encodeURIComponent(symbol.toUpperCase())}`);
  }

  return (
    <div className={compact ? "w-full" : "mx-auto w-full max-w-3xl"}>
      <form onSubmit={submit} className="glass flex items-center gap-3 rounded-2xl p-2">
        <Search className="ml-3 h-5 w-5 text-cyanIQ" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search AAPL, TSLA, NVDA, RELIANCE.NS..."
          className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
        />
        <button className="flex items-center gap-2 rounded-xl bg-cyanIQ px-4 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Analyze</span>
        </button>
      </form>
      {query ? (
        <div className="mt-3 grid gap-2">
          {results.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => router.push(`/stock/${stock.symbol}`)}
              className="glass flex items-center justify-between rounded-xl px-4 py-3 text-left transition hover:border-cyanIQ/40"
            >
              <span>
                <span className="font-semibold">{stock.symbol}</span>
                <span className="ml-3 text-sm text-slate-400">{stock.name}</span>
              </span>
              <span className={stock.changePercent >= 0 ? "text-mintIQ" : "text-dangerIQ"}>{stock.changePercent.toFixed(2)}%</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
