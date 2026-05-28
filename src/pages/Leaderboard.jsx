import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Flame, Star, Crown, ChevronUp, Minus } from 'lucide-react';
import { authStore } from '../lib/storage';
import { ScrollReveal } from '../components/ScrollReveal';

// Mock data in case the store is empty
const MOCK_LEADERS = [
  { id: '1', name: 'Octave Bahoun', xp: 2450, streak: 12, level: 'Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: '2', name: 'Amina Bello', xp: 2100, streak: 8, level: 'Expert', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: '3', name: 'Ronald Hounnou', xp: 1850, streak: 5, level: 'Intermédiaire', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  { id: '4', name: 'Precieux Dev', xp: 1200, streak: 2, level: 'Intermédiaire', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
  { id: '5', name: 'Jane Doe', xp: 850, streak: 1, level: 'Junior', avatar: '' }
];

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const users = authStore.getUsers();
    let combined = [...users];
    
    // Add mock data if very few users exist
    if (combined.length < 3) {
      const existingNames = new Set(combined.map(u => u.name));
      for (const mock of MOCK_LEADERS) {
        if (!existingNames.has(mock.name)) {
          combined.push(mock);
        }
      }
    }
    
    // Sort by XP descending
    combined.sort((a, b) => (b.xp || 0) - (a.xp || 0));
    setLeaders(combined);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden pb-20" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.05)_0,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] mb-6">
              <Trophy className="w-3.5 h-3.5" />
              <span>Temple de la Renommée</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter" style={{ color: 'var(--text-main)' }}>
              LE <span className="text-[#F97316]">CLASSEMENT</span>
            </h1>
            <p className="mt-4 text-base text-white/60 max-w-2xl mx-auto">
              Découvrez les développeurs les plus actifs de la communauté DevBénin. Gagnez de l'XP en complétant des challenges et en publiant des articles.
            </p>
          </ScrollReveal>
        </div>

        {/* Top 3 Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
          {/* Rank 2 */}
          {leaders[1] && (
            <ScrollReveal variant="fadeUp" delay={0.2} className="w-full md:w-1/3 order-2 md:order-1">
              <PodiumCard user={leaders[1]} rank={2} color="#94A3B8" height="h-48" />
            </ScrollReveal>
          )}
          
          {/* Rank 1 */}
          {leaders[0] && (
            <ScrollReveal variant="fadeUp" delay={0} className="w-full md:w-1/3 order-1 md:order-2 z-10">
              <PodiumCard user={leaders[0]} rank={1} color="#FBBF24" height="h-64" isFirst />
            </ScrollReveal>
          )}
          
          {/* Rank 3 */}
          {leaders[2] && (
            <ScrollReveal variant="fadeUp" delay={0.4} className="w-full md:w-1/3 order-3">
              <PodiumCard user={leaders[2]} rank={3} color="#B45309" height="h-40" />
            </ScrollReveal>
          )}
        </div>

        {/* List of other ranks */}
        <div className="space-y-4">
          {leaders.slice(3).map((user, index) => {
            const rank = index + 4;
            return (
              <ScrollReveal key={user.id || user.name} variant="fadeUp" delay={0.1 * index}>
                <div className="flex items-center justify-between p-4 md:p-6 rounded-2xl border transition-colors hover:border-white/20"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'rgba(255,255,255,0.05)' }}>
                  
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-xl md:text-2xl font-black italic text-white/20 w-8 text-center">
                      #{rank}
                    </span>
                    
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/50 text-sm font-bold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm md:text-base font-extrabold text-white">{user.name}</h4>
                      <span className="text-[10px] text-white/40">{user.level || 'Junior'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase text-[#F97316] bg-[#F97316]/10 border border-[#F97316]/20">
                      <Flame className="w-3.5 h-3.5" />
                      {user.streak || 0} jours
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-sm md:text-lg font-black text-[#22C55E]">
                        {user.xp || 0}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">XP Total</span>
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

function PodiumCard({ user, rank, color, height, isFirst }) {
  return (
    <div className="relative flex flex-col items-center">
      {isFirst && (
        <Crown className="w-8 h-8 text-[#FBBF24] absolute -top-10 animate-bounce" />
      )}
      
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 z-10 bg-black"
        style={{ borderColor: color, boxShadow: `0 0 30px ${color}40` }}>
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50 text-xl font-bold bg-white/5">
            {user.name.charAt(0)}
          </div>
        )}
      </div>

      <div className={`w-full ${height} mt-[-40px] rounded-t-3xl border-t border-l border-r p-6 flex flex-col items-center justify-end relative overflow-hidden`}
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'rgba(255,255,255,0.05)',
          background: `linear-gradient(to top, rgba(0,0,0,0.8), ${color}20)`
        }}>
        
        <div className="absolute top-12 flex flex-col items-center">
          <span className="text-4xl font-black italic" style={{ color: color, textShadow: `0 2px 10px ${color}60` }}>
            {rank}
          </span>
          <Medal className="w-6 h-6 mt-1 opacity-80" style={{ color: color }} />
        </div>

        <div className="text-center mt-auto z-10 w-full">
          <h3 className="text-xs md:text-sm font-extrabold text-white truncate px-2">{user.name}</h3>
          <div className="flex items-center justify-center gap-1 mt-2 text-[#22C55E] text-xs font-black">
            <Star className="w-3.5 h-3.5" />
            {user.xp || 0} XP
          </div>
        </div>
      </div>
    </div>
  );
}
