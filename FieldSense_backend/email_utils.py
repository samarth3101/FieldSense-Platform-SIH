import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from datetime import datetime
from config import SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD

def _send_email(to_email: str, subject: str, html_body: str, text_body: str):
    # multipart/alternative => better deliverability (text + html)
    msg = MIMEMultipart("alternative")
    msg["From"] = SMTP_USERNAME
    msg["To"] = to_email
    msg["Subject"] = subject

    # Attach plain text first, then HTML
    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)

def send_verification_email(to_email: str, token: str):
    verify_url = f"http://localhost:8000/verify/{token}"
    subject = "🌱 Verify your FieldSense account"

    text_body = f"""Welcome to FieldSense!

Confirm the email to activate the account:
{verify_url}

If this wasn’t requested, ignore this message.
"""

    html_body = f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Verify your FieldSense account</title></head>
<body style="margin:0;padding:0;background:linear-gradient(135deg,#1a3d2e 0%,#4a7c59 100%);font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:640px;margin:20px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(26,61,46,.26)">
    <div style="background:linear-gradient(135deg,#4a7c59,#7fb069,#a7d18c);padding:48px 34px;text-align:center;color:#fff">
      <div style="font-size:58px;margin-bottom:10px">🌾</div>
      <h1 style="margin:0;font-size:28px;font-weight:850;text-shadow:0 2px 4px rgba(0,0,0,.18)">Welcome to FieldSense</h1>
      <p style="margin:10px 0 0;opacity:.95;font-size:16px">Unlock smarter farming in minutes</p>
    </div>

    <div style="padding:34px 28px">
      <div style="background:linear-gradient(135deg,rgba(167,209,140,.18),rgba(127,176,105,.18));border:1px solid rgba(167,209,140,.35);border-radius:12px;padding:18px;margin:0 0 22px">
        <p style="margin:0;color:#1a3d2e;line-height:1.6">
          Tap the button to confirm this email and activate the account.
        </p>
      </div>

      <div style="text-align:center;margin:26px 0">
        <a href="{verify_url}" style="background:linear-gradient(135deg,#7fb069,#4a7c59);color:#fff;padding:14px 28px;text-decoration:none;border-radius:12px;font-weight:800;display:inline-block;box-shadow:0 8px 20px rgba(127,176,105,.35)">
          ✅ Verify my email
        </a>
      </div>

      <p style="color:#587868;font-size:13px;line-height:1.6;margin:18px 0 0">
        Having trouble? Paste this link into a browser:<br>
        <a href="{verify_url}" style="color:#4a7c59">{verify_url}</a>
      </p>

      <p style="color:#7b8d82;font-size:12px;margin:14px 0 0">
        The link may expire after 24 hours. If this wasn’t requested, ignore this email.
      </p>
    </div>

    <div style="background:linear-gradient(135deg,#f8fffe,#f0f8f0);padding:18px 28px;text-align:center;border-top:1px solid #e0e8e0">
      <p style="margin:0;color:#5f7367;font-size:12px">© {datetime.now().year} FieldSense • Cultivating the future of farming</p>
    </div>
  </div>
</body>
</html>
"""
    _send_email(to_email, subject, html_body, text_body)

def send_welcome_email(to_email: str, name: str):
    subject = "🎉 Welcome to FieldSense — let’s grow smarter"
    cta_url = "http://localhost:3000/"

    text_body = f"""Welcome aboard, {name}!

Your account is live. Next steps:
- Open the dashboard: {cta_url}
- Create your first field and enable alerts
- Try demo data for instant insights

Reply to this email if any help is needed — the team reads every message.

— Team FieldSense
"""

    html_body = f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome to FieldSense</title></head>
<body style="margin:0;padding:0;background:linear-gradient(135deg,#1a3d2e 0%,#4a7c59 100%);font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:680px;margin:20px auto;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 24px 48px rgba(26,61,46,.3)">
    <!-- Hero -->
    <div style="background:linear-gradient(135deg,#4a7c59,#7fb069,#a7d18c);padding:56px 34px;text-align:center;color:#fff;position:relative">
      <div style="font-size:62px;margin-bottom:12px">🎉</div>
      <h1 style="margin:0;font-size:30px;font-weight:900;text-shadow:0 2px 4px rgba(0,0,0,.22)">
        Welcome to FieldSense, {name}!
      </h1>
      <p style="margin:12px 0 0;opacity:.96;font-size:17px">Powerful insights, calm design, real impact</p>
      <div style="position:absolute;left:24px;top:18px;font-size:22px;opacity:.25">🌱</div>
      <div style="position:absolute;right:28px;top:22px;font-size:24px;opacity:.25">🚜</div>
    </div>

    <!-- Highlights -->
    <div style="padding:36px 30px">
      <div style="background:linear-gradient(135deg,rgba(167,209,140,.15),rgba(127,176,105,.15));border:1px solid rgba(167,209,140,.35);border-radius:14px;padding:18px;margin:0 0 22px;text-align:center">
        <div style="font-size:32px;margin-bottom:6px">✅</div>
        <h2 style="margin:0 0 6px;color:#1a3d2e;font-size:20px">Account activated</h2>
        <p style="margin:0;color:#2d5a4a;font-size:14px">Start exploring weather‑aware insights and collaborative tools.</p>
      </div>

      <h3 style="color:#1a3d2e;font-size:18px;margin:14px 0 10px">What to do next</h3>
      <ul style="margin:0 0 20px;padding-left:18px;color:#2d5a4a;line-height:1.8">
        <li>Create a field: crop, location, thresholds</li>
        <li>Enable alerts for timely, actionable nudges</li>
        <li>Invite a teammate with role‑based access</li>
      </ul>

      <div style="text-align:center;margin:28px 0">
        <a href="{cta_url}" style="background:linear-gradient(135deg,#7fb069,#4a7c59);color:#fff;padding:16px 34px;text-decoration:none;border-radius:16px;font-weight:900;display:inline-block;box-shadow:0 10px 24px rgba(127,176,105,.38)">
          🌾 Open dashboard
        </a>
      </div>

      <p style="color:#6c7d71;font-size:13px;line-height:1.6;margin:6px 0 0;text-align:center">
        Need a hand? Reply to this email — real humans respond.
      </p>
    </div>

    <!-- Optional guide attach note lives in logs; we only attach if present -->
    <div style="background:linear-gradient(135deg,#f8fffe,#f0f8f0);padding:22px;text-align:center;border-top:1px solid #e0e8e0">
      <p style="margin:0;color:#5f7367;font-size:12px">© {datetime.now().year} FieldSense • Cultivating the future of farming</p>
    </div>
  </div>
</body>
</html>
"""
    # Build base message (alternative)
    msg = MIMEMultipart("alternative")
    msg["From"] = SMTP_USERNAME
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    # Optional PDF attach — graceful if absent
    try:
        with open("welcome_guide.pdf", "rb") as f:
            pdf = MIMEApplication(f.read(), _subtype="pdf")
            pdf.add_header("Content-Disposition", "attachment", filename="Welcome_Guide.pdf")
            msg.attach(pdf)
    except FileNotFoundError:
        print("⚠️ No PDF found, skipping attachment.")

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)
