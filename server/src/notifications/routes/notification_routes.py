from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.notifications.models import Notification
from src.auth.dependencies import get_current_user
from src.auth.models import User

from src.notifications.email import send_email

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("")
def get_my_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .all()
    )


@router.get("/test-email")
async def test_email():
    await send_email(
        to="YOUR_EMAIL@gmail.com",   # 👈 put your real email
        subject="Test Mail",
        body="Email system working"
    )
    return {"status": "ok"}

    return notifications
