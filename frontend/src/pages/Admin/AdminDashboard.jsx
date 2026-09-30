import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#0D0A14] px-6 py-8 text-[#F8FAFC] md:px-12">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6]">District 404</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Dashboard administrativo</h1>
          <p className="mt-2 text-sm text-white/60">
            Sesión activa para {user?.username}.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-[#FF7A00] hover:text-white"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 py-10 md:grid-cols-3">
        {[
          ['Proyectos', 'Gestionar los proyectos publicados por el equipo.'],
          ['Publicaciones', 'Crear borradores y administrar artículos del blog.'],
          ['Multimedia', 'Subir imágenes y videos a Cloudinary.'],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
            <span className="mt-6 inline-block text-xs uppercase tracking-wider text-[#FF7A00]">
              Próximamente
            </span>
          </article>
        ))}
      </section>

      <Link to="/" className="mx-auto block max-w-6xl text-sm text-[#3B82F6] hover:text-[#60A5FA]">
        Volver al sitio público
      </Link>
    </main>
  );
};

export default AdminDashboard;
