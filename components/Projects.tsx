'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  award?: string;
  techStack: string[];
  description: string[];
  type: 'game' | 'app' | 'research' | 'ai';
}

const projects: Project[] = [
  {
    title: 'Chopsticks Game',
    award: 'National Level Skill-a-thon 2023 Winner',
    techStack: ['Unity', 'C#', 'Aseprite'],
    description: [
      'Designed and developed a pixel-style strategy game using Unity Engine, Aseprite, and C#.',
      'Secured first place at the National Level Skill-a-thon 2023 held at Hindustan University, Chennai.',
    ],
    type: 'game',
  },
  {
    title: 'Run Boy Run',
    award: 'National Level e-Luminate 2024 Winner',
    techStack: ['Unity', 'C#', 'Aseprite'],
    description: [
      'Developed an award-winning 2D pixel platformer featuring original game mechanics, assets, and logic built in Unity.',
      'Won the National Level e-Luminate 2024 Digital Design Competition for innovation and gameplay experience.',
    ],
    type: 'game',
  },
  {
    title: 'Marti – Mart for Artisans',
    award: 'Google Gen AI Challenge 2025',
    techStack: ['Flutter', 'Firebase', 'Gemini API', 'Google Cloud'],
    description: [
      'Built an AI-driven marketplace empowering local artisans to showcase and sell handcrafted products.',
      'Implemented core features including Collaborate, Craft-it, and Product Legacy to enable collaboration and product storytelling.',
      'Enhanced artisans\' digital presence and customer engagement through AI-based personalization and cloud integration.',
    ],
    type: 'app',
  },
  {
    title: 'Adversarial Prompt Detection',
    techStack: ['Python', 'JSON', 'Gemini API', 'Mesop'],
    description: [
      'Researched methods to detect and mitigate adversarial prompts that bypass LLM security layers.',
      'Proposed a fixed-parameter model as a prompt filter, achieving a 20% reduction in LLM load and 90% decrease in adversarial inputs.',
    ],
    type: 'ai',
  },
  {
    title: 'Blockchain-based P2E Game',
    award: 'Research Paper',
    techStack: ['Blockchain', 'Web3', 'Game Design'],
    description: [
      'Explored blockchain integration within gaming ecosystems to enable secure player-driven economies.',
      'Identified potential for decentralized P2E models to improve earning opportunities for professional gamers.',
    ],
    type: 'research',
  },
];

const typeIcons: Record<Project['type'], string> = {
  game: '🎮',
  app: '📱',
  research: '📄',
  ai: '🤖',
};

const typeLabels: Record<Project['type'], string> = {
  game: 'Game Development',
  app: 'Mobile App',
  research: 'Research',
  ai: 'AI/ML',
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ff6b00]" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-[var(--muted)] uppercase">
              Featured Work
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
              PROJECTS
            </span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[var(--background)] border border-[var(--border)] p-6 sm:p-8 hover:border-[#ff6b00] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--border)]">
                  <span>{typeIcons[project.type]}</span>
                  {typeLabels[project.type]}
                </span>
                {project.award && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/30">
                    🏆 {project.award.includes('Winner') ? 'Winner' : project.award.includes('Research') ? 'Published' : 'Finalist'}
                  </span>
                )}
              </div>

              {/* Project Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[#ff6b00] transition-colors">
                {project.title}
              </h3>

              {/* Award/Event */}
              {project.award && (
                <p className="text-sm text-[#ff6b00] font-medium mb-3">
                  {project.award}
                </p>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--border)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <ul className="space-y-2">
                {project.description.map((point, idx) => (
                  <li key={idx} className="text-sm text-[var(--muted)] leading-relaxed flex items-start gap-2">
                    <span className="text-[#ff6b00] mt-1.5 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#ff6b00] group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Koushikgautham"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--foreground)] text-[var(--foreground)] font-medium text-sm uppercase tracking-wider hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
          >
            View More on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
