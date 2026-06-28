import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#301947]">
      <nav className="bg-[#3B82F6] p-4">
        <Link to="/" className="text-white font-bold text-xl">District 404</Link>
      </nav>
      <main className="max-w-4xl mx-auto py-20 px-8 text-center">
        <h1 className="text-5xl font-bold text-[#3B82F6] mb-6">Contáctanos</h1>
        <p className="text-xl text-[#64748B] mb-10">
          ¿Tienes preguntas? Escríbenos a contacto@district404.com
        </p>
        <Link to="/" className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg">Volver al Inicio</Link>
      </main>
    </div>
  );
};

export default ContactPage;
