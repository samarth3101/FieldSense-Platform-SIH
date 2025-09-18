from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate, UserOut
from auth import hash_password, create_verification_token
from email_utils import send_verification_email
from fastapi.middleware.cors import CORSMiddleware

# 1️⃣ Create FastAPI app first
app = FastAPI()

# 2️⃣ Add CORS middleware
origins = [
    "http://localhost:3000",  # Frontend URL
    "http://127.0.0.1:3000",
    "*",  # allow all origins (for testing only)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3️⃣ Create database tables
Base.metadata.create_all(bind=engine)

# 4️⃣ Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 5️⃣ Routes
@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    hashed_pw = hash_password(user.password)
    token = create_verification_token()

    db_user = User(
        name=user.name,
        email=user.email,
        mobile=user.mobile,
        hashed_password=hashed_pw,
        verification_token=token
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Send verification email
    send_verification_email(user.email, token)

    return db_user

@app.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    
    user.is_verified = True
    user.verification_token = None
    db.commit()
    return {"message": "Email verified successfully!"}

@app.get("/")
def root():
    return {"message": "FieldSense backend is running!"}
