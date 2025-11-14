import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ArtisanLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/");
    } catch (err) {
      setMsg("❌ خطأ في تسجيل الدخول");
    }
  };

  return (
    <div className="page">
      <h2>تسجيل دخول الحرفي</h2>

      <form onSubmit={login}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>دخول</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}