import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Code2, Database, Layout, Clock, Star, Play, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const CHALLENGES = [
  {
    id: 1,
    title: 'React Expert Certification',
    description: 'Testez vos connaissances approfondies sur les Hooks, le Context API et les optimisations de rendu sous React 19.',
    category: 'Frontend',
    icon: Code2,
    difficulty: 'Expert',
    time: '45 min',
    points: 50,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Python Data Structures',
    description: 'Algorithmique et manipulation avancée des listes, dictionnaires, et générateurs en Python 3.',
    category: 'Backend',
    icon: Database,
    difficulty: 'Intermédiaire',
    time: '30 min',
    points: 30,
    status: 'available'
  },
  {
    id: 3,
    title: 'UI/UX Masterclass Quiz',
    description: 'Principes de design, accessibilité, et heuristiques pour la conception d\'interfaces premiums.',
    category: 'Design',
    icon: Layout,
    difficulty: 'Débutant',
    time: '15 min',
    points: 20,
    status: 'available'
  },
  {
    id: 4,
    title: 'Fullstack Next.js Challenge',
    description: 'Un challenge de bout en bout sur le SSR, SSG, et les API Routes avec Next.js 14.',
    category: 'Fullstack',
    icon: Layout,
    difficulty: 'Expert',
    time: '60 min',
    points: 100,
    status: 'locked'
  }
];

export default function Challenges() {
  const [filter, setFilter] = useState('Tous');
  
  const categories = ['Tous', ...new Set(CHALLENGES.map(c => c.category))];

  const filteredChallenges = CHALLENGES.filter(c => 
    filter === 'Tous' || c.category === filter
  );

  return (
    <div className="min-h-screen relative overflow-hidden pb-20" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.02)_0,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] mb-6">
              <Trophy className="w-3.5 h-3.5" />
              <span>Zone d'Évaluation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter" style={{ color: 'var(--text-main)' }}>
              LES <span className="text-[#22C55E]">CHALLENGES</span>
            </h1>
            <p className="mt-4 text-base text-white/60 max-w-2xl">
              Mettez vos compétences à l'épreuve. Gagnez de l'XP, débloquez des badges certifiés et grimpez dans le classement de la communauté DevBénin.
            </p>
          </ScrollReveal>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300"
              style={
                filter === cat
                  ? { background: 'rgba(34,197,94,0.15)', border: '1px solid #22C55E', color: '#22C55E' }
                  : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-sub)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge, i) => {
            const Icon = challenge.icon;
            const isCompleted = challenge.status === 'completed';
            const isLocked = challenge.status === 'locked';
            
            return (
              <ScrollReveal key={challenge.id} variant="fadeUp" delay={i * 0.1}>
                <div className="rounded-3xl p-6 md:p-8 border transition-all duration-300 relative overflow-hidden group"
                  style={{ 
                    backgroundColor: 'var(--card-bg)',
                    borderColor: isCompleted ? '#22C55E' : 'rgba(255,255,255,0.04)',
                    opacity: isLocked ? 0.6 : 1
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Left Icon Area */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                        style={{ 
                          background: isCompleted ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.02)',
                          borderColor: isCompleted ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)',
                          color: isCompleted ? '#22C55E' : 'var(--text-main)'
                        }}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-white/5 text-white/60">
                            {challenge.category}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest"
                            style={
                              challenge.difficulty === 'Débutant' ? { color: '#3B82F6', background: 'rgba(59,130,246,0.1)' } :
                              challenge.difficulty === 'Intermédiaire' ? { color: '#F97316', background: 'rgba(249,115,22,0.1)' } :
                              { color: '#EF4444', background: 'rgba(239,68,68,0.1)' }
                            }>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold text-white group-hover:text-[#22C55E] transition-colors">{challenge.title}</h3>
                        <p className="text-sm text-white/50 mt-2 leading-relaxed">{challenge.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white/40">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {challenge.time}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#22C55E]">
                          <Star className="w-3.5 h-3.5" />
                          +{challenge.points} XP
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        {isCompleted ? (
                          <div className="flex items-center gap-2 text-[#22C55E] text-[10px] font-black uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4" />
                            Challenge complété
                          </div>
                        ) : isLocked ? (
                          <div className="text-[10px] font-black uppercase tracking-wider text-white/30">
                            Niveau insuffisant
                          </div>
                        ) : (
                          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all transform active:scale-95 bg-[#22C55E] text-black hover:bg-[#22C55E]/90">
                            <Play className="w-3.5 h-3.5" />
                            Démarrer le quiz
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </div>
  );
}
