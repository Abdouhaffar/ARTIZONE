import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SearchArtisan() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "artisans"));
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div className="page">
      <h2>البحث عن حرفي</h2>

      {items.map((a) => (
        <div
          className="artisan-card"
          key={a.id}
          onClick={() => nav(`/artisan/${a.id}`)}
        >
          <h3>{a.name}</h3>
          <p>{a.wilaya} — {a.daira}</p>
          <p>📞 {a.phone}</p>
        </div>
      ))}
    </div>
  );
}