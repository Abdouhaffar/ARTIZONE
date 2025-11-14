// src/components/ArtisanLogin.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function ArtisanLogin() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // بعد الدخول نرجع للصفحة الرئيسية أو صفحة الحساب
    } catch (err) {
      console.error("Login error:", err);
      setError("خطأ في البريد أو كلمة المرور.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>تسجيل دخول الحرفي</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleLogin} className="login-box">
        <label>البريد الإلكتروني</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>كلمة المرور</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">دخول</button>
      </form>

      <p style={{ marginTop: 12 }}>
        لو نسيت الحساب أو تريد تسجيل حساب جديد → <a href="/register">سجل هنا</a>
      </p>
    </div>
  );
}