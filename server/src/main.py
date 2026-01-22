from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import api_router
from src.policy.routes.policy import router as policy_router
from src.auth.routes.auth_routes import router as auth_router
from src.auth.routes.auth_otp_routes import router as register_otp_router
from src.auth.routes.forgot_password import router as forgot_password_router
from src.notifications.routes.notification_routes import router as notification_router


from src.database.core import Base, engine
from src.notifications.models import Notification


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Server running"}

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

app.include_router(notification_router)

