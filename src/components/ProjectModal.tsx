import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Copy, Check } from 'lucide-react';
import { Project } from '../types';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div 
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#0c0f17] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/90 flex items-start justify-between gap-4 bg-[#090b10]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <span>{project.role}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              {project.stars && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-mono">★ {project.stars.toLocaleString()}</span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{project.title}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Architecture Diagram Visualization */}
          <div>
            <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
              System Architecture &amp; Dataflow
            </div>
            <ArchitectureDiagram type={project.architectureDiagramSvg} className="h-56" />
          </div>

          {/* Key Metric Highlight */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Primary Performance Result</span>
            <span className="font-mono font-bold text-sm text-rainbow tabular-nums">
              {project.primaryMetric.value}
            </span>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#090b12] border border-slate-800/80 space-y-2">
              <h3 className="text-sm font-semibold text-rose-300 font-mono flex items-center gap-2">
                <span>The Engineering Challenge</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.architectureDetails.challenge}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090b12] border border-slate-800/80 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-300 font-mono flex items-center gap-2">
                <span>The Architectural Solution</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.architectureDetails.solution}
              </p>
            </div>
          </div>

          {/* Benchmark Results Table */}
          {project.architectureDetails.benchmarkResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Benchmark Verification (Measured on Linux 6.8 Bare Metal)
              </h3>
              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#090b12] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Metric</th>
                      <th className="py-2.5 px-4 font-medium">Baseline</th>
                      <th className="py-2.5 px-4 font-medium text-emerald-400">Measured Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-[#0c0f17]">
                    {project.architectureDetails.benchmarkResults.map((b) => (
                      <tr key={b.metric}>
                        <td className="py-2.5 px-4 text-slate-300">{b.metric}</td>
                        <td className="py-2.5 px-4 text-slate-500 tabular-nums">{b.before}</td>
                        <td className="py-2.5 px-4 text-emerald-300 font-semibold tabular-nums">{b.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Architectural Components */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Core Architectural Invariants
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              {project.architectureDetails.keyComponents.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {project.codeSnippet.filename} ({project.codeSnippet.language})
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#090b10] border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Clean Unboxed List */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-2">Technologies Used</div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-300">
              {project.techStack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="text-slate-200">{tech}</span>
                  {i < project.techStack.length - 1 && <span className="text-slate-600" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-[#090b10] border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">ESC</kbd> to exit
          </div>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Live Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-white text-slate-950 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Source on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
