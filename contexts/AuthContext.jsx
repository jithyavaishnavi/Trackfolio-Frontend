"use client";
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => Cookies.get("accessToken") || null);
  const [refreshToken, setRefreshToken] = useState(() => Cookies.get("refreshToken") || null);
  const [userEmail, setUserEmail] = useState(() => Cookies.get("user_email") || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveTokens = ({ accessToken, refreshToken, email }) => {
    // LocalStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user_email", email);

    // Cookies (so middleware can read)
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    Cookies.set("user_email", email);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_email");

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user_email");

    setAccessToken(null);
    setRefreshToken(null);
    setUserEmail(null);
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in both fields");
      setLoading(false);
      return false;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return false;
      }

      saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        email,
      });

      setLoading(false);
      return true;
    } catch (err) {
      setError("Network error. Try again.");
      setLoading(false);
      return false;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/new-access-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        logout();
        throw new Error("Session expired. Please login again.");
      }

      const data = await res.json();
      saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || refreshToken,
        email: userEmail,
      });
      return data.accessToken;
    } catch (err) {
      logout();
      throw err;
    }
  };

  const authFetch = async (url, options = {}) => {
    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    let res = await fetch(url, options);

    if (res.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        options.headers.Authorization = `Bearer ${newAccessToken}`;
        res = await fetch(url, options);
      } catch (err) {
        setError(err.message);
        return null;
      }
    }

    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userEmail,
        error,
        loading,
        login,
        logout,
        setError,
        setLoading,
        authFetch,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
