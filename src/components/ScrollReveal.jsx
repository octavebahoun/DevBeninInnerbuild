import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Variants catalogue ─── */
const VARIANTS = {
  fadeUp: {
    hidden:  { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0  },
  },
  fadeDown: {
    hidden:  { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0  },
  },
  fadeLeft: {
    hidden:  { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0  },
  },
  fadeRight: {
    hidden:  { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden:  { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1   },
  },
  slideReveal: {
    hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  },
};

/* ─── Stagger container ─── */
const staggerContainer = (staggerDelay = 0.12, delayChildren = 0) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: staggerDelay, delayChildren },
  },
});

/* ══════════════════════════════════════════════════════════
   ScrollReveal — wraps any element with a whileInView motion
   Props:
     variant   : keyof VARIANTS (default 'fadeUp')
     delay     : number (seconds, default 0)
     duration  : number (seconds, default 0.65)
     once      : bool (default true)
     amount    : 0-1 how much of el must be in view (default 0.15)
     as        : HTML tag or component (default 'div')
     className / style / children
══════════════════════════════════════════════════════════ */
export function ScrollReveal({
  children,
  variant  = 'fadeUp',
  delay    = 0,
  duration = 0.65,
  once     = true,
  amount   = 0.15,
  as       = 'div',
  className,
  style,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  return (
    <Tag
      ref={ref}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════
   StaggerGroup — animates children with stagger
   Place ScrollReveal children inside with variant props
══════════════════════════════════════════════════════════ */
export function StaggerGroup({
  children,
  staggerDelay   = 0.12,
  delayChildren  = 0,
  once           = true,
  amount         = 0.12,
  className,
  style,
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(staggerDelay, delayChildren)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   StaggerItem — direct child of StaggerGroup
══════════════════════════════════════════════════════════ */
export function StaggerItem({
  children,
  variant  = 'fadeUp',
  duration = 0.6,
  className,
  style,
}) {
  return (
    <motion.div
      variants={VARIANTS[variant]}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   SectionHeader — standard section label + title animation
══════════════════════════════════════════════════════════ */
export function SectionHeader({ number, eyebrow, title, accent, className }) {
  return (
    <div className={className}>
      <ScrollReveal variant="fadeLeft" duration={0.5}>
        <div className="section-label">
          <span>{number}</span>
          <span>{eyebrow}</span>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="fadeUp" delay={0.1} duration={0.65}>
        <h2 className="mt-3 text-h2" style={{ color: 'var(--text-main)' }}>
          {title}{' '}
          {accent && <span style={{ color: 'var(--accent-orange)' }}>{accent}</span>}
        </h2>
      </ScrollReveal>
    </div>
  );
}

export { VARIANTS };
