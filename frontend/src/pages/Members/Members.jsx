import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const skillsFrom = (value) => { if (Array.isArray(value)) return value; try { return JSON.parse(value || '[]'); } catch { return []; } };

export default function Members() {
  const [members, setMembers] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.get('/profiles/members').then((response) => setMembers(response.data)).catch(() => setError('No se pudo cargar la crew.')); }, []);
  if (!members && !error) return <LoadingSpinner />;
  return <div className="mx-auto max-w-6xl px-6 py-16"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#ff7a00]">District 404 / Crew</p><h1 className="mt-3 text-5xl font-black text-white">Personas que construyen.</h1><p className="mt-4 max-w-2xl text-slate-400">Conoce los perfiles, especialidades y proyectos de quienes forman parte de la comunidad.</p>{error ? <p className="mt-10 text-red-300">{error}</p> : <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{members.map((member) => <Link to={`/members/${member.username}`} key={member.userId} className="group rounded-2xl border border-white/10 bg-white/[.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/40">{member.avatarUrl ? <img src={member.avatarUrl} alt="" className="h-20 w-20 rounded-2xl object-cover" /> : <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-3xl font-black text-white">{member.firstName?.charAt(0)}</div>}<h2 className="mt-5 text-2xl font-bold text-white group-hover:text-blue-300">{member.firstName} {member.firstSurname}</h2><p className="mt-1 text-[#ff7a00]">{member.profession || 'Miembro'}</p><p className="mt-3 line-clamp-2 text-sm text-slate-400">{member.biography || 'Perfil en construcción.'}</p><div className="mt-5 flex flex-wrap gap-2">{skillsFrom(member.skills).slice(0, 3).map((skill) => <span key={skill} className="text-xs text-blue-300">#{skill}</span>)}</div></Link>)}</div>}</div>;
}
