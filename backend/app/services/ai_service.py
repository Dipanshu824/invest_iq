from app.services.stock_service import stock_service


class AiService:
    def analysis(self, symbol: str) -> dict:
        stock = stock_service.get(symbol)
        growth = min(96, max(20, round(stock["revenueGrowth"] + (22 if stock["peRatio"] > 35 else 10))))
        stability = max(18, 100 - stock["volatility"])
        dividend = min(94, round(stock["dividendYield"] * 34 + (38 if stock["type"] == "Dividend" else 8)))
        risk = min(96, round(stock["volatility"] + (18 if stock["peRatio"] > 45 else 4)))
        return {
            "summary": f"{stock['name']} looks like a {stock['type'].lower()} stock with {stock['sentiment']} market signals. Beginners should compare revenue growth, valuation, and volatility before forming an opinion.",
            "perspective": "Short-term price moves can be noisy. Long-term results depend on earnings growth, valuation discipline, and sector durability.",
            "risk": "Risk is higher when volatility and valuation expectations rise. Beginners should size any simulated position carefully.",
            "profile": f"{stock['type']} oriented stock with {stock['analystRating'].lower()} analyst tone.",
            "scores": {"growth": growth, "stability": stability, "dividend": dividend, "risk": risk},
        }


ai_service = AiService()
