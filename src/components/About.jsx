import React from 'react';
import { Users, BookOpen, Target, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">

        {/* Section Header */}
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>01</span><span>Notre Mission</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 text-h2" style={{ color: 'var(--text-main)' }}>
              Notre Mission : <span style={{ color: 'var(--accent-orange)' }}>Connecter, Former, Propulser</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="mt-4 text-body max-w-2xl font-light" style={{ color: 'var(--text-sub)' }}>
              DevBénin est le catalyseur de l'écosystème tech béninois. Nous créons un environnement propice à l'innovation, à l'apprentissage et à la collaboration professionnelle.
            </p>
          </ScrollReveal>
        </div>

        {/* Connecter vs Former Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Connecter */}
          <ScrollReveal variant="fadeLeft" delay={0.1}>
            <div
              className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-orange)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
            >
              <div>
                <div className="mb-6 rounded-md p-2.5 w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <Users className="h-6 w-6" style={{ color: 'var(--accent-orange)' }} />
                </div>
                <h3 className="font-display text-h3 font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-main)' }}>
                  Connecter &amp; Réseauter
                </h3>
                <ul className="space-y-4 text-small sm:text-body font-light mb-6" style={{ color: 'var(--text-sub)' }}>
                  <li className="flex gap-2.5 items-start">
                    <span style={{ color: 'var(--accent-orange)' }}>⚡</span>
                    <span>Connectez-vous avec des milliers de développeurs partageant les mêmes idées, du junior au senior expert.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span style={{ color: 'var(--accent-orange)' }}>⚡</span>
                    <span>Trouvez des mentors, des partenaires pour vos projets ou recrutez les meilleurs talents locaux.</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/membres')}
                className="btn-orange w-full rounded py-3 text-cta text-center font-bold"
              >
                Rejoindre le réseau →
              </button>
            </div>
          </ScrollReveal>

          {/* Card 2: Former */}
          <ScrollReveal variant="fadeRight" delay={0.2}>
            <div
              className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-green)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
            >
              <div>
                <div className="mb-6 rounded-md p-2.5 w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                  <BookOpen className="h-6 w-6" style={{ color: 'var(--accent-green)' }} />
                </div>
                <h3 className="font-display text-h3 font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-main)' }}>
                  Former &amp; Propulser
                </h3>
                <ul className="space-y-4 text-small sm:text-body font-light mb-6" style={{ color: 'var(--text-sub)' }}>
                  <li className="flex gap-2.5 items-start">
                    <span style={{ color: 'var(--accent-green)' }}>⚡</span>
                    <span>Accédez à des ressources exclusives, des tutoriels, et participez à des workshops pratiques.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span style={{ color: 'var(--accent-green)' }}>⚡</span>
                    <span>Relevez des défis de code hebdomadaires pour affûter vos compétences et gagner en visibilité.</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/challenges')}
                className="btn-outline-orange w-full rounded py-3 text-cta text-center font-bold"
                style={{ border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
              >
                Explorer les ressources →
              </button>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
