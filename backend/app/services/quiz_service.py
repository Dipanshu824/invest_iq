from app.services.stock_service import stock_service


class QuizService:
    def questions(self, symbol: str) -> list[dict]:
        stock = stock_service.get(symbol)
        return [
            {
                "id": f"{stock['symbol']}-pe",
                "question": f"P/E Ratio is {stock['peRatio']:.1f}. What does this usually indicate?",
                "options": ["The company has no revenue", "Investors may expect future growth", "The stock cannot fall", "The company is bankrupt"],
                "correctIndex": 1,
                "explanation": "A higher P/E often means investors are paying more for each dollar of earnings because they expect future growth.",
            },
            {
                "id": f"{stock['symbol']}-volatility",
                "question": f"{stock['name']} has {stock['volatility']}% volatility. What should a beginner understand?",
                "options": ["The price may swing more", "The dividend is guaranteed", "Revenue is zero", "The market is closed"],
                "correctIndex": 0,
                "explanation": "Volatility measures how much a stock price tends to move. Higher volatility can mean bigger gains or losses.",
            },
            {
                "id": f"{stock['symbol']}-dividend",
                "question": f"Dividend yield is {stock['dividendYield']:.2f}%. What does that describe?",
                "options": ["A company debt score", "Cash paid to shareholders compared with price", "The number of employees", "A chart time range"],
                "correctIndex": 1,
                "explanation": "Dividend yield compares annual dividends with the current stock price.",
            },
        ]


quiz_service = QuizService()
