import React, { useState } from "react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const AdminLoginPage: React.FC = () => {
  const { login, loading } = useAdminAuth();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const success = await login(loginForm.username, loginForm.password);
      if (!success) {
        setLoginError("Invalid username or password");
      } else {
        navigate("/admin");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-blue-100"
        style={{ minWidth: 340 }}
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1">
            Admin Login
          </h2>
          <p className="text-gray-500 text-sm">Sign in to your dashboard</p>
        </div>
        {loginError && (
          <div className="mb-4 text-red-600 text-sm text-center rounded bg-red-50 py-2 px-3">
            {loginError}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Username
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
            autoFocus
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10 transition"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-lg shadow"
          disabled={isLoggingIn || loading}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
