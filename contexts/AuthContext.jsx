"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAccessToken = localStorage.getItem("accessToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedUser && savedAccessToken && savedRefreshToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedAccessToken);
      setRefreshToken(savedRefreshToken);
    }
  }, []);

  // ---- Refresh access token ----
  const refreshAccessToken = async () => {
    const rt = refreshToken || localStorage.getItem("refreshToken");

    if (!rt) {
      logout();
      throw new Error("No refresh token. Please login again.");
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/new-access-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: rt }),
      });

      if (!res.ok) throw new Error(`Failed to refresh token: ${res.status}`);

      const data = await res.json();

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return data.accessToken;
    } catch (err) {
      console.error("refreshAccessToken failed:", err);
      logout();
      throw new Error("Session expired. Please login again.");
    }
  };

  // ---- Auth fetch wrapper ----
  const authFetch = async (url, options = {}, retry = true) => {
    let tokenToUse = accessToken || localStorage.getItem("accessToken");

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (tokenToUse) headers["Authorization"] = `Bearer ${tokenToUse}`;

    let response = await fetch(url, { ...options, headers });

    // Retry once if access token expired
    if ((response.status === 401 || response.status === 403) && retry) {
      try {
        const newAccessToken = await refreshAccessToken();
        const retryHeaders = { ...headers, Authorization: `Bearer ${newAccessToken}` };
        response = await fetch(url, { ...options, headers: retryHeaders });
      } catch (err) {
        throw err; // already handled in refreshAccessToken
      }
    }

    if (!response.ok) {
      let msg = `Request failed with status ${response.status}`;
      try {
        const errData = await response.json();
        msg = errData.message || JSON.stringify(errData);
      } catch {}
      throw new Error(msg);
    }

    return response;
  };

  // ---- Login ----
  const login = (userData, tokens) => {
    setUser(userData);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  };

  // ---- Logout ----
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const userFirstName = user?.firstName || "";

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, authFetch, login, logout, userFirstName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);