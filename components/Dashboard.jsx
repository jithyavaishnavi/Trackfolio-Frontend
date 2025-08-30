"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { authFetch, logout, userFirstName } = useAuth();

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    driveDatetime: "",
    campusType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  const handleAddDrive = async (e) => {
    e.preventDefault();

    const { companyName, role, driveDatetime, campusType } = form;
    if (!companyName || !role || !driveDatetime || !campusType) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setLoading(true);

    // Extract the date and time from the input
    const localDateTime = new Date(driveDatetime);

    // Manually format the date to avoid automatic timezone conversion
    const year = localDateTime.getFullYear();
    const month = String(localDateTime.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const day = String(localDateTime.getDate()).padStart(2, "0");
    const hours = String(localDateTime.getHours()).padStart(2, "0");
    const minutes = String(localDateTime.getMinutes()).padStart(2, "0");

    // Create a string in the ISO format: YYYY-MM-DDTHH:MM:00 (no seconds for simplicity)
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;

    // Check what is being sent
    console.log("Payload being sent to backend:", {
      isUpdate: false,
      companyName,
      role,
      driveDatetime: formattedDateTime, // Use the correctly formatted datetime
      isOnCampus: campusType === "on-campus",
      notes: [],
      checklists: [],
    });

    const payload = {
      isUpdate: false,
      companyName,
      role,
      // Send the correctly formatted datetime
      driveDatetime: formattedDateTime,
      isOnCampus: campusType === "on-campus",
      notes: [],
      checklists: [],
    };

    try {
      const res = await authFetch(`/drives/save`, {
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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen bg-black text-[#F5F5DC] flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/bg2.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover", // use longhand, not shorthand
      }}
    >
      <h1 className="text-5xl font-extrabold mb-4 text-[#A7D16C] text-center">
        Welcome {userFirstName || "Back"}!
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Stop juggling spreadsheets and emails during placement season. Stay
        organized with one futuristic platform built just for you.
      </p>

      <form
        onSubmit={handleAddDrive}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full"
      >
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="rounded-md px-4 py-2 bg-neutral-900 text-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#A7D16C]"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="rounded-md px-4 py-2 bg-neutral-900 text-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#A7D16C]"
          required
        />
        <input
          type="datetime-local"
          name="driveDatetime"
          value={form.driveDatetime}
          onChange={handleChange}
          className="rounded-md px-4 py-2 bg-neutral-900 text-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#A7D16C] 
         [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          required
        />
        <select
          name="campusType"
          value={form.campusType}
          onChange={handleChange}
          className="rounded-md px-4 py-2 bg-neutral-900 text-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#A7D16C]"
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
          className="col-span-full bg-[#A7D16C] text-[#F5F5DC] font-semibold py-2 rounded-md hover:bg-[#F5F5DC] hover:text-[#A7D16C] transition"
        >
          <Plus size={16} className="inline-block mr-2" /> Add Drive
        </button>
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-[#A7D16C] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#A7D16C] text-black px-4 py-2 rounded shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>

  );
}
