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
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-black/30 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-2xl border border-white/20 w-full max-w-md shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#8FE649] text-2xl"
          aria-label="Close sign-in popup"
        >
          &times;
        </button>

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Sign in
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email or mobile phone number"
            className="bg-black/20 border border-white rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="bg-black/20 border border-white rounded px-4 py-3 w-full text-white placeholder-gray-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8FE649] text-black rounded-full py-3 mt-3 hover:bg-white hover:text-[#8FE649] font-medium transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-red-400 text-center mt-3">{error}</p>}

        {/* Extra Links */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          By continuing, you agree to our{" "}
          <span className="text-[#8FE649] cursor-pointer">Terms of Use</span> &{" "}
          <span className="text-[#8FE649] cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="flex justify-between text-xs text-gray-400 mt-4">
          <span className="cursor-pointer hover:text-[#8FE649]">
            Forgot password?
          </span>
          <span className="cursor-pointer hover:text-[#8FE649]">
            Other sign-in issues
          </span>
        </div>

        <hr className="border-white my-6" />

        {/* Create Account */}
        <p className="text-center text-gray-400 text-sm mb-3">
          New to Trackfolio?
        </p>
        <Link href="/create-account">
          <button className="border border-white rounded-full py-3 w-full hover:border-[#8FE649] text-white hover:text-[#8FE649]">
            Create Account
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
