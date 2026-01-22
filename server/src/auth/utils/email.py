import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.database.config import EMAIL_USER, EMAIL_PASS

def send_otp_email(to_email, otp):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = "OTP Verification"

    msg.attach(MIMEText(f"Your OTP is {otp}. Valid for 5 minutes.", "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(EMAIL_USER, EMAIL_PASS)
    server.send_message(msg)
    server.quit()
