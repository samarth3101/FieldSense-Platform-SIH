import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL_ADDRESS, EMAIL_PASSWORD

def send_verification_email(to_email: str, token: str):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = "Verify your FieldSense account"

    verification_link = f"http://localhost:8000/verify/{token}"
    body = f"Hi! Please verify your account by clicking the link: {verification_link}"
    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
