import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthShell from '../../components/AuthShell/AuthShell';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', firstSurname: '', email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form);
      navigate('/login', { state: { registered: true } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo crear la cuenta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell eyebrow="Join the signal" title="Crear cuenta" subtitle="Empieza como usuario del blog y comparte tus ideas con la comunidad.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-300">Nombre<input required value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/70" /></label>
          <label className="block text-sm font-medium text-slate-300">Apellido<input required value={form.firstSurname} onChange={(event) => setForm({ ...form, firstSurname: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/70" /></label>
        </div>
        <label className="block text-sm font-medium text-slate-300">Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="tu@email.com" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/70" /></label>
        <label className="block text-sm font-medium text-slate-300">Usuario<input required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} placeholder="tu_apodo" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/70" /></label>
        <label className="block text-sm font-medium text-slate-300">Contraseña<input required minLength={8} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Mínimo 8 caracteres" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400/70" /></label>
        {error && <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}
        <button disabled={submitting} className="w-full rounded-xl bg-[#ff7a00] py-3.5 font-bold text-white shadow-[0_0_25px_rgba(255,122,0,.18)] transition hover:-translate-y-0.5 hover:bg-[#e86b00] disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Creando...' : 'Crear cuenta'}</button>
        <p className="text-center text-sm text-slate-400">¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-blue-300 hover:text-blue-200">Inicia sesión</Link></p>
      </form>
    </AuthShell>
  );
}
