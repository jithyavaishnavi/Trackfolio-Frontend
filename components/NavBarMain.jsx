"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, LogOut, Menu, Calendar, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function NavBarMain({ handleLogout }) {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();


  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  // helper: format YYYY-MM-DD → DD Mon YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-GB", options);
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch(`${API_URL}/auth/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete account");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.replace("/");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Error deleting account. Please try again.");
    }
  };

  return (
    <>
      <header
        className="flex items-center justify-between px-8 py-4 border-b border-neutral-800"
        style={{
          backgroundImage: "url('/bgplain.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        {/* Logo */}
        <Link
          href="/home"
          className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_#8FE649]"
        >
          TRACKFOLIO.
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation */}
          <nav className="flex items-center justify-center gap-6">
            <ul className="flex items-center justify-center gap-6 text-gray-300 text-sm sm:text-base bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-4 mx-auto">
              <li className="hover:text-[#8FE649] cursor-pointer transition-colors duration-300">
                <Link href="/completed">Completed</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer transition-colors duration-300">
                <Link href="/nextup">Next Up</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer transition-colors duration-300">
                <Link href="/upcoming">Upcoming</Link>
              </li>
            </ul>
          </nav>

          {/* Search + Calendar */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-full bg-neutral-900 pl-4 pr-32 py-2 text-sm w-64 sm:w-80 
                       focus:outline-none focus:ring-2 focus:ring-[#8FE649] placeholder-neutral-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setQuery("");
                handleSearch();
              }}
              className="absolute right-10 w-6 h-6 opacity-0 cursor-pointer"
            />
            <Calendar
              className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 
                       text-neutral-500 hover:text-[#8FE649] cursor-pointer pointer-events-none"
            />
            <Search
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
                       text-neutral-500 cursor-pointer hover:text-[#8FE649]"
            />
          </div>

          {/* Delete Account Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1 px-3 py-2 bg-transparent hover:bg-red-600 rounded-md transition text-grey-500"
            title="Delete Account"
          >
            <Trash2 size={16} />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-2 bg-transparent hover:bg-[#8FE649] rounded-md transition"
          >
            <LogOut size={16} />
          </button>

          

          {/* Mobile Menu */}
          <button className="md:hidden" aria-label="Open menu">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl max-w-sm w-full text-center"
          >
            <h2 className="text-white text-xl font-bold mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
