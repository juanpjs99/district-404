import { useEffect, useState } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function AdminMembers() {
  const [members, setMembers] = useState(null);
  const [error, setError] = useState('');
  const load = () => api.get('/admin/members').then((response) => setMembers(response.data)).catch(() => setError('No se pudo cargar la administración.'));
  useEffect(() => { load(); }, []);
  const update = async (id, path, body) => { await api.patch(`/admin/members/${id}/${path}`, body); load(); };
  if (!members && !error) return <LoadingSpinner />;
  return <div className="mx-auto max-w-6xl px-6 py-16"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#ff7a00]">Dashboard / Members</p><h1 className="mt-3 text-5xl font-black text-white">Gestionar miembros</h1>{error ? <p className="mt-8 text-red-300">{error}</p> : <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10"><table className="w-full text-left text-sm"><thead className="bg-white/5 text-slate-400"><tr><th className="p-4">Usuario</th><th className="p-4">Email</th><th className="p-4">Rol</th><th className="p-4">Estado</th></tr></thead><tbody>{members.map((member) => <tr key={member.ID} className="border-t border-white/10 text-slate-300"><td className="p-4">{member.firstName} {member.firstSurname}<span className="block text-xs text-slate-500">@{member.UserName}</span></td><td className="p-4">{member.email}</td><td className="p-4"><select value={member.role_id} onChange={(event) => update(member.ID, 'role', { roleId: event.target.value })} className="rounded-lg border border-white/10 bg-[#1a1426] px-2 py-2"><option value="1">superadmin</option><option value="2">member</option><option value="3">blog_user</option></select></td><td className="p-4"><select value={member.status} onChange={(event) => update(member.ID, 'status', { status: event.target.value })} className="rounded-lg border border-white/10 bg-[#1a1426] px-2 py-2"><option>active</option><option>inactive</option><option>blocked</option></select></td></tr>)}</tbody></table></div>}</div>;
}
