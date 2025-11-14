import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function VipManager() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "vipRequests"));
      setList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  const approve = async (item) => {
    await updateDoc(doc(db, "vipRequests", item.id), {
      status: "approved",
    });

    await updateDoc(doc(db, "artisans", item.uid), {
      vip: true,
    });

    alert("✔ تم تفعيل VIP");
    window.location.reload();
  };

  return (
    <div className="page">
      <h2>إدارة اشتراكات VIP</h2>

      {list.length === 0 && <p>لا توجد طلبات.</p>}

      {list.map((r) => (
        <div key={r.id} className="vip-request">
          <p>👤 UID: {r.uid}</p>
          <p>الخطة: {r.plan}</p>
          <p>السعر: {r.price} دج</p>
          <p>الحالة: {r.status}</p>

          {r.proofUrl && (
            <a href={r.proofUrl} target="_blank" rel="noreferrer">
              عرض الوصل
            </a>
          )}

          {r.status !== "approved" && (
            <button onClick={() => approve(r)}>تفعيل</button>
          )}
        </div>
      ))}
    </div>
  );
}