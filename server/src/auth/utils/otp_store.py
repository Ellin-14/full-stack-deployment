import time

otp_store = {}  # { email: {otp, expiry} }

def save_otp(email, otp):
    otp_store[email] = {
        "otp": otp,
        "expiry": time.time() + 300  # 5 mins
    }

def verify_otp(email, otp):
    data = otp_store.get(email)
    if not data:
        return False
    if time.time() > data["expiry"]:
        return False
    return data["otp"] == otp
