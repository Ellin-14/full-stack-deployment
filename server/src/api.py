from fastapi import APIRouter

from src.dashboard.controller import router as dashboard_router
api_router = APIRouter()

api_router.include_router(dashboard_router)


