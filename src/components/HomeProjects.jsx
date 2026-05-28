import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './projects/ProjectCard';
import { projectStore } from '../lib/projectStore';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';

export default function HomeProjects() {
  const [projects, setProjects] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  const [shareMap, setShareMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Take the 2 most recent/liked projects to show on Home
    const allProjects = projectStore.getProjects();
    setProjects(allProjects.slice(0, 2));
    setLikesMap(projectStore.getLikesMap());
  }, []);

  const handleLike = (projectId) => {
    const result = projectStore.toggleLike(projectId);
    setProjects(result.projects.slice(0, 2));
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
    <section
      id="home-projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">

        {/* Section Header */}
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>03</span><span>Projets de la communauté</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 text-h2" style={{ color: 'var(--text-main)' }}>
              Projets de <span style={{ color: 'var(--accent-orange)' }}>la communauté</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="mt-4 text-body max-w-2xl font-light" style={{ color: 'var(--text-sub)' }}>
              Découvrez les dernières créations des développeurs du Bénin. Open source, startups et expérimentations.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <div data-stagger-card className="h-full">
                <ProjectCard
                  project={project}
                  onLike={handleLike}
                  isLiked={Boolean(likesMap[project.id])}
                  onShare={handleShare}
                  shareLabel={shareMap[project.id] ? 'Copié' : 'Partager'}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Button to see all */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-12 flex justify-center">
          <button
            onClick={() => navigate('/projects')}
            className="btn-orange rounded px-8 py-3 text-cta font-bold"
          >
            Tous les projets →
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
}
