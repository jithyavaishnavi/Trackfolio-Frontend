"use client";

import React, { useState } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { Menu, Plus, Search, Trash2 } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Company() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [notes, setNotes] = useState([""]); // notes array
  const [checklist, setChecklist] = useState(["AWS", "Javascript", "Fill the form"]); // checkboxes array

  const handleFileChange = (e, setFile) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Notes actions
  const addNote = () => setNotes([...notes, ""]);
  const updateNote = (value, index) => {
    const updated = [...notes];
    updated[index] = value;
    setNotes(updated);
  };
  const removeNote = (index) => {
    setNotes(notes.filter((_, idx) => idx !== index));
  };

  // Checklist actions
  const addCheckbox = () => {
    const label = prompt("Enter checkbox label:");
    if (label && label.trim() !== "") {
      setChecklist([...checklist, label.trim()]);
    }
  };

  const toggleCheckbox = (index) => {
    // Optional: if you want to keep track of checked/unchecked state in the future
  };

  return (
    <div className={`flex flex-col min-h-screen bg-black text-white ${montserrat.className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          <span className="text-[#8FE649] drop-shadow-[0_0_8px_#8FE649]">TRACK</span>
          FOLIO
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
            <Menu className="w-6 h-6 text-white" />
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
                    i + 1 === 15 ? "bg-[#8FE649] text-black" : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Resume */}
          <label className="mb-3 flex flex-col items-left justify-left border-2 border-dashed border-neutral-700 rounded-md p-4 text-neutral-400 cursor-pointer hover:border-[#8FE649] hover:text-[#8FE649] transition">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e, setResume)}
            />
            {resume ? (
              <span className="text-sm text-center">
                {resume.name}
                <a
                  href={URL.createObjectURL(resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#8FE649] underline mt-1"
                >
                  Preview / Download
                </a>
              </span>
            ) : (
              "Upload Resume (PDF)"
            )}
          </label>

          {/* Upload Job Description */}
          <label className="mb-3 flex flex-col items-left justify-left border-2 border-dashed border-neutral-700 rounded-md p-4 text-neutral-400 cursor-pointer hover:border-[#8FE649] hover:text-[#8FE649] transition">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e, setJobDesc)}
            />
            {jobDesc ? (
              <span className="text-sm left">
                {jobDesc.name}
                <a
                  href={URL.createObjectURL(jobDesc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#8FE649] underline mt-1"
                >
                  Preview / Download
                </a>
              </span>
            ) : (
              "Upload Job Description (PDF)"
            )}
          </label>

          {/* Checklist group */}
          <div className="mt-10 space-y-2">
            {checklist.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 text-neutral-300 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#8FE649]"
                  onChange={() => toggleCheckbox(idx)}
                />
                {item}
              </label>
            ))}
          </div>
          <div>
            <button
              onClick={addCheckbox}
              className="mt-3 bg-neutral-800 rounded-full p-1 hover:bg-[#8FE649] hover:text-black transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </aside>

        {/* Right Content */}
        <section className="flex-1 p-10">
          <h2 className={`text-3xl font-bold mb-4 text-[#ffffff] ${poppins.className}`}>
            SAPLABs
          </h2>
          

          {/* Futuristic Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner"
            />
            <input
              type="text"
              placeholder="Job Description"
              className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner"
            />

            {/* Notes section (Dynamic textareas) */}
            {notes.map((note, idx) => (
              <div key={idx} className="relative">
                <textarea
                  value={note}
                  onChange={(e) => updateNote(e.target.value, idx)}
                  placeholder="Notes..."
                  rows={4}
                  className="w-full rounded-md bg-neutral-900 px-3 py-3 text-sm text-neutral-200 border border-neutral-700 focus:ring-2 focus:ring-[#8FE649] focus:border-[#8FE649] focus:outline-none transition-all shadow-inner"
                ></textarea>
                {idx > 0 && (
                  <button
                    onClick={() => removeNote(idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={addNote}
              className="bg-neutral-800 rounded-full p-2 hover:bg-[#8FE649] hover:text-black transition"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button className="bg-[#8FE649] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7ed43b] transition">
              Save
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
