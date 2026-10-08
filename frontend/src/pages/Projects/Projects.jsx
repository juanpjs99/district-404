import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './projects.css';

const motionUrl = (project) => project.video_url || project.gif_url || project.media_url || project.motion_url;
const personName = (person) => person?.firstName ? `${person.firstName} ${person.firstSurname || ''}`.trim() : person?.username || person?.UserName || 'Sin nombre';
const mediaIsVideo = (url = '') => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

function ProjectMedia({ project }) {
  const [hovered, setHovered] = useState(false);
  const cover = project.cover_url || project.coverUrl;
  const motionSource = motionUrl(project);
  const showMotion = hovered && motionSource;
  return <div className="projects-project-media" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)} tabIndex="0" aria-label="Vista previa del proyecto">
    {cover ? <img className="projects-project-cover" src={cover} alt="" /> : <div className="projects-project-empty">404 / visual pendiente</div>}
    {showMotion && (mediaIsVideo(motionSource) ? <video className="projects-project-cover projects-project-motion" src={motionSource} autoPlay muted loop playsInline aria-hidden="true" /> : <img className="projects-project-cover projects-project-motion" src={motionSource} alt="" />)}
    <div className="projects-media-scanline" aria-hidden="true" /><span className="projects-media-status">{showMotion ? 'motion // on' : 'still // hover to play'}</span>
  </div>;
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown); };
  }, [onClose]);
  const collaborators = project.collaborators || [];
  return <motion.div className="projects-dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <motion.section className="projects-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }}>
      <button className="projects-dialog-close" type="button" onClick={onClose} aria-label="Cerrar información">×</button>
      <p className="projects-kicker">Project file / {project.type || 'unclassified'}</p><h2 id="project-dialog-title">{project.title}</h2>
      <p className="projects-dialog-description">{project.description || 'Este proyecto todavía no tiene una descripción publicada.'}</p>
      <div className="projects-dialog-people"><div><span className="projects-label">Autor principal</span><strong>{project.ownerName || project.ownerUsername || 'Sin autor registrado'}</strong>{project.ownerUsername && <small>@{project.ownerUsername}</small>}</div><div><span className="projects-label">Colaboradores / {collaborators.length}</span>{collaborators.length ? collaborators.map((collaborator) => <strong key={collaborator.id || collaborator.user_id}>{personName(collaborator)} <small>{collaborator.role || collaborator.contribution || 'Colaborador'}</small></strong>) : <strong className="projects-muted">No hay colaboradores publicados.</strong>}</div></div>
      {(project.repository_url || project.demo_url) && <div className="projects-dialog-links">{project.repository_url && <a href={project.repository_url} target="_blank" rel="noreferrer">Repositorio ↗</a>}{project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer">Demo ↗</a>}</div>}
    </motion.section>
  </motion.div>;
}

export default function Projects() {
  const [projects, setProjects] = useState(null); const [error, setError] = useState(''); const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    let active = true;
    api.get('/projects').then(async ({ data }) => { const list = Array.isArray(data) ? data : []; const enriched = await Promise.all(list.map(async (project) => { try { const detail = await api.get(`/projects/${project.slug}`); return { ...project, ...detail.data }; } catch { return project; } })); if (active) setProjects(enriched); }).catch(() => active && setError('No pudimos cargar los proyectos publicados.'));
    return () => { active = false; };
  }, []);
  if (!projects && !error) return <LoadingSpinner />;
  if (error) return <div className="projects-error">{error}</div>;
  return <main className="projects-page"><header className="projects-intro"><div className="projects-intro-mark">D404<span>_</span></div><p className="projects-kicker">District 404 /ideas y proyectos que tomaron forma.</p><h1>Ideas puestas<br /><em>en el mapa.</em></h1><p className="projects-lead">Una colección de proyectos, ideas y experiencias que hemos llevado del concepto al código.</p><div className="projects-scroll-note"><span /> Desplaza para explorar</div></header><div className="projects-project-list">{projects.length ? projects.map((project, index) => <motion.article key={project.id || project.slug} className={`projects-project projects-project-${index % 4}`} initial={{ opacity: 0, y: 70, x: index % 2 ? 35 : -35 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}><ProjectMedia project={project} /><div className="projects-project-meta"><span>{String(index + 1).padStart(2, '0')} / {project.type || 'project'}</span><span>{project.status || 'active'}</span></div><div className="projects-project-heading"><h2>{project.title}</h2><button type="button" onClick={() => setSelectedProject(project)} aria-label={`Ver información de ${project.title}`}><span>+</span> Info</button></div><p className="projects-project-owner">{project.ownerName || project.ownerUsername ? `Por ${project.ownerName || `@${project.ownerUsername}`}` : 'Autor no publicado'}</p></motion.article>) : <p className="projects-empty">Todavía no hay proyectos publicados.</p>}</div><AnimatePresence>{selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence></main>;
}
