import { useState } from "react";
import api from "./services/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  const sendOtp = async () => {
    try {
      await api.post("/auth/password/forgot", { email });
      setMessage("OTP sent successfully to your email");
      setType("success");
      setStep(2);
    } catch {
      setMessage("Failed to send OTP");
      setType("error");
    }
  };

  const verifyOtp = async () => {
    try {
      await api.post("/auth/password/verify-otp", { email, otp });
      setMessage("OTP verified successfully");
      setType("success");
      setStep(3);
    } catch {
      setMessage("Invalid OTP");
      setType("error");
    }
  };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setType("error");
      return;
    }

    try {
      await api.post("/auth/password/reset", {
        email,
        new_password: password,
      });

      setMessage("Password updated successfully. Redirecting to login...");
      setType("success");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      setMessage("Failed to reset password");
      setType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg w-[350px] shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

        {message && (
          <div
            className={`mb-3 text-sm p-2 rounded ${
              type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {step === 1 && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              className="w-full border p-2 mb-3 rounded"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-2 mb-3 rounded"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={resetPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
