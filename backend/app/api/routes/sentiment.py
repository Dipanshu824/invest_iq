from fastapi import APIRouter

from app.services.sentiment_service import sentiment_service

router = APIRouter()


@router.get("/{symbol}")
def get_sentiment(symbol: str) -> dict:
    return sentiment_service.sentiment(symbol)
