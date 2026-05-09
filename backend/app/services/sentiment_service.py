from app.services.stock_service import stock_service


class SentimentService:
    def sentiment(self, symbol: str) -> dict:
        stock = stock_service.get(symbol)
        momentum = 50 + stock["changePercent"] * 6
        analyst = 72 if "Buy" in stock["analystRating"] else 54 if stock["analystRating"] == "Hold" else 62
        news = 68 if stock["sentiment"] == "bullish" else 45 if stock["sentiment"] == "bearish" else 55
        score = round(max(0, min(100, (momentum + analyst + news) / 3)))
        label = "bullish" if score >= 62 else "bearish" if score <= 42 else "neutral"
        return {"symbol": stock["symbol"], "label": label, "score": score, "drivers": ["price momentum", "news sentiment", "analyst trends"]}


sentiment_service = SentimentService()
