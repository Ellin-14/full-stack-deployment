from src.auth.utils.email import send_otp_email

def send_email(to: str, subject: str, body: str):
    # reuse your existing email system
    send_otp_email(to, body)
