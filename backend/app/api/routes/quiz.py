from fastapi import APIRouter

from app.schemas.stock import QuizQuestionOut
from app.services.quiz_service import quiz_service

router = APIRouter()


@router.get("/{symbol}", response_model=list[QuizQuestionOut])
def get_quiz(symbol: str) -> list[dict]:
    return quiz_service.questions(symbol)
