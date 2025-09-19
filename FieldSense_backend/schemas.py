from pydantic import BaseModel, EmailStr
try:
    # Pydantic v2 style
    from pydantic import ConfigDict
    V2 = True
except Exception:
    V2 = False

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    password: str

if V2:
    class UserOut(BaseModel):
        model_config = ConfigDict(from_attributes=True)
        name: str
        email: EmailStr
        mobile: str
        is_verified: bool
else:
    class UserOut(BaseModel):
        name: str
        email: EmailStr
        mobile: str
        is_verified: bool

        class Config:
            orm_mode = True
