import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from config import SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD

def send_verification_email(to_email, token):
    subject = "Verify your FieldSense account"
    body = f"Hi! Please verify your account by clicking the link: http://localhost:8000/verify/{token}"

    msg = MIMEMultipart()
    msg["From"] = SMTP_USERNAME
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, to_email, msg.as_string())

def send_welcome_email(to_email, name):
    subject = "🎉 Welcome to FieldSense!"
    body = f"""
    Hi {name},

    🌱 Welcome to the FieldSense world!
    Our team warmly welcomes you.

    ✅ Here's your welcome guide attached as a PDF.
    📘 Please go through it to understand more about us.

    We're here to help you always. 💚

    Best regards,
    Team FieldSense
    """
    msg = MIMEMultipart()
    msg["From"] = SMTP_USERNAME
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

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
        server.sendmail(SMTP_USERNAME, to_email, msg.as_string())
