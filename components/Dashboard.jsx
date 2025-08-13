"use client";
import { Calendar, Briefcase, Clock, ArrowRight, Search, Menu, Plus, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Environment variable for backend URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Dashboard() {
  const green = "#8FE649";
  const router = useRouter();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company: "",
    date: "",
    role: "",
    time: "",
    campusType: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/companies`);
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        setError("Failed to load companies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Add a new company
  const handleAddCompany = async (e) => {
    e.preventDefault();
    const { company, date, role, campusType } = form;

    if (!company || !date || !role || !campusType) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add company");

      const newCompany = await res.json();
      setCompanies([...companies, newCompany]);
      setForm({ company: "", date: "", role: "", time: "", campusType: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding company. Please try again.");
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      // Optional: call backend logout endpoint if it exists
      await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Backend logout failed, continuing frontend logout...");
    }

    // Clear frontend session/token
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, rgba(143,230,73,0.1), transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.04)_1px)] bg-[size:50px_50px] opacity-20" />
        <div
          className="absolute inset-0 pointer-events-none animate-[moveParticles_60s_linear_infinite]"
          style={{
            background: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
            opacity: 0.06,
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: `url('https://i.pinimg.com/1200x/68/41/56/6841566e3471ff089e2b2389ae208a01.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/70 backdrop-blur-md min-h-screen flex flex-col text-white">
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
            <Link
              href="/home"
              className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_#8FE649]"
            >
              TRACKFOLIO.
            </Link>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
                <a href="#" className="hover:text-[#8FE649] transition">
                  Previous
                </a>
                <a href="#" className="hover:text-[#8FE649] transition">
                  Today
                </a>
                <a href="#" className="hover:text-[#8FE649] transition">
                  Future
                </a>
              </nav>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-full bg-neutral-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FE649] placeholder-neutral-500"
                  aria-label="Search companies"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 bg-transparent-600 hover:bg-[#8FE649] rounded-md transition"
              >
                <LogOut size={16} /> 
              </button>
              <button className="md:hidden" aria-label="Open menu">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="text-center mt-50 relative z-10 px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-green-300 to-lime-500 bg-clip-text text-transparent">
              Welcome Aditya!
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Stop juggling spreadsheets and emails during placement season. Stay organized with one futuristic platform built just for you.
            </p>
          </section>

          {/* Add Company Form */}
          <section className="mt-12 px-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Add a Company</h2>
            <form
              onSubmit={handleAddCompany}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={form.role}
                onChange={handleChange}
                className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
                required
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={form.date}
                onChange={handleChange}
                className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
                required
              />
              <select
                name="campusType"
                value={form.campusType}
                onChange={handleChange}
                className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
                required
              >
                <option value="" disabled>
                  Select Campus Type
                </option>
                <option value="on-campus">On Campus</option>
                <option value="off-campus">Off Campus</option>
              </select>
              <button
                type="submit"
                className="col-span-full bg-[#8FE649] text-white font-semibold py-2 rounded-md hover:bg-white hover:text-[#8FE649] transition"
              >
                <Plus size={16} className="inline-block mr-2" /> Add Company
              </button>
            </form>

            {/* Loading & Error */}
            {loading && (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
          </section>
        </div>
      </div>
    </div>
  );
}
