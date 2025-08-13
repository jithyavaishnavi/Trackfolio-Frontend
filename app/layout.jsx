"use client";

import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext"; // Adjust path as needed
import AuthWatcher from "../components/AuthWatcher"; // Adjust path as needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthWatcher />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
