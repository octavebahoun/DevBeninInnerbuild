import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, GraduationCap, Globe, Sparkles, Filter, Award, ChevronLeft, ChevronRight, X, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

// Mock Members Database
const MOCK_MEMBERS = [
  {
    id: 1,
    name: "CHOKKI MIKE @Ekim's",
    role: "Lead Cloud Architect & Senior Mentor",
    exp: 7,
    bio: "Passionné par l'architecture cloud et le DevOps. Forme la prochaine génération de leaders tech au Bénin.",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "DevOps"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com", website: "https://ekim.dev" },
    mentor: true,
    email: "mike@devbenin.bj",
    projects: "Kubernetes Zero-Downtime Pipeline"
  },
  {
    id: 2,
    name: "AFOMASSE Théophas",
    role: "Fullstack Developer",
    exp: 2,
    bio: "Développeur React & Django. Curieux d'apprendre et passionné par le clean code et l'automatisation.",
    skills: ["React", "Django", "TailwindCSS", "PostgreSQL"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    mentor: false,
    email: "theophas@devbenin.bj",
    projects: "Benin AgriTech Dashboard"
  },
  {
    id: 3,
    name: "Jules-christ GBASSI",
    role: "UI/UX Designer & Frontend Dev",
    exp: 5,
    bio: "Développeur passionné par le web et les technologies modernes. J'aime créer des interfaces qui allient design d'exception et performance.",
    skills: ["Figma", "Next.js", "GSAP", "TailwindCSS", "UI/UX"],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com", website: "https://gbassi.design" },
    mentor: false,
    email: "jules@devbenin.bj",
    projects: "Benin Cinema Showcase"
  },
  {
    id: 4,
    name: "AMEGANVI Kodjo Jean-Gaël",
    role: "Software Architect & Web3 Builder",
    exp: 5,
    bio: "I am a passionate full-stack developer and software architect. I build decentralized applications, Solidity smart contracts and solid web services.",
    skills: ["Solidity", "Rust", "Node.js", "Go", "Web3"],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    mentor: true,
    email: "kodjo@devbenin.bj",
    projects: "TontineChain DeFi Protocol"
  },
  {
    id: 5,
    name: "Amina BELLO",
    role: "Backend Python Engineer",
    exp: 4,
    bio: "Spécialiste de la conception d'APIs robustes et performantes avec Django et FastAPIs. Partisane du TDD.",
    skills: ["Python", "FastAPI", "Django", "Docker", "Redis"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    mentor: false,
    email: "amina@devbenin.bj",
    projects: "E-Commerce Gateway API"
  },
  {
    id: 6,
    name: "Oktav Dev",
    role: "AI Engineer & Fullstack JS",
    exp: 6,
    bio: "Ingénieur IA et expert JavaScript. Développe des agents autonomes et des applications à forte valeur ajoutée technologique.",
    skills: ["TypeScript", "Node.js", "LangChain", "OpenAI", "React"],
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    mentor: true,
    email: "oktav@devbenin.bj",
    projects: "BeninVoice AI Assistant"
  },
  {
    id: 7,
    name: "Precieux Dev",
    role: "Senior Frontend Architect",
    exp: 8,
    bio: "Expert React, GSAP et animations 3D complexes. Pair-programmateur et amoureux du design d'exception.",
    skills: ["React", "GSAP", "Three.js", "Tailwind v4", "CSS"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com", website: "https://precieux.dev" },
    mentor: true,
    email: "precieux@devbenin.bj",
    projects: "DevBenin UI Rebranding"
  },
  {
    id: 8,
    name: "Ronald Hounnou",
    role: "Creative Frontend Developer",
    exp: 3,
    bio: "Créatif passionné d'animations CSS, d'expériences WebGL uniques et de design immersif.",
    skills: ["WebGL", "Three.js", "React", "GSAP"],
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80",
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    mentor: false,
    email: "ronald@devbenin.bj",
    projects: "3D Interactive Benin Map"
  }
];

export default function Membres() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous'); // 'Tous', 'Junior', 'Intermediaire', 'Senior', 'Mentors'
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter members based on search and selected tab filter
  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter(member => {
      // 1. Search filter
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Tab Filter
      if (!matchesSearch) return false;
      if (activeFilter === 'Tous') return true;
      if (activeFilter === 'Junior') return member.exp <= 2;
      if (activeFilter === 'Intermediaire') return member.exp > 2 && member.exp <= 5;
      if (activeFilter === 'Senior') return member.exp > 5;
      if (activeFilter === 'Mentors') return member.mentor;
      return true;
    });
  }, [searchQuery, activeFilter]);

  // Pagination logic
  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden pattern-dots" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background ambient glows */}
      <div className="absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full pointer-events-none blur-3xl opacity-30" style={{ background: 'var(--glow-green)' }} />
      <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full pointer-events-none blur-3xl opacity-30" style={{ background: 'var(--glow-orange)' }} />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal variant="fadeDown">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-stag mb-6"
              style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}>
              <Sparkles className="h-3 w-3 animate-pulse" />
              Communauté
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h1 className="text-h1 md:text-7xl font-bold tracking-tight text-center italic uppercase" style={{ color: 'var(--text-main)' }}>
              Nos <span style={{ color: 'var(--accent-green)' }}>Membres</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-body font-light leading-relaxed" style={{ color: 'var(--text-sub)' }}>
              Découvrez les talents qui composent la communauté DevBénin. Développeurs, designers, mentors — tous unis par la passion de la tech et du partage de connaissances.
            </p>
          </ScrollReveal>
        </div>

        {/* Stat Board Panel */}
        <ScrollReveal variant="scaleUp" delay={0.3} className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-3xl glass-panel-dark border border-[var(--border-col)]"
            style={{ boxShadow: '0 20px 50px -10px rgba(34, 197, 94, 0.1)' }}>
            {[
              { label: "Membres enregistrés", val: "346 talents", col: "var(--accent-green)" },
              { label: "Mentors actifs", val: "42 mentors", col: "var(--accent-orange)" },
              { label: "Projets partagés", val: "84 builds", col: "var(--accent-green)" },
            ].map(({ label, val, col }) => (
              <div key={label} className="text-center py-4 sm:py-2 relative sm:after:absolute sm:after:right-0 sm:after:top-1/4 sm:after:h-1/2 sm:after:w-[1px] sm:after:bg-[var(--border-col)] last:after:hidden">
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-sub)' }}>{label}</span>
                <div className="text-2xl sm:text-3xl font-black mt-1" style={{ color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Search & Filter Section */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between p-4 rounded-2xl"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-sub)' }} />
            <input
              type="text"
              placeholder="Rechercher un membre par nom, rôle, bio ou compétence..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3.5 rounded-full text-small font-light bg-transparent focus:outline-none focus:ring-1 focus:ring-[var(--accent-green)] transition-all duration-300"
              style={{ border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
            />
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'Tous', label: 'Tous' },
              { id: 'Junior', label: 'Junior (0-2 ans)' },
              { id: 'Intermediaire', label: 'Intermédiaire (3-5 ans)' },
              { id: 'Senior', label: 'Senior (6+ ans)' },
              { id: 'Mentors', label: 'Mentors', icon: <GraduationCap className="h-3.5 w-3.5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                  activeFilter === tab.id 
                    ? 'btn-orange text-white' 
                    : 'hover:bg-white/5'
                }`}
                style={activeFilter !== tab.id ? { border: '1px solid var(--border-col)', color: 'var(--text-main)' } : {}}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Members Found Label */}
        <div className="mb-6 flex justify-between items-center px-2">
          <span className="text-[11px] font-mono tracking-widest uppercase font-bold" style={{ color: 'var(--text-sub)' }}>
            ⚡ {filteredMembers.length} {filteredMembers.length > 1 ? 'membres trouvés' : 'membre trouvé'}
          </span>
        </div>

        {/* Member Grid */}
        {paginatedMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMembers.map((member) => (
              <motion.div
                layout
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedMember(member)}
                className="rounded-3xl p-6 relative overflow-hidden transition-all duration-300 transform-style-3d cursor-pointer group hover:-translate-y-2"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  border: '1px solid var(--border-col)',
                  boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = member.mentor ? 'var(--accent-orange)' : 'var(--accent-green)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-col)'}
              >
                {/* Glow ring based on role */}
                {member.mentor && (
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: 'var(--glow-orange)' }} />
                )}

                {/* Avatar layout */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    {/* Avatar frame */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 p-1.5 bg-black/10 group-hover:scale-105 transition-transform duration-300"
                      style={{ borderColor: member.mentor ? 'var(--accent-orange)' : 'var(--accent-green)' }}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    {/* Mentor golden star badge */}
                    {member.mentor && (
                      <div className="absolute -right-2.5 -top-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-1.5 border-2 border-[var(--card-bg)] shadow-md animate-pulse">
                        <Award className="h-4.5 w-4.5 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-h3 tracking-wide group-hover:text-[var(--accent-green)] transition-colors duration-300" style={{ color: 'var(--text-main)' }}>
                    {member.name}
                  </h3>
                  
                  {member.mentor && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent-orange)] mt-1 inline-flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" /> Mentor Agrée
                    </span>
                  )}
                  
                  {/* Experience Badge */}
                  <span className="rounded px-2.5 py-0.5 text-[9px] font-semibold mt-3"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}>
                    💼 {member.exp} ans d'exp
                  </span>

                  <p className="mt-4 text-small font-light leading-relaxed min-h-[48px]" style={{ color: 'var(--text-sub)' }}>
                    {member.bio}
                  </p>
                </div>

                {/* Skill tag clouds */}
                <div className="mt-6 flex flex-wrap gap-1 justify-center min-h-[28px] pt-4" style={{ borderTop: '1px dashed var(--border-col)' }}>
                  {member.skills.slice(0, 3).map(skill => (
                    <span
                      key={skill}
                      className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                      style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--accent-green)' }}
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="rounded-full px-2 py-0.5 text-[8px] font-bold"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}>
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Bottom link icons */}
                <div className="mt-5 flex items-center justify-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-col)' }}>
                  {member.links.github && (
                    <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-white/5 transition-colors" style={{ color: 'var(--text-sub)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 hover:text-[var(--accent-green)] transition-colors">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-white/5 transition-colors" style={{ color: 'var(--text-sub)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 hover:text-[var(--accent-green)] transition-colors">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                  {member.links.website && (
                    <a href={member.links.website} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-white/5 transition-colors" style={{ color: 'var(--text-sub)' }}>
                      <Globe className="h-4 w-4 hover:text-[var(--accent-orange)]" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 rounded-3xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
            <Search className="mx-auto h-12 w-12 opacity-20" />
            <h3 className="mt-4 text-body font-bold" style={{ color: 'var(--text-main)' }}>Aucun membre ne correspond</h3>
            <p className="mt-2 text-small font-light" style={{ color: 'var(--text-sub)' }}>Essayez de modifier vos mots-clés ou filtres de recherche.</p>
          </div>
        )}

        {/* Interactive Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-[var(--border-col)] disabled:opacity-20 hover:bg-white/5 transition-colors"
              style={{ color: 'var(--text-main)' }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-full text-small font-bold flex items-center justify-center transition-all ${
                  currentPage === page 
                    ? 'btn-orange text-white' 
                    : 'border border-[var(--border-col)] hover:bg-white/5'
                }`}
                style={currentPage !== page ? { color: 'var(--text-main)' } : {}}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-[var(--border-col)] disabled:opacity-20 hover:bg-white/5 transition-colors"
              style={{ color: 'var(--text-main)' }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>

      {/* Floating Action Button (FAB) as shown in bottom right of screenshot */}
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="https://wa.me/22900000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-orange rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 duration-200"
          style={{ width: '56px', height: '56px' }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Interactive Detail Drawer / Overlay (Mindblowing Detail Page Blueprint) */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-md">
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl rounded-3xl overflow-hidden glass-panel-dark border border-[var(--border-col)] relative max-h-[90vh] overflow-y-auto"
              style={{ boxShadow: '0 30px 80px -10px rgba(0,0,0,0.5)' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-black/20 hover:bg-white/10 transition-colors z-20 text-[var(--text-main)]"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Decorative top cover color */}
              <div className="h-28 relative" style={{ background: selectedMember.mentor ? 'linear-gradient(135deg, var(--surface) 0%, var(--glow-orange) 100%)' : 'linear-gradient(135deg, var(--surface) 0%, var(--glow-green) 100%)' }}>
                <div className="absolute inset-0 pattern-circuit opacity-10" />
              </div>

              <div className="px-6 sm:px-8 pb-8 relative">
                
                {/* Profile Header Block */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14 mb-6">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 bg-[var(--card-bg)] shadow-md p-1"
                    style={{ borderColor: selectedMember.mentor ? 'var(--accent-orange)' : 'var(--accent-green)' }}>
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-2xl font-black uppercase italic" style={{ color: 'var(--text-main)' }}>
                        {selectedMember.name}
                      </h2>
                      {selectedMember.mentor && (
                        <span className="bg-amber-500/20 border border-amber-400 text-amber-300 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Mentor
                        </span>
                      )}
                    </div>
                    <div className="text-small font-semibold mt-1" style={{ color: selectedMember.mentor ? 'var(--accent-orange)' : 'var(--accent-green)' }}>
                      {selectedMember.role}
                    </div>
                  </div>
                </div>

                {/* Profile Info Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  <div className="rounded-xl p-3 bg-black/10 border border-[var(--border-col)]">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--text-sub)]">Expérience</span>
                    <div className="text-body font-black mt-1">{selectedMember.exp} Ans d'activité</div>
                  </div>
                  <div className="rounded-xl p-3 bg-black/10 border border-[var(--border-col)]">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--text-sub)]">Email Pro</span>
                    <div className="text-body font-black mt-1 truncate">{selectedMember.email}</div>
                  </div>
                  <div className="rounded-xl p-3 bg-black/10 border border-[var(--border-col)]">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--text-sub)]">Statut Leaderboard</span>
                    <div className="text-body font-black mt-1" style={{ color: 'var(--accent-green)' }}>Top Builder ⚡</div>
                  </div>
                </div>

                {/* Biography */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold tracking-widest text-[var(--text-sub)] uppercase mb-2">À propos</h4>
                  <p className="text-small leading-relaxed font-light" style={{ color: 'var(--text-main)' }}>
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Tech Skills stack */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold tracking-widest text-[var(--text-sub)] uppercase mb-2.5">Stack Technique</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          background: selectedMember.mentor ? 'var(--glow-orange)' : 'var(--glow-green)',
                          border: selectedMember.mentor ? '1px solid var(--border-orange)' : '1px solid var(--border-col)',
                          color: selectedMember.mentor ? 'var(--accent-orange)' : 'var(--accent-green)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured project built */}
                {selectedMember.projects && (
                  <div className="mb-8 p-4 rounded-2xl bg-black/20 border border-[var(--border-col)]">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--accent-orange)]">Projet Vedette</span>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-small font-bold" style={{ color: 'var(--text-main)' }}>{selectedMember.projects}</div>
                      <span className="text-[8px] font-mono text-[var(--text-sub)] flex items-center gap-0.5">
                        Open Source <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                )}

                {/* Contact and Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6" style={{ borderTop: '1px solid var(--border-col)' }}>
                  <div className="flex items-center gap-4">
                    {selectedMember.links.github && (
                      <a href={selectedMember.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold uppercase hover:text-[var(--accent-green)] transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {selectedMember.links.linkedin && (
                      <a href={selectedMember.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold uppercase hover:text-[var(--accent-green)] transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {selectedMember.links.website && (
                      <a href={selectedMember.links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold uppercase hover:text-[var(--accent-orange)] transition-colors">
                        <Globe className="h-4 w-4" /> Portfolio
                      </a>
                    )}
                  </div>

                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="btn-orange rounded-full px-6 py-2.5 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Mail className="h-3.5 w-3.5" /> Contacter
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
