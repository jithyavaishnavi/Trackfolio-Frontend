"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { Menu, Plus, Search, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Company({ companyId }) {
  const [resume, setResume] = useState(null);
  const [notes, setNotes] = useState([""]);
  const [checklist, setChecklist] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [highlightDate, setHighlightDate] = useState(new Date().getDate());

  // File handler
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setResume(e.target.files[0]);
  };

  // Notes actions
  const addNote = () => setNotes([...notes, ""]);
  const updateNote = (value, index) => {
    const updated = [...notes];
    updated[index] = value;
    setNotes(updated);
  };
  const removeNote = (index) => setNotes(notes.filter((_, idx) => idx !== index));

  // Checklist actions
  const addCheckbox = () => {
    const label = prompt("Enter checkbox label:");
    if (label && label.trim() !== "")
      setChecklist([...checklist, { label: label.trim(), checked: false }]);
  };

  const toggleCheckbox = (index) => {
    const updated = [...checklist];
    updated[index].checked = !updated[index].checked;
    setChecklist(updated);
  };

  // Save data
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);
      formData.append("notes", JSON.stringify(notes));
      formData.append("checklist", JSON.stringify(checklist));
      if (resume) formData.append("resume", resume);

      const res = await fetch(`http://localhost:5000/api/company/${companyId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      console.log("Save successful:", data);
      alert("Data saved successfully!");
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Error saving data. Check console for details.");
    }
  };

  // Fetch company data dynamically
  useEffect(() => {
    if (!companyId) return;

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/company/${companyId}`);
        if (!res.ok) throw new Error("Failed to fetch company data");
        const data = await res.json();

        setCompanyName(data.companyName || "");
        setJobTitle(data.jobTitle || "");
        setJobDescription(data.jobDescription || "");
        setHighlightDate(data.highlightDate || new Date().getDate());

        setNotes(
          data.notes
            ? Array.isArray(data.notes)
              ? data.notes
              : JSON.parse(data.notes)
            : [""]
        );

        setChecklist(
          data.checklist
            ? Array.isArray(data.checklist)
              ? data.checklist.map((c) =>
                  typeof c === "string" ? { label: c, checked: false } : c
                )
              : JSON.parse(data.checklist)
            : []
        );
      } catch (err) {
        console.error("Error fetching company data:", err);
        setChecklist([]);
        setNotes([""]);
        setCompanyName("");
      }
    }

    fetchData();
  }, [companyId]);

  return (
    <div className={`flex flex-col min-h-screen bg-black text-white ${montserrat.className}`}>
      {/* Main Content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
          {/* Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-neutral-300 text-sm mb-2">
              <button>&lt;</button>
              <span className="font-semibold">February 2021</span>
              <button>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-neutral-400">
              {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                <div key={day}>{day}</div>
              ))}
              {Array.from({ length: 28 }, (_, i) => (
                <div
                  key={i}
                  className={`p-1 rounded-md hover:bg-[#8FE649] hover:text-black cursor-pointer ${
                    i + 1 === highlightDate ? "bg-[#8FE649] text-black" : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-10 space-y-2">
            {checklist.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 text-neutral-300 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#8FE649]"
                  checked={item.checked}
                  onChange={() => toggleCheckbox(idx)}
                />
                {item.label}
              </label>
            ))}
          </div>
          <button
            onClick={addCheckbox}
            className="mt-3 hover:bg-[#8FE649] hover:text-black transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </aside>

        {/* Right Content */}
        <section className="flex-1 p-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-3xl font-bold ${poppins.className}`}>{companyName}</h2>
            <button
              onClick={handleSave}
              className="bg-[#8FE649] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7ed43b] transition"
            >
              Save
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner"
            />
            <input
              type="text"
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm text-neutral-200 file:bg-neutral-800 file:text-white file:rounded-md file:px-3 file:py-2 file:border file:border-neutral-700 file:cursor-pointer hover:file:bg-[#8FE649] hover:file:text-black transition-all"
            />
          </div>

          {/* Notes */}
          <div className="mt-6 space-y-2">
            {notes.map((note, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <textarea
                  value={note}
                  onChange={(e) => updateNote(e.target.value, idx)}
                  className="flex-1 rounded-md bg-neutral-900 px-3 py-2 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner resize-none"
                  rows={2}
                />
                <button onClick={() => removeNote(idx)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
            <button
              onClick={addNote}
              className="flex items-center gap-2 text-[#8FE649] font-semibold hover:underline"
            >
              <Plus className="w-5 h-5" /> Add Note
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
