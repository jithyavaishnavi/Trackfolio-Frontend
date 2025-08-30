"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LaunchPage() {
  const [showPopup, setShowPopup] = useState(false);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // Auth guard: validate tokens on mount
  useEffect(() => {
    const validateAndRefreshToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        return; // No tokens, stay on launch page
      }

      try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
          // Refresh failed — clear tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user_email");
          return;
        }

        const data = await res.json();
        // Save new tokens
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Redirect to home
        router.push("/home");
      } catch (err) {
        console.error("Token refresh error:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_email");
      }
    };

    validateAndRefreshToken();
  }, [router, API_URL]);

  // Show popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError("Server error. Please try later.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user_email", email);

      setLoading(false);
      setShowPopup(false);
      router.push("/home");
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
  className="min-h-screen flex flex-col"
  style={{
    backgroundImage: "url('/bg2.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  }}
>
  <div className="min-h-screen flex flex-col text-[#F5F5DC]">
    {/* Navbar */}
    <header className="flex items-center justify-between px-8 py-4 mt-4">
      {/* Logo */}
      <Link
        href="/"
        className="text-[#F5F5DC] drop-shadow-[0_0_8px_#A7D16C] text-2xl font-bold tracking-wide"
      >
        TRACKFOLIO.
      </Link>

      {/* Navigation */}
      <nav className="flex items-center justify-center gap-6">
        <ul
          className="flex items-center justify-center gap-6 text-gray-300 text-sm sm:text-base
           bg-[#F5F5DC]/10 backdrop-blur-lg border border-black/20 rounded-full px-6 py-4 mx-auto"
        >
          <li className="hover:text-[#A7D16C] cursor-pointer transition-colors duration-300">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-[#A7D16C] cursor-pointer transition-colors duration-300">
            <Link href="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-[#A7D16C] cursor-pointer transition-colors duration-300">
            <Link href="/whatsnew">What's New?</Link>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-3 ml-4">
          <Link href="/login">
            <button className="h-10 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 bg-[#A7D16C] backdrop-blur-md bg-[#F5F5DC]/10 border border-black/20 text-[#F5F5DC] rounded-full font-semibold hover:bg-[#F5F5DC] hover:text-[#A7D16C] transition">
              Log In
            </button>
          </Link>
          <Link href="/create-account">
            <button className="h-10 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 bg-[#A7D16C] text-[#F5F5DC] rounded-full font-semibold hover:bg-[#F5F5DC] hover:text-[#A7D16C] transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
    </header>

    {/* Hero Section */}
    <div className="flex flex-col items-center justify-center flex-grow min-h-[70vh] sm:min-h-screen px-6 sm:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl text-center flex flex-col items-center gap-6"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-[#F5F5DC]">
          Best <span className="text-[#A7D16C]">placement</span>
          <br />
          organizing platform <br /> for your future.
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-300 leading-relaxed mt-1"
        >
          Stop juggling spreadsheets and emails during your placement prep.{" "}
          <br />
          Organize everything in one platform and focus on your career growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link href="/create-account">
            <button className="flex items-center justify-center mt-1 bg-[#A7D16C] font-semibold text-[#F5F5DC] rounded-full px-6 sm:px-8 py-3 hover:bg-[#F5F5DC] hover:text-[#A7D16C] transition text-sm sm:text-base">
              Get Started
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>

    {/* Popup Sign-in */}
    {showPopup && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative bg-[#F5F5DC]/10 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-4xl border border-black/20 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg"
        >
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#A7D16C] text-2xl"
            aria-label="Close sign-in popup"
          >
            &times;
          </button>

          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#F5F5DC]">
            Log in
          </h3>

          <form
            className="flex flex-col gap-4 sm:gap-5"
            onSubmit={handleLoginSubmit}
          >
            <input
              type="email"
              placeholder="Enter valid gmail id"
              className="bg-[#F5F5DC]/10 border border-black/20 rounded px-4 sm:px-5 py-3 focus:outline-none text-[#F5F5DC] placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Your password"
              className="bg-[#F5F5DC]/10 border border-black/20 rounded px-4 sm:px-5 py-3 focus:outline-none text-[#F5F5DC] placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#A7D16C] text-[#F5F5DC] rounded-full w-80 py-2 sm:py-3 mt-3 
         hover:bg-gray-300 text-base sm:text-lg font-medium disabled:opacity-60
         flex items-center justify-center mx-auto"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {error && (
            <p className="text-red-400 text-center mt-2 text-sm font-semibold">
              {error}
            </p>
          )}

          <hr className="border-[#F5F5DC] my-4 sm:my-6" />

          <p className="text-center text-gray-400 text-xs sm:text-sm">
            New to our community
          </p>
          <Link href="/create-account">
            <button className="bg-[#F5F5DC]/20 border border-[#F5F5DC] rounded-full py-2 sm:py-3 w-full mt-3 hover:border-[#A7D16C] text-base sm:text-lg text-[#F5F5DC]">
              Create Account
            </button>
          </Link>
        </motion.div>
      </div>
    )}
  </div>
  <footer className="bg-transparent text-gray-300 px-8 py-6 mt-6 text-[#F5F5DC]">
    <div className="max-w-6xl mx-auto flex items-center sm:flex-row justify-center items-center gap-4 sm:gap-0">
      <div className="text-sm sm:text-base">
        © {new Date().getFullYear()} TRACKFOLIO.
      </div>
    </div>
  </footer>
</div>
  );
}