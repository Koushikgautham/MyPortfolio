import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        {/* Separator between Experience and Contact */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        </div>
        <Contact />
      </main>
    </>
  );
}
