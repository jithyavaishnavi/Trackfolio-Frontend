"use client";
import { useState } from "react";
import FormCard from "./FormCard"; // Adjust path if needed

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const green = "#8FE649";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

try {
  const res = await fetch("/auth/register", {  // updated endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: fullName,     // key changed here
      email: email,
      password: password
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "Signup failed");
    return;
  }

  // Store tokens
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  // Redirect to home page
  router.push("/home");

} catch (err) {
  setError("Network error: " + err.message);
}
  };


  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="min-h-screen relative flex flex-col items-center justify-center bg-black overflow-hidden">
        <FormCard green={green}>
          <h2 className="text-2xl font-montserrat text-center mb-4 text-white tracking-wide">
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4 font-poppins">{error}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-black text-sm mb-4 text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-black text-sm mb-4 text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-12 py-2 rounded-full text-white font-montserrate mb-3 transition-all duration-300"
              style={{ background: green, boxShadow: `0 0 8px ${green}` }}
              onMouseEnter={(e) => (e.target.style.boxShadow = `0 0 20px ${green}`)}
              onMouseLeave={(e) => (e.target.style.boxShadow = `0 0 8px ${green}`)}
            >
              Create Account
            </button>
          </div>

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
    </div>
  );
}
