from pydantic import BaseModel
from typing import List


class DashboardSummary(BaseModel):
    active_policies: int
    pending_claims: int
    recommendations: int
    total_premium: int


class Policy(BaseModel):
    type: str
    policy_no: str
    premium: float
    expires_on: str
    status: str


class Recommendation(BaseModel):
    id: int
    title: str
    description: str


class Claim(BaseModel):
    claim_no: str
    type: str
    date: str
    amount: float
    status: str


class ClaimsOverview(BaseModel):
    status_breakdown: dict
    recent_claims: List[Claim]
