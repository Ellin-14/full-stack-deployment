from src.notifications.models import Notification
from src.notifications.email import send_email


def create_notification(db, user_id: int, title: str, message: str):
    try:
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message
        )
        db.add(notification)
        db.commit()
    except Exception as e:
        db.rollback()   # 🔴 VERY IMPORTANT
        print("Notification DB error:", e)

def create_notification_and_email(
    db,
    user_id: int,
    title: str,
    message: str,
    email: str | None = None
):
    # 🔔 In-app notification
    notification = Notification(
        user_id=user_id,
        title=title,
        message=message
    )
    db.add(notification)
    db.commit()

    # 📧 Email (optional)
    if email:
        send_email(
            to=email,
            subject=title,
            body=message
        )

