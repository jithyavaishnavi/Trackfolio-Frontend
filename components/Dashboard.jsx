"use client";

import { useState } from "react";
import { Search, Menu, ArrowRight, Calendar, Clock, Briefcase, Plus, Settings, LogOut, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const green = "#8FE649";

  const [companies, setCompanies] = useState([
    { company: "SAP Labs", date: "24-08-2025 (Saturday)", role: "Software Developer", time: "10:00 AM" },
    { company: "Google", date: "30-08-2025 (Friday)", role: "SDE Intern", time: "9:00 AM" },
    { company: "Amazon", date: "02-09-2025 (Monday)", role: "Cloud Engineer", time: "11:30 AM" },
    { company: "Microsoft", date: "05-09-2025 (Thursday)", role: "Data Scientist", time: "1:00 PM" },
    { company: "Meta", date: "10-09-2025 (Tuesday)", role: "AI Researcher", time: "3:00 PM" },
    { company: "Apple", date: "15-09-2025 (Sunday)", role: "iOS Developer", time: "2:00 PM" },
  ]);

  const [form, setForm] = useState({ company: "", date: "", role: "", time: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (form.company && form.date && form.role && form.time) {
      setCompanies([...companies, form]);
      setForm({ company: "", date: "", role: "", time: "" });
    }
  };

  return (
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
      {/* Overlay for readability */}
      <div className="bg-black/70 backdrop-blur-md min-h-screen flex flex-col text-white">

        <header className="flex items-center relative px-8 py-4">
          <h1 className="text-2xl font-bold tracking-wide text-white">
            <span style={{ color: "white" }}>TRACK</span>FOLIO
          </h1>

          <nav
            className="hidden md:flex justify-center items-center gap-6 text-lg text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label="Main navigation"
          >
            {["Completed", "Up Next", "Upcoming"].map((item) => (
              <a key={item} href="#" className="hover:text-[#8FE649] transition">
                {item}
              </a>
            ))}
          </nav>

          <div className="relative max-w-2xl ml-10 flex-shrink-0">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search..."
              className="w-full rounded-full bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>

          <div className="flex items-center ml-auto gap-4">
            <button aria-label="Dashboard" className="hidden md:block hover:text-[#8FE649] transition">
              <LayoutDashboard className="w-6 h-6" />
            </button>
            <button aria-label="Settings" className="hidden md:block hover:text-[#8FE649] transition">
              <Settings className="w-6 h-6" />
            </button>
            <button aria-label="Logout" className="hidden md:block hover:text-[#8FE649] transition">
              <LogOut className="w-6 h-6" />
            </button>
            <button className="md:hidden ml-4" aria-label="Open menu">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>

        <section className="text-center mt-50 mx-auto">
          <h1 className="text-8xl font-extrabold mb-4" style={{ color: "white" }}>
            Welcome Aditya!
          </h1>
          <p className="text-gray-400 text-lg">
            Stop juggling spreadsheets and emails during placement season. <br /> Stay organized with one platform built just for you.
          </p>
        </section>

        <section className="mt-12 px-6 max-w-3xl mx-auto">
          <h2 className="flex justify-center text-xl font-semibold mb-6" style={{ color: "white" }}>
            Add a Company
          </h2>
          <form onSubmit={handleAddCompany} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              type="text"
              name="date"
              placeholder="Date (e.g. 24-08-2025)"
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
  <option value="off-campus">Off Campus</option>
  <option value="on-campus">On Campus</option>
</select>

            <button
              type="submit"
              className="col-span-full bg-[#8FE649] text-white font-semibold py-2 rounded-md hover:bg-white hover:text-[#8FE649] transition"
            >
              <Plus size={16} className="inline-block mr-2" /> Add Company
            </button>
          </form>
        </section>

        <section className="mt-50 max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold mb-12 text-white text-center">Upcoming Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20">
            {companies.map((drive, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 rounded-lg p-8 border border-neutral-700 cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg min-w-[280px]"
              >
                <h3 className="text-xl font-semibold text-[#8FE649] mb-4">{drive.company}</h3>

                <div className="text-gray-400 text-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5" />
                    <span>{drive.role}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span>{drive.time}</span>
                  </div>
                </div>

                <button
                  className="mt-6 flex items-center gap-2 text-white hover:text-[#8FE649] font-medium text-sm"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        



      </div>
    </div>
  );
}
