import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from datetime import datetime
from config import SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD

def _send_email(to_email: str, subject: str, html_body: str, text_body: str, attachments: list | None = None):
    alt = MIMEMultipart("alternative")
    alt["From"] = SMTP_USERNAME
    alt["To"] = to_email
    alt["Subject"] = subject
    alt.attach(MIMEText(text_body, "plain"))
    alt.attach(MIMEText(html_body, "html"))

    msg = alt
    if attachments:
        mixed = MIMEMultipart("mixed")
        for h in ("From", "To", "Subject"):
            mixed[h] = alt[h]
        mixed.attach(alt)
        for path, filename in attachments:
            try:
                with open(path, "rb") as f:
                    pdf = MIMEApplication(f.read(), _subtype="pdf")
                    pdf.add_header("Content-Disposition", "attachment", filename=filename)
                    mixed.attach(pdf)
            except FileNotFoundError:
                print("⚠️ No attachment found, skipping:", path)
        msg = mixed

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)

def send_verification_email(to_email: str, token: str, role: str, name: str):
    # Include role hint so /verify can theme and route correctly
    verify_url = f"http://localhost:8000/verify/{token}?r={role}"
    if role == "researcher":
        subject = "🔬 Verify your FieldSense researcher account"
        headline = "Welcome, Researcher"
        sub = "Accelerate insights with clean datasets and calm UI"
        highlight = "Confirm this email to activate the researcher workspace."
        cta = "Verify my researcher email"
        emoji = "🔬"
    else:
        subject = "🌾 Verify your FieldSense farmer account"
        headline = "Welcome, Farmer"
        sub = "Grow with timely alerts and weather‑aware insights"
        highlight = "Confirm this email to activate the farmer dashboard."
        cta = "Verify my farmer email"
        emoji = "🌾"

    text_body = f"""Hi {name},

{headline} — {sub}

Confirm the email to activate the account:
{verify_url}

If this wasn’t requested, ignore this message.
"""

    html_body = f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Verify your FieldSense account</title></head>
<body style="margin:0;padding:24px;background:#0f2a21;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#101f1a;border:1px solid rgba(255,255,255,.06);border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,.28)">
    <div style="background:linear-gradient(135deg,#4a7c59,#7fb069,#a7d18c);padding:42px 28px;text-align:center;color:#fff">
      <div style="font-size:48px;margin-bottom:6px">{emoji}</div>
      <h1 style="margin:0;font-size:26px;font-weight:850">{headline}</h1>
      <p style="margin:8px 0 0;opacity:.95">{sub}</p>
    </div>
    <div style="padding:28px">
      <div style="background:linear-gradient(180deg, rgba(167,209,140,.18), rgba(127,176,105,.18));border:1px solid rgba(167,209,140,.35);border-radius:12px;padding:14px 16px;color:#cfe6d9">
        {highlight}
      </div>
      <div style="text-align:center;margin:22px 0">
        <a href="{verify_url}" style="display:inline-block;background:linear-gradient(135deg,#7fb069,#4a7c59);color:#fff;text-decoration:none;padding:14px 26px;border-radius:12px;font-weight:800;box-shadow:0 8px 20px rgba(127,176,105,.35)">{cta}</a>
      </div>
      <p style="color:#aac8bb;font-size:13px;line-height:1.6">If the button doesn’t work, paste this link:<br>
        <a href="{verify_url}" style="color:#8fd1a7">{verify_url}</a>
      </p>
      <p style="color:#8aa79a;font-size:12px;margin-top:12px">The link may expire after 24 hours. If this wasn’t requested, ignore this email.</p>
    </div>
    <div style="background:linear-gradient(180deg,#0f2a21,#0b1f18);padding:16px 20px;text-align:center;border-top:1px solid rgba(255,255,255,.06)">
      <div style="color:#98b2a6;font-size:12px">© {datetime.now().year} FieldSense • Cultivating the future of farming</div>
    </div>
  </div>
</body>
</html>
"""
    _send_email(to_email, subject, html_body, text_body)

def send_welcome_email(to_email: str, name: str, role: str):
    if role == "researcher":
        subject = "🔬 Welcome to FieldSense Research — accelerate insights"
        cta_url = "http://localhost:3000/dashboard/researchdash"
        intro = "Your researcher workspace is ready."
        points = [
            "Create a project and import sample datasets",
            "Annotate findings and share with collaborators",
            "Track trends with clean charts and exports",
        ]
        emoji = "🔬"
        cta_text = "Open researcher dashboard"
    else:
        subject = "🌾 Welcome to FieldSense — grow smarter"
        cta_url = "http://localhost:3000/dashboard/farmerdash"
        intro = "The farmer dashboard is live and ready."
        points = [
            "Add your first field and set thresholds",
            "Enable alerts for timely nudges",
            "Start with demo data to preview insights",
        ]
        emoji = "🌾"
        cta_text = "Open farmer dashboard"

    text_body = f"""Hi {name},

{intro}

Next:
- {points[0]}
- {points[1]}
- {points[2]}

Open dashboard: {cta_url}

Reply if any help is needed — the team reads every message.
"""

    bullets_html = "".join([f"<li>{p}</li>" for p in points])

    html_body = f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome to FieldSense</title></head>
<body style="margin:0;padding:24px;background:#0f2a21;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:680px;margin:0 auto;background:#101f1a;border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;box-shadow:0 24px 48px rgba(0,0,0,.3)">
    <div style="background:linear-gradient(135deg,#4a7c59,#7fb069,#a7d18c);padding:52px 30px;text-align:center;color:#fff">
      <div style="font-size:56px;margin-bottom:10px">{emoji}</div>
      <h1 style="margin:0;font-size:28px;font-weight:900">Welcome to FieldSense, {name}!</h1>
      <p style="margin:10px 0 0;opacity:.96">{intro}</p>
    </div>
    <div style="padding:32px 26px">
      <h3 style="color:#cfe6d9;font-size:16px;margin:0 0 10px">What to do next</h3>
      <ul style="margin:0 0 18px 18px;color:#aac8bb;line-height:1.8">{bullets_html}</ul>
      <div style="text-align:center;margin:24px 0">
        <a href="{cta_url}" style="display:inline-block;background:linear-gradient(135deg,#7fb069,#4a7c59);color:#fff;text-decoration:none;padding:15px 32px;border-radius:14px;font-weight:900;box-shadow:0 10px 24px rgba(127,176,105,.38)">{cta_text}</a>
      </div>
      <p style="color:#8aa79a;font-size:12px;text-align:center">Need a hand? Reply to this email — real humans respond.</p>
    </div>
    <div style="background:linear-gradient(180deg,#0f2a21,#0b1f18);padding:18px 20px;text-align:center;border-top:1px solid rgba(255,255,255,.06)">
      <div style="color:#98b2a6;font-size:12px">© {datetime.now().year} FieldSense • Cultivating the future of farming</div>
    </div>
  </div>
</body>
</html>
"""
    attachments = [("welcome_guide.pdf", "Welcome_Guide.pdf")]
    _send_email(to_email, subject, html_body, text_body, attachments=attachments)
