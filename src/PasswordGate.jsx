import { useState, useEffect } from "react";
import Preloader from "./Preloaders/preloader1.jsx";

const PASSWORD = "onlyforyou"; // <-- SET YOUR PASSWORD HERE

export default function PasswordGate({ children }) {
  const [loading, setLoading] = useState(true);
  const [needPassword, setNeedPassword] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("site_password");

    if (saved === PASSWORD) {
      // Password already saved → show loader → site
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      // Show password input
      setNeedPassword(true);
      setLoading(false);
    }
  }, []);

  const verifyPassword = (e) => {
    e.preventDefault();
    if (enteredPassword === PASSWORD) {
      localStorage.setItem("site_password", PASSWORD);
      setNeedPassword(false);

      // show loader → then unlock
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    } else {
      setError("Galat password hai yrr, ek baar aur try kro ❤️");
    }
  };

  // 🔐 Password Required View
  if (needPassword) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fdf2f2"
      }}>
        <div style={{
          padding: 20,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          width: "min(90%, 380px)",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: 10 }}>Enter Password</h2>

          <form onSubmit={verifyPassword}>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "#e11d48",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer"
              }}
            >
              Unlock 🔐
            </button>
          </form>

          {error && (
            <div style={{ marginTop: 10, color: "red", fontSize: 14 }}>
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ⏳ Loader (on first load or after correct password)
  if (loading) {
    return <Preloader />;
  }

  // 🔓 Unlocked → Show App
  return <>{children}</>;
}
