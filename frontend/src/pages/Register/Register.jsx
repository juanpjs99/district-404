/**
 * Página de Registro.
 * Formulario para crear nuevos usuarios (Person + User + Profile).
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '', firstSurname: '', email: '', IDCard: '',
    UserName: '', Password: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(
        {
          firstName: form.firstName,
          firstSurname: form.firstSurname,
          email: form.email,
          IDCard: Number(form.IDCard)
        },
        {
          UserName: form.UserName,
          Password: form.Password
        }
      );
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6">Registro</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded" />
        <input name="firstSurname" placeholder="Apellido" value={form.firstSurname} onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded" />
        <input name="IDCard" placeholder="Cédula" value={form.IDCard} onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded" />
        <input name="UserName" placeholder="Usuario" value={form.UserName} onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded" />
        <input name="Password" type="password" placeholder="Contraseña" value={form.Password} onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded" />
        <button type="submit" className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700">
          Registrarse
        </button>
        <p className="text-gray-400 mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
