from fastapi import APIRouter

from app.schemas.stock import AddStockRequest, WatchlistCreate, WatchlistOut
from app.services.watchlist_service import watchlist_service

router = APIRouter()


@router.get("", response_model=list[WatchlistOut])
def list_watchlists() -> list[dict]:
    return watchlist_service.list()


@router.post("", response_model=WatchlistOut)
def create_watchlist(payload: WatchlistCreate) -> dict:
    return watchlist_service.create(payload.name)


@router.post("/{watchlist_id}/stocks", response_model=WatchlistOut)
def add_stock(watchlist_id: int, payload: AddStockRequest) -> dict:
    return watchlist_service.add_stock(watchlist_id, payload.symbol)
