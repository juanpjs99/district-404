export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Encabezado Principal */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          Sobre Nosotros
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Construyendo el futuro de la tecnología y el desarrollo de software en District_404.
        </p>
      </section>

      <hr className="border-slate-800" />

      {/* Misión y Visión */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-3">
          <h2 className="text-2xl font-bold text-blue-400">Nuestra Misión</h2>
          <p className="text-slate-300 leading-relaxed">
            Ofrecer soluciones de software robustas, eficientes y escalables que resuelvan problemas reales.
            Nos apasiona el código limpio, la optimización de hardware y la creación de experiencias digitales
            excepcionales que impulsen el crecimiento de nuestros proyectos.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-3">
          <h2 className="text-2xl font-bold text-indigo-400">Nuestra Visión</h2>
          <p className="text-slate-300 leading-relaxed">
            Convertirnos en un referente de innovación tecnológica y desarrollo full-stack, destacando por la
            calidad técnica de nuestras infraestructuras, bases de datos integradas y la agilidad para adaptarnos
            a las demandas del entorno digital actual.
          </p>
        </div>
      </section>

      {/* Valores de Ingeniería */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Nuestros Pilares</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-slate-900/30 border border-slate-850 rounded-xl">
            <div className="text-3xl mb-3 text-blue-500">💻</div>
            <h3 className="text-lg font-semibold mb-2">Desarrollo Full-Stack</h3>
            <p className="text-sm text-slate-400">Integración limpia entre interfaces de usuario interactivas y arquitecturas lógicas en el backend.</p>
          </div>
          <div className="text-center p-6 bg-slate-900/30 border border-slate-850 rounded-xl">
            <div className="text-3xl mb-3 text-indigo-500">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Rendimiento y Optimización</h3>
            <p className="text-sm text-slate-400">Estructuras eficientes que minimizan los tiempos de carga mediante técnicas como lazy loading.</p>
          </div>
          <div className="text-center p-6 bg-slate-900/30 border border-slate-850 rounded-xl">
            <div className="text-3xl mb-3 text-emerald-500">🗄️</div>
            <h3 className="text-lg font-semibold mb-2">Estructura de Datos</h3>
            <p className="text-sm text-slate-400">Bases de datos relacionales organizadas rigurosamente para garantizar la consistencia de la información.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
