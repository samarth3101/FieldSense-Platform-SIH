from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate, UserOut
from auth import hash_password, create_verification_token, verify_password
from email_utils import send_verification_email, send_welcome_email
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FieldSense API")

# CORS: explicit origins only when using credentials
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://hoppscotch.io",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health():
    return {"ok": True}

# --------------------
# Auth: Register
# --------------------
@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password and create token
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

    # Best-effort email (don't fail request if SMTP hiccups)
    try:
        send_verification_email(user.email, token)
    except Exception as e:
        print(f"Email send error: {e}")

    return db_user

# --------------------
# Auth: Login (simple)
# --------------------
from pydantic import BaseModel, EmailStr

class LoginInput(BaseModel):
    email: EmailStr
    password: str

@app.post("/login")
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified")
    return {"message": "login successful", "name": user.name, "email": user.email}

# --------------------
# Verify
# --------------------
@app.get("/verify/{token}", response_class=HTMLResponse)
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()
    if not user:
        return HTMLResponse(
            content="""
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <title>FieldSense • Verification Failed</title>
                <style>
                  body {
                    font-family: system-ui;
                    background: linear-gradient(135deg, #1a3d2e 0%, #2d5a4a 50%, #4a7c59 100%);
                    color: white; text-align: center; padding: 20%; margin: 0;
                  }
                  .icon { font-size: 48px; margin-bottom: 20px; }
                </style>
              </head>
              <body>
                <div class="icon">🌱</div>
                <h2>Invalid or expired verification link</h2>
                <p>Please request a new verification email or contact support.</p>
              </body>
            </html>
            """,
            status_code=400
        )

    user.is_verified = True
    user.verification_token = None
    db.commit()

    # Send welcome email (non-blocking for UX)
    try:
        send_welcome_email(user.email, user.name)
    except Exception as e:
        print(f"Welcome email send error: {e}")

    # Green, farm-themed verification page; no auto-close
    html_content = """
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>FieldSense • Email Verified</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Cache-Control" content="no-store" />
        <style>
          :root {
            --forest-dark: #1a3d2e;
            --forest-mid: #2d5a4a;
            --sage-green: #4a7c59;
            --mint-fresh: #7fb069;
            --leaf-bright: #a7d18c;
            --cream-white: #f8fffe;
            --border: #d7e9dd;
          }
          * { box-sizing: border-box; }
          html, body {
            height: 100%;
            margin: 0;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
            color: var(--forest-dark);
            background: linear-gradient(135deg, var(--cream-white) 0%, #eef8f1 35%, #e7f4eb 100%);
          }
          .wrap { min-height: 100%; display: grid; place-items: center; padding: 24px; }
          .card {
            width: 100%; max-width: 640px; background: #fff;
            border: 1px solid var(--border); border-radius: 16px; padding: 28px;
            box-shadow: 0 12px 36px rgba(26, 61, 46, 0.12);
          }
          .head { display: flex; gap: 14px; align-items: center; margin-bottom: 8px; }
          .badge {
            width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
            background: linear-gradient(180deg, #ecf8f0, #e3f3e9);
            color: var(--sage-green); border: 1px solid #d4ecdb; font-weight: 800;
          }
          h1 { margin: 0; font-size: 24px; letter-spacing: .2px; color: var(--forest-dark); }
          p { margin: 8px 0 0; color: var(--forest-mid); line-height: 1.55; }
          .hr { height: 1px; background: var(--border); margin: 18px 0; }
          .row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px; }
          .btn {
            appearance: none; border: 1px solid var(--border); background: #fff; color: var(--forest-dark);
            padding: 10px 14px; border-radius: 10px; cursor: pointer;
            transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
          }
          .btn:hover { transform: translateY(-1px); border-color: #cfe1d5; }
          .btn.primary {
            background: linear-gradient(135deg, var(--mint-fresh), var(--sage-green));
            color: #fff; border-color: #1a8a5a; box-shadow: 0 10px 24px rgba(34,160,107,.25);
          }
          .note { margin-top: 10px; font-size: 13px; color: var(--forest-mid); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <div class="head">
              <div class="badge">✓</div>
              <div>
                <h1>You're verified</h1>
                <p>The account is active — welcome to FieldSense.</p>
              </div>
            </div>

            <div class="hr"></div>

            <p>Choose an option below to continue.</p>
            <div class="row">
              <button class="btn primary" onclick="goToApp()">Go to Home</button>
              <button class="btn" onclick="window.close()">Close Window</button>
            </div>
            <p class="note">This tab will remain open until closed manually.</p>
          </div>
        </div>

        <script>
          function goToApp(){
            // If Hero is at a different route, update below, e.g., "/#hero" or "/landing"
            window.location.href = "http://localhost:3000/";
          }
        </script>
      </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/")
def root():
    return {"message": "FieldSense backend is running!"}
