CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  auth_provider_id VARCHAR(128) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stocks (
  id BIGSERIAL PRIMARY KEY,
  symbol VARCHAR(32) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(120) NOT NULL,
  exchange VARCHAR(60),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE watchlists (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL DEFAULT 'My Watchlist',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE saved_stocks (
  id BIGSERIAL PRIMARY KEY,
  watchlist_id BIGINT NOT NULL REFERENCES watchlists(id) ON DELETE CASCADE,
  stock_symbol VARCHAR(32) NOT NULL,
  start_price NUMERIC(18, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (watchlist_id, stock_symbol)
);

CREATE TABLE quiz_history (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stock_symbol VARCHAR(32) NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_scores (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  finance_iq INTEGER NOT NULL DEFAULT 600,
  quizzes_completed INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_saved_stocks_symbol ON saved_stocks(stock_symbol);
CREATE INDEX idx_quiz_history_user_created ON quiz_history(user_id, created_at DESC);
