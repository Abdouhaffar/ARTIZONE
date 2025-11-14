
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import RegisterArtisan from "./components/RegisterArtisan";
import SearchArtisan from "./components/SearchArtisan";

import VipInfo from "./components/VipInfo";
import VipPayment from "./components/VipPayment";
import VipManager from "./components/VipManager";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

import ArtisanDetails from "./components/ArtisanDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Artisan */}
        <Route path="/register" element={<RegisterArtisan />} />
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