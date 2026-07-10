import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import Profile from "../pages/Profile/profile";
import Home from "../pages/Home/Home";


import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas con Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        
        
      </Route>

      {/* Rutas sin Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}