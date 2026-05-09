from fastapi import APIRouter, Query

from app.schemas.stock import ChartPoint, StockOut
from app.services.stock_service import stock_service

router = APIRouter()


@router.get("/search", response_model=list[StockOut])
def search_stocks(q: str = Query(default="", min_length=0)) -> list[dict]:
    return stock_service.search(q) if q else []


@router.get("/{symbol}", response_model=StockOut)
def get_stock(symbol: str) -> dict:
    return stock_service.get(symbol)


@router.get("/{symbol}/chart", response_model=list[ChartPoint])
def get_chart(symbol: str, range: str = "1M") -> list[dict]:
    return stock_service.chart(symbol, range)
