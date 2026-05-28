import React from 'react';
import { Calendar, Award, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';
import { useNavigate } from 'react-router-dom';

export default function Challenges() {
  const navigate = useNavigate();

  return (
    <section
      id="challenges"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>04</span><span>Quiz &amp; Challenges</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 text-h2" style={{ color: 'var(--text-main)' }}>
              Quiz <span style={{ color: 'var(--accent-orange)' }}>récents</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="mt-4 text-body max-w-2xl font-light" style={{ color: 'var(--text-sub)' }}>
              Des QCM courts pour vérifier ce que tu maîtrises. Gagne des points et grimpe dans le classement.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Main challenge card */}
          <ScrollReveal variant="fadeLeft" delay={0.05} className="md:col-span-2">
            <div className="rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between h-full transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-orange)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full pointer-events-none blur-3xl"
                style={{ background: 'var(--glow-orange)' }} />
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="rounded px-3 py-1 font-display text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}>
                    Challenge de la semaine
                  </span>
                  <span className="flex items-center gap-1.5 text-small" style={{ color: 'var(--text-sub)' }}>
                    <Calendar className="h-3.5 w-3.5" style={{ color: 'var(--accent-orange)' }} />
                    Clôture : Dimanche à Minuit
                  </span>
                </div>
                <h3 className="mt-4 text-h3 sm:text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
                  JavaScript ESNext &amp; UI reactivity
                </h3>
                <p className="mt-4 text-small sm:text-body leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
                  Testez votre maîtrise des concepts de base et avancés du web moderne. Promesses, hooks, state management, et le nouveau moteur Tailwind CSS v4.
                </p>
                
                <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" staggerDelay={0.12} delayChildren={0.1}>
                  {[
                    { icon: <Award className="h-5 w-5" style={{ color: 'var(--accent-orange)' }} />, label: 'Points à gagner', val: '+150 XP sur le profil' },
                    { icon: <BookOpen className="h-5 w-5" style={{ color: 'var(--accent-green)'  }} />, label: 'Niveau requis',     val: 'Intermédiaire à Expert' },
                  ].map(({ icon, label, val }) => (
                    <StaggerItem key={label} variant="fadeUp">
                      <div className="flex items-center gap-3 rounded p-3"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                        {icon}
                        <div>
                          <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-sub)' }}>{label}</div>
                          <div className="text-small font-semibold" style={{ color: 'var(--text-main)' }}>{val}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
              <div className="mt-6 rounded p-4 text-small font-light leading-relaxed"
                style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}>
                <span className="font-bold" style={{ color: 'var(--accent-green)' }}>💡 Règle d'or :</span> Soyez rapide pour maximiser vos points bonus de vitesse et grimper le leaderboard.
              </div>
            </div>
          </ScrollReveal>

          {/* Leaderboard Card */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
            <div className="rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-green)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
            >
              <div>
                <div className="flex items-center gap-2 rounded px-2.5 py-1.5 w-fit"
                  style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)' }}>
                  <Trophy className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-orange)' }}>Leaderboard</span>
                </div>
                <h4 className="mt-4 font-display text-body font-semibold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  Classement Général
                </h4>
                <p className="mt-2 text-small leading-relaxed font-light mb-6" style={{ color: 'var(--text-sub)' }}>
                  Découvrez les tops builders qui dominent l'écosystème béninois cette semaine.
                </p>
                <div className="space-y-4 pt-4" style={{ borderTop: '1px solid var(--border-col)' }}>
                  {[
                    { rank: 1, name: 'Precieux Dev', xp: '1 450 XP' },
                    { rank: 2, name: 'Oktav Dev', xp: '1 240 XP' },
                    { rank: 3, name: 'Ronald Hounnou', xp: '980 XP' }
                  ].map(({ rank, name, xp }) => (
                    <div key={name} className="flex justify-between items-center text-small">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display font-bold" style={{ color: rank === 1 ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                          #{rank}
                        </span>
                        <span className="font-semibold" style={{ color: 'var(--text-main)' }}>{name}</span>
                      </div>
                      <span className="font-mono font-semibold" style={{ color: 'var(--accent-green)' }}>{xp}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => navigate('/challenges')}
                className="btn-orange mt-6 w-full rounded py-3 text-cta flex items-center justify-center gap-2"
              >
                <span>Tous les quiz</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
