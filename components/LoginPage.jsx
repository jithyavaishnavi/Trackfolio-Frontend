"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext"; // use your custom hook

export default function LoginPage() {
  const router = useRouter();
  const { login, error, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await login(email, password);
    if (success) {
      router.push("/home");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-black/30 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-2xl border border-white/20 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">
            Sign in
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <input
              type="text"
              placeholder="Enter valid Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white hover:border-[#8FE649] rounded px-4 sm:px-5 py-2 sm:py-3 focus:outline-none text-base sm:text-lg text-white placeholder-gray-300"
              aria-label="Enter valid Gmail"
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-white hover:border-[#8FE649] rounded px-4 sm:px-5 py-2 sm:py-3 focus:outline-none text-base sm:text-lg text-white placeholder-gray-300"
              aria-label="Password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } bg-[#8FE649] text-white text-semibold rounded-full py-2 sm:py-3 mt-3 hover:bg-white hover:text-[#8FE649] sm:text-lg font-medium`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
