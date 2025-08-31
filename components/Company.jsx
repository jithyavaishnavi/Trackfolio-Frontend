"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Company() {
  const { id } = useParams();
  const router = useRouter();
  const { authFetch, logout } = useAuth();

  // --- Loading & Error states ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Drive Details states ---
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [driveDatetime, setDriveDatetime] = useState("");
  const [isOnCampus, setIsOnCampus] = useState(false);
  const [notes, setNotes] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  // --- Fetch drive details ---
  useEffect(() => {
    if (!id) return;

    const fetchDrive = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await authFetch(`/drives/fetch/${id}`, { method: "GET" });
        const data = await res.json();

        setCompanyName(data.companyName || "");
        setRole(data.role || "");

        // Format driveDatetime before setting the state
        if (data.driveDatetime) {
          const driveDate = new Date(data.driveDatetime);

          // Adjust the date to local time (if needed)
          const localDateTime = new Date(
            driveDate.getTime() - driveDate.getTimezoneOffset() * 60000
          );

          // Format the date to match datetime-local input format (YYYY-MM-DDTHH:MM)
          const formattedDate = localDateTime
            .toISOString() // Convert to ISO format
            .slice(0, 16); // Extract just the date and time part: YYYY-MM-DDTHH:MM

          setDriveDatetime(formattedDate); // Set the formatted date to state
        }

        setIsOnCampus(data.onCampus || false);
        setNotes(data.notes || []);
        setChecklists(data.checklists || []);
        setIsDirty(false);
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

  // --- Warn user before leaving if unsaved changes exist ---
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // --- Warn user on Next.js route changes ---
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (
        isDirty &&
        !window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        throw "Route change aborted by user";
      }
    };

    router.events?.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [isDirty, router.events]);

  //-----JD AND CHATBOT---------

  //----chatbot----
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  //----send msg-----

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: `You said: "${input}" 🤖` }, // Dummy response
    ];
    setMessages(newMessages);
    setInput("");
  };

  //-------jd-----------

  const [pdfFile, setPdfFile] = useState(null);
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };
  const handleRemovePdf = () => {
    setPdfFile(null);
  };

  // --- Helpers ---
  const driveDate = driveDatetime ? new Date(driveDatetime) : new Date();
  const driveDay = driveDate.getDate();

  // --- Handlers ---
  const handleNoteChange = (index, value) => {
    const updated = [...notes];
    updated[index].content = value;
    setNotes(updated);
    setIsDirty(true);
  };

  const toggleNoteCompleted = (index) => {
    const updated = [...notes];
    updated[index].completed = !updated[index].completed;
    setNotes(updated);
    setIsDirty(true);
  };

  const handleChecklistChange = (index, field, value) => {
    const updated = [...checklists];
    updated[index][field] = value;
    setChecklists(updated);
    setIsDirty(true);
  };

  const addNote = () => {
    setNotes([...notes, { id: null, content: "", completed: false }]);
    setIsDirty(true);
  };

  const addChecklist = () => {
    setChecklists([...checklists, { id: null, content: "", completed: false }]);
    setIsDirty(true);
  };

  const removeNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    setIsDirty(true);
  };

  const removeChecklist = (index) => {
    const updated = checklists.filter((_, i) => i !== index);
    setChecklists(updated);
    setIsDirty(true);
  };

  const handleSave = async () => {
    // Convert the local datetime to ISO format and ensure it's correct
    const localDateTime = new Date(driveDatetime);

    // If the input is in local time and needs conversion to UTC or any other timezone:
    const driveDatetimeInISO = new Date(
      localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19); // ISO without milliseconds

    const payload = {
      isUpdate: true,
      driveId: id,
      companyName,
      role,
      driveDatetime: driveDatetimeInISO, // Use the correctly formatted date
      isOnCampus,
      notes: notes.map((n) => ({
        id: n.id || null,
        content: n.content,
        completed: n.completed,
      })),
      checklists: checklists.map((c) => ({
        id: c.id || null,
        content: c.content,
        completed: c.completed,
      })),
    };

    // Log the payload to verify the datetime format
    console.log("Payload being sent to backend:", payload);

    try {
      await authFetch(`/drives/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsDirty(false);
      alert("Saved successfully!");
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  // --- Handle Delete Functionality ---
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this drive?"
    );

    if (!confirmDelete) return;

    try {
      // Get the access token directly from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // Log the user out if there's no access token
        alert("No access token found. Please login again.");

        // Call the logout function (you can redirect to the login page)
        logout(); // Assuming logout is available in the current scope

        // Redirect to login page
        router.push("/login");
        return;
      }

      // Make the DELETE request with the access token in the header
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
        }/drives/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add the access token here
          },
        }
      );

      // Check if the response is okay (status 200-299)
      if (res.ok) {
        let result = null;
        // Only try to parse the response as JSON if the response contains JSON
        if (res.headers.get("Content-Type")?.includes("application/json")) {
          result = await res.json(); // Parse the response as JSON
        } else {
          // If not JSON, treat it as a plain text message
          result = await res.text();
        }

        alert(result.message || result || "Drive deleted successfully!");

        // Redirect back to the previous page
        router.back(); // Automatically takes the user to the previous page
      } else {
        // Handle the case where the server responds with an error
        const errorData = await res.text(); // If the response is not JSON, read it as text
        alert(errorData || "Failed to delete drive.");
      }
    } catch (err) {
      console.error("Error deleting drive:", err);
      alert("An error occurred while deleting the drive.");
    }
  };

  return (
<div
  className="min-h-screen flex bg-gray-900 text-[#A7D16C] font-sans"
  style={{
    backgroundImage: "url('/bg2.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  }}
>
  {/* Sidebar */}
  <aside className="w-72 p-6 bg-[#A7D16C]/10 backdrop-blur-xl border-black/20 flex flex-col shadow-lg rounded-xl text-[#A7D16C]">
    {/* Calendar */}
    <div className="bg-[#A7D16C]/10 backdrop-blur-lg border border-black/20 p-4 rounded-xl shadow mb-8 transition-all hover:shadow-xl">
      <p className="text-center font-semibold mb-2 text-[#A7D16C]">
        {driveDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="grid grid-cols-7 gap-1 text-xs text-center text-[#A7D16C]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="font-medium text-gray-400">
            {d}
          </span>
        ))}
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const isDriveDay = day === driveDay;
          return (
            <span
              key={i}
              className={`cursor-pointer rounded-full py-0.5 transition-all duration-200 ${
                isDriveDay
                  ? "bg-[#F5F5DC] text-[#A7D16C] font-bold shadow-md"
                  : "hover:bg-[#F5F5DC] hover:text-gray-900"
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
      <h3 className="text-xl font-semibold mb-4 text-[#F5F5DC]">
        Checklist
      </h3>
      {checklists.map((item, idx) => (
        <div
          key={idx}
          className="relative flex items-center gap-1 group hover: rounded transition-all"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              handleChecklistChange(idx, "completed", !item.completed)
            }
            className="w-5 h-5 rounded border-gray-400 text-[#F5F5DC] focus:ring-[#F5F5DC] cursor-pointer transition-all duration-200"
          />

          {/* Text Input */}
          <input
            type="text"
            value={item.content}
            onChange={(e) =>
              handleChecklistChange(idx, "content", e.target.value)
            }
            className={`flex-1 bg-transparent text-[#A7D16C] text-base pb-1 transition-all duration-200 ${
              item.completed ? "line-through text-gray-400" : ""
            }`}
            placeholder="Task item..."
          />

          <button
            type="button"
            onClick={() => removeChecklist(idx)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 text-xl"
            style={{ zIndex: 10 }}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="w-2 h-2" />
          </button>
        </div>
      ))}

      {/* Add Task Button */}
      <button
        type="button"
        onClick={addChecklist}
        className="text-[#F5F5DC] hover:text-[#F5F5DC] font-medium mt-2"
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
        className="bg-[#F5F5DC] hover:bg-gray-300 text-[#A7D16C] font-bold px-6 py-2 rounded-xl shadow-lg transition-all"
      >
        Save Changes
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-[#A7D16C] font-bold px-6 py-2 rounded-xl shadow-lg transition-all"
      >
        Delete
      </button>
    </div>

    {/* Drive Details */}
    <div
      className="bg-[#A7D16C]/10 backdrop-blur-xl border border-black/20 rounded-xl p-5 mb-6 shadow transition-all hover:shadow-lg w-2/3"
      style={{ marginTop: "-1cm" }}
    >
      <h2 className="text-3xl font-bold mb-4 text-[#A7D16C]">
        {companyName}
      </h2>
      <p>
        <span className="font-semibold text-[#F5F5DC]">Role:</span> {role}
      </p>
      <p>
        <span className="font-semibold text-[#F5F5DC]">Type:</span>{" "}
        {isOnCampus ? "On Campus" : "Off Campus"}
      </p>
      <p>
        <span className="font-semibold text-[#F5F5DC]">Date & Time:</span>{" "}
        <input
          type="datetime-local"
          name="driveDatetime"
          value={driveDatetime}
          onChange={(e) => {
            setDriveDatetime(e.target.value);
            setIsDirty(true);
          }}
          className="rounded-md px-4 py-2 bg-[#A7D16C]/10 backdrop-blur-xl text-[#A7D16C] focus:outline-none focus:ring-2 focus:ring-[#F5F5DC] 
  [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          required
        />
      </p>
    </div>

    {/* Notes Section */}
    <div className="bg-[#A7D16C]/10 backdrop-blur-xl border border-black/20 rounded-xl p-5 mb-6 shadow transition-all hover:shadow-lg w-2/3">
      <h3 className="text-lg font-semibold mb-3 text-[#A7D16C]">Notes</h3>
      {notes.map((note, idx) => (
        <div
          key={idx}
          className="relative flex items-center gap-3 mb-2 group hover:p-1 rounded transition-all"
        >
          <input
            type="text"
            value={note.content}
            onChange={(e) => handleNoteChange(idx, e.target.value)}
            className={`flex-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#F5F5DC] focus:outline-none text-[#A7D16C] text-sm pb-0.5 transition-all duration-200 ${
              note.completed ? "line-through text-gray-400" : ""
            }`}
            placeholder="Add resource link or note..."
          />
          <button
            type="button"
            onClick={() => removeNote(idx)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 text-xl"
            style={{ zIndex: 10 }}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addNote}
        className="text-[#F5F5DC] hover:text-[#F5F5DC] font-medium text-sm mt-2"
      >
        + Add Resource
      </button>
    </div>
  </main>

  {/* Floating PDF Upload Circle */}
  <div className="fixed bottom-24 right-6 z-50">
    <label className="cursor-pointer bg-[#F5F5DC] hover:bg-gray-300 text-black font-bold rounded-full w-14 h-14 shadow-lg flex items-center justify-center">
      📄
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="hidden"
      />
    </label>
  </div>

  {/* Chatbot Floating Button + Window */}
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={() => setIsChatOpen(!isChatOpen)}
      className="bg-[#F5F5DC] hover:bg-gray-300 text-black font-bold rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
    >
      💬
    </button>

    {isChatOpen && (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="absolute bottom-20 right-0 w-120 max-h-[500px] bg-gray-800 rounded-xl shadow-xl border border-white/20 flex flex-col overflow-hidden"
      >
        <div className="bg-[#F5F5DC] text-[#A7D16C] font-bold p-3">
          Chatbot Assistant
        </div>
        <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-[#F5F5DC] text-[#A7D16C] ml-auto"
                  : "bg-gray-700 text-white mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex border-t border-gray-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-2 bg-transparent text-white focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 bg-[#F5F5DC] text-[#A7D16C] font-semibold"
          >
            Send
          </button>
        </div>
      </motion.div>
    )}
  </div>
  <footer className="bg-transparent text-gray-300 px-8 py-6 mt-12">
        <div className="max-w-6xl mx-auto flex items-center sm:flex-row justify-center items-center gap-4 sm:gap-0">
          <div className="text-sm sm:text-base">
            © {new Date().getFullYear()} TRACKFOLIO.
          </div>
        </div>
      </footer>
</div>
  );
}

