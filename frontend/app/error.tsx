"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4 text-center">
      <div className="glass max-w-md rounded-3xl p-8">
        <h1 className="text-2xl font-semibold">Market data paused</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">InvestIQ could not load this view. Try refreshing the learning terminal.</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-cyanIQ px-4 py-3 text-sm font-semibold text-slate-950">
          Retry
        </button>
      </div>
    </div>
  );
}
