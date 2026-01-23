'use client';

import { useState } from 'react';

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
      className="py-20 md:py-32 bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-4">
            Skills
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-8 md:gap-10">
          {skillCategories.map((category) => (
            <div key={category.name} className="group">
              {/* Category Name */}
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">
                {category.name}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`
                      px-4 py-2 rounded-lg text-sm md:text-base font-medium
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
