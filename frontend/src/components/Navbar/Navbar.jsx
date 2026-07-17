import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Button from "../Button/Button";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "text-blue-500 font-semibold"
        : "text-slate-300 hover:text-blue-400"
    }`;

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <NavLink
          to="/"
          className="text-2xl font-bold text-white tracking-wide"
        >
          District404
        </NavLink>

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>

          <NavLink to="/projects" className={navLinkClass}>
            Proyectos
          </NavLink>

          <NavLink to="/members" className={navLinkClass}>
            Miembros
          </NavLink>

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>

        </div>

        <div className="flex items-center gap-3">

          {user ? (
            <>
              <span className="text-slate-300">
                Hola, {user.person?.firstName}
              </span>

              <Button variant="danger" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="secondary">
                  Entrar
                </Button>
              </NavLink>

              <NavLink to="/register">
                <Button variant="primary">
                  Registrarse
                </Button>
              </NavLink>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}