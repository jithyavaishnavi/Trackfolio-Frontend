"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Dashboard() {
  const router = useRouter();
  const { authFetch, logout, userFirstName } = useAuth();

  const [form, setForm] = useState({ companyName: "", role: "", driveDatetime: "", campusType: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const showToast = (message, duration = 3000) => { setToast(message); setTimeout(() => setToast(null), duration); };

  const handleAddDrive = async (e) => {
    e.preventDefault();

    const { companyName, role, driveDatetime, campusType } = form;
    if (!companyName || !role || !driveDatetime || !campusType) { setError("Please fill all fields"); return; }

    setError(""); setLoading(true);

    const payload = { isUpdate: false, companyName, role, driveDatetime: new Date(driveDatetime).toISOString(), isOnCampus: campusType === "on-campus", notes: [], checklists: [] };
    try {
      const res = await authFetch(`${BASE_URL}/drives/save`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      showToast(`Drive for ${companyName} added successfully!`);
      setForm({ companyName: "", role: "", driveDatetime: "", campusType: "" });
    } catch (err) {
      console.error("handleAddDrive: Failed to submit drive:", err);
      setError(err.message || "Error adding drive. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-green-300 text-center">Welcome {userFirstName || "User"}!</h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">Stop juggling spreadsheets and emails during placement season. Stay organized with one futuristic platform built just for you.</p>

      <form onSubmit={handleAddDrive} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
        <input type="text" name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]" required />
        <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]" required />
        <input type="datetime-local" name="driveDatetime" value={form.driveDatetime} onChange={handleChange} className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]" required />
        <select name="campusType" value={form.campusType} onChange={handleChange} className="rounded-md px-4 py-2 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]" required>
          <option value="" disabled>Select Campus Type</option>
          <option value="on-campus">On Campus</option>
          <option value="off-campus">Off Campus</option>
        </select>
        <button type="submit" className="col-span-full bg-[#8FE649] text-white font-semibold py-2 rounded-md hover:bg-white hover:text-[#8FE649] transition">
          <Plus size={16} className="inline-block mr-2" /> Add Drive
        </button>
      </form>

      {loading && <div className="flex justify-center mt-4"><div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div></div>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {toast && <div className="fixed bottom-6 right-6 bg-[#8FE649] text-black px-4 py-2 rounded shadow-lg animate-fadeIn">{toast}</div>}
    </div>
  );
}