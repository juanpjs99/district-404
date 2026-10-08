/**
 * Home.jsx - Página principal de District 404
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import logotype from '../../assets/Element-corona.png'; 
import guySpray from '../../assets/guy-soft-crew.png';
import liquidWall from '../../assets/liquid-wall.png';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, toggleLanguage } = useTheme();
  
  // Contenido multiidioma de la landing pública.
  const content = {
    es: {
      navBlog: 'Blog',
      navProjects: 'Proyectos',
      navMembers: 'Miembros',
      navContact: 'Contacto',
      navAbout: 'Sobre Nosotros',
      login: 'Ingresar',
      register: 'Registrarse',
      whatWeDoTitle: '¿Qué hacemos?',
      whatWeDoCta: 'Explorar proyectos',
      blogTitle: 'Visita Nuestro Blog',
      blogDescription: 'Artículos sobre desarrollo web, mejores prácticas y tendencias tecnológicas. Aprende de nuestro equipo y únete a la conversación.',
      ctaButton: 'Ir al Blog',
      tagline: 'Donde el Código cobra identidad',
      description: 'Somos una crew apasionada por el software y el diseño. Explora nuestros proyectos, y descubre nuevas tendencias.',
      ctaBlog: 'Ver Blog',
      ctaAbout: 'Conócenos',
      langLabel: 'EN',
      whatWeDoPoints: [
        'Creamos experiencias digitales que inspiran',
        'Fomentamos la colaboración y creatividad',
        'Compartimos conocimiento sin límites',
      ],
    },
    en: {
      navBlog: 'Blog',
      navProjects: 'Projects',
      navMembers: 'Members',
      navContact: 'Contact',
      navAbout: 'About Us',
      login: 'Log In',
      register: 'Sign Up',
      whatWeDoTitle: 'What Do We Do?',
      whatWeDoCta: 'Explore projects',
      blogTitle: 'Visit Our Blog',
      blogDescription: 'Articles about web development, best practices, and the latest tech trends. Learn from our team and join the conversation.',
      ctaButton: 'Go to Blog',
      tagline: 'Where Code Make Identity',
      description: 'We are a community passionate about technology and design. Explore our resources, discover new trends, and be part of the digital evolution.',
      ctaBlog: 'View Blog',
      ctaAbout: 'Meet Us',
      langLabel: 'ES',
      whatWeDoPoints: [
        'We create inspiring digital experiences',
        'We foster collaboration and creativity',
        'We share knowledge without limits',
      ],
    },
  };
  
  const t = content[language];
  
  const [visibleSections, setVisibleSections] = useState({});
  const whatWeDoRef = useRef(null);
  const blogRef = useRef(null);

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

  // Enlaces de navegación del sidebar
  const navLinks = [
    { name: t.navBlog, path: '/blog' },
    { name: t.navProjects, path: '/projects' },
    { name: t.navMembers, path: '/members' },
    { name: t.navContact, path: '/contact' },
    { name: t.navAbout, path: '/about' },
  ];

  const theme = {
    bg: 'bg-[#0D0A14]',
    text: 'text-[#F8FAFC]',
    sidebarBg: 'linear-gradient(180deg, #1a1033 0%, #0D0A14 100%)',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      <div className="flex">

        {/* SIDEBAR */}
        <aside
          className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
          style={{
            background: theme.sidebarBg,
             borderRight: '1px solid rgba(168,85,247,0.15)'
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
             className="w-full h-20 flex items-center justify-center transition-colors hover:bg-white/5"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-6 h-0.5 transition-transform ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
              <span className={`block w-6 h-0.5 transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
              <span className={`block w-6 h-0.5 transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: '#3B82F6' }} />
            </div>
          </button>

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
                       className="flex items-center gap-4 px-6 py-4 text-[#F8FAFC]/80 transition-all duration-200 hover:bg-white/5 hover:text-white"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FF7A00] shadow-[0_0_10px_rgba(255,122,0,0.5)]" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

           {/* CONTROL DE IDIOMA */}
           <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3">
             <button
               onClick={toggleLanguage}
              className={`flex items-center justify-center transition-all duration-200 ${
                sidebarOpen ? 'w-[calc(100%-2rem)] px-4 py-3 rounded-xl gap-3' : 'w-12 h-12 rounded-xl'
               } bg-[#1a1033] hover:bg-[#2a1852]`}
            >
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                   className="font-medium text-sm text-white"
                >
                  {t.langLabel}
                </motion.span>
              )}
            </button>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className={`flex-1 relative transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

          {/* BOTONES DE AUTENTICACIÓN */}
          <div className="absolute top-6 right-6 md:right-12 z-50 flex items-center gap-4 md:gap-6">
            {user ? (
              <>
                 <Link to="/profile" className="hidden sm:block font-medium text-[#F8FAFC] transition-colors duration-200 hover:text-[#FF7A00]">
                  Hola, {user.person?.firstName}
                </Link>
                <button onClick={logout} className="rounded-lg border border-red-400/20 bg-red-500/10 px-5 py-2 font-medium text-red-200 transition hover:bg-red-500/20">Salir</button>
              </>
            ) : (
              <>
                 <Link to="/login" className="font-medium text-[#F8FAFC] transition-colors duration-200 hover:text-[#FF7A00]">{t.login}</Link>
                 <Link to="/register" className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#A855F7] px-5 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] md:px-6 md:py-2.5">{t.register}</Link>
               </>
             )}
           </div>

          {/* SECCIÓN HERO */}
          <section className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden">
           <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#A855F7]/10 blur-[128px]" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#3B82F6]/10 blur-[128px]" />
           </div>

            {/* Marcas discretas de código y graffiti para dar textura al hero. */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0 font-mono select-none">
              <span className="absolute left-[9%] top-[18%] -rotate-12 text-3xl md:text-5xl font-bold text-[#3B82F6]/25">&lt;/&gt;</span>
              <span className="absolute right-[12%] top-[31%] rotate-6 text-xl md:text-3xl font-bold tracking-widest text-[#FF7A00]/30">{'{404}'}</span>
              <span className="absolute left-[16%] bottom-[19%] -rotate-6 text-xs md:text-sm font-bold tracking-[0.45em] text-[#FF7A00]/30">SPRAY//</span>
              <span className="absolute right-[24%] bottom-[14%] rotate-12 text-2xl md:text-4xl font-bold text-[#3B82F6]/25">#404</span>
              <span className="absolute right-[31%] top-[18%] text-2xl font-bold tracking-widest text-[#FF7A00]/25">::</span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.95, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 md:left-3 lg:left-8 top-1/2 -translate-x-[90px] -translate-y-1/2 w-[240px] sm:w-[290px] md:w-[390px] lg:w-[500px] xl:w-[560px] h-auto z-[1] pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 24px rgba(59, 130, 246, 0.55)) drop-shadow(0 0 52px rgba(255, 122, 0, 0.2))' }}
            >
              <img src={guySpray} alt="" className="mt-50 w-full h-auto object-contain" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute right-0 top-0 w-45 md:w-62.5 lg:w-[320px] h-auto z-0 pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.3))' }}
            >
              <img src={liquidWall} alt="" className="h-auto object-contain" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center w-full max-w-4xl mx-auto relative z-10 px-8 md:px-16 lg:px-24"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-24 h-24 md:w-32 md:h-32 -mb-1 flex items-center justify-center"
                >
                  <img
                    src={logotype}
                    alt="District 404 Logo"
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' }}
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#F8FAFC] via-[#DBEAFE] to-[#F8FAFC] bg-clip-text text-transparent"
                  style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)' }}
                >
                  District 404
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 font-medium text-[#F8FAFC]/90"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)' }}
              >
                {t.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base md:text-lg max-w-2xl mb-8 md:mb-10 leading-relaxed text-[#F8FAFC]/60"
                style={{ fontFamily: 'Exo, sans-serif', textShadow: '0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.15)' }}
              >
                {t.description}
              </motion.p>

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
                  to="/about"
                  className="px-8 py-3.5 font-semibold rounded-lg bg-white/10 text-white transition-all duration-200 border border-white/10 hover:bg-white/20"
                  style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)' }}
                >
                  {t.ctaAbout}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-6 h-10 rounded-full border-2 border-[#F8FAFC]/30 flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-2 bg-[#3B82F6] rounded-full"
                  style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.5)' }}
                />
              </div>
            </motion.div>
          </section>

           {/* SECCIÓN "¿QUÉ HACEMOS?" */}
           <section
             id="what-we-do"
             ref={whatWeDoRef}
             className="min-h-screen flex items-center justify-center px-6 py-24 md:px-10 relative overflow-hidden"
             style={{ background: '#FF7A00' }}
           >
             <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
               <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-[#442B76]/20 md:h-96 md:w-96" />
               <div className="absolute -left-12 top-28 h-56 w-56 rounded-full border border-[#442B76]/15 md:h-80 md:w-80" />
               <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#442B76]/20 blur-[100px]" />
               <div className="absolute inset-x-0 top-1/2 h-px rotate-[-8deg] bg-[#442B76]/15" />
               <div className="absolute inset-x-0 top-1/2 h-px rotate-[8deg] bg-[#442B76]/10" />
               <div className="absolute right-8 top-8 font-mono text-[10px] font-bold tracking-[0.35em] text-[#442B76]/60 md:right-12 md:top-12">D404 // FIELD NOTES</div>
             </div>

             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8 }}
               className="relative z-10 w-full max-w-6xl"
             >
               <div className="mb-14 flex flex-col items-start justify-between gap-8 border-b border-[#442B76]/30 pb-10 md:flex-row md:items-end">
                 <div className="max-w-3xl">
                   <motion.p
                     initial={{ opacity: 0, x: -20 }}
                     animate={visibleSections['what-we-do'] ? { opacity: 1, x: 0 } : {}}
                     transition={{ duration: 0.5 }}
                     className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.35em] text-[#442B76]"
                   >
                     01 / Our practice
                   </motion.p>
                   <motion.h2
                     initial={{ opacity: 0, y: 20 }}
                     animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-left text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#442B76] md:text-7xl lg:text-8xl"
                     style={{ fontFamily: 'var(--font-display)', textShadow: '3px 3px 0 rgba(255,255,255,0.35)' }}
                   >
                     {t.whatWeDoTitle}
                   </motion.h2>
                 </div>
                 <p className="max-w-xs text-left font-mono text-xs uppercase leading-6 tracking-[0.16em] text-[#442B76]/75 md:text-right">
                   Ideas with a pulse.<br />Code with a point of view.
                 </p>
               </div>

               <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                 {t.whatWeDoPoints.map((point, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 30 }}
                     animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
                     transition={{ duration: 0.5, delay: 0.25 + index * 0.15 }}
                     className="group relative min-h-56 overflow-hidden rounded-[1.75rem] border border-[#F8FAFC]/20 bg-[#301947] p-7 text-left shadow-[0_18px_0_rgba(68,43,118,0.18)] transition-transform duration-300 hover:-translate-y-2"
                   >
                     <span className="absolute -right-3 -top-7 text-8xl font-black text-[#FF7A00]/20 transition-transform duration-300 group-hover:scale-110" style={{ fontFamily: 'var(--font-display)' }}>{String(index + 1).padStart(2, '0')}</span>
                     <div className="relative flex h-full flex-col justify-between gap-10">
                       <div className="flex items-center justify-between">
                         <span className="font-mono text-xs tracking-[0.25em] text-[#FF7A00]">0{index + 1} / 03</span>
                         <span className="h-2 w-2 rounded-full bg-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.9)]" />
                       </div>
                       <p className="max-w-xs text-xl leading-tight text-[#F8FAFC]" style={{ fontFamily: 'Exo, sans-serif' }}>{point}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>

               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={visibleSections['what-we-do'] ? { opacity: 1, y: 0 } : {}}
                 transition={{ duration: 0.6, delay: 0.75 }}
                 className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-[#442B76]/30 pt-7 sm:flex-row sm:items-center"
               >
                 <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#442B76]/70">Build / share / repeat</span>
                 <Link
                   to="/projects"
                   className="group inline-flex items-center gap-5 rounded-full bg-[#301947] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_0_5px_rgba(255,255,255,0.2),0_12px_30px_rgba(48,25,71,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#442B76] hover:shadow-[0_0_0_7px_rgba(255,255,255,0.28),0_16px_35px_rgba(48,25,71,0.45)]"
                 >
                   {t.whatWeDoCta}
                   <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FF7A00] text-xl leading-none text-[#301947] transition-transform duration-300 group-hover:rotate-45">↗</span>
                 </Link>
               </motion.div>
             </motion.div>
           </section>

          {/* SECCIÓN BLOG */}
          <section
            id="blog-section"
            ref={blogRef}
            className="min-h-screen flex items-center justify-center px-8 py-20 relative"
            style={{
               background: 'linear-gradient(180deg, #0D0A14 0%, #0f0a1a 100%)'
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#FF7A00]/5 blur-[120px]" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visibleSections['blog-section'] ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={visibleSections['blog-section'] ? { scale: 1 } : {}}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-10 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#E86B00] flex items-center justify-center shadow-[0_0_50px_rgba(255,122,0,0.4)]"
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections['blog-section'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t.blogTitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections['blog-section'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl mb-12 leading-relaxed max-w-xl mx-auto text-[#F8FAFC]/60"
                style={{ fontFamily: 'Exo, sans-serif' }}
              >
                {t.blogDescription}
              </motion.p>

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
