from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate, UserOut
from auth import hash_password, create_verification_token, verify_password
from email_utils import send_verification_email, send_welcome_email
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="FieldSense API")

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

Base.metadata.create_all(bind=engine)

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
# Register (multi-role)
# --------------------
@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    requested = (user.requested_role or "farmer").lower()
    if requested not in ("farmer", "researcher"):
        raise HTTPException(status_code=400, detail="Invalid role")

    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        current_roles = [r.strip() for r in (existing.roles or "").split(",") if r.strip()]
        if requested in current_roles:
            return existing

        # Append the new role and send a fresh role-themed verification link
        current_roles.append(requested)
        existing.roles = ",".join(sorted(set(current_roles)))
        token = create_verification_token()
        existing.verification_token = token
        db.commit()
        try:
            # include the role hint in the verify URL (handled inside email_utils)
            send_verification_email(
                to_email=existing.email,
                token=token,
                role=requested,
                name=existing.name,
            )
        except Exception as e:
            print(f"Email send error (append role): {e}")
        return existing

    # New user path
    hashed_pw = hash_password(user.password)
    token = create_verification_token()
    db_user = User(
        name=user.name,
        email=user.email,
        mobile=user.mobile,
        hashed_password=hashed_pw,
        verification_token=token,
        roles=requested,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    try:
        send_verification_email(to_email=user.email, token=token, role=requested, name=user.name)
    except Exception as e:
        print(f"Email send error: {e}")

    return db_user

# --------------------
# Login (returns roles CSV)
# --------------------
class LoginInput(BaseModel):
    email: EmailStr
    password: str

@app.post("/login")
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified")
    return {"message": "login successful", "name": user.name, "email": user.email, "roles": user.roles}

# --------------------
# Resend verification
# --------------------
class ResendInput(BaseModel):
    email: EmailStr

@app.post("/resend-verification")
def resend_verification(payload: ResendInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    if user.is_verified:
        raise HTTPException(status_code=400, detail="Already verified")
    token = create_verification_token()
    user.verification_token = token
    db.commit()
    first_role = (user.roles or "farmer").split(",")[0].strip() or "farmer"
    try:
        send_verification_email(to_email=user.email, token=token, role=first_role, name=user.name)
    except Exception as e:
        print(f"Resend email error: {e}")
    return {"message": "Verification email resent"}

# --------------------
# Verify (role hint via ?r=)
# --------------------
@app.get("/verify/{token}", response_class=HTMLResponse)
def verify_email(token: str, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()
    if not user:
        return HTMLResponse(
            content="<h2 style='color:red;text-align:center;margin-top:20%'>Invalid or expired verification link.</h2>",
            status_code=400
        )

    user.is_verified = True
    user.verification_token = None
    db.commit()

    roles_list = [r.strip() for r in (user.roles or "").split(",") if r.strip()]
    hint = (request.query_params.get("r") or "").lower()
    effective_role = hint if hint in roles_list else (roles_list[0] if roles_list else "farmer")

    try:
        send_welcome_email(to_email=user.email, name=user.name, role=effective_role)
    except Exception as e:
        print(f"Welcome email send error: {e}")

    if effective_role == "researcher":
        target = "http://localhost:3000/dashboard/researchdash"
        role_label = "Researcher"; emoji = "🔬"
    else:
        target = "http://localhost:3000/dashboard/farmerdash"
        role_label = "Farmer"; emoji = "🌾"

    html_content = f"""<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'/>
      <title>FieldSense • Email Verified</title><meta name='viewport' content='width=device-width, initial-scale=1'/>
      <style>body{{margin:0;font-family:ui-sans-serif;background:linear-gradient(135deg,#f8fffe 0%,#eef8f1 35%,#e7f4eb 100%);color:#1a3d2e}}
      .wrap{{min-height:100vh;display:grid;place-items:center;padding:24px}}
      .card{{max-width:640px;width:100%;background:#fff;border:1px solid #d7e9dd;border-radius:16px;padding:28px;box-shadow:0 12px 36px rgba(26,61,46,.12)}}
      .badge{{width:44px;height:44px;border:1px solid #d4ecdb;border-radius:12px;display:grid;place-items:center;background:linear-gradient(180deg,#ecf8f0,#e3f3e9);color:#4a7c59;font-weight:800;margin-right:12px;display:inline-grid}}
      .row{{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px}}</style></head>
      <body><div class='wrap'><div class='card'>
        <div><span class='badge'>✓</span><strong>Welcome, {role_label} {emoji}</strong></div>
        <p style='margin-top:10px;color:#2d5a4a'>The account is active. Continue to the {role_label} dashboard.</p>
        <div class='row'>
          <button onclick="window.location.href='{target}'" style="padding:10px 14px;border-radius:10px;color:#fff;background:linear-gradient(135deg,#7fb069,#4a7c59);border:1px solid #1a8a5a;cursor:pointer">Open {role_label} Dashboard</button>
          <button onclick="window.close()" style="padding:10px 14px;border-radius:10px;border:1px solid #d7e9dd;background:#fff;cursor:pointer">Close Window</button>
        </div>
      </div></div></body></html>"""
    return HTMLResponse(content=html_content)

@app.get("/")
def root():
    return {"message": "FieldSense backend is running!"}
