from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.auth import models, schemas, auth
from src.notifications.service import create_notification  # 🔔 ADD

from src.notifications.service import create_notification_and_email


router = APIRouter(prefix="/auth", tags=["Auth"])


# =========================
# REGISTER
# =========================
@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        name=user.name,
        email=user.email,
        mobile=user.mobile,
        hashed_password=auth.hash_password(user.password),
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 🔔 NOTIFICATION (SAFE)
    try:
        create_notification_and_email(
        db=db,
        user_id=db_user.id,
        title="Login Successful",
        message="You logged in successfully.",
        email=db_user.email   # ✅ email + in-app sync
)

    except Exception as e:
        print("Notification error:", e)

    return new_user


# =========================
# LOGIN
# =========================
@router.post("/login", response_model=schemas.TokenResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = auth.create_access_token(
        data={
            "sub": str(db_user.id),
            "role": db_user.role
        }
    )

    # 🔔 NOTIFICATION (SAFE)
    try:
        create_notification(
            db=db,
            user_id=db_user.id,
            title="Login Successful",
            message="You logged in successfully."
        )
    except Exception as e:
        print("Notification error:", e)

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role
    }

