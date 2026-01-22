from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.notifications.models import Notification

router = APIRouter()

@router.get("/user/{user_id}")
def get_user_notifications(user_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )

@router.put("/{notification_id}/read")
def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if notification:
        notification.is_read = True
        db.commit()

    return {"message": "Notification marked as read"}
