import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      {/* Orange radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(ellipse, var(--glow-orange) 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-0 bottom-0 h-[200px] w-[200px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'var(--glow-green)' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        <ScrollReveal variant="fadeDown" duration={0.5}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-stag mb-6"
            style={{ background: 'var(--glow-orange)', border: '1px solid var(--border-orange)', color: 'var(--accent-orange)' }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-orange)' }} />
            Rejoignez-nous dès aujourd'hui
          </span>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1} duration={0.75}>
          <h2 data-gsap-title className="text-h2 md:text-6xl font-bold tracking-tight leading-tight uppercase italic"
            style={{ color: 'var(--text-main)' }}>
            Prêt à transformer<br />
            votre <span style={{ color: 'var(--accent-orange)' }}>carrière</span> ?
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-body font-medium leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
            Rejoignez la communauté des développeurs béninois. Partagez vos projets, apprenez des meilleurs experts et développez votre réseau professionnel dès aujourd'hui.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="divider-orange mx-auto mt-8 mb-8 max-w-xs" />
        </ScrollReveal>

        <ScrollReveal variant="scaleUp" delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="btn-orange rounded-full px-8 py-4 text-cta font-bold hover:scale-105 active:scale-95"
            >
              Rejoindre maintenant
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="btn-outline-green rounded-full px-8 py-4 font-semibold text-body hover:scale-105 active:scale-95"
              style={{ border: '1.5px solid var(--accent-green)', color: 'var(--text-main)' }}
            >
              Nous contacter
            </button>
          </div>
        </ScrollReveal>

        <StaggerGroup className="mt-10 flex flex-wrap items-center justify-center gap-6" staggerDelay={0.1} delayChildren={0.45}>
          {[
            { icon: '🔒', label: 'Accès sécurisé' },
            { icon: '🇧🇯', label: 'Communauté Béninoise' },
            { icon: '⚡', label: 'Open Source' },
          ].map(({ icon, label }) => (
            <StaggerItem key={label} variant="fadeUp">
              <div className="flex items-center gap-2 text-stag" style={{ color: 'var(--text-sub)' }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
}
