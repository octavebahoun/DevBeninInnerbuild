import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, MessageSquare, ArrowLeft } from 'lucide-react';
import { projectStore } from '../lib/projectStore';
import { authStore } from '../lib/storage';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const session = authStore.getSession();
  const [project, setProject] = useState(null);
  const [likesMap, setLikesMap] = useState({});
  const [author, setAuthor] = useState(session?.name || '');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState({ status: 'idle', message: '' });

  useEffect(() => {
    setProject(projectStore.getProjectById(projectId));
    setLikesMap(projectStore.getLikesMap());
  }, [projectId]);

  if (!project) {
    return (
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
        <div className="mx-auto max-w-3xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[10px] font-semibold"
            style={{ color: 'var(--accent-orange)' }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour aux projets
          </Link>
          <div className="mt-6 rounded-lg px-4 py-3 text-xs" style={{ background: 'var(--surface)', color: 'var(--text-sub)' }}>
            Projet introuvable.
          </div>
        </div>
      </section>
    );
  }

  const isLiked = Boolean(likesMap[project.id]);

  const handleLike = () => {
    const result = projectStore.toggleLike(project.id);
    setProject(result.projects.find((item) => item.id === project.id));
    setLikesMap(result.likesMap);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormState({ status: 'idle', message: '' });

    const result = projectStore.addComment(project.id, { author, message });
    if (!result.ok) {
      setFormState({ status: 'error', message: result.error });
      return;
    }

    setProject(result.project);
    setMessage('');
    setFormState({ status: 'success', message: 'Post ajoute avec succes.' });
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
      <div className="mx-auto max-w-4xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-[10px] font-semibold"
          style={{ color: 'var(--accent-orange)' }}>
          <ArrowLeft className="h-3.5 w-3.5" /> Retour aux projets
        </Link>

        <div className="mt-6 rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>
                {project.category} · {project.status}
              </div>
              <h1 className="mt-2 font-display text-2xl sm:text-3xl" style={{ color: 'var(--text-main)' }}>
                {project.title}
              </h1>
            </div>
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-xs font-semibold"
              style={{ color: isLiked ? 'var(--accent-orange)' : 'var(--text-sub)' }}
            >
              <Heart
                className="h-4 w-4"
                style={isLiked ? { fill: 'var(--accent-orange)', color: 'var(--accent-orange)' } : {}}
              />
              {project.likes} likes
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded px-2.5 py-1 text-[9px] font-semibold"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-[9px] font-semibold"
                style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-sub)' }}>
              <MessageSquare className="h-4 w-4" /> {project.comments.length} commentaires
            </div>

            <div className="mt-4 space-y-4">
              {project.comments.length === 0 ? (
                <div className="rounded-lg px-4 py-3 text-xs" style={{ background: 'var(--surface)', color: 'var(--text-sub)' }}>
                  Aucun commentaire pour le moment.
                </div>
              ) : (
                project.comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg p-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>{comment.author}</div>
                    <div className="text-[10px]" style={{ color: 'var(--text-sub)' }}>
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    <p className="mt-2 text-xs" style={{ color: 'var(--text-sub)' }}>{comment.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="rounded-lg p-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>Nouveau post</div>
              <p className="mt-2 text-[11px]" style={{ color: 'var(--text-sub)' }}>
                Partagez un retour, une idee ou un update sur le projet.
              </p>
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Nom</label>
                  <input
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    className="mt-1 w-full rounded px-3 py-2 text-xs"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Message</label>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded px-3 py-2 text-xs"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                  />
                </div>

                {formState.message && (
                  <div
                    className="rounded px-3 py-2 text-[10px]"
                    style={
                      formState.status === 'success'
                        ? { background: 'var(--glow-green)', color: 'var(--accent-green)' }
                        : { background: 'var(--glow-orange)', color: 'var(--accent-orange)' }
                    }
                  >
                    {formState.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn-orange rounded py-2 text-[10px] font-bold uppercase tracking-wider"
                >
                  Publier
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
