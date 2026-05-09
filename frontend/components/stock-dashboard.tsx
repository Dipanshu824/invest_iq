"use client";

import { ArrowDownRight, ArrowUpRight, Bell, BookmarkPlus, Building2, Landmark, Scale, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { AiSummary } from "@/components/ai-summary";
import { McqEngine } from "@/components/mcq-engine";
import { MetricTooltip } from "@/components/metric-tooltip";
import { Scorecard } from "@/components/scorecard";
import { StatCard } from "@/components/stat-card";
import { StockChart } from "@/components/stock-chart";
import { StockSearch } from "@/components/stock-search";
import { useWatchlist } from "@/hooks/use-watchlist";
import { generateChart } from "@/lib/mock-data";
import { ChartPoint, Insight, QuizQuestion, Stock } from "@/types/stock";

export function StockDashboard({
  stock,
  insight,
  quiz,
  initialChart
}: {
  stock: Stock;
  insight: Insight;
  quiz: QuizQuestion[];
  initialChart: ChartPoint[];
}) {
  const [range, setRange] = useState("1M");
  const watchlist = useWatchlist();
  const chart = useMemo(() => (range === "1M" ? initialChart : generateChart(stock.symbol, range)), [initialChart, range, stock.symbol]);
  const positive = stock.changePercent >= 0;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="glass rounded-3xl p-5 sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div>
              <p className="mb-2 text-sm text-slate-400">{stock.sector}</p>
              <h1 className="text-4xl font-semibold sm:text-5xl">{stock.symbol}</h1>
              <p className="mt-2 text-lg text-slate-300">{stock.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => watchlist.toggle(stock.symbol)}
                className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-cyanIQ/50"
              >
                <BookmarkPlus className="h-4 w-4 text-cyanIQ" />
                {watchlist.has(stock.symbol) ? "Saved" : "Save"}
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-cyanIQ px-4 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">
                <Bell className="h-4 w-4" />
                Alerts
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <p className="text-sm text-slate-400">Current price</p>
              <div className="mt-2 flex flex-wrap items-end gap-4">
                <span className="text-5xl font-semibold">${stock.price.toLocaleString()}</span>
                <span className={`mb-2 flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${positive ? "bg-mintIQ/10 text-mintIQ" : "bg-dangerIQ/10 text-dangerIQ"}`}>
                  {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">Market sentiment</p>
              <p className="mt-2 text-2xl font-semibold capitalize text-cyanIQ">{stock.sentiment}</p>
              <p className="mt-2 text-sm text-slate-400">Blends momentum, news tone, and analyst trend.</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-3xl p-5">
          <p className="mb-3 text-sm text-slate-400">Search another stock</p>
          <StockSearch compact />
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Market Cap" value={stock.marketCap} hint="Company size signal." icon={<MetricTooltip label="Market Cap" />} />
        <StatCard label="P/E Ratio" value={stock.peRatio.toFixed(1)} hint="Valuation versus earnings." icon={<MetricTooltip label="P/E Ratio" />} />
        <StatCard label="EPS" value={stock.eps.toFixed(2)} hint="Profit per share." icon={<MetricTooltip label="EPS" />} />
        <StatCard label="Revenue Growth" value={`${stock.revenueGrowth.toFixed(1)}%`} hint="Sales expansion trend." icon={<Zap className="h-5 w-5 text-mintIQ" />} />
        <StatCard label="Dividend Yield" value={`${stock.dividendYield.toFixed(2)}%`} hint="Income potential." icon={<MetricTooltip label="Dividend Yield" />} />
        <StatCard label="52W Range" value={`${stock.weekLow52} - ${stock.weekHigh52}`} hint="Yearly price boundaries." icon={<Scale className="h-5 w-5 text-cyanIQ" />} />
        <StatCard label="Volatility" value={`${stock.volatility}%`} hint="Price swing intensity." icon={<MetricTooltip label="Volatility" />} />
        <StatCard label="Analyst Rating" value={stock.analystRating} hint="Wall Street consensus tone." icon={<Landmark className="h-5 w-5 text-violetIQ" />} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.45fr_.85fr]">
        <div className="space-y-8">
          <StockChart data={chart} range={range} setRange={setRange} />
          <McqEngine questions={quiz} />
        </div>
        <div className="space-y-8">
          <AiSummary insight={insight} />
          <Scorecard insight={insight} />
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-3">
              <Building2 className="h-5 w-5 text-cyanIQ" />
              <h2 className="text-xl font-semibold">Watchlist</h2>
            </div>
            {watchlist.symbols.length ? (
              <div className="flex flex-wrap gap-2">
                {watchlist.symbols.map((symbol) => (
                  <span key={symbol} className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-300">{symbol}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-slate-400">Save stocks to track learning progress and performance in one place.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
