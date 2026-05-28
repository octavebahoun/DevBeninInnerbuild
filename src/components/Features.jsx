import React from 'react';
import { Database, BookOpen, Trophy, HelpCircle, UserCheck, Heart } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './ScrollReveal';

export default function Features() {
  const featuresList = [
    { icon: <Database  className="h-5 w-5" style={{ color: 'var(--accent-orange)' }} />, title: "Annuaire de Projets",    desc: "Découvrez les projets open-source conçus par des développeurs locaux, filtrez par technologie et collaborez.", accent: 'var(--accent-orange)' },
    { icon: <BookOpen  className="h-5 w-5" style={{ color: 'var(--accent-green)'  }} />, title: "Blog Technique",         desc: "Des tutoriels de pointe, des retours d'expérience et des actualités de l'écosystème tech béninois.", accent: 'var(--accent-green)' },
    { icon: <HelpCircle className="h-5 w-5" style={{ color: 'var(--accent-orange)' }} />, title: "Quiz Interactifs",       desc: "Testez et validez vos compétences sur diverses technologies (HTML/CSS, JS, React, Python) avec des quiz chronométrés.", accent: 'var(--accent-orange)' },
    { icon: <Trophy    className="h-5 w-5" style={{ color: 'var(--accent-green)'  }} />, title: "Leaderboard & Points",   desc: "Gagnez des points d'XP en complétant des quiz et grimpez dans le classement national des développeurs.", accent: 'var(--accent-green)' },
    { icon: <UserCheck className="h-5 w-5" style={{ color: 'var(--accent-orange)' }} />, title: "Annuaire des Membres",   desc: "Consultez les profils des développeurs, filtrez par compétences et connectez-vous avec des professionnels qualifiés.", accent: 'var(--accent-orange)' },
    { icon: <Heart     className="h-5 w-5" style={{ color: 'var(--accent-green)'  }} />, title: "Système de Likes",       desc: "Soutenez vos créateurs favoris en aimant leurs projets et leurs articles pour booster leur visibilité.", accent: 'var(--accent-green)' },
  ];

  return (
    <section
      id="features"
      className="relative py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-col)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <ScrollReveal variant="fadeLeft" duration={0.5}>
            <div className="section-label"><span>02</span><span>Services &amp; Outils</span></div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 data-gsap-title className="mt-3 text-h2" style={{ color: 'var(--text-main)' }}>
              Ce que propose <span style={{ color: 'var(--accent-orange)' }}>la Plateforme</span>
            </h2>
          </ScrollReveal>
        </div>

        <StaggerGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.09}
          delayChildren={0.05}
          data-stagger-grid
        >
          {featuresList.map((item, i) => (
            <StaggerItem key={i} variant="scaleUp">
              <div
                className="group rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-default h-full"
                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-col)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = item.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-col)'}
              >
                <div>
                  <div className="mb-4 rounded-md p-2.5 w-fit transition-all duration-300"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-col)' }}>
                    {item.icon}
                  </div>
                  <h3 className="font-display text-body font-semibold uppercase tracking-wider transition-colors duration-200"
                    style={{ color: 'var(--text-main)' }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed font-light" style={{ color: 'var(--text-sub)' }}>
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: item.accent }}>
                  En savoir plus →
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
