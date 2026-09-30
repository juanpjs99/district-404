import { Suspense, lazy } from 'react';
import { Navigate, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import AdminRoute from './AdminRoute';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


// Carga perezosa (Lazy) de todas las páginas unificadas
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const Register = lazy(() => import('../pages/Register/Register'));
const Blog = lazy(() => import('../pages/Blog/blog'));
const Contact = lazy(() => import('../pages/contact/contact'));
const AboutUs = lazy(() => import('../pages/about_us/about_us'));

// CORREGIDO: 'Profile' ahora empieza con mayúscula y apunta correctamente a tu ruta
const Profile = lazy(() => import('../pages/profile/profile'));
const Members = lazy(() => import('../pages/Members/Members'));
const MemberPublic = lazy(() => import('../pages/Members/MemberPublic'));
const AdminMembers = lazy(() => import('../pages/Members/AdminMembers'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const ProjectDetail = lazy(() => import('../pages/Projects/ProjectDetail'));

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function RoleRoute({ roles }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user && roles.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
}

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
        <Route path="/" element={<Home />} />
        {/* Rutas que SÍ llevan Navbar y Footer */}
        <Route element={<Layout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about_us" element={<Navigate to="/about" replace />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:username" element={<MemberPublic />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<RoleRoute roles={['admin', 'superadmin']} />}>
            <Route path="/dashboard/members" element={<AdminMembers />} />
          </Route>
        </Route>

        {/* Rutas limpias SIN Navbar ni Footer */}
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
