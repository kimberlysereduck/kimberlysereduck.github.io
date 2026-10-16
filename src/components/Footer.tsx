import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Renders the portfolio footer and its profile links.
 *
 * @public
 */
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#07080d] py-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-mono text-sm font-semibold text-white">
            kimberly.sereduck<span className="text-cyan-400">.dev</span>
          </span>
          <span className="hidden sm:inline text-slate-700" aria-hidden="true">|</span>
          <span className="text-xs font-mono text-slate-500">
            &copy; {new Date().getFullYear()} Kimberly Sereduck · Carlsbad, NM. High-contrast rainbow accents.
          </span>
        </div>

        {/* Links & Scroll to top */}
        <div className="flex items-center gap-3">
          {/* Primary GitHub */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            title="Primary GitHub: @kimberlysereduck"
            aria-label="Primary GitHub: @kimberlysereduck"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Legacy GitHub */}
          <a
            href={PERSONAL_INFO.legacyGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-colors"
            title="Open Source Contributions: @kimberlythegeek"
            aria-label="Open Source Contributions: @kimberlythegeek"
          >
            <span className="text-[11px] font-mono font-bold">OSS</span>
          </a>

          {/* LinkedIn */}
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="LinkedIn: Kimberly Sereduck"
            aria-label="LinkedIn: Kimberly Sereduck"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Send Email to Kimberly"
            aria-label="Send Email to Kimberly"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-mono"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
