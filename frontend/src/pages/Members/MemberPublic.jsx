import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function MemberPublic() {
  const { username } = useParams();
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.get(`/profiles/members/${username}`).then((response) => setMember(response.data)).catch(() => setError('Este miembro no existe o no está disponible.')); }, [username]);
  if (!member && !error) return <LoadingSpinner />;
  if (error) return <div className="mx-auto max-w-5xl px-6 py-20 text-red-300">{error}</div>;
  const skills = Array.isArray(member.skills) ? member.skills : JSON.parse(member.skills || '[]');
  return <div className="mx-auto max-w-5xl px-6 py-16"><Link to="/members" className="text-sm text-slate-400 hover:text-white">← Volver a miembros</Link><section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8"><div className="flex flex-col gap-6 md:flex-row md:items-center">{member.avatarUrl ? <img src={member.avatarUrl} alt="" className="h-32 w-32 rounded-3xl object-cover" /> : <div className="grid h-32 w-32 place-items-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-5xl font-black text-white">{member.firstName?.charAt(0)}</div>}<div><p className="text-blue-300">@{member.username}</p><h1 className="mt-1 text-5xl font-black text-white">{member.firstName} {member.firstSurname}</h1><p className="mt-2 text-xl text-[#ff7a00]">{member.profession || 'Miembro de District 404'}</p><p className="mt-2 text-slate-400">{member.location || ''}</p></div></div><p className="mt-8 max-w-3xl leading-8 text-slate-300">{member.biography || 'Este miembro aún no ha agregado una biografía.'}</p></section><section className="mt-8"><h2 className="text-2xl font-bold text-white">Skills</h2><div className="mt-4 flex flex-wrap gap-3">{skills.map((skill) => <span key={skill} className="rounded-full bg-blue-400/10 px-4 py-2 text-sm text-blue-200">{skill}</span>)}</div></section></div>;
}
