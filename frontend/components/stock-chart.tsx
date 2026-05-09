"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ranges } from "@/lib/mock-data";
import { ChartPoint } from "@/types/stock";

export function StockChart({
  data,
  range,
  setRange
}: {
  data: ChartPoint[];
  range: string;
  setRange: (range: string) => void;
}) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-400">Animated price chart</p>
          <h2 className="text-xl font-semibold">Market movement</h2>
        </div>
        <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {ranges.map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${range === item ? "bg-cyanIQ text-slate-950" : "text-slate-400 hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="price" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#32e6ff" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#32e6ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" hide />
            <YAxis hide domain={["dataMin - 4", "dataMax + 4"]} />
            <Tooltip
              contentStyle={{ background: "#070b16", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Area type="monotone" dataKey="price" stroke="#32e6ff" strokeWidth={3} fill="url(#price)" animationDuration={900} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
