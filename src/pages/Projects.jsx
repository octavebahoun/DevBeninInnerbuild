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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>01</span><span>Annuaire des projets</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
              Projets <span style={{ color: 'var(--accent-orange)' }}>Open Source</span>
            </h1>
          </ScrollReveal>
          <p className="mt-3 text-sm max-w-xl" style={{ color: 'var(--text-sub)' }}>
            Filtrez, triez et explorez les projets les plus actifs de la communaute.
          </p>
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
              className="rounded-lg px-4 py-3 text-xs"
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
