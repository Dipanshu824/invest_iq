import { buildInsight, buildQuiz, findStock, generateChart, stocks } from "@/lib/mock-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, fallback: () => T): Promise<T> {
  if (!API_URL) return fallback();
  try {
    const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 30 } });
    if (!response.ok) throw new Error(`API failed: ${response.status}`);
    return (await response.json()) as T;
  } catch {
    return fallback();
  }
}

export const api = {
  searchStocks: (query: string) =>
    request(`/api/stocks/search?q=${encodeURIComponent(query)}`, () =>
      stocks.filter((stock) => `${stock.symbol} ${stock.name}`.toLowerCase().includes(query.toLowerCase()))
    ),
  getStock: (symbol: string) =>
    request(`/api/stocks/${symbol}`, () => findStock(symbol)),
  getChart: (symbol: string, range: string) => request(`/api/stocks/${symbol}/chart?range=${range}`, () => generateChart(symbol, range)),
  getInsight: (symbol: string) => request(`/api/ai/analysis/${symbol}`, () => buildInsight(findStock(symbol))),
  getQuiz: (symbol: string) => request(`/api/quiz/${symbol}`, () => buildQuiz(findStock(symbol)))
};
