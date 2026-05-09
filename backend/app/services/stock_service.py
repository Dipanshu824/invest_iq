import math
from fastapi import HTTPException

from app.services.mock_data import STOCKS


class StockService:
    def search(self, query: str) -> list[dict]:
        q = query.lower()
        return [stock for stock in STOCKS if q in stock["symbol"].lower() or q in stock["name"].lower()]

    def get(self, symbol: str) -> dict:
        for stock in STOCKS:
            if stock["symbol"].lower() == symbol.lower():
                return stock
        raise HTTPException(status_code=404, detail="Stock not found")

    def chart(self, symbol: str, range_name: str) -> list[dict]:
        stock = self.get(symbol)
        count = {"1D": 16, "1W": 7, "1M": 30, "1Y": 12, "MAX": 24}.get(range_name, 30)
        seed = sum(ord(char) for char in stock["symbol"])
        points = []
        for index in range(count):
            wave = math.sin((index + seed) / 2.4) * stock["volatility"] * 0.18
            trend = (stock["changePercent"] / 100) * stock["price"] * (index / max(count - 1, 1))
            points.append({"label": f"{index + 1}", "price": round(stock["price"] - trend + wave, 2)})
        return points


stock_service = StockService()
