import React, { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilters from '../components/projects/ProjectFilters';
import { projectStore } from '../lib/projectStore';
import { ScrollReveal } from '../components/ScrollReveal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeStack, setActiveStack] = useState('Tous');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [shareMap, setShareMap] = useState({});
  const pageSize = 4;

  useEffect(() => {
    setProjects(projectStore.getProjects());
    setLikesMap(projectStore.getLikesMap());
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(projects.map((project) => project.category));
    return ['Tous', ...Array.from(unique)];
  }, [projects]);

  const stacks = useMemo(() => {
    const unique = new Set(projects.flatMap((project) => project.techStack));
    return ['Tous', ...Array.from(unique)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    let list = [...projects];

    if (search) {
      list = list.filter((project) => {
        const haystack = [
          project.title,
          project.summary,
          project.description,
          project.category,
          ...(project.tags || []),
          ...(project.techStack || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(search);
      });
    }

    if (activeCategory !== 'Tous') {
      list = list.filter((project) => project.category === activeCategory);
    }

    if (activeStack !== 'Tous') {
      list = list.filter((project) => project.techStack.includes(activeStack));
    }

    switch (sortBy) {
      case 'likes':
        list.sort((a, b) => b.likes - a.likes);
        break;
      case 'comments':
        list.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case 'alpha':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
    }

    return list;
  }, [projects, query, activeCategory, activeStack, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [query, activeCategory, activeStack, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = filteredProjects.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleLike = (projectId) => {
    const result = projectStore.toggleLike(projectId);
    setProjects(result.projects);
    setLikesMap(result.likesMap);
  };

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

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden pattern-dots" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background ambient glows */}
      <div className="absolute left-1/3 top-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full pointer-events-none blur-3xl opacity-30"
        style={{ background: 'radial-gradient(ellipse, var(--glow-orange) 0%, transparent 70%)' }} />
      <div className="absolute right-10 top-20 h-[250px] w-[250px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{ background: 'var(--glow-green)' }} />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Dynamic Glassmorphic Projects Hero Banner */}
        <div className="relative mb-12 p-8 md:p-10 rounded-3xl overflow-hidden glass-panel-dark border border-[var(--border-col)]"
          style={{ boxShadow: '0 20px 50px -15px rgba(249, 115, 22, 0.1)' }}>
          {/* Circuit details */}
          <div className="absolute right-0 top-0 w-80 h-full opacity-10 pointer-events-none pattern-circuit" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <ScrollReveal variant="fadeDown">
                <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest mb-4"
                  style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full animate-ping" style={{ background: 'var(--accent-orange)' }} />
                  Annuaire des projets
                </span>
              </ScrollReveal>
              
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight italic uppercase leading-none" style={{ color: 'var(--text-main)' }}>
                  PROJETS <span style={{ color: 'var(--accent-orange)' }}>OPEN SOURCE</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.2}>
                <p className="mt-4 text-small sm:text-body font-light leading-relaxed max-w-xl" style={{ color: 'var(--text-sub)' }}>
                  Filtrez, triez et explorez la vitrine technologique de la communauté DevBénin. Découvrez des builds innovants, inspectez leur code source et collaborez pour construire le futur du numérique béninois.
                </p>
              </ScrollReveal>
            </div>

            {/* Premium Code Snippet Window on the right of Projects Hero */}
            <ScrollReveal variant="scaleUp" delay={0.3} className="md:col-span-4 hidden md:block">
              <div className="rounded-2xl p-4 bg-black/40 border border-[var(--border-col)] font-mono text-[9px] leading-relaxed shadow-lg relative overflow-hidden"
                style={{ color: 'var(--accent-green)' }}>
                {/* Window top bar */}
                <div className="flex gap-1.5 mb-3 pb-2 border-b border-white/10 opacity-60">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="ml-auto text-[8px] tracking-wider text-white/40">CLI v2.0</span>
                </div>
                <div>
                  <span className="text-white/40">$</span> devbenin init project<br />
                  <span className="text-amber-400">⚡ Fetching builds...</span><br />
                  <span className="text-white/40">Found 48 active repos</span><br />
                  <span className="text-white">&gt; status: </span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">ONLINE</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mini Stat counters inside Hero */}
          <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: "48+", label: "Projets actifs" },
              { val: "120k+", label: "Lignes de code" },
              { val: "2.4k+", label: "Stars cumulées" },
              { val: "100%", label: "Open Source" }
            ].map(({ val, label }) => (
              <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/[0.03]">
                <div className="text-base md:text-lg font-black" style={{ color: 'var(--accent-orange)' }}>{val}</div>
                <div className="text-[9px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-sub)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <ProjectFilters
          query={query}
          onQueryChange={setQuery}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          stacks={stacks}
          activeStack={activeStack}
          onStackChange={setActiveStack}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.length === 0 ? (
            <div
              className="rounded-lg px-4 py-3 text-small"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
            >
              Aucun projet ne correspond a cette recherche.
            </div>
          ) : (
            pageItems.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onLike={handleLike}
                isLiked={Boolean(likesMap[project.id])}
                onShare={handleShare}
                shareLabel={shareMap[project.id] ? 'Copie' : 'Partager'}
              />
            ))
          )}
        </div>

        {filteredProjects.length > pageSize && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded px-3 py-1.5 text-[10px] font-semibold"
              style={{ border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
              disabled={safePage === 1}
            >
              Precedent
            </button>
            <div className="text-[10px]" style={{ color: 'var(--text-sub)' }}>
              Page {safePage} / {totalPages}
            </div>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded px-3 py-1.5 text-[10px] font-semibold"
              style={{ border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}
              disabled={safePage === totalPages}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
