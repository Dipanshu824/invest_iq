class WatchlistService:
    def __init__(self) -> None:
        self.watchlists: dict[int, dict] = {1: {"id": 1, "name": "AI Learning List", "symbols": ["AAPL", "NVDA"]}}
        self.next_id = 2

    def list(self) -> list[dict]:
        return list(self.watchlists.values())

    def create(self, name: str) -> dict:
        watchlist = {"id": self.next_id, "name": name, "symbols": []}
        self.watchlists[self.next_id] = watchlist
        self.next_id += 1
        return watchlist

    def add_stock(self, watchlist_id: int, symbol: str) -> dict:
        watchlist = self.watchlists.setdefault(watchlist_id, {"id": watchlist_id, "name": "My Watchlist", "symbols": []})
        normalized = symbol.upper()
        if normalized not in watchlist["symbols"]:
            watchlist["symbols"].append(normalized)
        return watchlist


watchlist_service = WatchlistService()
