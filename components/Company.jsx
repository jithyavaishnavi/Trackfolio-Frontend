"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { Menu, Plus, Search, Trash2 } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Company() {
  const [resume, setResume] = useState(null);
  const [notes, setNotes] = useState([""]);
  const [checklist, setChecklist] = useState([
    { label: "AWS", checked: false },
    { label: "Javascript", checked: false },
    { label: "Fill the form", checked: false },
  ]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("SAPLABs");
  const [highlightDate, setHighlightDate] = useState(15);

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

      const res = await fetch("http://localhost:5000/api/company/1", {
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

  // Fetch data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/company/1");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setCompanyName(data.companyName || "SAPLABs");
        setJobTitle(data.jobTitle || "");
        setJobDescription(data.jobDescription || "");
        setHighlightDate(data.highlightDate || 15);

        if (data.notes) setNotes(Array.isArray(data.notes) ? data.notes : JSON.parse(data.notes));
        if (data.checklist)
          setChecklist(
            Array.isArray(data.checklist)
              ? data.checklist.map((c) =>
                  typeof c === "string" ? { label: c, checked: false } : c
                )
              : JSON.parse(data.checklist)
          );
      } catch (err) {
        console.error("Error fetching company data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen bg-black text-white ${montserrat.className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-[#ffffff] drop-shadow-[0_0_8px_#8FE649]">TRACKFOLIO</span>
        </h1>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
            <a href="#" className="hover:text-[#8FE649] transition">Previous</a>
            <a href="#" className="hover:text-[#8FE649] transition">Today</a>
            <a href="#" className="hover:text-[#8FE649] transition">Future</a>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FE649] placeholder-neutral-500"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500" />
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

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
              className="w-full text-sm text-neutral-200 file:bg-neutral-800 file:text-white file:rounded-md file:px-3 file:py-2 file:border file:border-neutral-700 file:cursor-pointer hover:file:bg-[#8FE649] hover:file:text-black transition"
            />
          </div>

          {/* Notes */}
          {notes.map((note, idx) => (
            <div key={idx} className="relative mt-4">
              <textarea
                value={note}
                onChange={(e) => updateNote(e.target.value, idx)}
                placeholder="Notes..."
                rows={4}
                className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner"
              />
              {idx > 0 && (
                <button
                  onClick={() => removeNote(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {/* Add Note Button */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={addNote}
              className="bg-neutral-800 rounded-full p-2 hover:bg-[#8FE649] hover:text-black transition"
              aria-label="Add note"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-neutral-500 text-xs flex items-center justify-center border-t border-neutral-800 py-4 gap-4 flex-wrap">
        <a href="#" className="hover:text-[#8FE649]">Home</a>|
        <a href="#" className="hover:text-[#8FE649]">About</a>|
        <a href="#" className="hover:text-[#8FE649]">Terms of Service</a>|
        <a href="#" className="hover:text-[#8FE649]">Privacy Policy</a>|
        <a href="#" className="hover:text-[#8FE649]">Cookie Policy</a>|
        <a href="#" className="hover:text-[#8FE649]">Contact Us</a>|
        <a href="#" className="hover:text-[#8FE649]">Send feedback</a>
        <span className="ml-4">©2025 Jithya Vaishnavi</span>
      </footer>
    </div>
  );
}
