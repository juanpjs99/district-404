/**
 * Página de Login.
 * Formulario para autenticar usuarios existentes.
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(UserName, Password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
        />
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Entrar
        </button>
        <p className="text-gray-400 mt-4 text-center">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-400">Regístrate</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
