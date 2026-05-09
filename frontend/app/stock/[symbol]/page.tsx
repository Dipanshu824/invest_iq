import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/header";
import { StockDashboard } from "@/components/stock-dashboard";
import { api } from "@/lib/api";

export default async function StockPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const [stock, insight, quiz, chart] = await Promise.all([
    api.getStock(symbol),
    api.getInsight(symbol),
    api.getQuiz(symbol),
    api.getChart(symbol, "1M")
  ]);

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />
      <StockDashboard stock={stock} insight={insight} quiz={quiz} initialChart={chart} />
    </main>
  );
}
