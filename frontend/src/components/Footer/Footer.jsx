export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} District 404. Todos los derechos reservados.
        </p>

        <p className="text-slate-500 text-sm mt-3 md:mt-0">
          Desarrollado con React + Tailwind CSS
        </p>

      </div>
    </footer>
  );
}