from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://investiq:investiq@localhost:5432/investiq"
    alpha_vantage_api_key: str | None = None
    yahoo_finance_enabled: bool = False
    cors_origins: list[str] = ["http://localhost:3000", "https://*.vercel.app"]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
