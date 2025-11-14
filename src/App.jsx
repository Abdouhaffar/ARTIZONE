// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "./components/Home";

// Artisan
import RegisterArtisan from "./components/RegisterArtisan";
import SearchArtisan from "./components/SearchArtisan";
import ArtisanDetails from "./components/ArtisanDetails";
import ArtisanLogin from "./components/ArtisanLogin"; // ⬅ تمت إضافته

// VIP
import VipInfo from "./components/VipInfo";
import VipPayment from "./components/VipPayment";
import VipManager from "./components/VipManager";

// Admin
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ARTISAN */}
        <Route path="/register" element={<RegisterArtisan />} />
        <Route path="/artisan-login" element={<ArtisanLogin />} /> {/* ⬅ الجديد */}
        <Route path="/search" element={<SearchArtisan />} />
        <Route path="/artisan/:id" element={<ArtisanDetails />} />

        {/* VIP */}
        <Route path="/vip" element={<VipInfo />} />
        <Route path="/vip-payment" element={<VipPayment />} />
        <Route path="/vip-manager" element={<VipManager />} />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}