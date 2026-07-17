import { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// Carga perezosa (Lazy) de todas las páginas unificadas
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Blog = lazy(() => import('../pages/blog/blog'));
const Contact = lazy(() => import('../pages/contact/contact'));
const AboutUs = lazy(() => import('../pages/about_us/about_us'));

// CORREGIDO: 'Profile' ahora empieza con mayúscula y apunta correctamente a tu ruta
const Profile = lazy(() => import('../pages/profile/profile')); 

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
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rutas que SÍ llevan Navbar y Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Rutas limpias SIN Navbar ni Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}