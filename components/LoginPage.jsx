"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password cannot be empty.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        // Store user & both tokens
        login({ email }, { accessToken: data.accessToken, refreshToken: data.refreshToken });
        router.replace("/home");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="backdrop-blur-md min-h-screen flex flex-col sm:flex-row items-center justify-center px-4 sm:px-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow min-h-[60vh] sm:min-h-screen gap-6 sm:gap-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-base sm:text-lg text-gray-400 mb-2 sm:mb-3">
            Organize your placements with ease
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">
            Best <span className="text-[#8FE649]">placement</span> management platform for your career.
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 mt-3 leading-relaxed">
            Stop juggling spreadsheets and emails during your placement journey
          </p>
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="sm:w-1/2 flex justify-center items-center p-6 sm:p-12 w-full"
      >
        <div className="w-full max-w-md sm:max-w-lg bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Login</h2>

          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#8FE649] text-white rounded-full py-3 mt-4 hover:shadow-lg transition font-semibold ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <p className="text-red-400 text-center mt-2 text-sm font-semibold">{error}</p>}

          <p className="text-xs sm:text-sm text-gray-400 mt-6 text-center">
            By continuing, you agree to the{" "}
            <span className="text-green-400 cursor-pointer hover:underline">Terms of Use</span> and{" "}
            <span className="text-green-400 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <p className="text-center text-gray-300 text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/create-account">
              <span className="text-green-400 cursor-pointer hover:underline">Sign up</span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
