import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />

        {/* About Section - Placeholder */}
        <section id="about" className="flex items-center justify-center bg-[var(--background)] transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[var(--foreground)]">About</h2>
            <p className="text-xl text-[var(--muted)]">Coming soon...</p>
          </div>
        </section>

        {/* Projects Section - Placeholder */}
        <section id="projects" className="flex items-center justify-center bg-[var(--card-bg)] transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[var(--foreground)]">Projects</h2>
            <p className="text-xl text-[var(--muted)]">Coming soon...</p>
          </div>
        </section>

        {/* Skills Section - Placeholder */}
        <section id="skills" className="flex items-center justify-center bg-[var(--background)] transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[var(--foreground)]">Skills</h2>
            <p className="text-xl text-[var(--muted)]">Coming soon...</p>
          </div>
        </section>

        {/* Experience Section - Placeholder */}
        <section id="experience" className="flex items-center justify-center bg-[var(--card-bg)] transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[var(--foreground)]">Experience</h2>
            <p className="text-xl text-[var(--muted)]">Coming soon...</p>
          </div>
        </section>

        {/* Contact Section - Placeholder */}
        <section id="contact" className="flex items-center justify-center bg-[var(--background)] transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[var(--foreground)]">Contact</h2>
            <p className="text-xl text-[var(--muted)]">Coming soon...</p>
          </div>
        </section>
      </main>
    </>
  );
}
