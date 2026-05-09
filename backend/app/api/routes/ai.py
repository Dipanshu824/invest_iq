from fastapi import APIRouter

from app.schemas.stock import InsightOut
from app.services.ai_service import ai_service

router = APIRouter()


@router.get("/analysis/{symbol}", response_model=InsightOut)
def get_analysis(symbol: str) -> dict:
    return ai_service.analysis(symbol)
