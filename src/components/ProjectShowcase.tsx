import React, { useState } from 'react';
import { Github, ArrowUpRight, Code2 } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ProjectModal } from './ProjectModal';

export const ProjectShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Distributed Systems', value: 'systems' },
    { label: 'Developer Tooling', value: 'tooling' },
    { label: 'Full-Stack Web', value: 'fullstack' },
    { label: 'Open Source', value: 'opensource' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-2">
              <span className="text-pink-500">//</span>
              <span>SELECTED ARCHITECTURE &amp; CODEWORKS</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Engineered for <span className="text-rainbow">Extreme Scale</span> &amp; Precision
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Production distributed engines, compilers, and observability tools built with zero-allocation memory discipline and measurable latency wins.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0c0f17] border border-slate-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat.value
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-2xl bg-[#0c0f17] border border-slate-800/80 hover:border-slate-700 transition-all duration-200 overflow-hidden"
            >
              {/* Architecture Diagram Preview */}
              <div className="p-3 pb-0">
                <ArchitectureDiagram type={project.architectureDiagramSvg} className="h-44 group-hover:border-slate-700 transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata with · separator (Zero-pill discipline) */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span>{project.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>
                    {project.stars && (
                      <span className="text-amber-400 font-mono">
                        ★ {project.stars.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white group-hover:text-rainbow transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Primary Metric Strip */}
                <div className="p-2.5 rounded-lg bg-[#090b10] border border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">{project.primaryMetric.label}</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400 tabular-nums">
                    {project.primaryMetric.value}
                  </span>
                </div>

                {/* Tech Stack - Clean unboxed text list */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-300">{tech}</span>
                      {i < Math.min(project.techStack.length - 1, 3) && <span className="text-slate-600" aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-slate-500">+{project.techStack.length - 4}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Deep Dive</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    title={`View ${project.title} on GitHub`}
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title={`View ${project.title} live`}
                      aria-label={`View ${project.title} live`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal when project selected */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
