import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess("");

    try {
      const res = await api.post("/auth/login", { email, password });

      const { access_token, role } = res.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("role", role);

      // ✅ SAME PAGE MESSAGE
      setSuccess("Login successful");

      localStorage.setItem("notify_refresh", Date.now());

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 800);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data?.detail || "Invalid credentials");
      } else {
        setErrorMsg("Server not responding");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-600">
      
      {/* 🖼️ LEFT IMAGE (ADDED) */}
      <div className="hidden md:flex w-2/5 bg-blue-50 items-center justify-center">
        <img
          src="/images/Login.png"
          alt="Login"
          className="max-w-md"
        />
      </div>

      {/* FORM */}
      <div className="w-full md:w-3/5 flex items-center justify-center">
        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow-lg w-[400px] p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* ✅ SUCCESS MESSAGE */}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm text-center">
              {success}
            </div>
          )}

          {/* ❌ ERROR MESSAGE */}
          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm text-center">
              {errorMsg}
            </div>
          )}

          <input
            className="w-full border rounded px-4 py-2 mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full border rounded px-4 py-2 mb-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 🔗 FORGOT PASSWORD (ADDED) */}
          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-sm text-blue-600">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Continue
          </button>

          <p className="text-center text-sm mt-4">
            New user?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
