"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // adjust path

export default function DriveDetails() {
  const { id } = useParams(); // dynamic route /drives/[id]
  const router = useRouter();
  const { authFetch, logout } = useAuth();

  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid drive ID");
      router.push("/home");
      return;
    }

    const fetchDrive = async () => {
      try {
        const res = await authFetch(`http://localhost:8080/drives/${id}`, {
          method: "GET",
        });

        const data = await res.json();
        setDrive(data);
        setError(null);
      } catch (err) {
        console.error(err);
        const msg = err.message || "Failed to fetch drive details";
        setError(msg);

        // If unauthorized (handled inside authFetch), redirect to login
        if (msg.includes("Unauthorized") || msg.includes("403")) {
          logout();
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDrive();
  }, [id, authFetch, logout, router]);

  if (loading) return <p className="text-center mt-10">Loading drive details...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!drive) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">{drive.companyName}</h2>
      <p className="mb-2"><span className="font-semibold">Role:</span> {drive.role}</p>
      <p className="mb-2">
        <span className="font-semibold">Date & Time:</span>{" "}
        {new Date(drive.driveDatetime).toLocaleString()}
      </p>
      <p className="mb-4"><span className="font-semibold">On Campus:</span> {drive.onCampus ? "Yes" : "No"}</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Notes</h3>
        {drive.notes?.length > 0 ? (
          <ul className="list-disc list-inside">
            {drive.notes.map((note, idx) => (
              <li key={idx} className={note.completed ? "line-through text-gray-500" : ""}>
                {note.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes available.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Checklist</h3>
        {drive.checklists?.length > 0 ? (
          <ul className="list-disc list-inside">
            {drive.checklists.map((check, idx) => (
              <li key={idx} className={check.completed ? "line-through text-gray-500" : ""}>
                {check.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No checklist items available.</p>
        )}
      </div>
    </div>
  );
}