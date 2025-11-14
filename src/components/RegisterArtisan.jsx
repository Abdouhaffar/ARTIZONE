import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import wilayas from "../data/wilayas.json";

export default function RegisterArtisan() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    wilaya: "",
    daira: "",
  });

  const [availableDairas, setAvailableDairas] = useState([]);
  const [msg, setMsg] = useState("");

  const handleWilaya = (e) => {
    const w = e.target.value;
    setForm({ ...form, wilaya: w });

    const dair = [...new Set(wilayas.filter(x => x.wilaya_name === w).map(x => x.daira_name))];
    setAvailableDairas(dair);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const acc = await createUserWithEmailAndPassword(auth, form.email, form.password);

      await addDoc(collection(db, "artisans"), {
        uid: acc.user.uid,
        ...form,
        createdAt: new Date(),
      });

      setMsg("✔ تم تسجيلك بنجاح!");
    } catch (err) {
      setMsg("حدث خطأ: " + err.message);
    }
  };

  return (
    <div className="page">
      <h2>تسجيل الحرفي</h2>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="الاسم الكامل"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select required onChange={handleWilaya}>
          <option value="">اختر الولاية</option>
          {[...new Set(wilayas.map((w) => w.wilaya_name))].map((w, i) => (
            <option key={i}>{w}</option>
          ))}
        </select>

        <select
          required
          onChange={(e) => setForm({ ...form, daira: e.target.value })}
        >
          <option value="">اختر الدائرة</option>
          {availableDairas.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>

        <button type="submit">تسجيل</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}