from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import random, time
from src.auth.utils.otp_store import otp_store
from src.auth.utils.email import send_otp_email

router = APIRouter(prefix="/auth/register", tags=["Register OTP"])

class RegisterOtpSchema(BaseModel):
    email: EmailStr
    otp: str | None = None

@router.post("/send-otp")
def send_register_otp(data: RegisterOtpSchema):
    otp = str(random.randint(100000, 999999))
    otp_store[data.email] = {
        "otp": otp,
        "expires": time.time() + 300
    }
    send_otp_email(data.email, otp)
    return {"message": "Registration OTP sent"}

@router.post("/verify-otp")
def verify_register_otp(data: RegisterOtpSchema):
    record = otp_store.get(data.email)

    if not record:
        raise HTTPException(status_code=400, detail="OTP not found")

    if time.time() > record["expires"]:
        raise HTTPException(status_code=400, detail="OTP expired")

    if record["otp"] != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    return {"message": "Registration OTP verified"}
