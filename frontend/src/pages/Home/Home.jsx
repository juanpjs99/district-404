/**
 * Página principal (Home) de District 404.
 * Muestra el estado de autenticación y enlaces a las secciones principales.
 */
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-2xl font-bold">District 404</h1>
        <div className="flex gap-4 items-center">
          <Link to="/projects" className="hover:text-blue-400">Proyectos</Link>
          <Link to="/members" className="hover:text-blue-400">Miembros</Link>
          <Link to="/blog" className="hover:text-blue-400">Blog</Link>
          {user ? (
            <>
              <span className="text-gray-400">Hola, {user.person?.firstName}</span>
              <button onClick={logout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                Entrar
              </Link>
              <Link to="/register" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center py-20">
      <h2 className="text-5xl font-bold mb-4">¡Bienvenido a District 404!</h2>
        <p className="text-xl text-gray-400 mb-8">Plataforma colaborativa de proyectos</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Proyectos</h3>
            <p className="text-gray-400">Explora y colabora en proyectos del equipo</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Miembros</h3>
            <p className="text-gray-400">Conoce al equipo y sus perfiles</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Blog</h3>
            <p className="text-gray-400">Lee las últimas publicaciones</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
