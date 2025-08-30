"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Company() {
  const { id } = useParams();
  const router = useRouter();
  const { authFetch, logout } = useAuth();

  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDrive = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await authFetch(`/drives/fetch/${id}`, { method: "GET" });
        setDrive(data);
      } catch (err) {
        const msg = err.message || "Failed to fetch drive details";
        setError(msg);

        if (msg.includes("401") || msg.includes("403")) {
          logout();
          router.push("/home");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDrive();
  }, [id, authFetch, logout, router]);

  if (loading)
    return (
      <p className="text-center text-gray-300 mt-10">
        Loading drive details...
      </p>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!drive) return null;


  return (
    <div
  className="min-h-screen flex bg-gray-900 text-white font-sans"
  style={{
    backgroundImage: "url('/bg2.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  }}
>
  {/* Sidebar */}
  <aside className="w-72 p-6 bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col shadow-lg rounded-xl text-white">

    {/* Calendar */}
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl shadow mb-8 transition-all hover:shadow-xl">
      <p className="text-center font-semibold mb-2 text-white">September 2025</p>
      <div className="grid grid-cols-7 gap-2 text-sm text-center text-white">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="font-medium text-gray-400">{d}</span>
        ))}
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const isDriveDay = day === drive.date.getDate();
          return (
            <span
              key={i}
              className={`cursor-pointer rounded-full py-1 transition-all duration-200 ${
                isDriveDay
                  ? "bg-[#8FE649] text-white font-bold shadow-md"
                  : "hover:bg-[#8FE649] hover:text-gray-900"
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>

    {/* Checklist Section */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-[#8FE649]">Checklist</h3>
      {checklist.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 mb-3 group hover:bg-[#8FE649]/20 p-2 rounded transition-all">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => {
              const updated = [...checklist];
              updated[idx].completed = !updated[idx].completed;
              setChecklist(updated);
            }}
            className="w-5 h-5 rounded border-gray-400 text-[#8FE649] focus:ring-[#8FE649] cursor-pointer transition-all duration-200"
          />
          <input
            type="text"
            value={item.content}
            onChange={(e) => {
              const updated = [...checklist];
              updated[idx].content = e.target.value;
              setChecklist(updated);
            }}
            className={`flex-1 bg-transparent border-b border-gray-300 focus:border-[#8FE649] focus:outline-none text-white text-base pb-1 transition-all duration-200 ${item.completed ? "line-through text-gray-400" : ""}`}
            placeholder="Task item..."
          />
          <button
            type="button"
            onClick={() => handleRemoveChecklist(idx)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 text-sm"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddChecklist}
        className="text-[#8FE649] hover:text-[#8FE649] font-medium mt-2"
      >
        + Add Task
      </button>
    </div>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-10 relative">
    {/* Prominent Save & Delete Buttons */}
    <div className="absolute top-6 right-6 flex gap-4">
      <button
        onClick={handleSave}
        className="bg-[#8FE649] hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all"
      >
        Save Changes
      </button>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all"
      >
        Delete
      </button>
    </div>

    {/* Drive Details */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 mb-6 shadow transition-all hover:shadow-lg w-2/3">
      <h2 className="text-3xl font-bold mb-4 text-white">{drive.companyName}</h2>
      <p>
        <span className="font-semibold text-[#8FE649]">Role:</span> {drive.role}
      </p>
      <p>
        <span className="font-semibold text-[#8FE649]">Date & Time:</span>{" "}
        <input
          type="datetime-local"
          value={drive.date.toISOString().slice(0, 16)}
          onChange={(e) => setDrive({ ...drive, date: new Date(e.target.value) })}
          className="ml-2 bg-transparent border border-[#8FE649] rounded-lg px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
        />
      </p>
      <p>
        <span className="font-semibold text-[#8FE649]">On Campus:</span> {drive.onCampus ? "Yes" : "No"}
      </p>
    </div>

    {/* Notes Section */}
    <div className="mb-6 w-2/3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">Notes</h3>
      {notes.map((note, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-2 group hover:bg-[#8FE649]/20 p-1 rounded transition-all">
          <input
            type="text"
            value={note.content}
            onChange={(e) => {
              const updated = [...notes];
              updated[idx].content = e.target.value;
              setNotes(updated);
            }}
            className="flex-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#8FE649] focus:outline-none text-white text-sm pb-0.5 transition-all duration-200"
            placeholder="Add resource link or note..."
          />
          <button
            type="button"
            onClick={() => handleRemoveNote(idx)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddNote}
        className="text-[#8FE649] hover:text-[#8FE649] font-medium text-sm mt-2"
      >
        + Add Resource
      </button>
    </div>
  </main>

  {/* Delete Account Modal */}
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
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )}
</div>
  );
}


