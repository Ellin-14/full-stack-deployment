from fastapi import APIRouter
from .service import (
    get_dashboard_summary,
    get_policies,
    get_recommendations,
    get_claims_overview,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
def dashboard_summary():
    return get_dashboard_summary()

@router.get("/policies")
def user_policies():
    return get_policies()

@router.get("/recommendations")
def recommendations():
    return get_recommendations()

@router.get("/claims")
def claims_overview():
    return get_claims_overview()
