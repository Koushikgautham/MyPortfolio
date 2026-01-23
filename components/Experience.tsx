'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Experience data structure
interface ExperienceItem {
  id: string;
  title: string;
  type: 'Internship' | 'Full-time' | 'Part-time' | 'Contract' | 'Exchange Program';
  duration: string;
  location: string;
  isCurrent?: boolean;
  description?: string[];
  skills: string[];
}

interface Company {
  id: string;
  name: string;
  isCurrent?: boolean;
  experiences: ExperienceItem[];
}

interface ExperienceCategory {
  id: string;
  title: string;
  icon: 'work' | 'freelance' | 'education';
  companies: Company[];
}

// Experience data based on experience.md
const experienceData: ExperienceCategory[] = [
  {
    id: 'work',
    title: 'Work Experience',
    icon: 'work',
    companies: [
      {
        id: 'hexora',
        name: 'Hexora Digital Transformation Partners',
        isCurrent: true,
        experiences: [
          {
            id: 'hexora-1',
            title: 'AI & Full-Stack Developer',
            type: 'Full-time',
            duration: '2025 — Current',
            location: 'Chennai, India',
            isCurrent: true,
            description: [
              'Developing scalable web and mobile applications with modern tech stacks',
              'Implementing AI/ML solutions and automation workflows using n8n',
              'Managing cloud infrastructure and DevOps pipelines',
            ],
            skills: ['n8n Automation', 'Web Development', 'App Development', 'Frontend Engineering', 'Backend Engineering', 'Machine Learning', 'AI Engineering', 'Cloud & DevOps'],
          },
        ],
      },
      {
        id: 'google-genesis',
        name: 'Google Genesis Club',
        isCurrent: true,
        experiences: [
          {
            id: 'genesis-1',
            title: 'Advisor',
            type: 'Part-time',
            duration: '2025 — Current',
            location: 'Chennai, India',
            isCurrent: true,
            description: [
              'Advising club activities and providing technical guidance',
              'Organizing events and workshops for student developers',
              'Coordinating between teams and managing timelines',
            ],
            skills: ['Team Management', 'Event Management', 'Coordination', 'Time Management'],
          },
        ],
      },
      {
        id: 'mcdonalds',
        name: "McDonald's Japan",
        isCurrent: false,
        experiences: [
          {
            id: 'mcd-1',
            title: 'Crew Member',
            type: 'Part-time',
            duration: '2024 — 2025',
            location: 'Tokyo, Japan',
            isCurrent: false,
            description: [
              'Provided excellent customer service in a fast-paced environment',
              'Managed accounting tasks and employee relations',
              'Developed strong time management and managerial skills',
            ],
            skills: ['Time Management', 'Accounting', 'Managerial Skills', 'Customer Service', 'Employee Relations'],
          },
        ],
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    icon: 'education',
    companies: [
      {
        id: 'hits',
        name: 'Hindustan Institute of Technology and Science',
        isCurrent: true,
        experiences: [
          {
            id: 'hits-1',
            title: 'B.Tech in Computer Science (AI & DS)',
            type: 'Full-time',
            duration: '09.2022 — 05.2026',
            location: 'Chennai, India',
            isCurrent: true,
            description: [
              'Final Year Student pursuing B.Tech in Computer Science and Engineering specialized in Artificial Intelligence and Data Science',
              'Advisor of Google Genesis Club (2025-2026)',
              'Language Proficiency: English, Tamil, Hindi',
            ],
            skills: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms', 'Machine Learning', 'AI', 'Data Science', 'Distributed Systems', 'Leadership'],
          },
        ],
      },
      {
        id: 'shibaura',
        name: 'Shibaura Institute of Technology',
        isCurrent: false,
        experiences: [
          {
            id: 'shibaura-1',
            title: 'Student Exchange Program',
            type: 'Exchange Program',
            duration: '2024 — 2025',
            location: 'Tokyo, Japan',
            isCurrent: false,
            description: [
              'Completed 3rd year of B.Tech CSE under the Student Exchange Program',
              'Focused on Operating Systems, Assembly, Stochastic System Control and Machine Learning',
              'Language Proficiency: Japanese, English, Hindi',
            ],
            skills: ['Java', 'Operating Systems', 'Assembly', 'Machine Learning', 'Research Paper Writing', 'Game Development'],
          },
        ],
      },
    ],
  },
];

// Icons
const WorkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M2 10H22M12 14V16M4 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EducationIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14L18.16 10.58C18.92 12.63 19.36 14.82 19.43 17.04C16.5 18.23 14.18 18.82 12 18.82C9.82 18.82 7.5 18.23 4.57 17.04C4.64 14.82 5.08 12.63 5.84 10.58L12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg 
    className="w-5 h-5 text-[var(--muted)]"
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </motion.svg>
);

const CodeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Accordion Item Component
const AccordionItem = ({ experience, isOpen, onToggle }: { 
  experience: ExperienceItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <div className="ml-6 sm:ml-8 pl-4 sm:pl-6 relative">
      {/* Small timeline dot for experience */}
      <div className="absolute -left-[5px] top-4 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-white dark:border-black z-10" />
      
      <motion.div
        initial={false}
        className="mb-2"
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-3 text-left group hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-3 -ml-3 transition-colors duration-200"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-[var(--accent)]">
              <CodeIcon />
            </div>
            <div>
              <h4 className="text-[var(--foreground)] font-medium text-sm sm:text-base md:text-lg group-hover:text-[var(--accent)] transition-colors duration-200">
                {experience.title}
              </h4>
              <p className="text-[var(--muted)] text-xs sm:text-sm">
                {experience.type} | {experience.duration}
              </p>
            </div>
          </div>
          <ChevronIcon isOpen={isOpen} />
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-4 pt-2">
                {/* Location */}
                <p className="text-[var(--muted)] text-xs sm:text-sm mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                  {experience.location}
                </p>

                {/* Description */}
                {experience.description && (
                  <ul className="space-y-2 mb-4">
                    {experience.description.map((desc, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-[var(--muted)] text-xs sm:text-sm"
                      >
                        <span className="text-[var(--accent)] mt-1">•</span>
                        <span>{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {experience.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[var(--muted)] border border-[#e0e0e0] dark:border-[#333] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Company Section Component with continuous timeline
const CompanySection = ({ company, openExperiences, toggleExperience, isLast }: {
  company: Company;
  openExperiences: Set<string>;
  toggleExperience: (id: string) => void;
  isLast: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Company Header with timeline marker */}
      <div className="flex items-center gap-3 mb-1 relative z-10">
        {/* Orange marker for company */}
        <div className={`w-3 h-3 rounded-full bg-[var(--accent)] flex-shrink-0 ${company.isCurrent ? 'animate-pulse' : ''}`} />
        
        <h3 className="text-[var(--foreground)] font-semibold text-base sm:text-lg md:text-xl">
          {company.name}
        </h3>
        
        {/* Small indicator for current positions */}
        {company.isCurrent && (
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        )}
      </div>

      {/* Timeline line connecting to experiences - continuous */}
      <div 
        className={`absolute left-[5px] top-4 w-0.5 bg-[#d0d0d0] dark:bg-[#3a3a3a] ${isLast ? 'h-[calc(100%-20px)]' : 'h-full'}`} 
        style={{ zIndex: 1 }}
      />

      {/* Experiences */}
      <div className="pb-6">
        {company.experiences.map((exp) => (
          <AccordionItem
            key={exp.id}
            experience={exp}
            isOpen={openExperiences.has(exp.id)}
            onToggle={() => toggleExperience(exp.id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Category Section Component
const CategorySection = ({ category, openExperiences, toggleExperience }: {
  category: ExperienceCategory;
  openExperiences: Set<string>;
  toggleExperience: (id: string) => void;
}) => {
  const IconComponent = category.icon === 'education' ? EducationIcon : WorkIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 sm:mb-16"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-2 border-b border-[#e0e0e0] dark:border-[#262626]">
        <div className="p-2 rounded-lg bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[var(--accent)]">
          <IconComponent />
        </div>
        <h2 className="text-[var(--foreground)] font-bold text-lg sm:text-xl md:text-2xl">
          {category.title}
        </h2>
      </div>

      {/* Companies with continuous timeline */}
      <div className="relative ml-1">
        {category.companies.map((company, index) => (
          <CompanySection
            key={company.id}
            company={company}
            openExperiences={openExperiences}
            toggleExperience={toggleExperience}
            isLast={index === category.companies.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Main Experience Component
const Experience = () => {
  const [openExperiences, setOpenExperiences] = useState<Set<string>>(new Set(['hexora-1'])); // First one open by default

  const toggleExperience = (id: string) => {
    setOpenExperiences((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="experience" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-black transition-colors duration-300">
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
              Career Journey
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
              EXPERIENCE
            </span>
          </h2>
        </motion.div>

        {/* Experience Categories */}
        <div className="space-y-12 sm:space-y-16">
          {experienceData.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              openExperiences={openExperiences}
              toggleExperience={toggleExperience}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
