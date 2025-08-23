"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Named export AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount, check localStorage for token/user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Wrapper around fetch to automatically add Authorization header
  const authFetch = async (url, options = {}) => {
    const headers = options.headers || {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, { ...options, headers });
    // Auto logout on 401/403
    if (response.status === 401 || response.status === 403) {
      logout();
    }
    return response;
  };

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const userFirstName = user?.firstName || "";

  return (
    <AuthContext.Provider
      value={{ user, token, authFetch, login, logout, userFirstName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
