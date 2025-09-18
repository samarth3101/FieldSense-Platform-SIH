from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    password: str

class UserOut(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    is_verified: bool

    class Config:
        orm_mode = True
