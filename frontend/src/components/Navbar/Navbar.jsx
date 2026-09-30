import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Button from "../Button/Button";
import { useTheme } from '../../contexts/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "text-blue-500 font-semibold"
        : "text-slate-300 hover:text-blue-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0a14]/90 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <NavLink
          to="/"
          className="flex items-center gap-3 text-xl font-black tracking-[.14em] text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-xs tracking-normal">D4</span>
          DISTRICT
        </NavLink>

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            {t.home}
          </NavLink>

          <NavLink to="/blog" className={navLinkClass}>
            {t.blog}
          </NavLink>

          <NavLink to="/projects" className={navLinkClass}>Proyectos</NavLink>
          <NavLink to="/members" className={navLinkClass}>Miembros</NavLink>
          <NavLink to="/about" className={navLinkClass}>{t.about}</NavLink>

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
