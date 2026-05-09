"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "investiq-watchlist";

export function useWatchlist() {
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setSymbols(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(symbols));
  }, [symbols]);

  return useMemo(
    () => ({
      symbols,
      toggle: (symbol: string) =>
        setSymbols((current) => (current.includes(symbol) ? current.filter((item) => item !== symbol) : [...current, symbol])),
      has: (symbol: string) => symbols.includes(symbol)
    }),
    [symbols]
  );
}
