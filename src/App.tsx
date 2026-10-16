import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { TerminalCLI } from './components/TerminalCLI';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TechnicalStack } from './components/TechnicalStack';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('devspectrum-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    return true; // Default to dark theme as requested
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('devspectrum-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('devspectrum-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 selection:bg-pink-500/30 selection:text-pink-200 ${
      isDarkMode ? 'bg-[#090b10] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navigation Bar */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Selected Projects Showcase & Deep Dives */}
        <ProjectShowcase />

        {/* Interactive Monospace Terminal Console */}
        <TerminalCLI onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />

        {/* Professional Experience & Production Track Record */}
        <ExperienceTimeline />

        {/* Technical Stack & Engineering Philosophy */}
        <TechnicalStack />

        {/* Contact Suite & Direct Links */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
