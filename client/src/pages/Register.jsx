import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter email first");
      setType("error");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register/send-otp", { email });
      setOtpSent(true);
      setMessage("OTP sent to your email");
      setType("success");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Failed to send OTP");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      setType("error");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register/verify-otp", { email, otp });
      setOtpVerified(true);
      setMessage("OTP verified successfully");
      setType("success");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Invalid OTP");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setMessage("Please verify OTP first");
      setType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setType("error");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        mobile,
        password,
      });

      setMessage("Registration successful");
      setType("success");

      setTimeout(() => {
        navigate("/LandingPage");
      }, 1200);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed");
      setType("error");
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-600">
       {/* LEFT ILLUSTRATION */}
      <div className="hidden md:flex w-2/5 bg-blue-50 items-center justify-center">
        <img
          src="/images/Register.png"
          alt="Register Illustration"
          className="max-w-md"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow-lg w-[450px] p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Create Account
          </h2>

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

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="flex gap-2 mb-3">
            <input
              className="w-full border p-2 rounded"
              placeholder="Email"
              value={email}
              disabled={otpSent}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={sendOtp}
              disabled={loading || otpSent}
              className="bg-blue-500 text-white px-4 rounded"
            >
              {otpSent ? "Sent" : "Verify"}
            </button>
          </div>

          {otpSent && (
            <div className="flex gap-2 mb-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={otpVerified}
                className="bg-green-500 text-white px-4 rounded"
              >
                {otpVerified ? "Verified" : "Verify"}
              </button>
            </div>
          )}

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Mobile"
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-2 mb-3 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-2 mb-4 rounded"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={!otpVerified}
            className={`w-full py-2 rounded text-white ${
              otpVerified ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
