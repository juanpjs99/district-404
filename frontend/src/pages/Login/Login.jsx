import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthShell from '../../components/AuthShell/AuthShell';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.username, form.password);
      navigate('/profile');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo iniciar sesión.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell eyebrow="Welcome back" title="Volver a la crew" subtitle="Accede a tu espacio en District 404.">
      {location.state?.registered && <p className="mb-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">Cuenta creada. Ya puedes iniciar sesión.</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-slate-300">Usuario<input required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} placeholder="tu_usuario" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/10" /></label>
        <label className="block text-sm font-medium text-slate-300">Contraseña<input required type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="••••••••" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/10" /></label>
        {error && <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}
        <button disabled={submitting} className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-bold text-white shadow-[0_0_25px_rgba(59,130,246,.2)] transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Ingresando...' : 'Ingresar'}</button>
        <p className="text-center text-sm text-slate-400">¿No tienes cuenta? <Link to="/register" className="font-semibold text-blue-300 hover:text-blue-200">Regístrate</Link></p>
      </form>
    </AuthShell>
  );
}
