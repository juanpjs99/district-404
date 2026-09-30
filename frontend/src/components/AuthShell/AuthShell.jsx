import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

export default function AuthShell({ children, eyebrow, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleTheme, toggleLanguage, t } = useTheme();
  const sidebarBackground = darkMode
    ? 'linear-gradient(180deg, #1a1033 0%, #0D0A14 100%)'
    : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0D0A14] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#301947]'}`}>
      <aside className={`fixed left-0 top-0 z-50 h-full transition-all duration-300 ${sidebarOpen ? 'w-48 md:w-64' : 'w-16 md:w-20'}`} style={{ background: sidebarBackground, borderRight: `1px solid ${darkMode ? 'rgba(168,85,247,.15)' : 'rgba(59,130,246,.15)'}` }}>
        <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className={`flex h-20 w-full items-center justify-center transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-blue-500/5'}`} aria-label="Abrir menú">
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-6 bg-blue-500 transition-transform ${sidebarOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-blue-500 transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-blue-500 transition-transform ${sidebarOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3">
          <button type="button" onClick={toggleTheme} className={`flex items-center justify-center transition-all duration-200 ${sidebarOpen ? 'w-[calc(100%-2rem)] gap-3 rounded-xl px-4 py-3' : 'h-10 w-10 rounded-xl md:h-12 md:w-12'} ${darkMode ? 'bg-[#1a1033] hover:bg-[#2a1852]' : 'bg-[#DBEAFE] hover:bg-[#BFDBFE]'}`} aria-label="Cambiar tema">
            <span className={`text-xl ${darkMode ? 'text-[#FF7A00]' : 'text-[#301947]'}`}>{darkMode ? '☼' : '◐'}</span>
            {sidebarOpen && <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#301947]'}`}>{darkMode ? t.light : t.dark}</span>}
          </button>
          <button type="button" onClick={toggleLanguage} className={`flex items-center justify-center transition-all duration-200 ${sidebarOpen ? 'w-[calc(100%-2rem)] gap-3 rounded-xl px-4 py-3' : 'h-10 w-10 rounded-xl md:h-12 md:w-12'} ${darkMode ? 'bg-[#1a1033] hover:bg-[#2a1852]' : 'bg-[#DBEAFE] hover:bg-[#BFDBFE]'}`} aria-label="Cambiar idioma">
            <span className="text-sm font-bold text-blue-400">文</span>
            {sidebarOpen && <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#301947]'}`}>{t.language}</span>}
          </button>
        </div>
      </aside>

      <main className="relative flex min-h-screen w-full items-center justify-center pl-16 transition-all duration-300 md:pl-20">
        <div className="absolute left-20 top-6 md:left-24"><Link to="/" className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-400 transition-colors hover:text-blue-400 md:text-base">← Volver al inicio</Link></div>
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="relative mx-4 w-full max-w-sm rounded-2xl border border-purple-500/20 bg-[#1a1b26]/70 p-6 shadow-[0_0_50px_rgba(79,70,229,.15)] backdrop-blur-md md:max-w-md md:p-8">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-[.3em] text-[#FF7A00]">{eyebrow}</p>
          <h1 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">{title}</h1>
          <p className="mb-6 text-center text-sm text-slate-400">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
