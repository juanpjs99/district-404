import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const skillsFrom = (value) => {
  if (Array.isArray(value)) return value;
  try { return JSON.parse(value || '[]'); } catch { return []; }
};

export default function Profile() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProfile = async () => {
    const response = await api.get('/profiles/me');
    setData(response.data);
    setForm({
      firstName: response.data.person?.firstName || '',
      firstSurname: response.data.person?.firstSurname || '',
      email: response.data.person?.email || '',
      biography: response.data.profile?.biography || '',
      profession: response.data.profile?.profession || '',
      skills: skillsFrom(response.data.profile?.skills).join(', '),
      githubUrl: response.data.profile?.githubUrl || '',
      linkedinUrl: response.data.profile?.linkedinUrl || '',
      avatarUrl: response.data.profile?.avatarUrl || '',
      location: response.data.profile?.location || '',
    });
  };

  // The request resolves asynchronously and hydrates the editable profile form.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadProfile().catch(() => setError('No se pudo cargar el perfil.')); }, []);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const saveProfile = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await api.patch('/profiles/me', form);
      setData(response.data);
      setEditing(false);
      setMessage('Perfil actualizado correctamente.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo actualizar el perfil.');
    }
  };

  if (error && !data) return <div className="mx-auto max-w-5xl px-6 py-20 text-red-300">{error}</div>;
  if (!data || !form) return <LoadingSpinner />;

  const profile = data.profile || {};
  const skills = skillsFrom(profile.skills);
  const fullName = `${data.person?.firstName || ''} ${data.person?.firstSurname || ''}`.trim();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#ff7a00]">Mi espacio</p><h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Tu perfil</h1><p className="mt-3 text-slate-400">Actualiza la información que la crew verá sobre ti.</p></div>
        <button type="button" onClick={() => setEditing((current) => !current)} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500">{editing ? 'Cancelar' : 'Editar perfil'}</button>
      </div>

      {message && <p className="mb-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">{message}</p>}
      {error && <p className="mb-5 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {editing ? (
        <form onSubmit={saveProfile} className="grid gap-5 rounded-3xl border border-white/10 bg-white/[.03] p-6 md:grid-cols-2 md:p-8">
          {[
            ['firstName', 'Nombre'], ['firstSurname', 'Apellido'], ['email', 'Email'], ['profession', 'Profesión'],
            ['location', 'Ubicación'], ['avatarUrl', 'URL del avatar'], ['githubUrl', 'GitHub'], ['linkedinUrl', 'LinkedIn'],
          ].map(([field, label]) => <label key={field} className="text-sm font-medium text-slate-300">{label}<input required={['firstName', 'firstSurname', 'email'].includes(field)} type={field === 'email' ? 'email' : 'text'} value={form[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400" /></label>)}
          <label className="text-sm font-medium text-slate-300 md:col-span-2">Tecnologías<span className="mt-1 block text-xs text-slate-500">Separadas por coma</span><input value={form.skills} onChange={(event) => updateField('skills', event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400" /></label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">Biografía<textarea rows="5" value={form.biography} onChange={(event) => updateField('biography', event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-blue-400" /></label>
          <button className="rounded-xl bg-[#ff7a00] px-5 py-3 font-bold text-white transition hover:bg-[#e86b00] md:col-span-2">Guardar cambios</button>
        </form>
      ) : (
        <>
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[.03] to-purple-500/10 p-6 md:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center">
              {profile.avatarUrl ? <img src={profile.avatarUrl} alt={fullName} className="h-32 w-32 rounded-3xl object-cover ring-2 ring-blue-400/40" /> : <div className="grid h-32 w-32 place-items-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-5xl font-black text-white">{fullName.charAt(0) || 'U'}</div>}
              <div><p className="text-sm text-blue-300">@{data.username}</p><h2 className="mt-1 text-4xl font-black text-white">{fullName || 'Tu nombre'}</h2><p className="mt-2 text-xl text-[#ff7a00]">{profile.profession || 'Miembro de District 404'}</p><p className="mt-2 text-slate-400">{profile.location || 'Ubicación no definida'}</p><p className="mt-5 max-w-2xl leading-7 text-slate-300">{profile.biography || 'Aún no has agregado una biografía.'}</p></div>
            </div>
          </section>
          <section className="mt-8"><h2 className="mb-4 text-2xl font-bold text-white">Tecnologías</h2><div className="flex flex-wrap gap-3">{skills.length ? skills.map((skill) => <span key={skill} className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">{skill}</span>) : <span className="text-slate-500">Agrega tus tecnologías desde Editar perfil.</span>}</div></section>
          <section className="mt-10 flex flex-wrap gap-4 text-sm">{profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">GitHub ↗</a>}{profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">LinkedIn ↗</a>}<Link to={`/members/${data.username}`} className="text-[#ff7a00] hover:text-white">Ver perfil público ↗</Link></section>
        </>
      )}
    </div>
  );
}
