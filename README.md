# InvestIQ

InvestIQ is an AI-powered educational stock intelligence platform for beginner investors. It combines stock dashboards, beginner-friendly AI explanations, MCQ learning, sentiment scoring, and watchlists in a premium dark fintech interface.

## Stack

- Frontend: Next.js 15, React, TypeScript, TailwindCSS, Framer Motion, Recharts
- Backend: FastAPI, Pydantic, SQLAlchemy-ready structure
- Database: PostgreSQL schema included
- Auth: Clerk/Firebase integration placeholder
- Data: realistic dummy stock data with Yahoo Finance / Alpha Vantage adapter seams

## Project Structure

```text
InvestIQ/
  frontend/
    app/
    components/
    hooks/
    lib/
    types/
  backend/
    app/
      api/
      core/
      db/
      models/
      schemas/
      services/
    schema.sql
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs run at `http://localhost:8000/docs`.

## Environment

Frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Backend:

```bash
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/investiq
YAHOO_FINANCE_ENABLED=false
ALPHA_VANTAGE_API_KEY=
```

## Core APIs

- `GET /api/stocks/search?q=AAPL`
- `GET /api/stocks/{symbol}`
- `GET /api/stocks/{symbol}/chart?range=1M`
- `GET /api/ai/analysis/{symbol}`
- `GET /api/quiz/{symbol}`
- `GET /api/sentiment/{symbol}`
- `GET /api/watchlists`
- `POST /api/watchlists`
- `POST /api/watchlists/{watchlist_id}/stocks`

## Notes

The current implementation uses deterministic mock data so the product runs without paid API keys. Production integrations should replace `backend/app/services/stock_service.py` adapters with Yahoo Finance and Alpha Vantage calls, add Clerk/Firebase token verification in middleware, and wire SQLAlchemy repositories to PostgreSQL.
