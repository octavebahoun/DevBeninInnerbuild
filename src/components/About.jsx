import React from 'react';
import { Shield, Sparkles, Target } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';

export default function About() {
  const cards = [
    {
      icon: <Target className="h-6 w-6" style={{ color: 'var(--accent-orange)' }} />,
      title: "Notre Mission",
      desc: "Rassembler l'élite de la tech béninoise pour propulser l'écosystème local vers de nouveaux sommets.",
      accentColor: 'var(--accent-orange)'
    },
    {
      icon: <Sparkles className="h-6 w-6" style={{ color: 'var(--accent-green)' }} />,
      title: "Créativité",
      desc: "Encourager le développement de projets originaux, open source et à fort impact social et technique.",
      accentColor: 'var(--accent-green)'
    },
    {
      icon: <Shield className="h-6 w-6" style={{ color: 'var(--accent-orange)' }} />,
      title: "Excellence",
      desc: "Bâtir des solutions techniques robustes et fiables répondant aux standards internationaux.",
      accentColor: 'var(--accent-orange)'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>01</span><span>Qui Sommes-Nous ?</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 font-display text-2xl sm:text-4xl" style={{ color: 'var(--text-main)' }}>
              À Propos De <span style={{ color: 'var(--accent-orange)' }}>DevBénin</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Context card */}
          <ScrollReveal variant="fadeLeft" delay={0.05} className="md:col-span-2">
            <div
              className="rounded-lg p-6 sm:p-8 flex flex-col justify-between h-full"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
            >
              <div>
                <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>DevBénin</strong> est le carrefour incontournable pour tous
                  les passionnés et professionnels de la technologie au Bénin. Notre communauté a pour but de fédérer les talents,
                  d'offrir un espace d'apprentissage continu et de stimuler l'innovation locale par le biais de projets collaboratifs.
                </p>
                <div
                  className="mt-6 rounded-r-md p-4 text-xs sm:text-sm font-medium italic leading-relaxed"
                  style={{ borderLeft: '3px solid var(--accent-orange)', background: 'var(--glow-orange)', color: 'var(--accent-orange)' }}
                >
                  "Prouvez que vous pouvez — en étant développeur que vous l'êtes, vraiment. Sortez des trucs de ouf. Il faut qu'on passe à la vitesse maximale."
                </div>
              </div>
              <p className="mt-6 text-xs font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
                → Un hub pour les builders, les apprenants et les créateurs du numérique.
              </p>
            </div>
          </ScrollReveal>

          {/* Stat card */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
            <div
              className="rounded-lg p-6 flex flex-col justify-center items-center text-center h-full"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-orange)' }}
            >
              <div
                className="font-display text-5xl sm:text-6xl font-bold"
                data-count="100" data-suffix="%" style={{ color: 'var(--accent-orange)' }}
              >
                100%
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-green)' }}>
                Open Source &amp; Local
              </div>
              <p className="mt-4 text-xs leading-relaxed max-w-[200px]" style={{ color: 'var(--text-sub)' }}>
                Chaque projet développé au sein de la communauté est accessible publiquement sur GitHub.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Pillars — stagger */}
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" staggerDelay={0.13} delayChildren={0.05}>
          {cards.map((card, i) => (
            <StaggerItem key={i}>
              <div
                data-stagger-card
                className="rounded-lg p-5 transition-all duration-300 h-full"
                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = card.accentColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
              >
                <div className="mb-4 rounded-md p-2.5 w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  {card.icon}
                </div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>{card.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
}
