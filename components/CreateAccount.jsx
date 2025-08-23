"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext"; // Added for consistent login handling

// Helper to check if user is already logged in
const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
};

export default function CreateAccount() {
  const router = useRouter();
  const { login } = useAuth(); // Use AuthContext to store user & tokens

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/home");
    }
  }, [router]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // Use AuthContext login to store user and tokens consistently
      login({ email }, { accessToken: data.accessToken, refreshToken: data.refreshToken });

      router.replace("/home");
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Network error: Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-md min-h-screen flex flex-col sm:flex-row items-center justify-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow min-h-[60vh] sm:min-h-screen gap-8 sm:gap-12 relative z-10 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-center"
        >
          <p className="text-base sm:text-lg text-gray-400 mb-3">
            Stop juggling spreadsheets and emails during
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
            Best <span className="text-[#8FE649]">placement</span>
            <br />
            organizing platform <br /> for your future.
          </h2>

          <p className="text-sm sm:text-lg text-gray-400 mt-3 leading-relaxed">
            Stop juggling spreadsheets and emails during
          </p>
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="sm:w-1/2 flex justify-center items-center p-6 sm:p-12"
      >
        <div className="w-full max-w-md sm:max-w-lg bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Create Account
          </h2>

          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-transparent border border-white/50 hover:border-[#8FE649] rounded-xl px-4 sm:px-5 py-3 text-white placeholder-gray-400 focus:border-[#8FE649] focus:outline-none transition"
              required
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white/50 hover:border-[#8FE649] rounded-xl px-4 sm:px-5 py-3 text-white placeholder-gray-400 focus:border-[#8FE649] focus:outline-none transition"
              required
              disabled={loading}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border border-white/50 hover:border-[#8FE649] rounded-xl px-4 sm:px-5 py-3 text-white placeholder-gray-400 focus:border-[#8FE649] focus:outline-none w-full transition"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-[#8FE649] font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent border border-white/50 hover:border-[#8FE649] rounded-xl px-4 sm:px-5 py-3 text-white placeholder-gray-400 focus:border-[#8FE649] focus:outline-none w-full transition"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-[#8FE649] font-medium"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#8FE649] text-white rounded-full py-3 mt-4 hover:shadow-lg hover:bg-[#8FE649] transition font-semibold ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {error && (
            <p className="text-red-400 text-center mt-2 text-sm font-semibold">{error}</p>
          )}

          <p className="text-xs sm:text-sm text-gray-400 mt-6 text-center">
            By continuing, you agree to the{" "}
            <span className="text-green-400 cursor-pointer hover:underline">Terms of Use</span> and{" "}
            <span className="text-green-400 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <p className="text-center text-gray-300 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-green-400 cursor-pointer hover:underline">Login</span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}