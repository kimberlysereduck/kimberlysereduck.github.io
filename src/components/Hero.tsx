import React, { useState } from 'react';
import { ArrowDown, Github, Terminal, Play, CheckCircle2, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Renders the introductory hero and interactive code workbench.
 *
 * @public
 */
export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'a11y' | 'perf' | 'fullstack'>('a11y');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const snippets = {
    a11y: {
      filename: 'test_accessibility_axe.py',
      lang: 'Python',
      code: `import pytest
from pytest_axe.pytest_axe import PytestAxe

@pytest.mark.accessibility
def test_portal_wcag_conformance(selenium, live_server):
    """Automated WCAG 2.1 AA audit fixture using axe-core and Selenium."""
    selenium.get(f"{live_server.url}/dashboard")
    
    axe = PytestAxe(selenium)
    axe.inject() # Inject axe-core bundle into DOM
    
    results = axe.run(options={"runOnly": ["wcag2a", "wcag2aa"]})
    violations = results.get("violations", [])
    
    assert len(violations) == 0, f"Accessibility audit failed: {axe.report(violations)}"`,
    },
    perf: {
      filename: 'firefox_telemetry_harvester.js',
      lang: 'JavaScript',
      code: `// Automated benchmark telemetry processor for Mozilla test clusters
export async function ingestPerformancePayload(clusterPayload) {
  const { suiteName, commitHash, frameTimings } = clusterPayload;
  
  const stats = calculateStatisticalMetrics(frameTimings);
  const meetsThreshold = stats.medianRenderMs < TARGET_BUDGET_MS;
  
  await telemetryDB.recordBenchmark({
    suite: suiteName,
    commit: commitHash.slice(0, 8),
    p95: stats.p95,
    status: meetsThreshold ? 'PASS' : 'REGRESSION_FLAGGED'
  });
}`,
    },
    fullstack: {
      filename: 'poll_voting_engine.ts',
      lang: 'TypeScript',
      code: `// Unidirectional state voting transaction with optimistic UI updates
export function castBallot(state: PollState, action: CastVoteAction): PollState {
  const { questionId, optionKey, voterId } = action.payload;
  
  return {
    ...state,
    questions: {
      ...state.questions,
      [questionId]: {
        ...state.questions[questionId],
        [optionKey]: {
          ...state.questions[questionId][optionKey],
          votes: [...state.questions[questionId][optionKey].votes, voterId],
          updatedAt: performance.now()
        }
      }
    }
  };
}`,
    },
  };

  const handleRunSimulation = () => {
    setIsRunningTest(true);
    setTestOutput('Initializing headless Selenium & injecting axe-core ruleset...');
    
    setTimeout(() => {
      setTestOutput('Evaluating 142 DOM tree landmarks against WCAG 2.1 AA criteria...');
    }, 600);

    setTimeout(() => {
      setTestOutput('Audit complete: 100% WCAG AA rules passed (48 criteria evaluated in 840ms). Zero violations.');
      setIsRunningTest(false);
    }, 1400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background radial gradient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-950/20 via-sky-950/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Clean Monospace Kicker */}
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-slate-400">
              <span className="text-cyan-400">kimberly@carlsbad:~$</span>
              <span>whoami --role</span>
            </div>

            {/* Headline with Rainbow Gradient Text Accents */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance leading-tight">
              Engineering <span className="text-rainbow">accessible full-stack</span> systems &amp; <span className="text-rainbow">test automation</span>.
            </h1>

            {/* Monospace Sub-copy */}
            <p className="text-slate-300 font-normal text-base md:text-lg leading-relaxed max-w-xl">
              Hi, I&apos;m <span className="text-white font-medium">{PERSONAL_INFO.name}</span>. Software engineer based in <span className="text-white font-medium">{PERSONAL_INFO.location}</span>. Focused on resilient web architectures, automated testing frameworks (pytest, Selenium, axe-core), and accessible user interfaces. Contributor to Mozilla open-source infrastructure across <span className="text-cyan-400 font-mono text-sm">@kimberlysereduck</span> and <span className="text-pink-400 font-mono text-sm">@kimberlythegeek</span>.
            </p>

            {/* Quick Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-400 pt-1">
              <span className="text-white">{PERSONAL_INFO.location}</span>
              <span aria-hidden="true">·</span>
              <span>7+ Years Experience</span>
              <span aria-hidden="true">·</span>
              <span>Mozilla Open Source Contributor</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">WCAG 2.1 AA Specialist</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-lg shadow-white/5 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {/* Primary New GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg text-sm font-mono font-medium bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2 whitespace-nowrap shadow-sm"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>@kimberlysereduck</span>
              </a>

              {/* OSS Legacy GitHub */}
              <a
                href={PERSONAL_INFO.legacyGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-lg text-sm font-mono font-medium bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-2 whitespace-nowrap"
                title="Open Source Contributions Archive"
              >
                <Github className="w-4 h-4 text-pink-400" />
                <span>@kimberlythegeek</span>
              </a>

              <a
                href="#terminal"
                className="px-3 py-2.5 rounded-lg text-sm font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>CLI</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code & Architecture Workbench */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-2xl bg-[#0c0f17] border border-slate-800/90 shadow-2xl flex flex-col overflow-hidden rainbow-gradient-border">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#080a10] border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">automation-lab@carlsbad</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  title="Copy code snippet"
                  aria-label="Copy code snippet"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center bg-[#090b12] border-b border-slate-800/60 px-2 pt-2 gap-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('a11y')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-colors whitespace-nowrap ${
                    activeTab === 'a11y'
                      ? 'bg-[#0c0f17] text-white border-t border-x border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  pytest_axe.py
                </button>
                <button
                  onClick={() => setActiveTab('perf')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-colors whitespace-nowrap ${
                    activeTab === 'perf'
                      ? 'bg-[#0c0f17] text-white border-t border-x border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  perf_telemetry.js
                </button>
                <button
                  onClick={() => setActiveTab('fullstack')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-colors whitespace-nowrap ${
                    activeTab === 'fullstack'
                      ? 'bg-[#0c0f17] text-white border-t border-x border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  poll_voting.ts
                </button>
              </div>

              {/* Code display */}
              <div className="p-4 flex-1 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed bg-[#0c0f17]">
                <pre className="select-text">
                  <code>{snippets[activeTab].code}</code>
                </pre>
              </div>

              {/* Interactive Simulation Strip */}
              <div className="p-3 bg-[#080a10] border-t border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-cyan-400">spec:</span>
                    <span>Automated WCAG 2.1 AA audit pass</span>
                  </div>
                  <button
                    onClick={handleRunSimulation}
                    disabled={isRunningTest}
                    className="px-3 py-1 text-xs font-mono rounded-md bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span>{isRunningTest ? 'Auditing...' : 'Run Audit'}</span>
                  </button>
                </div>

                {testOutput && (
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-start gap-1.5 animate-fadeIn">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{testOutput}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Metric Proof Strip below split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {PERSONAL_INFO.metrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-rainbow tabular-nums">
                {m.value}
              </div>
              <div className="text-xs font-medium text-slate-400">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
