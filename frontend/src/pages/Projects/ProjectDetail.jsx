import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.get(`/projects/${slug}`).then((response) => setProject(response.data)).catch(() => setError('Proyecto no encontrado.')); }, [slug]);
  if (!project && !error) return <LoadingSpinner />;
  if (error) return <div className="mx-auto max-w-5xl px-6 py-20 text-red-300">{error}</div>;
  return <div className="mx-auto max-w-5xl px-6 py-16"><Link to="/projects" className="text-sm text-slate-400 hover:text-white">← Volver a proyectos</Link><article className="mt-8 rounded-3xl border border-white/10 bg-white/[.03] p-8"><p className="text-xs uppercase tracking-[.3em] text-[#ff7a00]">{project.type}</p><h1 className="mt-3 text-5xl font-black text-white">{project.title}</h1><p className="mt-6 max-w-3xl whitespace-pre-line leading-8 text-slate-300">{project.description}</p><div className="mt-8 flex flex-wrap gap-4">{project.repository_url && <a href={project.repository_url} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">Repositorio ↗</a>}{project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">Demo ↗</a>}</div><h2 className="mt-12 text-2xl font-bold text-white">Colaboradores</h2><div className="mt-4 space-y-3">{(project.collaborators || []).map((collaborator) => <p key={collaborator.id} className="text-slate-300">{collaborator.firstName} {collaborator.firstSurname} <span className="text-slate-500">· {collaborator.role || 'Colaborador'}</span></p>)}</div></article></div>;
}
