import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ✅ LOAD ENV FIRST
if os.getenv("VERCEL") is None:
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        pass

# ✅ IMPORT AFTER env is loaded
from src.database.config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
