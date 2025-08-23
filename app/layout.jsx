// layout.jsx
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext"; // Named import
import AuthWatcher from "../components/AuthWatcher";

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
