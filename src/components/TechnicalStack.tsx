import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const TechnicalStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section id="stack" className="py-20 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-2">
            <span className="text-pink-500">&gt;</span>
            <span>SYSTEM COMPETENCIES &amp; TOOLING</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Technical <span className="text-rainbow">Stack &amp; Specialization</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            A battle-tested repertoire across systems-level languages, distributed consensus algorithms, and developer-first frameworks.
          </p>
        </div>

        {/* Category Tabs (Interactive buttons) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0c0f17] border border-slate-800 rounded-xl mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(idx)}
              className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === idx
                  ? 'bg-slate-800 text-white border border-slate-700/80 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="rounded-2xl bg-[#0c0f17] border border-slate-800/80 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white font-mono">
              {SKILL_CATEGORIES[selectedCategory].category}
            </h3>
            <p className="text-xs text-slate-400">
              {SKILL_CATEGORIES[selectedCategory].description}
            </p>
          </div>

          {/* Skills Table */}
          <div className="divide-y divide-slate-800/80">
            {SKILL_CATEGORIES[selectedCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white font-mono">{skill.name}</span>
                    <span className="text-xs font-mono text-cyan-400">
                      {skill.level}
                    </span>
                  </div>
                  {skill.highlight && (
                    <div className="text-xs text-slate-400 font-sans">
                      {skill.highlight}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 shrink-0">
                  <span className="text-slate-500">Experience:</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    {skill.years} years in production
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-5 rounded-xl bg-[#090b10] border border-slate-800/80 space-y-2">
            <div className="font-mono text-xs text-pink-400 font-bold">01. ZERO-COPY FIRST</div>
            <h4 className="text-sm font-semibold text-white">Memory &amp; Cache Locality</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Eliminate extraneous kernel context-switches and heap allocations on high-throughput hot paths.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#090b10] border border-slate-800/80 space-y-2">
            <div className="font-mono text-xs text-amber-400 font-bold">02. CHAOS &amp; RESILIENCE</div>
            <h4 className="text-sm font-semibold text-white">Deterministic Failure Recovery</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Test partition splits and disk corruption proactively with Jepsen test suites and Raft invariants.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#090b10] border border-slate-800/80 space-y-2">
            <div className="font-mono text-xs text-cyan-400 font-bold">03. HUMAN ERGONOMICS</div>
            <h4 className="text-sm font-semibold text-white">Developer Speed &amp; Safety</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Strict compile-time type safety and automated AST tooling so teams ship fast without runtime regressions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
