'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '⬢' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
];

export default function LogoMarquee() {
  return (
    <section className="py-8 sm:py-12 md:py-16 border-t border-b border-[var(--border)] bg-[var(--background)] overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6 sm:mb-8 px-4 sm:px-6 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        <span className="text-[10px] sm:text-xs font-medium tracking-widest text-[var(--muted)] uppercase whitespace-nowrap">
          Technologies I Work With
        </span>
        <div className="hidden sm:block h-px flex-1 bg-[var(--border)]" />
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 sm:w-10 sm:h-10 border border-[var(--border)] flex items-center justify-center hover:border-[var(--foreground)] transition-colors"
            aria-label="Previous"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 sm:w-10 sm:h-10 border border-[var(--border)] flex items-center justify-center hover:border-[var(--foreground)] transition-colors"
            aria-label="Next"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        <div className="flex animate-marquee">
          {/* First set */}
          {technologies.map((tech, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 md:px-12 group cursor-default"
            >
              <span className="text-xl sm:text-2xl md:text-3xl">{tech.icon}</span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {technologies.map((tech, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 md:px-12 group cursor-default"
            >
              <span className="text-xl sm:text-2xl md:text-3xl">{tech.icon}</span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
