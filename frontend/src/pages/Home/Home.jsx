/**
 * Home.jsx - Página principal de District 404
 * 
 * Este componente implementa la página de inicio con:
 * - Sidebar colapsable con navegación
 * - Toggle de tema claro/oscuro
 * - Sección hero con logo y CTA
 * - Sección "¿Qué hacemos?" con scroll-triggered animations
 * - Sección de invitación al blog
 * 
 * @requires framer-motion - Para animaciones suaves
 * @requires react-router-dom - Para navegación entre páginas
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logotype from '../../assets/Element-corona.png' // Logo de la crew
import guySpray from '../../assets/guy-spray.png'
import liquidWall from '../../assets/liquid-wall.png'

/* ============================================
   ESTADO Y VARIABLES GLOBALES DEL COMPONENTE
   ============================================ */

const Home = () => {
  // Estado del sidebar (colapsado/expandido)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Estado del tema (oscuro/claro) con persistencia en localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  
  // Estado del idioma (español/inglés) con persistencia en localStorage
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved ? saved : 'es';
  });
  
  // Contenido multiidioma
  const content = {
    es: {
      whatWeDoTitle: '¿Qué hacemos?',
      blogTitle: 'Visita Nuestro Blog',
      blogDescription: 'Artículos sobre desarrollo web, mejores prácticas y tendencias tecnológicas. Aprende de nuestro equipo y únete a la conversación.',
      ctaButton: 'Ir al Blog',
      tagline: 'Donde el Código cobra identidad',
      ctaBlog: 'Ver Blog',
      ctaAbout: 'Conócenos',
      themeLabel: darkMode ? 'Claro' : 'Oscuro',
      langLabel: 'EN',
      whatWeDoPoints: [
        'Creamos experiencias digitales que inspiran',
        'Fomentamos la colaboración y creatividad',
        'Compartimos conocimiento sin límites',
      ],
    },
    en: {
      whatWeDoTitle: 'What Do We Do?',
      blogTitle: 'Visit Our Blog',
      blogDescription: 'Articles about web development, best practices, and the latest tech trends. Learn from our team and join the conversation.',
      ctaButton: 'Go to Blog',
      tagline: 'Where Code Make Identity',
      ctaBlog: 'View Blog',
      ctaAbout: 'Meet Us',
      themeLabel: darkMode ? 'Light' : 'Dark',
      langLabel: 'ES',
      whatWeDoPoints: [
        'We create inspiring digital experiences',
        'We foster collaboration and creativity',
        'We share knowledge without limits',
      ],
    },
  };
  
  const t = content[language];
  
  // Estado para tracking de secciones visibles (IntersectionObserver)
  const [visibleSections, setVisibleSections] = useState({});
  
  // Refs para los elementos que disparan animaciones al hacer scroll
  const whatWeDoRef = useRef(null);
  const blogRef = useRef(null);

  /* ============================================
     EFECTOS SECUNDARIOS (useEffect)
     ============================================ */

  // Efecto para persistir el tema en localStorage
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Efecto para persistir el idioma en localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Efecto para IntersectionObserver - detecta cuando las secciones entran en viewport
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (whatWeDoRef.current) observer.observe(whatWeDoRef.current);
    if (blogRef.current) observer.observe(blogRef.current);

    return () => observer.disconnect();
  }, []);

  /* ============================================
     DATOS ESTÁTICOS
     ============================================ */

  // Enlaces de navegación del sidebar
  const navLinks = [
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about_us' },
  ];



  /* ============================================
     CONFIGURACIÓN DE TEMAS
     ============================================ */

  // Objeto de temas para estilos dinámicos según modo claro/oscuro
  // Permite transiciones suaves entre temas sin duplicar código
  const theme = {
    bg: darkMode ? 'bg-[#0D0A14]' : 'bg-[#F8FAFC]',
    text: darkMode ? 'text-[#F8FAFC]' : 'text-[#301947]',
    textMuted: darkMode ? 'text-[#F8FAFC]/60' : 'text-[#64748B]',
    sidebarBg: darkMode ? 'linear-gradient(180deg, #1a1033 0%, #0D0A14 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
    sidebarBorder: darkMode ? 'border-[rgba(168,85,247,0.15)]' : 'border-[rgba(59,130,246,0.15)]',
    cardBg: darkMode ? 'bg-[#1a1033]/80' : 'bg-white/80',
    cardBorder: darkMode ? 'border-white/10' : 'border-[#DBEAFE]',
    cardHoverBorder: darkMode ? 'hover:border-[#3B82F6]/30' : 'hover:border-[#3B82F6]/50',
    glowPurple: darkMode ? 'bg-[#A855F7]/10' : 'bg-[#A855F7]/20',
    glowBlue: darkMode ? 'bg-[#3B82F6]/10' : 'bg-[#3B82F6]/20',
    btnOutline: darkMode ? 'bg-white/10 border-white/10 hover:bg-white/20' : 'bg-[#301947]/10 border-[#301947]/20 hover:bg-[#301947]/20',
  };

  /* ============================================
     RENDERIZADO PRINCIPAL
     ============================================ */

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      <div className="flex">

        {/* ============================================
            SIDEBAR - Navegación lateral colapsable
            Incluye toggle de tema y menú de navegación
            ============================================ */}
        <aside
          className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
          style={{
            background: theme.sidebarBg,
            borderRight: `1px solid ${darkMode ? 'rgba(168,85,247,0.15)' : 'rgba(59,130,246,0.15)'}`
          }}
        >
          {/* Botón hamburger para expandir/colapsar sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full h-20 flex items-center justify-center transition-colors ${
              darkMode ? 'hover:bg-white/5' : 'hover:bg-[#3B82F6]/5'
            }`}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-6 h-0.5 transition-transform ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
              <span className={`block w-6 h-0.5 transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
              <span className={`block w-6 h-0.5 transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
            </div>
          </button>



          {/* Menú de navegación con animación de entrada */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                        darkMode ? 'text-[#F8FAFC]/80 hover:text-white hover:bg-white/5' : 'text-[#301947]/70 hover:text-[#301947] hover:bg-[#3B82F6]/5'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FF7A00] shadow-[0_0_10px_rgba(255,122,0,0.5)]" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Botones de toggle (tema e idioma) en la parte inferior del sidebar - siempre visibles */}
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3">
            {/* Botón de toggle tema claro/oscuro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center justify-center transition-all duration-200 ${
                sidebarOpen ? 'w-[calc(100%-2rem)] px-4 py-3 rounded-xl gap-3' : 'w-12 h-12 rounded-xl'
              } ${darkMode ? 'bg-[#1a1033] hover:bg-[#2a1852]' : 'bg-[#DBEAFE] hover:bg-[#BFDBFE]'}`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-[#FF7A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#301947]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#301947]'}`}
                >
                  {language === 'es' ? (darkMode ? 'Claro' : 'Oscuro') : (darkMode ? 'Light' : 'Dark')}
                </motion.span>
              )}
            </button>

            {/* Botón de toggle idioma español/inglés */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className={`flex items-center justify-center transition-all duration-200 ${
                sidebarOpen ? 'w-[calc(100%-2rem)] px-4 py-3 rounded-xl gap-3' : 'w-12 h-12 rounded-xl'
              } ${darkMode ? 'bg-[#1a1033] hover:bg-[#2a1852]' : 'bg-[#DBEAFE] hover:bg-[#BFDBFE]'}`}
              aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#301947]'}`}
                >
                  {language === 'es' ? 'EN' : 'ES'}
                </motion.span>
              )}
            </button>
          </div>
        </aside>

        {/* ============================================
            CONTENIDO PRINCIPAL
            ============================================ */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

          {/* ============================================
              SECCIÓN HERO - Presentación principal
              Incluye logo animado, título y CTAs
              ============================================ */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden">
            {/* Fondos con efectos de glow difuminado */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-[#A855F7]/10' : 'bg-[#A855F7]/15'} rounded-full blur-[128px]`} />
              <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-[#3B82F6]/10' : 'bg-[#3B82F6]/15'} rounded-full blur-[128px]`} />
            </div>

            {/* Imagen decorativa - anclada a la izquierda, no afecta el layout del contenido */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[180px] md:w-[250px] lg:w-[320px] h-auto z-0 pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))' }}
            >
              <img
                src={guySpray}
                alt=""
                className="mt-50 w-full h-auto object-contain"
              />
            </motion.div>

            {/* Imagen decorativa - anclada a la esquina superior derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute right-0 top-0 w-45 md:w-62.5 lg:w-[320px] h-auto z-0 pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.3))' }}
            >
              <img
                src={liquidWall}
                alt=""
                className=" h-auto object-contain"
              />
            </motion.div>

            {/* Contenido centrado - bloque unitario */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center w-full max-w-4xl mx-auto relative z-10 px-8 md:px-16 lg:px-24"
            >
              {/* Logo de la crew */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-32 h-32 md:w-40 md:h-40 mb-6 flex items-center justify-center"
>
                <img
                  src={logotype}
                  alt="District 404 Logo"
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' }}
                />
              </motion.div>

              {/* Título principal */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 ${darkMode ? 'bg-linear-to-r from-[#F8FAFC] via-[#DBEAFE] to-[#F8FAFC] bg-clip-text text-transparent' : 'text-[#301947]'}`}
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)' }}
              >
                District 404
              </motion.h1>

              {/* Subtítulo / tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 font-medium ${darkMode ? 'text-[#F8FAFC]/90' : 'text-[#3B82F6]'}`}
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)' }}
              >
                {t.tagline}
              </motion.p>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`text-base md:text-lg max-w-2xl mb-8 md:mb-10 leading-relaxed ${darkMode ? 'text-[#F8FAFC]/60' : 'text-[#64748B]'}`}
                style={{ fontFamily: 'Exo, sans-serif', textShadow: '0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.15)' }}
              >
                {t.description}
              </motion.p>

              {/* Botones de acción (CTAs) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/blog"
                  className="px-8 py-3.5 bg-[#FF7A00] text-white font-semibold rounded-lg hover:bg-[#E86B00] transition-all duration-200 shadow-[0_0_20px_rgba(255,122,0,0.4),0_0_40px_rgba(255,122,0,0.2),0_0_60px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6),0_0_50px_rgba(255,122,0,0.3),0_0_80px_rgba(59,130,246,0.3)]"
                >
                  {t.ctaBlog}
                </Link>
                <Link
                  to="/about_us"
                  className={`px-8 py-3.5 font-semibold rounded-lg transition-all duration-200 ${darkMode ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : 'bg-[#3B82F6]/10 text-white hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30'}`}
                  style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)' }}
                >
                  {t.ctaAbout}
                </Link>
              </motion.div>
            </motion.div>

            {/* Indicador de scroll animado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${darkMode ? 'border-[#F8FAFC]/30' : 'border-[#301947]/30'}`}>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-2 bg-[#3B82F6] rounded-full"
                  style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.5)' }}
                />
              </div>
            </motion.div>
          </section>

          {/* ============================================
              SECCIÓN "¿QUÉ HACEMOS?" - Servicios y valores
              Animación triggered por scroll (IntersectionObserver)
              ============================================ */}
          <section
            id="what-we-do"
            ref={whatWeDoRef}
            className="min-h-screen flex items-center justify-center px-8 py-20 relative"
            style={{
              background: '#FF7A00'
            }}
          >
            {/* Glow ambiental con acentos azul y púrpura */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#3B82F6]/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A855F7]/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl relative z-10"
            >
              {/* Título de sección - blanco sobre fondo naranja */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#3B82F6] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t.whatWeDoTitle}
              </motion.h2>

              {/* Línea decorativa con gradiente azul-púrpura */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={visibleSections['what-we-do'] ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-1 bg-linear-to-r from-[#3B82F6] to-[#A855F7] mx-auto mb-16 rounded-full"
              />

              {/* Grid de cards con puntos destacados */}
              <div className="grid md:grid-cols-3 gap-8">
                {t.whatWeDoPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                    className="relative group"
                  >
                    {/* Efecto glow en hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#3B82F6]/30 to-[#A855F7]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Card principal con glassmorphism */}
                    <div
                      className="relative backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-[#3B82F6]/40 transition-all duration-300 bg-white/90"
                      style={{
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {/* Número indicador con gradiente azul-púrpura */}
                      <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-linear-to-br from-[#3B82F6] to-[#A855F7] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                        <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{index + 1}</span>
                      </div>
                      
                      {/* Texto del punto - violeta oscuro */}
                      <p className="text-xl leading-relaxed text-[#301947]" style={{ fontFamily: 'Exo, sans-serif' }}>{point}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ============================================
              SECCIÓN BLOG - Invitación al blog
              CTA animado para dirigir al blog
              ============================================ */}
          <section
            id="blog-section"
            ref={blogRef}
            className="min-h-screen flex items-center justify-center px-8 py-20 relative"
            style={{
              background: darkMode ? 'linear-gradient(180deg, #0D0A14 0%, #0f0a1a 100%)' : 'linear-gradient(180deg, #F8FAFC 0%, #DBEAFE 100%)'
            }}
          >
            {/* Glow ambiental naranja (color de CTA) */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute top-1/3 right-1/4 w-80 h-80 ${darkMode ? 'bg-[#FF7A00]/5' : 'bg-[#FF7A00]/10'} rounded-full blur-[120px]`} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visibleSections['blog-section'] ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl relative z-10"
            >
              {/* Icono de blog con animación spring */}
              <motion.div
                initial={{ scale: 0 }}
                animate={visibleSections['blog-section'] ? { scale: 1 } : {}}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-10 rounded-2xl bg-linear-to-br from-[#FF7A00] to-[#E86B00] flex items-center justify-center shadow-[0_0_50px_rgba(255,122,0,0.4)]"
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </motion.div>

              {/* Título de la sección */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections['blog-section'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#301947]'}`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t.blogTitle}
              </motion.h2>

              {/* Descripción del blog */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections['blog-section'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-xl mb-12 leading-relaxed max-w-xl mx-auto ${darkMode ? 'text-[#F8FAFC]/60' : 'text-[#64748B]'}`}
                style={{ fontFamily: 'Exo, sans-serif' }}
              >
                {t.blogDescription}
              </motion.p>

              {/* Botón CTA principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections['blog-section'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/blog"
                  className="inline-block px-12 py-4 bg-[#3B82F6] text-white font-bold text-lg rounded-xl hover:bg-[#2563EB] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
                >
                  {t.ctaButton}
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
