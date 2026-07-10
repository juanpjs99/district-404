/**
 * Página de perfil de un miembro de District 404.
 */

import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="max-w-6xl mx-auto py-10 px-6">

        {/* Perfil */}
        <section className="bg-gray-800 rounded-lg p-8">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* Avatar */}
            <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center text-5xl font-bold">
              {user?.person?.firstName?.charAt(0) || "U"}
            </div>

            {/* Información */}
            <div className="flex-1">

              <h2 className="text-4xl font-bold">
                {user
                  ? `${user.person?.firstName} ${user.person?.firstSurname ?? ""}`
                  : "Nombre del usuario"}
              </h2>

              <p className="text-blue-400 text-xl mt-2">
                Full Stack Developer
              </p>

              <p className="text-gray-400 mt-2">
                📍 Medellín, Colombia
              </p>

              <p className="text-gray-300 mt-6">
                Desarrollador apasionado por crear aplicaciones web modernas,
                APIs REST y soluciones escalables utilizando React, Flask,
                Node.js y MySQL.
              </p>

              <div className="flex gap-4 mt-6">

                <button className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
                  Contactar
                </button>

                <button className="px-5 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
                  Descargar CV
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* Tecnologías */}
        <section className="mt-8">

          <h3 className="text-2xl font-bold mb-4">
            Tecnologías
          </h3>

          <div className="flex flex-wrap gap-3">

            {[
              "React",
              "JavaScript",
              "Python",
              "Flask",
              "Node.js",
              "MySQL",
              "Git",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-gray-800 px-4 py-2 rounded-lg"
              >
                {tech}
              </span>
            ))}

          </div>

        </section>

        {/* Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold">12</h3>
            <p className="text-gray-400 mt-2">Proyectos</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold">4</h3>
            <p className="text-gray-400 mt-2">Artículos</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold">3+</h3>
            <p className="text-gray-400 mt-2">Años de experiencia</p>
          </div>

        </section>

        {/* Proyectos */}
        <section className="mt-10">

          <h3 className="text-2xl font-bold mb-4">
            Proyectos destacados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h4 className="text-xl font-bold">
                District 404
              </h4>

              <p className="text-gray-400 mt-2">
                Plataforma colaborativa desarrollada con React, Node.js y MySQL.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h4 className="text-xl font-bold">
                Sneaker Clinic
              </h4>

              <p className="text-gray-400 mt-2">
                Sistema para la gestión de reparación y seguimiento de sneakers.
              </p>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Profile;