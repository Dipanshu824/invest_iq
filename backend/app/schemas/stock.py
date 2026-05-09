from pydantic import BaseModel


class StockOut(BaseModel):
    symbol: str
    name: str
    price: float
    changePercent: float
    marketCap: str
    peRatio: float
    eps: float
    revenueGrowth: float
    dividendYield: float
    weekHigh52: float
    weekLow52: float
    volatility: float
    sector: str
    analystRating: str
    type: str
    sentiment: str


class ChartPoint(BaseModel):
    label: str
    price: float


class InsightOut(BaseModel):
    summary: str
    perspective: str
    risk: str
    profile: str
    scores: dict[str, int]


class QuizQuestionOut(BaseModel):
    id: str
    question: str
    options: list[str]
    correctIndex: int
    explanation: str


class WatchlistCreate(BaseModel):
    name: str = "My Watchlist"


class WatchlistOut(BaseModel):
    id: int
    name: str
    symbols: list[str]


class AddStockRequest(BaseModel):
    symbol: str
