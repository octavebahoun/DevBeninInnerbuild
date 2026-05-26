import React from 'react';
import NeuronNetwork from './NeuronNetwork';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 pattern-dots"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Interactive Three.js Network Background */}
      <NeuronNetwork />

      {/* Orange glow top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, var(--glow-orange) 0%, transparent 70%)' }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
          style={{
            border: '1px solid var(--border-orange)',
            background: 'var(--glow-orange)'
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: 'var(--accent-orange)' }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: 'var(--accent-orange)' }}
            />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-orange)' }}>
            🇧🇯 Communauté Tech Béninoise
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          style={{ color: 'var(--text-main)' }}
        >
          CONSTRUISONS<br />
          L'AVENIR{' '}
          <span style={{ color: 'var(--accent-orange)' }}>TECH</span>
          <br />
          <span style={{ color: 'var(--accent-green)', opacity: 0.6 }} className="font-light">
            DU BÉNIN
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-sm sm:text-base font-medium leading-relaxed"
          style={{ color: 'var(--text-sub)' }}
        >
          La plus grande communauté de développeurs au Bénin. Apprenez, partagez vos connaissances
          et collaborez sur des projets open source innovants.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary — Orange */}
          <button className="btn-orange rounded-md px-7 py-3.5 font-display text-sm tracking-wider">
            Rejoindre l'Élite ↗
          </button>

          {/* Secondary — outline orange */}
          <button className="btn-outline-orange rounded-md px-7 py-3.5 font-semibold text-sm">
            Voir les projets →
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { val: '500+', label: 'Membres actifs' },
            { val: '80+', label: 'Projets open source' },
            { val: '30+', label: 'Challenges réalisés' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl font-bold" style={{ color: 'var(--accent-orange)' }}>{val}</div>
              <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'var(--text-sub)' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-0"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />
    </section>
  );
}
