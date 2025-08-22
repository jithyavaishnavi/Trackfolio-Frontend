"use client";
import { Calendar, Briefcase, Clock, ArrowRight, Search, Menu, Plus, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Dashboard() {
  const green = "#8FE649";
  const router = useRouter();
  const { authFetch, logout } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [drives, setDrives] = useState([]);

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    driveDatetime: "",
    campusType: "",
  });

  // === HANDLE FORM INPUT ===
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  // === FETCH DRIVES FOR ACTIVE TAB ===
  const fetchDrives = async () => {
    try {
      const res = await authFetch(`${BASE_URL}/api/drives`, { method: "GET" });
      if (!res) throw new Error("Unauthorized");
      if (res.status === 403) {
        logout();
        router.push("/login");
        return;
      }
      const data = await res.json();
      setDrives(data);
    } catch (err) {
      console.error("Failed to fetch drives:", err);
      setError("Unable to fetch drives.");
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  // === ADD DRIVE ===
  const handleAddDrive = async (e) => {
    e.preventDefault();
    const { companyName, role, driveDatetime, campusType } = form;

    if (!companyName || !role || !driveDatetime || !campusType) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setLoading(true);

    // Convert to full ISO with time (YYYY-MM-DDTHH:mm:ss)
    const dateObj = new Date(driveDatetime);
    const isoDatetime = dateObj.toISOString();

    const payload = {
      companyName,
      role,
      driveDatetime: isoDatetime,
      isOnCampus: campusType === "on-campus",
      notes: [],
      checklists: [],
    };

    try {
      const res = await authFetch(`${BASE_URL}/api/drives`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res || !res.ok) {
        if (res && res.status === 403) {
          logout();
          router.push("/login");
          return;
        }
        throw new Error("Failed to save drive");
      }

      showToast(`Drive for ${companyName} added successfully!`);
      setForm({ companyName: "", role: "", driveDatetime: "", campusType: "" });
      fetchDrives(); // Refresh list after adding
    } catch (err) {
      console.error(err);
      setError("Error adding drive. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: `radial-gradient(circle at center, rgba(143,230,73,0.1), transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.04)_1px)] bg-[size:50px_50px] opacity-20" />
        <div
          className="absolute inset-0 pointer-events-none animate-[moveParticles_60s_linear_infinite]"
          style={{ background: `url('https://www.transparenttextures.com/patterns/stardust.png')`, opacity: 0.06 }}
        />
      </div>

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
          {/* Hero */}
          <section className="text-center mt-50 relative z-10 px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-green-300 to-lime-500 bg-clip-text text-transparent">
              Welcome Aditya!
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Stop juggling spreadsheets and emails during placement season. Stay organized with one futuristic platform built just for you.
            </p>
          </section>

          {/* Add Drive Form */}
          <section className="mt-12 px-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Add a Drive</h2>
            <form onSubmit={handleAddDrive} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
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
                type="datetime-local"
                name="driveDatetime"
                placeholder="Drive Date & Time"
                value={form.driveDatetime}
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
                <option value="" disabled>Select Campus Type</option>
                <option value="on-campus">On Campus</option>
                <option value="off-campus">Off Campus</option>
              </select>
              <button
                type="submit"
                className="col-span-full bg-[#8FE649] text-white font-semibold py-2 rounded-md hover:bg-white hover:text-[#8FE649] transition"
              >
                <Plus size={16} className="inline-block mr-2" /> Add Drive
              </button>
            </form>

            {loading && (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
            {toast && (
              <div className="fixed bottom-6 right-6 bg-[#8FE649] text-black px-4 py-2 rounded shadow-lg animate-fadeIn">
                {toast}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
