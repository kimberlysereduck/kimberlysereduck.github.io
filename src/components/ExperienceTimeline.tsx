import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';

/**
 * Renders professional experience entries as a timeline.
 *
 * @public
 */
export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-2">
            <span className="text-cyan-400">&gt;</span>
            <span>PRODUCTION TRACK RECORD</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Engineering <span className="text-rainbow">Leadership &amp; Experience</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Track record designing core platforms, scaling systems under load, and mentoring high-velocity engineering organizations.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.id}
              className="relative rounded-2xl bg-[#0c0f17] border border-slate-800/80 p-6 sm:p-8 space-y-6 hover:border-slate-700/80 transition-colors"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <span className="text-cyan-400">0{index + 1}.</span>
                    <span>{exp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                </div>

                <div className="font-mono text-xs text-slate-400 sm:text-right shrink-0">
                  <span className="text-slate-200 font-medium">{exp.period}</span>
                  <div className="text-slate-500">{exp.type}</div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {exp.summary}
              </p>

              {/* Quantitative Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#090b10] border border-slate-800/80">
                {exp.metrics.map((m) => (
                  <div key={m.label} className="space-y-0.5">
                    <div className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Architectural Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Key Accomplishments
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="text-pink-500 font-mono mt-0.5">›</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies: Clean unboxed metadata with · separators (Zero-pill discipline) */}
              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400">
                <span className="text-slate-500 text-[11px]">Stack:</span>
                {exp.technologies.map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span className="text-slate-300">{tech}</span>
                    {i < exp.technologies.length - 1 && (
                      <span className="text-slate-600" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
