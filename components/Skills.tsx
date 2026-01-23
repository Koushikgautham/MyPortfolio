'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['C#', 'C++', 'C', 'Java', 'Python', 'Flutter', 'HTML/CSS', 'R'],
  },
  {
    name: 'Developer Tools',
    skills: ['Unity Engine', 'Aseprite', 'Blender', 'Figma', 'FlutterFlow', 'Canva'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Docker', 'Supabase', 'Google Cloud', 'Zoho Catalyst', 'Git', 'AWS'],
  },
  {
    name: 'Testing',
    skills: ['Playwright', 'Postman', 'Github Actions'],
  },
  {
    name: 'Productivity',
    skills: ['Notion', 'MS Excel', 'Powerpoint', 'Word', 'VS Code'],
  },
  {
    name: 'AI Tools',
    skills: ['Claude Code', 'Cursor AI', 'Github Copilot', 'OpenAI'],
  },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[var(--background)] transition-colors duration-300"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Section Header */}
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
              Tech Stack
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
              SKILLS
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mt-4">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-8 md:gap-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group"
            >
              {/* Category Name */}
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">
                {category.name}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`
                      px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium
                      border border-[var(--border)] 
                      transition-all duration-300 cursor-default
                      ${
                        hoveredSkill === skill
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)] scale-105'
                          : 'bg-[var(--card-bg)] text-[var(--foreground)] hover:border-[var(--accent)]'
                      }
                    `}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
