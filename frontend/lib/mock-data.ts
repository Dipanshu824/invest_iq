import { ChartPoint, Insight, QuizQuestion, Stock } from "@/types/stock";

export const stocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 197.24,
    changePercent: 1.82,
    marketCap: "$3.02T",
    peRatio: 30.8,
    eps: 6.42,
    revenueGrowth: 4.1,
    dividendYield: 0.48,
    weekHigh52: 237.49,
    weekLow52: 164.08,
    volatility: 22,
    sector: "Technology",
    analystRating: "Moderate Buy",
    type: "Balanced",
    sentiment: "bullish"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.73,
    changePercent: -2.11,
    marketCap: "$794B",
    peRatio: 68.4,
    eps: 3.64,
    revenueGrowth: 8.8,
    dividendYield: 0,
    weekHigh52: 299.29,
    weekLow52: 138.8,
    volatility: 49,
    sector: "Consumer Cyclical",
    analystRating: "Hold",
    type: "Growth",
    sentiment: "neutral"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 132.88,
    changePercent: 3.47,
    marketCap: "$3.26T",
    peRatio: 54.5,
    eps: 2.43,
    revenueGrowth: 78.2,
    dividendYield: 0.03,
    weekHigh52: 153.13,
    weekLow52: 75.61,
    volatility: 42,
    sector: "Semiconductors",
    analystRating: "Strong Buy",
    type: "Growth",
    sentiment: "bullish"
  },
  {
    symbol: "RELIANCE.NS",
    name: "Reliance Industries",
    price: 1419.55,
    changePercent: 0.64,
    marketCap: "₹19.2T",
    peRatio: 27.9,
    eps: 50.82,
    revenueGrowth: 6.4,
    dividendYield: 0.35,
    weekHigh52: 1608.8,
    weekLow52: 1115.55,
    volatility: 25,
    sector: "Energy and Retail",
    analystRating: "Buy",
    type: "Balanced",
    sentiment: "bullish"
  },
  {
    symbol: "TCS.NS",
    name: "Tata Consultancy Services",
    price: 3898.2,
    changePercent: -0.42,
    marketCap: "₹14.1T",
    peRatio: 29.2,
    eps: 133.5,
    revenueGrowth: 5.9,
    dividendYield: 1.34,
    weekHigh52: 4592.25,
    weekLow52: 3450.0,
    volatility: 18,
    sector: "IT Services",
    analystRating: "Accumulate",
    type: "Dividend",
    sentiment: "neutral"
  }
];

export const ranges = ["1D", "1W", "1M", "1Y", "MAX"] as const;

export function findStock(symbol: string) {
  return stocks.find((stock) => stock.symbol.toLowerCase() === symbol.toLowerCase()) ?? stocks[0];
}

export function generateChart(symbol: string, range = "1M"): ChartPoint[] {
  const stock = findStock(symbol);
  const count = range === "1D" ? 16 : range === "1W" ? 7 : range === "1M" ? 30 : range === "1Y" ? 12 : 24;
  const seed = stock.symbol.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin((index + seed) / 2.4) * stock.volatility * 0.18;
    const trend = (stock.changePercent / 100) * stock.price * (index / Math.max(count - 1, 1));
    return {
      label: range === "1D" ? `${index + 9}:00` : `${index + 1}`,
      price: Number((stock.price - trend + wave).toFixed(2))
    };
  });
}

export function buildInsight(stock: Stock): Insight {
  const growth = Math.min(96, Math.max(20, Math.round(stock.revenueGrowth + (stock.peRatio > 35 ? 22 : 10))));
  const stability = Math.max(18, 100 - stock.volatility);
  const dividend = Math.min(94, Math.round(stock.dividendYield * 34 + (stock.type === "Dividend" ? 38 : 8)));
  const risk = Math.min(96, Math.round(stock.volatility + (stock.peRatio > 45 ? 18 : 4)));
  return {
    summary: `${stock.name} looks like a ${stock.type.toLowerCase()} stock with ${stock.sentiment} market signals. Beginners should notice its ${stock.revenueGrowth.toFixed(1)}% revenue growth, ${stock.peRatio.toFixed(1)} P/E ratio, and ${stock.volatility}% volatility before forming an opinion.`,
    perspective:
      stock.type === "Growth"
        ? "Short term moves may be sharp, but long term performance depends on whether earnings can keep catching up with expectations."
        : "The profile is more balanced, so long term investors usually focus on cash flow quality, earnings durability, and valuation discipline.",
    risk:
      risk > 55
        ? "Risk is moderate to high because price swings and valuation expectations are elevated."
        : "Risk is moderate because the business has steadier signals and lower price volatility.",
    profile: `${stock.type} oriented stock with ${stock.analystRating.toLowerCase()} analyst tone.`,
    scores: { growth, stability, dividend, risk }
  };
}

export function buildQuiz(stock: Stock): QuizQuestion[] {
  return [
    {
      id: `${stock.symbol}-pe`,
      question: `P/E Ratio is ${stock.peRatio.toFixed(1)}. What does this usually indicate?`,
      options: ["The company has no revenue", "Investors may expect future growth", "The stock cannot fall", "The company is bankrupt"],
      correctIndex: 1,
      explanation: "A higher P/E often means investors are paying more for each dollar of earnings because they expect future growth."
    },
    {
      id: `${stock.symbol}-volatility`,
      question: `${stock.name} has ${stock.volatility}% volatility. What should a beginner understand?`,
      options: ["The price may swing more", "The dividend is guaranteed", "Revenue is zero", "The market is closed"],
      correctIndex: 0,
      explanation: "Volatility measures how much a stock price tends to move. Higher volatility can mean bigger gains or losses."
    },
    {
      id: `${stock.symbol}-dividend`,
      question: `Dividend yield is ${stock.dividendYield.toFixed(2)}%. What does that describe?`,
      options: ["A company debt score", "Cash paid to shareholders compared with price", "The number of employees", "A chart time range"],
      correctIndex: 1,
      explanation: "Dividend yield compares annual dividends with the current stock price."
    }
  ];
}
