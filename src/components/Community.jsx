import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const members = [
    {
      initials: "OK",
      name: "Oktav Dev",
      title: "Fullstack JS · AI Engineer · Red Team",
      location: "Co-fondateur Excellence Team · Bénin",
      skills: ["React", "Python", "Three.js"],
      projects: 12,
      xp: 1240,
      articles: 5,
      featured: true
    },
    {
      initials: "RH",
      name: "Ronald Hounnou",
      title: "UI/UX Designer · Creative Developer",
      location: "Excellence Team · Bénin",
      skills: ["Figma", "Tailwind", "GSAP"],
      projects: 8,
      xp: 980,
      articles: 3,
      featured: false
    },
    {
      initials: "PD",
      name: "Precieux Dev",
      title: "Frontend Engineer · Web3 Specialist",
      location: "Cotonou · Bénin",
      skills: ["React", "Solidity", "Tailwind"],
      projects: 15,
      xp: 1450,
      articles: 6,
      featured: true
    },
    {
      initials: "AB",
      name: "Amina Bello",
      title: "Backend Engineer · Python Dev",
      location: "Parakou · Bénin",
      skills: ["Python", "Django", "Postgres"],
      projects: 9,
      xp: 870,
      articles: 2,
      featured: false
    }
  ];

  const filters = ['Tous', 'React', 'Python', 'Tailwind', 'GSAP'];

  const filteredMembers = members.filter(member => {
    const matchesFilter = activeFilter === 'Tous' || member.skills.includes(activeFilter);
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section
      id="community"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <ScrollReveal variant="fadeLeft" duration={0.5}>
              <div className="section-label"><span>04</span><span>Annuaire des membres</span></div>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <h2 data-gsap-title className="mt-3 font-display text-2xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
                La Communauté{' '}
                <span style={{ color: 'var(--accent-orange)' }}>Active</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Search bar */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded px-3.5 py-2 pl-9 text-xs focus:outline-none transition-all duration-300"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-col)',
                color: 'var(--text-main)'
              }}
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
          </div>
          </ScrollReveal>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200"
              style={
                activeFilter === filter
                  ? {
                      background: 'var(--accent-orange)',
                      color: '#fff',
                      border: '1px solid var(--accent-orange)',
                      boxShadow: '0 2px 12px var(--glow-orange)'
                    }
                  : {
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-col)',
                      color: 'var(--text-muted)'
                    }
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                layout
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-lg flex flex-col justify-between transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-col)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-orange)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
              >
                {/* Profile Cover */}
                <div
                  className="h-16 w-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--surface) 0%, var(--glow-orange) 100%)',
                    borderBottom: '1px solid var(--border-col)'
                  }}
                />

                <div className="px-5 pb-5">
                  {/* Avatar */}
                  <div
                    className="relative -mt-6 mb-3 flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-bold"
                    style={{
                      border: '2px solid var(--bg)',
                      background: 'var(--accent-orange)',
                      color: '#fff'
                    }}
                  >
                    {member.initials}
                    {member.featured && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                          style={{ background: 'var(--accent-green)' }}
                        />
                        <span
                          className="relative inline-flex h-3 w-3 rounded-full"
                          style={{ background: 'var(--accent-green)' }}
                        />
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-sm font-semibold tracking-wider" style={{ color: 'var(--text-main)' }}>
                    {member.name}
                  </h3>

                  <p className="mt-1 text-[10px] line-clamp-1" style={{ color: 'var(--text-sub)' }}>
                    {member.title}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[9px]" style={{ color: 'var(--text-sub)' }}>
                    <MapPin className="h-3 w-3" style={{ color: 'var(--accent-orange)' }} />
                    <span>{member.location}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold"
                        style={{
                          background: 'var(--glow-green)',
                          border: '1px solid var(--border-col)',
                          color: 'var(--accent-green)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats Divider */}
                  <div className="my-4 h-[1px]" style={{ background: 'var(--border-col)' }} />

                  {/* Stats */}
                  <div className="flex justify-between text-center">
                    <div>
                      <div className="font-display text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                        {member.projects}
                      </div>
                      <div className="text-[8px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-sub)' }}>
                        Projets
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold" style={{ color: 'var(--accent-orange)' }}>
                        {member.xp}
                      </div>
                      <div className="text-[8px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-sub)' }}>
                        XP
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                        {member.articles}
                      </div>
                      <div className="text-[8px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-sub)' }}>
                        Articles
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredMembers.length === 0 && (
          <div
            className="text-center py-12 rounded"
            style={{ border: '1px dashed var(--border-col)', background: 'var(--card-bg)' }}
          >
            <p className="text-xs" style={{ color: 'var(--text-sub)' }}>
              Aucun membre ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
