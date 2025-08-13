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

  // Auth guard: redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  // Show popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
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
      router.push("/home"); // Redirect to home after login

    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black/70 backdrop-blur-md min-h-screen flex flex-col text-white">
        {/* Navbar */}
        <header className="flex items-center justify-between px-8 py-4 mt-4">
          <Link href="/" className="text-[#ffffff] drop-shadow-[0_0_8px_#8FE649] text-2xl font-bold tracking-wide">
            TRACKFOLIO.
          </Link>

          <nav className="flex flex-wrap justify-between items-center gap-6">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-gray-300 text-sm sm:text-base mt-4 ">
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/contact">Contact Us</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/whats-new">What's New?</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/contact">Feedback</Link>
              </li>
            </ul>
          </nav>
          <Link href="/login">
            <button className="h-10 flex justify-center items-center bg-transparent font-semibold text-white border border-white rounded-full px-6 sm:px-8 py-2 sm:py-3 hover:bg-white hover:text-[#8FE649] transition text-sm sm:text-base">
              LogIn
            </button>
          </Link>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center flex-grow min-h-[60vh] sm:min-h-screen gap-8 sm:gap-12 relative z-10 px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl text-center"
          >
            <p className="text-base sm:text-lg text-gray-400 mb-3">
              Stop juggling spreadsheets and emails during{" "}
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
              Best <span className="text-[#8FE649]">placement</span>
              <br />
              organizing platform <br /> for your future.
            </h2>

            <p className="text-sm sm:text-lg text-gray-400 mt-3 leading-relaxed">
              Stop juggling spreadsheets and emails during<br />
              Stop juggling sphkjs ncflk ncla kncnaskc
            </p>
            <Link href="/create-account">
              <button className="mt-6 bg-[#8FE649] font-semibold text-white rounded-full px-6 sm:px-8 py-2 sm:py-3 hover:bg-white hover:text-[#8FE649] transition text-sm sm:text-base">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Popup Sign-in */}
        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-black/30 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-2xl border border-white/20 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#8FE649] text-2xl"
                aria-label="Close sign-in popup"
              >
                &times;
              </button>

              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                Sign in
              </h3>

              <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  placeholder="Email or mobile phone number"
                  className="bg-transparent border border-white hover:border-[#8FE649] rounded px-4 sm:px-5 py-2 sm:py-3 focus:outline-none text-base sm:text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Your password"
                  className="bg-transparent border border-white hover:border-[#8FE649] rounded px-4 sm:px-5 py-2 sm:py-3 focus:outline-none text-base sm:text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-[#8FE649] text-white rounded-full py-2 sm:py-3 mt-3 hover:bg-gray-300 text-base sm:text-lg font-medium disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "LOGIN"}
                </button>
              </form>

              {error && (
                <p className="text-red-400 text-center mt-2 text-sm font-semibold">{error}</p>
              )}

              <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6 text-center">
                By continuing, you agree to the{" "}
                <span className="text-[#8FE649] cursor-pointer">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-[#8FE649] cursor-pointer">
                  Privacy Policy
                </span>.
              </p>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs sm:text-sm text-gray-400 mt-4 sm:mt-5">
                <span className="cursor-pointer hover:text-[#8FE649]">
                  Other issue with sign in
                </span>
                <span className="cursor-pointer hover:text-[#8FE649]">
                  Forgot your password
                </span>
              </div>

              <hr className="border-gray-700 my-4 sm:my-6" />

              <p className="text-center text-gray-400 text-xs sm:text-sm">
                New to our community
              </p>
              <Link href="/create-account">
                <button className="border border-gray-400 rounded-full py-2 sm:py-3 w-full mt-3 hover:border-[#8FE649] text-base sm:text-lg text-white">
                  Create Account
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
