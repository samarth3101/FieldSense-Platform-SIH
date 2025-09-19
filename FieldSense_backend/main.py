from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate, UserOut
from auth import hash_password, create_verification_token
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

    # Send welcome email (non-blocking for UX)
    try:
        send_welcome_email(user.email, user.name)
    except Exception as e:
        print(f"Welcome email send error: {e}")

    # Polished verification page with redirect + auto-close
    html_content = """
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>FieldSense • Email Verified</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Cache-Control" content="no-store" />
        <style>
          :root {
            --bg1: #0f1420;
            --bg2: #151b2b;
            --card: #0b0f19;
            --accent: #28a745;
            --muted: #9aa4b2;
            --text: #e6eef8;
            --border: rgba(255,255,255,0.08);
            --glow: 0 10px 30px rgba(40, 167, 69, 0.25);
          }
          * { box-sizing: border-box; }
          html, body {
            height: 100%;
            margin: 0;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
            color: var(--text);
            background: radial-gradient(1000px 600px at 20% -10%, #1b2438 0%, transparent 60%),
                        radial-gradient(900px 500px at 100% 10%, #172032 0%, transparent 60%),
                        linear-gradient(180deg, var(--bg1), var(--bg2));
          }
          .wrap {
            height: 100%;
            display: grid;
            place-items: center;
            padding: 24px;
          }
          .card {
            width: 100%;
            max-width: 560px;
            background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 28px;
            backdrop-filter: blur(8px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.28);
          }
          .head {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 12px;
          }
          .tick {
            width: 42px;
            height: 42px;
            border-radius: 10px;
            display: grid;
            place-items: center;
            background: rgba(40, 167, 69, 0.12);
            color: var(--accent);
            border: 1px solid rgba(40, 167, 69, 0.32);
            box-shadow: var(--glow);
            font-weight: 700;
          }
          h1 {
            margin: 0;
            font-size: 22px;
            letter-spacing: 0.2px;
          }
          p {
            margin: 8px 0 0;
            color: var(--muted);
            line-height: 1.5;
          }
          .hr {
            height: 1px;
            background: var(--border);
            margin: 18px 0;
          }
          .row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 12px;
          }
          .btn {
            appearance: none;
            border: 1px solid var(--border);
            background: linear-gradient(180deg, #0f1524, #0d1220);
            color: var(--text);
            padding: 10px 14px;
            border-radius: 10px;
            cursor: pointer;
            transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
          }
          .btn:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.16); }
          .btn.primary {
            background: linear-gradient(180deg, #1f9d49, #158a3d);
            border-color: rgba(40, 167, 69, 0.5);
            box-shadow: var(--glow);
          }
          .note {
            margin-top: 10px;
            font-size: 13px;
            color: var(--muted);
          }
          .footer {
            margin-top: 10px;
            font-size: 12px;
            color: var(--muted);
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <div class="head">
              <div class="tick">✓</div>
              <div>
                <h1>Email verified</h1>
                <p>The account is now active — welcome to FieldSense.</p>
              </div>
            </div>

            <div class="hr"></div>

            <p>Head back to the app to sign in and explore the dashboard.</p>
            <div class="row">
              <button class="btn primary" onclick="goToApp()">Open FieldSense</button>
              <button class="btn" onclick="window.close()">Close now</button>
            </div>
            <p class="note">This tab will auto‑close in a few seconds.</p>
            <p class="footer">If it doesn’t close automatically, it’s safe to close it manually.</p>
          </div>
        </div>

        <script>
          function goToApp(){
            window.location.href = "http://localhost:3000/verified?status=success";
          }
          // Auto-close after 4s; some browsers only allow this if script opened the tab.
          setTimeout(() => {
            try { window.close(); } catch(e) {}
          }, 4000);
        </script>
      </body>
    </html>
    """

    return HTMLResponse(content=html_content)

@app.get("/")
def root():
    return {"message": "FieldSense backend is running!"}
#perfecrt working