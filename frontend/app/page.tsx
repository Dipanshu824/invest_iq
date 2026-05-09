import { ArrowRight, Flame, Gauge, GraduationCap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/header";
import { StockSearch } from "@/components/stock-search";
import { StatCard } from "@/components/stat-card";
import { stocks } from "@/lib/mock-data";

export default function Home() {
  const trending = stocks.filter((stock) => stock.changePercent > 0).slice(0, 4);

  return (
    <main className="min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Header />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyanIQ/20 bg-cyanIQ/10 px-4 py-2 text-sm text-cyanIQ">
            <Flame className="h-4 w-4" />
            Bloomberg Terminal meets Duolingo for Investing
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            InvestIQ
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Search any stock, understand the numbers in plain English, and level up through AI-generated quizzes before you build conviction.
          </p>
          <div className="mt-8">
            <StockSearch />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/stock/NVDA" className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">
              Try NVDA <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/stock/RELIANCE.NS" className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyanIQ/50">
              Explore Indian stocks
            </Link>
          </div>
        </div>
        <div className="glass relative rounded-3xl p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live learning terminal</p>
              <h2 className="text-2xl font-semibold">Market pulse</h2>
            </div>
            <span className="rounded-full bg-mintIQ/10 px-3 py-1 text-xs font-semibold text-mintIQ">Bullish</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Market Sentiment" value="68%" hint="Momentum and analyst tone skew positive today." icon={<Gauge className="h-5 w-5 text-cyanIQ" />} />
            <StatCard label="Daily Quiz" value="3 min" hint="Quick concepts from real stock metrics." icon={<GraduationCap className="h-5 w-5 text-violetIQ" />} />
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
              <TrendingUp className="h-4 w-4 text-cyanIQ" />
              Trending stocks
            </div>
            <div className="space-y-3">
              {trending.map((stock) => (
                <Link key={stock.symbol} href={`/stock/${stock.symbol}`} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyanIQ/40">
                  <span>
                    <span className="font-semibold">{stock.symbol}</span>
                    <span className="ml-3 text-sm text-slate-400">{stock.name}</span>
                  </span>
                  <span className="text-sm font-semibold text-mintIQ">+{stock.changePercent.toFixed(2)}%</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 sm:grid-cols-3 sm:px-6">
        <StatCard label="AI Cards" value="Plain English" hint="Every metric explains itself for beginners." />
        <StatCard label="Sim Mode" value="$10k sandbox" hint="Practice portfolio decisions without trading." />
        <StatCard label="Badges" value="Momentum Hunter" hint="Gamified learning keeps progress visible." />
      </section>
    </main>
  );
}
