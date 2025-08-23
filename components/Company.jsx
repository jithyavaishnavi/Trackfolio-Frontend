"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Montserrat, Poppins } from "next/font/google";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Company({ params }) {
  const driveId = params?.driveId;
  const searchParams = useSearchParams();
  const previousTab = searchParams.get("from") || "upcoming";
  const router = useRouter();
  const { authFetch, logout } = useAuth();

  const [companyName, setCompanyName] = useState("");
  const [driveDateTime, setDriveDateTime] = useState("");
  const [notes, setNotes] = useState([""]);
  const [links, setLinks] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // Fetch drive data with auth
  useEffect(() => {
    if (!driveId) {
      setError("Invalid drive ID");
      router.push("/home");
      return;
    }

    const fetchDrive = async () => {
      try {
        const res = await authFetch(`http://localhost:8080/api/drives/${driveId}`);
        if (!res) {
          setError("Session expired. Please login again.");
          logout();
          router.push("/login");
          return;
        }
        if (res.status === 404) {
          setError("Drive not found.");
          router.push("/home");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch drive data");

        const data = await res.json();
        setCompanyName(data.companyName || "");
        setDriveDateTime(data.driveDateTime || "");
        setNotes(Array.isArray(data.notes) && data.notes.length > 0 ? data.notes : [""]);
        setLinks(Array.isArray(data.links) && data.links.length > 0 ? data.links : [""]);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch drive data");
        router.push("/home");
      } finally {
        setLoading(false);
      }
    };

    fetchDrive();
  }, [driveId, authFetch, logout, router]);

  // Toast helper
  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(""), duration);
  };

  // Note actions
  const addNote = () => setNotes([...notes, ""]);
  const updateNote = (value, index) => {
    const updated = [...notes];
    updated[index] = value;
    setNotes(updated);
  };
  const removeNote = (index) => setNotes(notes.filter((_, i) => i !== index));

  // Link actions
  const addLink = () => setLinks([...links, ""]);
  const updateLink = (value, index) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };
  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  // Save changes with validation
  const handleSave = async () => {
    if (!companyName.trim()) {
      alert("Company Name cannot be empty");
      return;
    }

    try {
      const payload = {
        id: driveId,
        companyName,
        driveDateTime,
        links: links.filter((l) => l.trim() !== ""),
        notes: notes.filter((n) => n.trim() !== ""),
      };

      const res = await authFetch("http://localhost:8080/api/drives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res || !res.ok) {
        if (res && res.status === 403) {
          logout();
          router.push("/login");
          return;
        }
        throw new Error("Save failed");
      }

      showToast("Drive saved successfully!");
      setTimeout(() => router.push(`/home?tab=${previousTab}`), 1000);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save. Check console.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen bg-black text-white ${montserrat.className}`}>
      <main className="flex flex-1 p-10 flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className={`text-3xl font-bold ${poppins.className}`}>{companyName || "Edit Drive"}</h2>
          <button
            onClick={handleSave}
            className="bg-[#8FE649] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7ed43b] transition"
          >
            Save
          </button>
        </div>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:outline-none"
        />

        <input
          type="datetime-local"
          value={driveDateTime}
          onChange={(e) => setDriveDateTime(e.target.value)}
          className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:outline-none"
        />

        {/* Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Links</h3>
          {links.map((link, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                value={link}
                onChange={(e) => updateLink(e.target.value, idx)}
                placeholder="https://example.com"
                className="flex-1 rounded-md bg-neutral-900 px-3 py-2 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:outline-none"
              />
              <button onClick={() => removeLink(idx)}>
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
          <button onClick={addLink} className="flex items-center gap-2 text-[#8FE649] hover:underline">
            <Plus className="w-5 h-5" /> Add Link
          </button>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notes</h3>
          {notes.map((note, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <textarea
                value={note}
                onChange={(e) => updateNote(e.target.value, idx)}
                className="flex-1 rounded-md bg-neutral-900 px-3 py-2 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:outline-none resize-none"
                rows={2}
              />
              <button onClick={() => removeNote(idx)}>
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
          <button onClick={addNote} className="flex items-center gap-2 text-[#8FE649] hover:underline">
            <Plus className="w-5 h-5" /> Add Note
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#8FE649] text-black px-4 py-2 rounded shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  );
}
