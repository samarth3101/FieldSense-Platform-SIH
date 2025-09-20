from pydantic import BaseModel, EmailStr

try:
    from pydantic import ConfigDict
    V2 = True
except Exception:
    V2 = False

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    password: str
    requested_role: str  # "farmer" | "researcher" — role to add/enable

if V2:
    class UserOut(BaseModel):
        model_config = ConfigDict(from_attributes=True)
        name: str
        email: EmailStr
        mobile: str
        is_verified: bool
        roles: str  # CSV string in this quick implementation
else:
    class UserOut(BaseModel):
        name: str
        email: EmailStr
        mobile: str
        is_verified: bool
        roles: str

        class Config:
            orm_mode = True
