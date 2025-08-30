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
        // Store user & both tokens in AuthContext
        login(
          { email },
          { accessToken: data.accessToken, refreshToken: data.refreshToken }
        );
        router.replace("/home");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
  className="fixed inset-0 flex justify-center items-center bg-black/0 backdrop-blur-sm z-50 p-4 sm:p-6"
  style={{
    backgroundImage: "url('/bg2.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover", // use longhand, not shorthand
  }}
>
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="relative bg-[#F5F5DC]/10 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-2xl border border-black/20 w-full max-w-md shadow-lg"
  >
    {/* Close Button */}
    <button
      onClick={() => router.push("/")}
      className="absolute top-4 right-4 text-gray-400 hover:text-[#A7D16C] text-2xl"
      aria-label="Close sign-in popup"
    >
      &times;
    </button>

    {/* Heading */}
    <h3 className="text-2xl sm:text-3xl font-bold text-center text-[#F5F5DC] mb-6">
      Log in
    </h3>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email address"
        className="bg-[#F5F5DC]/15 border border-black/50 hover:border-[#A7D16C] rounded-xl px-4 py-3 text-[#F5F5DC] placeholder-gray-400 focus:outline-none focus:border-[#A7D16C] transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="bg-[#F5F5DC]/15 border border-black/50 hover:border-[#A7D16C] rounded-xl px-4 py-3 w-full text-[#F5F5DC] placeholder-gray-400 focus:outline-none focus:border-[#A7D16C] transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <button
        type="submit"
        disabled={loading}
        className={`bg-[#A7D16C] text-[#F5F5DC] rounded-full py-3 mt-3 hover:shadow-lg hover:bg-[#A7D16C] transition font-semibold ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Error */}
    {error && (
      <p className="text-red-400 text-center mt-3 text-sm">{error}</p>
    )}

    <p className="text-center text-gray-300 text-sm mt-4">
      Don&apos;t have an account?{" "}
      <Link
        href="/create-account"
        className="text-[#A7D16C] hover:underline"
      >
        Sign up
      </Link>
    </p>
  </motion.div>
</div>
  );
}
    