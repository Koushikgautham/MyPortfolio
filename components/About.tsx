'use client';

import { motion } from 'framer-motion';

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
  return (
    <section
      id="about"
      className="relative bg-[var(--background)] transition-colors duration-300 py-12 sm:py-16 md:py-20"
    >
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] hidden lg:flex items-center justify-center overflow-hidden border border-[var(--border)] rounded-lg"
          >
            <img
              src="/Koushik_pic.jpeg"
              alt="Koushik Gautham"
              className="w-full h-full object-cover"
            />
            {/* Orange corner accent */}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#ff6b00]" />
          </motion.div>

          {/* Profile Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
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
              transition={{ duration: 0.6, delay: 0.3 }}
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {roles.map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[#ff6b00] transition-colors"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4"
            >
              <h4 className="text-sm font-medium text-[var(--muted)] mb-4 uppercase tracking-wider">
                My Journey
              </h4>
              <div className="flex flex-wrap gap-4">
                {journeySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-2 rounded-lg hover:border-[#ff6b00] transition-colors group"
                  >
                    <span className="text-lg">{step.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[var(--foreground)]">{step.label}</span>
                      <span className="text-[10px] text-[var(--muted)]">{step.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
