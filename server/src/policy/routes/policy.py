from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.users.models import Policy, UserPolicy
from src.notifications.service import create_notification
from src.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/")
def get_policies(db: Session = Depends(get_db)):
    try:
        policies = db.query(Policy).all()
        return policies
    except Exception as e:
        return {"error": str(e)}

@router.get("/types")
def get_policy_types(db: Session = Depends(get_db)):
    try:
        types = db.query(Policy.policy_type).distinct().all()
        return [t[0] for t in types]
    except Exception as e:
        return {"error": str(e)}

@router.get("/filters")
def get_policy_filters(db: Session = Depends(get_db)):
    try:
        types = db.query(Policy.policy_type).distinct().all()
        policy_types = [t[0] for t in types]
        coverage_ranges = [
            {"label": "Below ₹5L", "min": 0, "max": 500000},
            {"label": "₹5L - ₹10L", "min": 500001, "max": 1000000},
            {"label": "Above ₹10L", "min": 1000001, "max": 2000000},
        ]
        return {"types": policy_types, "ranges": coverage_ranges}
    except Exception as e:
        return {"error": str(e)}

@router.get("/details/{policy_id}")
def get_policy_by_id(policy_id: int, db: Session = Depends(get_db)):
    try:
        policy = db.query(Policy).filter(Policy.id == policy_id).first()
        if not policy:
            raise HTTPException(status_code=404, detail="Policy not found")
        return policy
    except Exception as e:
        return {"error": str(e)}

@router.post("/{policy_id}/buy")
def buy_policy(policy_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        policy = db.query(Policy).filter(Policy.id == policy_id).first()
        if not policy:
            raise HTTPException(status_code=404, detail="Policy not found")
        user_policy = UserPolicy(user_id=current_user.id, policy_id=policy.id)
        db.add(user_policy)
        db.commit()
        create_notification(
            db=db,
            user_id=current_user.id,
            title="Plan Added",
            message=f"Your plan '{policy.title}' was added successfully."
        )
        return {"message": "Policy purchased"}
    except Exception as e:
        return {"error": str(e)}
