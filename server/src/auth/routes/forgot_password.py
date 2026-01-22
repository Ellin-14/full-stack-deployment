from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import random
from pydantic import BaseModel, EmailStr

from src.database.core import get_db
from src.auth.models import User
from src.auth.auth import hash_password
from src.auth.utils.email import send_otp_email
from src.auth.utils.otp_store import save_otp, verify_otp
from src.notifications.service import create_notification  # 🔔 ADD

router = APIRouter(prefix="/auth/password", tags=["Forgot Password"])


class ForgotPasswordSchema(BaseModel):
    email: EmailStr


class VerifyOtpSchema(BaseModel):
    email: EmailStr
    otp: str


class ResetPasswordSchema(BaseModel):
    email: EmailStr
    new_password: str


@router.post("/forgot")
def forgot_password(data: ForgotPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = str(random.randint(100000, 999999))
    save_otp(data.email, otp)
    send_otp_email(data.email, otp)

    return {"message": "OTP sent to email"}


@router.post("/verify-otp")
def verify_forgot_otp(data: VerifyOtpSchema):
    if not verify_otp(data.email, data.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    return {"message": "OTP verified"}


@router.post("/reset")
def reset_password(data: ResetPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = hash_password(data.new_password)
    db.commit()

    # 🔔 NOTIFICATION (SAFE)
    try:
        create_notification(
            db=db,
            user_id=user.id,
            title="Password Changed",
            message="Your password has been updated successfully."
        )
    except Exception as e:
        print("Notification error:", e)

    return {"message": "Password reset successful"}
