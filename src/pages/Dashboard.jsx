import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Settings, TrendingUp, User } from 'lucide-react';
import { authStore } from '../lib/storage';
import { ScrollReveal } from '../components/ScrollReveal';
import { projectStore } from '../lib/projectStore';
import { articleStore } from '../lib/articleStore';

export default function Dashboard() {
  const session = authStore.getSession();
  const user = authStore.getUserById(session?.userId) || {
    name: session?.name || 'Utilisateur',
    email: session?.email || 'demo@devbenin.bj',
    techStack: 'Frontend'
  };
  const [formName, setFormName] = useState(user.name);
  const [formEmail, setFormEmail] = useState(user.email);
  const [formTechStack, setFormTechStack] = useState(user.techStack || 'Frontend');
  const [saveState, setSaveState] = useState({ status: 'idle', message: '' });
  const [articles, setArticles] = useState([]);
  const [shareMap, setShareMap] = useState({});

  useEffect(() => {
    setFormName(user.name);
    setFormEmail(user.email);
    setFormTechStack(user.techStack || 'Frontend');
  }, [user.name, user.email, user.techStack]);

  useEffect(() => {
    setArticles(articleStore.getArticles());
  }, []);

  const myArticles = useMemo(() => {
    return articles.filter((article) => article.author === user.name);
  }, [articles, user.name]);

  const myProjects = useMemo(() => {
    const projects = projectStore.getProjects();
    const name = (user.name || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    return projects.filter((project) => {
      const ownerName = (project.owner || '').toLowerCase();
      const ownerEmail = (project.ownerEmail || '').toLowerCase();
      return (name && ownerName === name) || (email && ownerEmail === email);
    });
  }, [user.name, user.email]);

  const handleShare = async (projectId) => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/projects/${projectId}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      console.error(error);
    }

    setShareMap((prev) => ({ ...prev, [projectId]: true }));
    setTimeout(() => {
      setShareMap((prev) => ({ ...prev, [projectId]: false }));
    }, 1500);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaveState({ status: 'idle', message: '' });

    if (!session?.userId) {
      setSaveState({ status: 'error', message: 'Session invalide. Veuillez vous reconnecter.' });
      return;
    }

    const trimmedName = formName.trim();
    const trimmedEmail = formEmail.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      setSaveState({ status: 'error', message: 'Nom et email sont requis.' });
      return;
    }

    const result = authStore.updateUser(session.userId, {
      name: trimmedName,
      email: trimmedEmail,
      techStack: formTechStack,
    });

    if (!result.ok) {
      setSaveState({ status: 'error', message: result.error });
      return;
    }

    authStore.setSession({
      userId: result.user.id,
      name: result.user.name,
      email: result.user.email,
    });

    setSaveState({ status: 'success', message: 'Profil mis a jour.' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 pattern-dots">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <ScrollReveal variant="fadeLeft" duration={0.5}>
              <div className="section-label"><span>01</span><span>Mon espace</span></div>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
                Tableau de bord <span style={{ color: 'var(--accent-orange)' }}>{user.name}</span>
              </h1>
            </ScrollReveal>
            <p className="mt-3 text-sm max-w-xl" style={{ color: 'var(--text-sub)' }}>
              Resume de votre activite, progression et gestion de compte.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-md p-2" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <User className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Profil</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>{user.name}</div>
                </div>
              </div>
              <div className="mt-4 text-xs" style={{ color: 'var(--text-sub)' }}>{user.email}</div>
              <div className="mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold"
                style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}>
                {user.techStack}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-md p-2" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <Code2 className="h-4 w-4" style={{ color: 'var(--accent-green)' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Mes projets</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>{myProjects.length} actifs</div>
                </div>
              </div>
              <div className="mt-4 text-[10px]" style={{ color: 'var(--text-sub)' }}>
                Suivez vos projets et partagez-les.
              </div>
              <Link to="/projects" className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--accent-orange)' }}>
                Voir la liste
              </Link>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-md p-2" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <TrendingUp className="h-4 w-4" style={{ color: 'var(--accent-green)' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Progression</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Niveau 4</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[10px]" style={{ color: 'var(--text-sub)' }}>
                  <span>XP</span>
                  <span style={{ color: 'var(--accent-orange)' }}>1240 / 2000</span>
                </div>
                <div className="mt-2 h-2 rounded-full" style={{ background: 'var(--surface)' }}>
                  <div className="h-2 rounded-full" style={{ width: '62%', background: 'var(--accent-orange)' }} />
                </div>
              </div>
              <div className="mt-4 text-[10px]" style={{ color: 'var(--text-sub)' }}>
                3 quizzes completes cette semaine.
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-md p-2" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <BookOpen className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Articles</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>{myArticles.length} publies</div>
                </div>
              </div>
              <div className="mt-4 text-[10px]" style={{ color: 'var(--text-sub)' }}>
                Suivez les performances de vos contenus.
              </div>
              <Link to="/articles" className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--accent-orange)' }}>
                Voir le blog
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg" style={{ color: 'var(--text-main)' }}>Mes articles</h2>
                <span className="text-[10px]" style={{ color: 'var(--text-sub)' }}>{myArticles.length} article(s)</span>
              </div>

              {myArticles.length === 0 ? (
                <div className="mt-6 rounded-md px-4 py-3 text-xs" style={{ background: 'var(--surface)', color: 'var(--text-sub)' }}>
                  Aucun article publie pour le moment. Partagez vos retours d'experience pour apparaitre ici.
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-4">
                  {myArticles.map((article) => (
                    <div key={article.id} className="rounded-lg p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>{article.title}</div>
                          <div className="text-[10px] mt-1" style={{ color: 'var(--text-sub)' }}>{article.date} · {article.readTime}</div>
                        </div>
                        <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
                          style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}>
                          {article.category}
                        </span>
                      </div>
                      <p className="mt-3 text-xs" style={{ color: 'var(--text-sub)' }}>{article.preview}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-md p-2" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <Settings className="h-4 w-4" style={{ color: 'var(--accent-green)' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Compte</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Parametres</div>
                </div>
              </div>

              <form className="mt-6 space-y-4 text-xs" onSubmit={handleSave}>
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Nom</label>
                  <input
                    value={formName}
                    onChange={(event) => setFormName(event.target.value)}
                    className="mt-1 w-full rounded px-3 py-2 text-xs bg-transparent"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(event) => setFormEmail(event.target.value)}
                    className="mt-1 w-full rounded px-3 py-2 text-xs bg-transparent"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>Specialite</label>
                  <select
                    value={formTechStack}
                    onChange={(event) => setFormTechStack(event.target.value)}
                    className="mt-1 w-full rounded px-3 py-2 text-xs bg-transparent"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)', colorScheme: 'dark' }}
                  >
                    <option value="Frontend" className="bg-neutral-900 text-white">Frontend (React, Vue)</option>
                    <option value="Backend" className="bg-neutral-900 text-white">Backend (Node, Python)</option>
                    <option value="Fullstack" className="bg-neutral-900 text-white">Fullstack</option>
                    <option value="Mobile" className="bg-neutral-900 text-white">Mobile (Flutter)</option>
                  </select>
                </div>

                {saveState.message && (
                  <div
                    className="rounded px-3 py-2 text-[10px]"
                    style={
                      saveState.status === 'success'
                        ? { background: 'var(--glow-green)', color: 'var(--accent-green)' }
                        : { background: 'var(--glow-orange)', color: 'var(--accent-orange)' }
                    }
                  >
                    {saveState.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn-orange rounded py-2 text-[10px] font-bold uppercase tracking-wider"
                >
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg" style={{ color: 'var(--text-main)' }}>Mes projets</h2>
                <p className="mt-1 text-[11px]" style={{ color: 'var(--text-sub)' }}>
                  Suivi des projets associes a votre profil.
                </p>
              </div>
              <Link to="/projects" className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--accent-orange)' }}>
                Voir tous les projets
              </Link>
            </div>

            {myProjects.length === 0 ? (
              <div className="mt-6 rounded-md px-4 py-3 text-xs" style={{ background: 'var(--surface)', color: 'var(--text-sub)' }}>
                Aucun projet lie a votre compte pour le moment.
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {myProjects.map((project) => (
                  <div key={project.id} className="rounded-lg p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>{project.title}</div>
                        <div className="text-[10px] mt-1" style={{ color: 'var(--text-sub)' }}>{project.category} · {project.status}</div>
                      </div>
                      <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
                        style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}>
                        {project.techStack.slice(0, 2).join(' / ')}
                      </span>
                    </div>
                    <p className="mt-3 text-xs" style={{ color: 'var(--text-sub)' }}>{project.summary}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <Link to={`/projects/${project.id}?edit=1`} className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'var(--accent-orange)' }}>
                        Editer
                      </Link>
                      <button
                        onClick={() => handleShare(project.id)}
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'var(--accent-green)' }}
                      >
                        {shareMap[project.id] ? 'Copie' : 'Partager'}
                      </button>
                      <Link to={`/projects/${project.id}`} className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'var(--text-sub)' }}>
                        Voir details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
