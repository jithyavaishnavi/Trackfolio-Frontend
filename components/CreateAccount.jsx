// app/create-account/page.jsx
"use client";
import { useState } from "react";
import Navbar from "@/components/NavbarHome";
import FormCard from "@/components/FormCard";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const green = "#8FE649";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 bg-black overflow-hidden">
     

      {/* Optional Navbar */}
      {/* <Navbar /> */}

      {/* Right Section - Sign Up Form */}
      <FormCard green={green}>
        <h2 className="text-lg font-montserrat text-center mb-4 text-white tracking-wide">
          Create Account
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-md bg-black text-sm mb-4 text-white placeholder-gray-500 transition-all duration-300"
          style={{ border: `1px solid ${green}44` }}
          onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
          onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-md bg-black text-sm mb-4 text-white placeholder-gray-500 transition-all duration-300"
          style={{ border: `1px solid ${green}44` }}
          onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
          onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-black text-sm text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-xs text-gray-400"
            onMouseEnter={(e) => (e.target.style.color = green)}
            onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-md bg-black text-sm text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-xs text-gray-400"
            onMouseEnter={(e) => (e.target.style.color = green)}
            onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Sign Up Button */}
        <div className="flex justify-center">
          <button
            className="w- px-4 py-2 rounded-full text-white font-montserrate mb-3 transition-all duration-300"
            style={{ background: green, boxShadow: `0 0 8px ${green}` }}
            onMouseEnter={(e) => (e.target.style.boxShadow = `0 0 20px ${green}`)}
            onMouseLeave={(e) => (e.target.style.boxShadow = `0 0 8px ${green}`)}
          >
            Create Account
          </button>
        </div>

        {/* Terms & Redirect */}
        <p className="text-xs text-gray-400 text-center mb-4 font-poppins">
          By creating an account, you agree to the{" "}
          <a href="#" style={{ color: green }} className="hover:underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: green }} className="hover:underline">
            Privacy Policy
          </a>.
        </p>
        <p className="text-center text-sm mb-3 font-poppins text-gray-300">
          Already have an account?{" "}
          <a href="/" className="hover:underline" style={{ color: green }}>
            Login
          </a>
        </p>
      </FormCard>
    </div>
  );
}
