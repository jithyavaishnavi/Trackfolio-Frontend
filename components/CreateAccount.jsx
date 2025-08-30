"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext"; // central auth context

// Helper to check login
const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
};

export default function CreateAccount() {
  const router = useRouter();
  const { login } = useAuth();

  // Redirect if already logged in
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

      // store in AuthContext
      login(
        { email },
        { accessToken: data.accessToken, refreshToken: data.refreshToken }
      );

      router.replace("/home");
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Network error: Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center"
  style={{
    backgroundImage: "url('/bg2.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover", // use longhand, not shorthand
  }}
>
  <div className="fixed inset-0 flex justify-center items-center bg-black/5 z-50 p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#F5F5DC]/6 backdrop-blur-md border border-black/20 rounded-2xl p-8 sm:p-12 shadow-xl w-full max-w-md"
    >
      {/* Close Button */}
      <button
        onClick={() => router.replace("/")}
        className="absolute top-4 right-4 text-gray-400 hover:text-[#A7D16C] text-2xl"
      >
        &times;
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5DC] text-center mb-6">
        Create Account
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-[#F5F5DC]/15 border border-black/50 hover:border-[#A7D16C] rounded-xl px-4 py-3 text-[#F5F5DC] placeholder-gray-400 focus:border-[#A7D16C] focus:outline-none transition"
          disabled={loading}
          required
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#F5F5DC]/15 border border-black/50 hover:border-[#A7D16C] rounded-xl px-4 py-3 text-[#F5F5DC] placeholder-gray-400 focus:border-[#A7D16C] focus:outline-none transition"
          disabled={loading}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#F5F5DC]/15 border border-black/50 hover:border-[#A7D16C] rounded-xl px-4 py-3 text-[#F5F5DC] placeholder-gray-400 focus:border-[#A7D16C] focus:outline-none w-full transition"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-gray-400 hover:text-[#A7D16C]"
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
            className="bg-[#F5F5DC]/15 border border-black/50 hover:border-[#A7D16C] rounded-xl px-4 py-3 text-[#F5F5DC] placeholder-gray-400 focus:border-[#A7D16C] focus:outline-none w-full transition"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-3 text-gray-400 hover:text-[#A7D16C]"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#A7D16C] text-[#F5F5DC] rounded-full py-3 mt-4 hover:shadow-lg hover:bg-[#A7D16C] transition font-semibold ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-center mt-2 text-sm">{error}</p>
      )}

      <p className="text-center text-gray-300 text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-[#A7D16C] hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  </div>
</div>
  );
}