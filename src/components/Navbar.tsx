import React, { useState } from 'react';
import { Sun, Moon, Github, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

/**
 * Renders primary navigation and the site theme toggle.
 *
 * @public
 */
export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#stack' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090b10]/85 dark:bg-[#090b10]/85 border-b border-slate-800/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display/mono face) */}
        <a
          href="#"
          className="font-mono text-base font-semibold tracking-tight text-slate-100 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          aria-label="Kimberly Sereduck Portfolio Home"
        >
          <span className="text-pink-500 font-bold">&gt;</span>
          <span>kimberly.sereduck</span>
          <span className="text-cyan-400 font-mono text-xs">.dev</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-slate-600 decoration-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action area (GitHub link & Dark Mode toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* GitHub Profile Button (Primary new account) */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 transition-all shadow-sm whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-pink-500"
            title="GitHub: kimberlysereduck"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>@kimberlysereduck</span>
          </a>

          {/* GitHub Profile Button (OSS Contributions) */}
          <a
            href={PERSONAL_INFO.legacyGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all whitespace-nowrap shrink-0"
            title="OSS Contributions GitHub: kimberlythegeek"
          >
            <span className="text-[11px] text-pink-400">OSS:</span>
            <span>@kimberlythegeek</span>
          </a>

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            Get in touch
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090b10] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>github.com/kimberlysereduck (new)</span>
              </a>
              <a
                href={PERSONAL_INFO.legacyGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-pink-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>github.com/kimberlythegeek (contributions)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
