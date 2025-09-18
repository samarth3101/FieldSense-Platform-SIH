from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate, UserOut
from auth import hash_password, create_verification_token
from email_utils import send_verification_email, send_welcome_email
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


@app.get("/verify/{token}", response_class=HTMLResponse)
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()
    if not user:
        return HTMLResponse(
            content="<h2 style='color:red; text-align:center; margin-top:20%;'>Invalid or expired verification link.</h2>",
            status_code=400
        )

    user.is_verified = True
    user.verification_token = None
    db.commit()

    # 🎉 Send welcome email
    send_welcome_email(user.email, user.name)

    # HTML response for better UX
    html_content = """
    <html>
        <head>
            <title>Email Verified</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f8fb;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .card {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: center;
                }
                h1 { color: #28a745; }
                p { color: #555; }
                button {
                    margin-top: 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                }
                button:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>✅ Email Verified Successfully!</h1>
                <p>Welcome email has been sent to your inbox 🎉</p>
                <button onclick="window.close()">Close Window</button>
            </div>
        </body>
    </html>
    """

    return HTMLResponse(content=html_content)


@app.get("/")
def root():
    return {"message": "FieldSense backend is running!"}
