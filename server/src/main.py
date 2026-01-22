from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import api_router
from src.policy.routes.policy import router as policy_router
from src.auth.routes.auth_routes import router as auth_router
from src.auth.routes.auth_otp_routes import router as register_otp_router
from src.auth.routes.forgot_password import router as forgot_password_router
from src.notifications.routes.notification_routes import router as notification_router

app = FastAPI()

# ✅ CORS (safe for now, restrict later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",  # local dev
        "https://full-stack-deployment-nmjt-8ex0adm3s.vercel.app" 
    ],  # allow all during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Server running"}

# Routers
app.include_router(api_router, prefix="/api")
app.include_router(policy_router, prefix="/policies")
app.include_router(auth_router)
app.include_router(register_otp_router)
app.include_router(forgot_password_router)

app.include_router(
    notification_router,
    prefix="/notifications",
    tags=["notifications"]
)
