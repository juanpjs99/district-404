import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved ? saved : 'es';
  });

  const t = {
    es: { 
      themeLabel: darkMode ? 'Claro' : 'Oscuro', 
      langLabel: 'ES', 
      loginTitle: 'Ingresar', 
      registerTitle: 'Crear Cuenta',
      buttonLogin: 'Entrar',
      buttonRegister: 'Registrarse',
      toggleLogin: '¿No tienes cuenta?',
      toggleRegister: '¿Ya tienes cuenta?',
      toggleActionLogin: 'Regístrate',
      toggleActionRegister: 'Inicia sesión',
      backToHome: 'Volver al inicio'
    },
    en: { 
      themeLabel: darkMode ? 'Light' : 'Dark', 
      langLabel: 'EN', 
      loginTitle: 'Log In', 
      registerTitle: 'Create Account',
      buttonLogin: 'Login',
      buttonRegister: 'Register',
      toggleLogin: 'Don\'t have an account?',
      toggleRegister: 'Already have an account?',
      toggleActionLogin: 'Sign up',
      toggleActionRegister: 'Log in',
      backToHome: 'Back to Home'
    }
  }[language];

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const theme = {
    bg: darkMode ? 'bg-[#0D0A14]' : 'bg-[#F8FAFC]',
    text: darkMode ? 'text-[#F8FAFC]' : 'text-[#301947]',
    sidebarBg: darkMode ? 'linear-gradient(180deg, #1a1033 0%, #0D0A14 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      {/* SIDEBAR - Ajustado ancho w-16 para móvil */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${sidebarOpen ? 'w-48 md:w-64' : 'w-16 md:w-20'}`}
        style={{
          background: theme.sidebarBg,
          borderRight: `1px solid ${darkMode ? 'rgba(168,85,247,0.15)' : 'rgba(59,130,246,0.15)'}`
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`w-full h-20 flex items-center justify-center transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-[#3B82F6]/5'}`}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 transition-transform ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
            <span className={`block w-6 h-0.5 transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
            <span className={`block w-6 h-0.5 transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
          </div>
        </button>

        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center justify-center transition-all duration-200 ${sidebarOpen ? 'w-[calc(100%-2rem)] px-4 py-3 rounded-xl gap-3' : 'w-10 h-10 md:w-12 md:h-12 rounded-xl'} ${darkMode ? 'bg-[#1a1033] hover:bg-[#2a1852]' : 'bg-[#DBEAFE] hover:bg-[#BFDBFE]'}`}
          >
            {darkMode ? <svg className="w-5 h-5 text-[#FF7A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-5 h-5 text-[#301947]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
            {sidebarOpen && <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#301947]'}`}>{t.themeLabel}</span>}
          </button>

          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className={`flex items-center justify-center transition-all duration-200 ${sidebarOpen ? 'w-[calc(100%-2rem)] px-4 py-3 rounded-xl gap-3' : 'w-10 h-10 md:w-12 md:h-12 rounded-xl'} ${darkMode ? 'bg-[#1a1033] hover:bg-[#2a1852]' : 'bg-[#DBEAFE] hover:bg-[#BFDBFE]'}`}
          >
            <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
            {sidebarOpen && <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#301947]'}`}>{t.langLabel}</span>}
          </button>
        </div>
      </aside>

      {/* CONTENIDO RESPONSIVO */}
      <main className={`h-screen w-full flex items-center justify-center relative pl-16 md:pl-20 transition-all duration-300`}>
        
        {/* BOTÓN VOLVER AL INICIO - Posicionamiento ajustado para no chocar */}
        <div className="absolute top-6 left-20 md:left-24">
            <Link to="/" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2 font-medium text-sm md:text-base whitespace-nowrap">
                <span className="text-lg">←</span> {t.backToHome}
            </Link>
        </div>

        <div className="bg-[#1a1b26]/60 backdrop-blur-md border border-purple-500/20 shadow-[0_0_50px_rgba(79,70,229,0.15)] rounded-2xl p-6 md:p-8 w-full max-w-sm md:max-w-md mx-4">
           <h2 className="text-2xl font-bold text-white text-center mb-6">
             {isLogin ? t.loginTitle : t.registerTitle}
           </h2>
           
           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
             {!isLogin && (
               <input type="text" placeholder="Nombre" className="w-full bg-[#1e2030]/50 border border-slate-700/50 text-white rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" />
             )}
             <input type="email" placeholder="Email" className="w-full bg-[#1e2030]/50 border border-slate-700/50 text-white rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" />
             <input type="password" placeholder="Contraseña" className="w-full bg-[#1e2030]/50 border border-slate-700/50 text-white rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" />
             
             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-3 transition-all text-sm">
               {isLogin ? t.buttonLogin : t.buttonRegister}
             </button>
           </form>

           <p className="text-xs text-slate-400 text-center mt-5">
             {isLogin ? t.toggleLogin : t.toggleRegister} {' '}
             <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline cursor-pointer">
               {isLogin ? t.toggleActionLogin : t.toggleActionRegister}
             </button>
           </p>
        </div>
      </main>
    </div>
  );
};

export default Login;