import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function Projects() {
  const [projects, setProjects] = useState(null);
  useEffect(() => { api.get('/projects').then((response) => setProjects(response.data)); }, []);
  if (!projects) return <LoadingSpinner />;
  return <div className="mx-auto max-w-6xl px-6 py-16"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#ff7a00]">Work / Projects</p><h1 className="mt-3 text-5xl font-black text-white">Lo que estamos construyendo.</h1><div className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((project) => <Link to={`/projects/${project.slug}`} key={project.id} className="rounded-2xl border border-white/10 bg-white/[.03] p-7 transition hover:-translate-y-1 hover:border-blue-400/40"><p className="text-xs uppercase tracking-[.25em] text-blue-300">{project.type}</p><h2 className="mt-3 text-2xl font-bold text-white">{project.title}</h2><p className="mt-3 leading-7 text-slate-400">{project.description}</p><p className="mt-5 text-sm text-slate-500">Por @{project.ownerUsername}</p></Link>)}</div></div>;
}
