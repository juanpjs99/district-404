import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

export default function BrandSidebar({ open, onClose }) {
  const { darkMode, toggleTheme, toggleLanguage, t } = useTheme();
  const links = [
    { label: t.home, to: '/' },
    { label: t.blog, to: '/blog' },
    { label: t.about, to: '/about' },
    { label: t.contact, to: '/contact' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#0d0a14]/70 backdrop-blur-sm transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#120d1d]/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={onClose}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#a855f7] font-black text-white shadow-[0_0_24px_rgba(59,130,246,.35)]">D4</span>
            <span className="font-bold tracking-[.18em] text-white">DISTRICT</span>
          </Link>
          <button type="button" onClick={onClose} className="text-2xl text-slate-400 md:hidden" aria-label="Cerrar menú">×</button>
        </div>

        <div className="mt-16 space-y-2">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[.3em] text-slate-500">Explore</p>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive ? 'bg-blue-500/10 text-blue-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a00] opacity-60 transition group-[.active]:opacity-100" />
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <button type="button" onClick={toggleTheme} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-3 py-3 text-left text-sm text-slate-300 hover:bg-white/[.07]">
            <span>{darkMode ? t.light : t.dark}</span>
            <span className="text-[#ff7a00]">{darkMode ? '☼' : '◐'}</span>
          </button>
          <button type="button" onClick={toggleLanguage} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-3 py-3 text-left text-sm text-slate-300 hover:bg-white/[.07]">
            <span>Language</span>
            <span className="font-bold text-blue-300">{t.language}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
