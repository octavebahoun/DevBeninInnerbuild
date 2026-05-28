import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageSquare, 
  Eye, 
  Clock, 
  MapPin, 
  Briefcase, 
  HelpCircle, 
  Award, 
  Settings, 
  Code2, 
  BookOpen, 
  FileText, 
  Globe, 
  ShieldAlert,
  Folder,
  Trash2,
  TrendingUp,
  Share2,
  Cpu,
  Plus
} from 'lucide-react';
import { authStore } from '../lib/storage';
import { projectStore } from '../lib/projectStore';
import { articleStore } from '../lib/articleStore';

// Preset standard tech tags from screenshot
const DEFAULT_SKILLS = [
  "Frontend Developer", "Git", "REST API", "Figma", "Vercel", "Docker", 
  "Machine Learning", "MongoDB", "React", "Tailwind CSS", "Next.js", 
  "JavaScript", "FastAPI", "Python", "Node.js", "Supabase", "GitHub", 
  "Firebase", "WebSocket"
];

export default function Dashboard() {
  const session = authStore.getSession();
  const [activeTab, setActiveTab] = useState('Projets');
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [shareMap, setShareMap] = useState({});
  const [saveState, setSaveState] = useState({ status: 'idle', message: '' });

  // Load user details with dynamic screen presets matching the screenshots
  const user = useMemo(() => {
    const raw = authStore.getUserById(session?.userId);
    return {
      id: session?.userId,
      name: raw?.name || session?.name || 'OCTAVE PRÉCIEUX MAHUNAN BAHOUN-HOUTOUKPE',
      email: raw?.email || session?.email || 'octave@devbenin.bj',
      avatar: raw?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      streak: Number(raw?.streak) || 1,
      xp: Number(raw?.xp) || 13,
      location: raw?.location || 'Lokossa Bénin',
      experience: raw?.experience || "2 ans d'expérience",
      mentorStatus: raw?.mentorStatus || 'Cherche un mentor',
      level: raw?.level || 'Junior',
      bio: raw?.bio || "Étudiant en génie électrique et informatique à l'INSTI Lokossa, je suis profondément passionné par l'intersection entre le développement logiciel et l'intelligence artificielle. Mon objectif est de concevoir des solutions numériques innovantes qui répondent à des problématiques concrètes. Je m'intéresse particulièrement aux applications d'IA dans le domaine de l'éducation, au développement d'applications mobiles intuitives et à la création d'expériences web modernes et performantes.",
      skills: Array.isArray(raw?.skills) ? raw?.skills : (raw?.skills ? raw.skills.split(',').map(s => s.trim()) : DEFAULT_SKILLS),
      github: raw?.github || 'https://github.com',
      linkedin: raw?.linkedin || 'https://linkedin.com',
      portfolio: raw?.portfolio || 'https://devbenin.bj',
      techStack: raw?.techStack || 'Frontend'
    };
  }, [session]);

  // Form states initialized with database users
  const [formName, setFormName] = useState(user.name);
  const [formEmail, setFormEmail] = useState(user.email);
  const [formAvatar, setFormAvatar] = useState(user.avatar);
  const [formStreak, setFormStreak] = useState(user.streak);
  const [formXP, setFormXP] = useState(user.xp);
  const [formLocation, setFormLocation] = useState(user.location);
  const [formExperience, setFormExperience] = useState(user.experience);
  const [formMentorStatus, setFormMentorStatus] = useState(user.mentorStatus);
  const [formLevel, setFormLevel] = useState(user.level);
  const [formBio, setFormBio] = useState(user.bio);
  const [formSkills, setFormSkills] = useState(user.skills.join(', '));
  const [formGithub, setFormGithub] = useState(user.github);
  const [formLinkedin, setFormLinkedin] = useState(user.linkedin);
  const [formPortfolio, setFormPortfolio] = useState(user.portfolio);
  const [formTechStack, setFormTechStack] = useState(user.techStack);

  useEffect(() => {
    setArticles(articleStore.getArticles());
    setProjects(projectStore.getProjects());
  }, []);

  // Sync state if user changes
  useEffect(() => {
    setFormName(user.name);
    setFormEmail(user.email);
    setFormAvatar(user.avatar);
    setFormStreak(user.streak);
    setFormXP(user.xp);
    setFormLocation(user.location);
    setFormExperience(user.experience);
    setFormMentorStatus(user.mentorStatus);
    setFormLevel(user.level);
    setFormBio(user.bio);
    setFormSkills(user.skills.join(', '));
    setFormGithub(user.github);
    setFormLinkedin(user.linkedin);
    setFormPortfolio(user.portfolio);
    setFormTechStack(user.techStack);
  }, [user]);

  const myArticles = useMemo(() => {
    return articles.filter(a => a.author === user.name || a.authorEmail === user.email);
  }, [articles, user.name, user.email]);

  const myProjects = useMemo(() => {
    const name = (user.name || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    return projects.filter(p => {
      const ownerName = (p.owner || '').toLowerCase();
      const ownerEmail = (p.ownerEmail || '').toLowerCase();
      return (name && ownerName === name) || (email && ownerEmail === email);
    });
  }, [projects, user.name, user.email]);

  const handleShare = async (projectId) => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/projects/${projectId}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch (err) {
      console.error(err);
    }
    setShareMap(prev => ({ ...prev, [projectId]: true }));
    setTimeout(() => setShareMap(prev => ({ ...prev, [projectId]: false })), 1500);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaveState({ status: 'idle', message: '' });

    if (!session?.userId) {
      setSaveState({ status: 'error', message: 'Session invalide. Veuillez vous reconnecter.' });
      return;
    }

    if (!formName.trim() || !formEmail.trim()) {
      setSaveState({ status: 'error', message: 'Nom et email obligatoires.' });
      return;
    }

    const skillsArray = formSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const result = authStore.updateUser(session.userId, {
      name: formName.trim(),
      email: formEmail.trim().toLowerCase(),
      avatar: formAvatar.trim(),
      streak: Number(formStreak) || 1,
      xp: Number(formXP) || 10,
      location: formLocation.trim(),
      experience: formExperience.trim(),
      mentorStatus: formMentorStatus.trim(),
      level: formLevel.trim(),
      bio: formBio.trim(),
      skills: skillsArray,
      github: formGithub.trim(),
      linkedin: formLinkedin.trim(),
      portfolio: formPortfolio.trim(),
      techStack: formTechStack.trim()
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

    setSaveState({ status: 'success', message: 'Votre profil premium a été mis à jour avec succès !' });
    
    // Trigger localized updates to stores for author name changes
    if (formName.trim() !== user.name) {
      const nextArt = articles.map(a => {
        if (a.author === user.name) return { ...a, author: formName.trim() };
        return a;
      });
      articleStore.saveArticles(nextArt);
      setArticles(nextArt);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-20" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
      {/* Dynamic star particles background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.02)_0,transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 flex items-center gap-2">
          <span>Accueil</span>
          <span>/</span>
          <span className="text-[#22C55E]">{user.name}</span>
        </div>

        {/* 1. Header Profile Box */}
        <div className="rounded-3xl p-8 border border-white/[0.04] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
          style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          
          {/* Avatar Container with Spinning glowing rings */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-40 h-40">
            <div className="absolute w-36 h-36 rounded-full border border-[#22C55E]/15 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#22C55E]/30 animate-[spin_10s_linear_infinite_reverse]" />
            <div className="absolute w-28 h-28 rounded-full bg-[#22C55E]/5 blur-lg pointer-events-none" />
            
            {/* Core Circular picture */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.25)] bg-neutral-900 flex-shrink-0">
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User descriptions and badges */}
          <div className="flex-grow space-y-4 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight leading-tight max-w-lg" style={{ color: 'var(--text-main)' }}>
                {user.name}
              </h1>

              {/* Flame streak & XP badges */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase" 
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', color: '#F97316' }}>
                  🔥 {user.streak}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase" 
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}>
                  💎 {user.xp} XP
                </span>
              </div>
            </div>

            {/* Custom tags underneath name */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold bg-white/[0.02] border border-white/5 text-white/75">
                <MapPin className="w-3 h-3 text-[#22C55E]" />
                {user.location}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold bg-white/[0.02] border border-white/5 text-white/75">
                <Briefcase className="w-3 h-3 text-[#22C55E]" />
                {user.experience}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold" 
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', color: '#22C55E' }}>
                <HelpCircle className="w-3 h-3" />
                {user.mentorStatus}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold"
                style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)', color: '#F97316' }}>
                <Award className="w-3 h-3" />
                {user.level}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Bio, Competences & Social Links */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Bio block card */}
          <div className="lg:col-span-2 rounded-3xl p-6 border border-white/[0.04] space-y-4" style={{ backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Biographie</h3>
            <p className="text-xs leading-relaxed opacity-75" style={{ color: 'var(--text-sub)' }}>
              {user.bio}
            </p>
          </div>

          {/* Social connections block card */}
          <div className="rounded-3xl p-6 border border-white/[0.04] flex flex-col justify-between gap-6" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Liens Externes</h3>
              <p className="text-[10px] text-white/40">Visitez les profils sociaux ou le site personnel.</p>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <a href={user.github} target="_blank" rel="noreferrer" 
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-colors border border-white/5 bg-white/[0.01] hover:bg-white/5 text-white/80">
                <span>Profil GitHub</span>
                <ArrowRightIcon />
              </a>
              <a href={user.linkedin} target="_blank" rel="noreferrer" 
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-colors border border-white/5 bg-white/[0.01] hover:bg-white/5 text-white/80">
                <span>LinkedIn</span>
                <ArrowRightIcon />
              </a>
              <a href={user.portfolio} target="_blank" rel="noreferrer" 
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-colors border border-white/5 bg-white/[0.01] hover:bg-white/5 text-white/80">
                <span>Portfolio Personnel</span>
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Competences / Skills tags card */}
        <div className="rounded-3xl p-6 border border-white/[0.04] space-y-4" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Compétences & Technologies</h3>
            <span className="text-[9px] font-bold text-white/40">{user.skills.length} expertises</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="px-3.5 py-1.5 rounded-full text-[10px] font-bold bg-white/[0.02] border border-white/5 text-white/70 hover:border-[#22C55E]/40 hover:text-white transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2">
          {[
            { id: 'Projets', label: 'Projets', count: myProjects.length, icon: Code2 },
            { id: 'Quiz', label: 'Progression / Quiz', count: 3, icon: TrendingUp },
            { id: 'Articles', label: 'Articles & Brouillons', count: myArticles.length, icon: FileText },
            { id: 'Paramètres', label: 'Paramètres du Profil', count: null, icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300"
                style={
                  isSelected
                    ? { background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', color: '#22C55E' }
                    : { color: 'var(--text-sub)', border: '1px solid transparent', background: 'transparent' }
                }
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black" 
                    style={isSelected ? { background: '#22C55E', color: 'var(--bg)' } : { background: 'var(--surface)', color: 'var(--text-sub)' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Tab Views Contents */}
        <div className="space-y-6">
          
          {/* A. Projets View Grid */}
          {activeTab === 'Projets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-extrabold text-white">Mes Réalisations</h3>
                <Link to="/projects" className="text-[10px] font-black uppercase tracking-wider text-[#22C55E] flex items-center gap-1">
                  <span>Partager un projet</span>
                  <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                </Link>
              </div>

              {myProjects.length === 0 ? (
                <div className="rounded-3xl p-12 text-center border border-dashed border-white/5 bg-white/[0.01]">
                  <Code2 className="w-12 h-12 mx-auto opacity-35 mb-4 text-[#22C55E]" />
                  <h4 className="text-xs font-bold text-white/80">Aucun projet partagé</h4>
                  <p className="text-[10px] text-white/50 mt-1">Vous n'avez pas de projets associés à votre nom pour le moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {myProjects.map((p) => {
                    const statusVal = p.status || 'Terminé';
                    const isFinished = statusVal.toLowerCase().includes('termin');
                    
                    return (
                      <div key={p.id} className="rounded-3xl overflow-hidden border border-white/[0.04] flex flex-col justify-between group transition-all"
                        style={{ backgroundColor: 'var(--card-bg)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#22C55E'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}>
                        
                        {/* Upper Details */}
                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest"
                              style={
                                isFinished 
                                  ? { background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }
                                  : { background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', color: '#F97316' }
                              }>
                              {isFinished ? 'TERMINÉ' : 'CHERCHE RENFORTS'}
                            </span>
                            <span className="text-[9px] text-white/30">{p.category}</span>
                          </div>

                          <h4 className="text-base font-extrabold text-white group-hover:text-[#22C55E] transition-colors">{p.title}</h4>
                          <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{p.summary}</p>
                          
                          <div className="flex flex-wrap gap-1.5">
                            {p.techStack.slice(0, 3).map(t => (
                              <span key={t} className="px-2 py-0.5 rounded text-[8px] font-mono bg-white/5 text-white/50">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="p-4 border-t border-white/[0.04] bg-black/10 flex items-center justify-between gap-4">
                          <span className="text-[10px] text-white/40 flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-red-500/60" />
                            {p.likes || 3} j'aime
                          </span>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleShare(p.id)}
                              className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider border border-white/5 bg-white/[0.01] hover:bg-white/5 text-white/70"
                            >
                              {shareMap[p.id] ? 'Copié !' : 'Partager'}
                            </button>
                            <Link 
                              to={`/projects/${p.id}`}
                              className="px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-black transition-colors"
                              style={{ backgroundColor: '#22C55E' }}
                            >
                              Code & Démo
                            </Link>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* B. Quiz & Progression View */}
          {activeTab === 'Quiz' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              
              {/* Leaderboard Stat card */}
              <div className="md:col-span-2 rounded-3xl p-6 border border-white/[0.04] space-y-6" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-base font-extrabold text-white">Progression Globale</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-white/60 mb-2">
                      <span>Points d'Expérience (XP)</span>
                      <span className="font-bold text-[#22C55E]">{user.xp} / 100 XP</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${Math.min(100, user.xp)}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Quiz Complétés</span>
                      <span className="block text-2xl font-black text-[#22C55E] mt-1">3</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Streak d'Activité</span>
                      <span className="block text-2xl font-black text-orange-500 mt-1">🔥 {user.streak}j</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate badge lists */}
              <div className="rounded-3xl p-6 border border-white/[0.04] space-y-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Badges Gagnés</h3>
                
                <div className="space-y-3">
                  {[
                    { title: 'React Expert', desc: 'Validé avec 100% au Quiz React', color: '#22C55E' },
                    { title: 'Python Architect', desc: 'Validé au Quiz Algorithmique', color: '#F97316' },
                    { title: 'Membre Certifié', desc: 'Identité vérifiée à Lokossa', color: '#3B82F6' }
                  ].map(b => (
                    <div key={b.title} className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black" 
                        style={{ backgroundColor: `${b.color}20`, color: b.color, border: `1px solid ${b.color}40` }}>
                        🏅
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/80">{b.title}</div>
                        <div className="text-[9px] text-white/40 mt-0.5">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* C. Articles Feed */}
          {activeTab === 'Articles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-extrabold text-white">Mes Articles Rédigés</h3>
                <Link to="/articles" className="text-[10px] font-black uppercase tracking-wider text-[#22C55E] flex items-center gap-1">
                  <span>Créer un article</span>
                  <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                </Link>
              </div>

              {myArticles.length === 0 ? (
                <div className="rounded-3xl p-12 text-center border border-dashed border-white/5 bg-white/[0.01]">
                  <FileText className="w-12 h-12 mx-auto opacity-35 mb-4 text-[#22C55E]" />
                  <h4 className="text-xs font-bold text-white/80">Aucun article publié</h4>
                  <p className="text-[10px] text-white/50 mt-1">Vos publications de blog apparaîtront ici.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myArticles.map((art) => (
                    <div key={art.id} className="rounded-3xl p-6 border border-white/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-[#22C55E]/40"
                      style={{ backgroundColor: 'var(--card-bg)' }}>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest"
                            style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}>
                            {art.category}
                          </span>
                          <span className="text-[9px] text-white/40">{art.date} · {art.readTime}</span>
                          {art.isDraft && (
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                              Brouillon
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-extrabold text-white">{art.title}</h4>
                      </div>

                      <div className="flex gap-2">
                        <Link 
                          to={`/articles/${art.id}`}
                          className="px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider border border-white/5 bg-white/[0.01] hover:bg-white/5 text-white/80"
                        >
                          Consulter
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* D. Paramètres du Profil Form */}
          {activeTab === 'Paramètres' && (
            <div className="rounded-3xl p-6 sm:p-8 border border-white/[0.04]" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-[#22C55E]" />
                <h3 className="text-base font-extrabold text-white">Mettre à jour mon profil premium</h3>
              </div>

              <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left Form */}
                <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#22C55E]">Informations Générales</div>
                  
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Nom & Prénoms</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Adresse de messagerie</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">URL de l'avatar photo</label>
                    <input
                      type="text"
                      value={formAvatar}
                      onChange={(e) => setFormAvatar(e.target.value)}
                      placeholder="https://..."
                      className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Streak Flamme</label>
                      <input
                        type="number"
                        value={formStreak}
                        onChange={(e) => setFormStreak(e.target.value)}
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Points d'Expérience (XP)</label>
                      <input
                        type="number"
                        value={formXP}
                        onChange={(e) => setFormXP(e.target.value)}
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Ville / Pays</label>
                      <input
                        type="text"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="ex: Lokossa Bénin"
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Ancienneté / Expérience</label>
                      <input
                        type="text"
                        value={formExperience}
                        onChange={(e) => setFormExperience(e.target.value)}
                        placeholder="ex: 2 ans d'expérience"
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Niveau</label>
                      <select
                        value={formLevel}
                        onChange={(e) => setFormLevel(e.target.value)}
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#22C55E]"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)', colorScheme: 'dark' }}
                      >
                        <option value="Junior">Junior</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Expert">Expert / Senior</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Statut Mentorat</label>
                      <select
                        value={formMentorStatus}
                        onChange={(e) => setFormMentorStatus(e.target.value)}
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#22C55E]"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)', colorScheme: 'dark' }}
                      >
                        <option value="Cherche un mentor">Cherche un mentor</option>
                        <option value="Prêt à aider">Prêt à aider / Mentor</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Form */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#22C55E]">Liens Sociaux & Biographie</div>
                    
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Lien GitHub</label>
                      <input
                        type="text"
                        value={formGithub}
                        onChange={(e) => setFormGithub(e.target.value)}
                        placeholder="https://github.com/..."
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Lien LinkedIn</label>
                      <input
                        type="text"
                        value={formLinkedin}
                        onChange={(e) => setFormLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Lien Portfolio</label>
                      <input
                        type="text"
                        value={formPortfolio}
                        onChange={(e) => setFormPortfolio(e.target.value)}
                        placeholder="https://..."
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Spécialité Principale</label>
                      <input
                        type="text"
                        value={formTechStack}
                        onChange={(e) => setFormTechStack(e.target.value)}
                        placeholder="ex: Frontend / Fullstack"
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">Technologies & Compétences (séparées par des virgules)</label>
                      <input
                        type="text"
                        value={formSkills}
                        onChange={(e) => setFormSkills(e.target.value)}
                        placeholder="React, Docker, Node.js"
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-white/40">À propos de moi (Bio)</label>
                      <textarea
                        rows={4}
                        value={formBio}
                        onChange={(e) => setFormBio(e.target.value)}
                        placeholder="Décrivez votre parcours..."
                        className="mt-1.5 w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>

                  {saveState.message && (
                    <div className="rounded-xl px-4 py-2.5 text-xs text-center"
                      style={saveState.status === 'success' ? { background: 'rgba(34,197,94,0.15)', color: '#22C55E' } : { background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>
                      {saveState.message}
                    </div>
                  )}

                  <button type="submit" className="w-full py-3.5 mt-4 rounded-xl text-[10px] font-black uppercase tracking-wider text-black transition-all hover:opacity-90"
                    style={{ backgroundColor: '#22C55E' }}>
                    Enregistrer toutes les modifications
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Arrow icon inline svg
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
