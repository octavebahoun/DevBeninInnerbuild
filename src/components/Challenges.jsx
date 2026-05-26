import React from 'react';
import { Calendar, Award, Info, Landmark } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';

export default function Challenges() {
  return (
    <section
      id="challenges"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>03</span><span>Événements &amp; Concours</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 font-display text-2xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
              Challenges <span style={{ color: 'var(--accent-orange)' }}>Actifs</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Main challenge card */}
          <ScrollReveal variant="fadeLeft" delay={0.05} className="md:col-span-2">
            <div className="rounded-lg p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between h-full"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-orange)' }}>
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full pointer-events-none blur-3xl"
                style={{ background: 'var(--glow-orange)' }} />
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="rounded px-3 py-1 font-display text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}>
                    Challenge S02 - Phase 2
                  </span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-sub)' }}>
                    <Calendar className="h-3.5 w-3.5" style={{ color: 'var(--accent-orange)' }} />
                    Clôture : Dimanche à Minuit
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
                  The InnerBuild S02 : Montre ta performance
                </h3>
                <p className="mt-4 text-xs sm:text-sm leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
                  Recréer toute la plateforme DevBénin — la communauté tech béninoise de référence — en Frontend uniquement.
                  Pas la landing page. Pas quelques pages. Toute la plateforme en 14 jours de challenge acharné.
                </p>
                <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" staggerDelay={0.12} delayChildren={0.1}>
                  {[
                    { icon: <Award className="h-5 w-5" style={{ color: 'var(--accent-orange)' }} />, label: 'Récompense', val: 'Top Projet mis en avant + Certification' },
                    { icon: <Info  className="h-5 w-5" style={{ color: 'var(--accent-green)'  }} />, label: 'Status',     val: 'Inscriptions Ouvertes' },
                  ].map(({ icon, label, val }) => (
                    <StaggerItem key={label} variant="fadeUp">
                      <div className="flex items-center gap-3 rounded p-3"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                        {icon}
                        <div>
                          <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-sub)' }}>{label}</div>
                          <div className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>{val}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
              <div className="mt-6 rounded p-4 text-xs font-light leading-relaxed"
                style={{ background: 'var(--glow-green)', border: '1px solid var(--border-col)', color: 'var(--text-sub)' }}>
                <span className="font-bold" style={{ color: 'var(--accent-green)' }}>⚠ Règle d'or :</span> Ne recopiez pas le
                style graphique de l'original. Exprimez votre créativité ! Un site mobile first, réactif et animé par GSAP est attendu.
              </div>
            </div>
          </ScrollReveal>

          {/* Fee card */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
            <div className="rounded-lg p-6 flex flex-col justify-between h-full"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}>
              <div>
                <div className="flex items-center gap-2 rounded px-2.5 py-1.5 w-fit"
                  style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)' }}>
                  <Landmark className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-orange)' }}>Participation</span>
                </div>
                <h4 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  Frais d'inscription
                </h4>
                <div className="mt-2 font-display text-3xl font-bold" style={{ color: 'var(--accent-orange)' }}>
                  1 000 <span className="text-xs font-body font-normal" style={{ color: 'var(--text-muted)' }}>FCFA</span>
                </div>
                <p className="mt-4 text-xs leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
                  Le règlement des frais valide officiellement votre soumission auprès du jury pour l'évaluation finale.
                </p>
                <div className="mt-6 space-y-2 pt-4" style={{ borderTop: '1px solid var(--border-col)' }}>
                  {[['Celtiis', '01 40 66 33 49'], ['Moov', '01 55 87 58 94']].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center text-xs">
                      <span style={{ color: 'var(--text-sub)' }}>{k} :</span>
                      <span className="font-mono font-semibold" style={{ color: 'var(--text-main)' }}>{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-xs">
                    <span style={{ color: 'var(--text-sub)' }}>Nom :</span>
                    <span className="font-semibold text-[10px]" style={{ color: 'var(--accent-green)' }}>N. Ronald Bill H.</span>
                  </div>
                </div>
              </div>
              <button className="btn-orange mt-6 w-full rounded py-3 font-display text-xs tracking-wider">
                Envoyer la Preuve →
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
