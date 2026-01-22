# src/auth/auth.py

import os
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt
from dotenv import load_dotenv

# ===============================
# LOAD ENV VARIABLES
# ===============================
load_dotenv()  # loads variables from .env file

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

if not SECRET_KEY:
    raise ValueError("SECRET_KEY not set in environment variables")

# ===============================
# PASSWORD HASHING
# ===============================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """
    Hash a plaintext password using bcrypt.
    """
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    """
    Verify a plaintext password against a hashed password.
    """
    return pwd_context.verify(password, hashed)


# ===============================
# JWT TOKEN CREATION
# ===============================
def create_access_token(data: dict) -> str:
    """
    Create a JWT access token with an expiration.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
