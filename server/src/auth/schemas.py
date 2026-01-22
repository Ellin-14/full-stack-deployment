from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    mobile: str
    role: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str  


class VerifyOtpSchema(BaseModel):
    email: str
    otp: str
