"use client";
import { useState } from "react";
import Link from "next/link"; // ✅ Add this

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  // Updated Green color
  const green = "#8FE649";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 bg-black overflow-hidden">
      {/* Background Glow + Grid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, rgba(143,230,73,0.15), transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.05)_1px)] bg-[size:40px_40px] opacity-30" />
      </div>


      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl mt-8 relative z-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center text-left">
          <h1
            className="text-5xl font-montserrat font-bold leading-snug text-white transition-all duration-500"
            style={{ textShadow: `0 0 8px ${green}66` }}
          >
            One platform to track <br /> every step of your <br /> placement journey.
          </h1>
          <p className="text-gray-300 text-sm mt-4 font-poppins max-w-lg">
            Stop juggling spreadsheets and emails during placement season. Stay organized with one platform built just for you.
          </p>
          <button
            className="w-40 mt-8 px-8 py-3 rounded-full text-white transition-all duration-300"
            style={{
              background: green,
              boxShadow: `0 0 10px ${green}`,
            }}
            onMouseEnter={(e) =>
              (e.target.style.boxShadow = `0 0 20px ${green}`)
            }
            onMouseLeave={(e) =>
              (e.target.style.boxShadow = `0 0 10px ${green}`)
            }
          >
            Know More
          </button>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div
          className="backdrop-blur-lg bg-black/70 rounded-xl p-6 transition-all duration-300"
          style={{
            border: `1px solid ${green}44`,
            boxShadow: `0 0 15px ${green}33`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 25px ${green}`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 15px ${green}33`)
          }
        >
          <h2 className="text-lg font-montserrat font- text-center mb-4 text-white tracking-wide">
            Sign in
          </h2>

          {/* Email */}
          <input
            type="text"
            placeholder="Email or mobile phone number"
            className="w-full px-4 py-3 rounded-md bg-black text-sm mb-4 text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="w-full px-4 py-3 rounded-md bg-black text-sm text-white placeholder-gray-500 transition-all duration-300"
              style={{ border: `1px solid ${green}44` }}
              onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
              onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs text-gray-400 transition-all duration-300"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => (e.target.style.color = green)}
              onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Login button */}
          <div className="flex justify-center">
            <button
              className="w-40 px-4 py-2 rounded-full text-white font-montserrat mb-3 transition-all duration-300"
              style={{
                background: green,
                boxShadow: `0 0 8px ${green}`,
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = `0 0 20px ${green}`)
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = `0 0 8px ${green}`)
              }
            >
              Login
            </button>
          </div>

          {/* Links */}
          <p className="text-xs text-gray-400 text-center mb-4 font-poppins">
            By continuing you agree to the{" "}
            <a href="#" style={{ color: green }} className="hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" style={{ color: green }} className="hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <div className="flex justify-between text-xs text-gray-400 mb-4 font-poppins">
            <a
              href="#"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => (e.target.style.color = green)}
              onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
            >
              Other issues with sign in
            </a>
            <a
              href="#"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => (e.target.style.color = green)}
              onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
            >
              Forgot your password?
            </a>
          </div>

          <hr style={{ borderColor: `${green}33` }} className="mb-4" />
          <p className="text-center text-sm mb-3 font-poppins text-gray-300">
            New to our community?
          </p>
          <Link href="/create-account">
            <button
              className="w-full px-4 py-3 rounded-full text-sm transition-all duration-300"
              style={{
                border: `1px solid ${green}`,
                color: green,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = green;
                e.target.style.color = "black";
                e.target.style.boxShadow = `0 0 15px ${green}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = green;
                e.target.style.boxShadow = "none";
              }}
            >
              Create an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
