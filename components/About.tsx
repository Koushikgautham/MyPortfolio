'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { Location } from './Globe3D';

// Dynamically import Globe3D to avoid SSR issues with Three.js
const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false });

const roles = [
  'Automation Engineer',
  'Agent Builder',
  'Game Developer',
  'Web/App Developer',
];

const journeySteps = [
  { year: '2004', location: 'Chennai', flag: '🇮🇳', label: 'Born' },
  { year: '2014', location: 'Dubai', flag: '🇦🇪', label: 'School' },
  { year: '2022', location: 'Chennai', flag: '🇮🇳', label: 'University' },
  { year: '2024', location: 'Tokyo', flag: '🇯🇵', label: 'Exchange' },
  { year: '2025', location: 'Chennai', flag: '🇮🇳', label: 'Present' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const handleLocationChange = useCallback((index: number, location: Location) => {
    setActiveLocationIndex(index);
    setCurrentLocation(location);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[200vh] bg-[var(--card-bg)] transition-colors duration-300"
    >
      {/* Sticky container for the globe and content */}
      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 lg:mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ff6b00]" />
              <span className="text-xs sm:text-sm font-medium tracking-wider text-[var(--muted)] uppercase">
                About Me
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-[var(--foreground)]">MY </span>
              <span
                style={{
                  WebkitTextStroke: '1px var(--foreground)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                JOURNEY
              </span>
            </h2>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Globe Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square max-w-[500px] mx-auto lg:mx-0 w-full"
            >
              <Globe3D sectionRef={sectionRef} onLocationChange={handleLocationChange} />

              {/* Current Location Label */}
              <motion.div
                key={activeLocationIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
              >
                <div className="bg-[var(--background)]/80 backdrop-blur-sm border border-[var(--border)] px-4 py-2 rounded-lg">
                  <span className="text-2xl mr-2">{journeySteps[activeLocationIndex]?.flag}</span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {journeySteps[activeLocationIndex]?.location}
                  </span>
                  <span className="text-sm text-[var(--muted)] ml-2">
                    {journeySteps[activeLocationIndex]?.year}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Profile Column */}
            <div className="flex flex-col gap-6">
              {/* Profile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                {/* Initials Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-black text-[#ff6b00]">KG</span>
                  </div>
                  {/* Orange corner accent */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#ff6b00]" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                    Koushik Gautham
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted)] mt-1">
                    Final Year B.Tech CSE (AI & DS)
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">
                    Hindustan Institute of Technology and Science
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg text-[var(--muted)] leading-relaxed"
              >
                A passionate developer with a global perspective, having studied across three countries.
                From schooling in Dubai to a student exchange in Tokyo, I bring diverse experiences
                to my work in automation, AI agents, game development, and web applications.
              </motion.p>

              {/* Role Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-2 sm:gap-3"
              >
                {roles.map((role, index) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#ff6b00] text-[#ff6b00] text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[#ff6b00] hover:text-white transition-colors cursor-default"
                  >
                    {role}
                  </motion.span>
                ))}
              </motion.div>

              {/* Journey Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4"
              >
                <p className="text-xs sm:text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-3">
                  Scroll to explore my journey
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {journeySteps.map((step, index) => (
                    <div key={`${step.year}-${step.location}`} className="flex items-center">
                      <span
                        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                          index === activeLocationIndex
                            ? 'bg-[#ff6b00] text-white'
                            : 'text-[var(--muted)]'
                        }`}
                      >
                        <span>{step.flag}</span>
                        <span className="hidden sm:inline">{step.location}</span>
                        <span className="text-xs opacity-75">{step.year}</span>
                      </span>
                      {index < journeySteps.length - 1 && (
                        <span className="text-[var(--muted)] mx-1">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-3 mt-4"
              >
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#ff6b00] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#e65f00] dark:hover:bg-[#ff8533] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 border border-[var(--foreground)] text-[var(--foreground)] font-medium text-sm uppercase tracking-wider hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
