from src.database.core import SessionLocal
from src.users.models import UserPolicy

db = SessionLocal()

purchases = [
    UserPolicy(user_id=1, policy_id=1),
    UserPolicy(user_id=1, policy_id=2),
    UserPolicy(user_id=1, policy_id=3),
    UserPolicy(user_id=1, policy_id=4),
    UserPolicy(user_id=1, policy_id=5),
    UserPolicy(user_id=1, policy_id=6),
    UserPolicy(user_id=1, policy_id=7),
    UserPolicy(user_id=1, policy_id=8),
    UserPolicy(user_id=1, policy_id=9),
]

db.add_all(purchases)
db.commit()
db.close()

print("✅ User policies inserted")
