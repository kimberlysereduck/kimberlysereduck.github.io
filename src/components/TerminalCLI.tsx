import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface TerminalCLIProps {
  onToggleTheme?: () => void;
  isDarkMode?: boolean;
}

interface CommandLog {
  id: string;
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

export const TerminalCLI: React.FC<TerminalCLIProps> = ({ onToggleTheme, isDarkMode }) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'neofetch',
      timestamp: '15:45:00',
      output: (
        <div className="font-mono text-xs space-y-1 text-slate-300">
          <div className="text-rainbow font-bold">
            kimberly@carlsbad-workstation v2026.10
          </div>
          <div>----------------------------------------</div>
          <div><span className="text-cyan-400">Engineer:</span> Kimberly Sereduck</div>
          <div><span className="text-cyan-400">Location:</span> Carlsbad, NM</div>
          <div><span className="text-cyan-400">Roles:</span> Software Engineer &amp; Open Source Contributor</div>
          <div><span className="text-cyan-400">Primary GitHub:</span> github.com/kimberlysereduck</div>
          <div><span className="text-cyan-400">OSS GitHub:</span> github.com/kimberlythegeek</div>
          <div><span className="text-cyan-400">LinkedIn:</span> linkedin.com/in/kimberly-sereduck</div>
          <div><span className="text-cyan-400">Core Expertise:</span> Full-Stack Web, pytest, Selenium, axe-core, React, Python</div>
          <div><span className="text-cyan-400">Highlights:</span> Mozilla pytest-axe contributor, Firefox performance dashboards</div>
          <div className="pt-1 text-slate-500">
            Type <span className="text-amber-400">&apos;help&apos;</span> or click the quick commands below to explore.
          </div>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const parts = lower.split(' ');
    const mainCmd = parts[0];

    // Add to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-pink-400 font-semibold">Available Terminal Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300 pt-1">
              <div><span className="text-amber-300 font-bold">projects</span> : List featured systems &amp; open source</div>
              <div><span className="text-amber-300 font-bold">skills</span> : Inspect technical stack &amp; years</div>
              <div><span className="text-amber-300 font-bold">experience</span> : Print career &amp; Mozilla milestones</div>
              <div><span className="text-amber-300 font-bold">bio</span> : Summary background &amp; Carlsbad, NM</div>
              <div><span className="text-amber-300 font-bold">contact</span> : Get in touch details &amp; email</div>
              <div><span className="text-amber-300 font-bold">github</span> : Inspect both GitHub accounts</div>
              <div><span className="text-amber-300 font-bold">linkedin</span> : Open LinkedIn profile</div>
              <div><span className="text-amber-300 font-bold">theme</span> : Switch between dark / light mode</div>
              <div><span className="text-amber-300 font-bold">clear</span> : Clear terminal output window</div>
              <div><span className="text-amber-300 font-bold">neofetch</span> : Display system specs &amp; engineer stats</div>
            </div>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-semibold">Featured Projects &amp; Open Source:</div>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-slate-700 pl-2">
                <div className="text-white font-bold flex items-center gap-2">
                  <span>0{idx + 1}. {p.title}</span>
                  <span className="text-slate-500">({p.year})</span>
                  {p.stars && <span className="text-amber-400">★ {p.stars}</span>}
                </div>
                <div className="text-slate-400">{p.tagline}</div>
                <div className="text-emerald-400">Metric: {p.primaryMetric.value}</div>
                <div className="text-slate-500">{p.techStack.join(' · ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-emerald-400 font-semibold">Technical Competencies &amp; Experience:</div>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="text-pink-400 font-medium">[{cat.category}]</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300 pl-2">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="flex items-center justify-between pr-4">
                      <span>• {s.name}</span>
                      <span className="text-slate-500 tabular-nums">{s.years} yrs · {s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="text-cyan-400 font-semibold">Career &amp; Open Source Milestones:</div>
            <div>• <span className="text-white font-bold">Software Engineer</span> (2021-Present) · Carlsbad, NM · End-to-end full-stack &amp; CI/CD</div>
            <div>• <span className="text-white font-bold">Open Source Contributor</span> @ Mozilla (2017-2021) · pytest-axe &amp; perf dashboards</div>
            <div>• <span className="text-white font-bold">Web Application Developer</span> (2016-2017) · Carlsbad, NM · React, Redux, Selenium</div>
          </div>
        );
        break;

      case 'bio':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300 leading-relaxed">
            <div className="text-rainbow font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</div>
            <p className="text-slate-400 pt-1">{PERSONAL_INFO.bio}</p>
            <div className="text-slate-500 pt-1">Location: {PERSONAL_INFO.location}</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-emerald-400 font-semibold">Direct Communication Channels:</div>
            <div>• Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>• GitHub (New): <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.githubUrl}</a></div>
            <div>• GitHub (OSS): <a href={PERSONAL_INFO.legacyGithubUrl} target="_blank" rel="noreferrer" className="text-pink-400 underline">{PERSONAL_INFO.legacyGithubUrl}</a></div>
            <div>• LinkedIn: <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="text-amber-400 underline">{PERSONAL_INFO.linkedinUrl}</a></div>
            <div>• Location: <span className="text-white font-bold">Carlsbad, NM</span></div>
          </div>
        );
        break;

      case 'github':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-emerald-400 font-semibold">Kimberly Sereduck&apos;s GitHub Profiles:</div>
            <div>
              1. Primary Profile (New):{' '}
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline font-bold">
                github.com/kimberlysereduck
              </a>
            </div>
            <div>
              2. Open Source Work &amp; Contributions (Previous):{' '}
              <a href={PERSONAL_INFO.legacyGithubUrl} target="_blank" rel="noreferrer" className="text-pink-400 underline font-bold">
                github.com/kimberlythegeek
              </a>
            </div>
          </div>
        );
        break;

      case 'linkedin':
        window.open(PERSONAL_INFO.linkedinUrl, '_blank');
        output = (
          <div className="text-xs font-mono text-emerald-400">
            Opening LinkedIn: {PERSONAL_INFO.linkedinUrl}
          </div>
        );
        break;

      case 'theme':
        if (onToggleTheme) {
          onToggleTheme();
          output = (
            <div className="text-xs font-mono text-amber-300">
              Switched active color scheme to: {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </div>
          );
        } else {
          output = <div className="text-xs font-mono text-slate-400">Theme toggle not available.</div>;
        }
        break;

      case 'neofetch':
        output = (
          <div className="font-mono text-xs space-y-1 text-slate-300">
            <div className="text-rainbow font-bold">kimberly@carlsbad-workstation v2026.10</div>
            <div>----------------------------------------</div>
            <div><span className="text-cyan-400">Engineer:</span> Kimberly Sereduck</div>
            <div><span className="text-cyan-400">Location:</span> Carlsbad, NM</div>
            <div><span className="text-cyan-400">Primary GitHub:</span> github.com/kimberlysereduck</div>
            <div><span className="text-cyan-400">OSS GitHub:</span> github.com/kimberlythegeek</div>
            <div><span className="text-cyan-400">Specialization:</span> Full-Stack Web &amp; Test Automation</div>
            <div><span className="text-cyan-400">Standards:</span> WCAG 2.1 AA / Section 508 / W3C A11y</div>
          </div>
        );
        break;

      case 'sudo':
        output = (
          <div className="text-xs font-mono text-rose-400">
            [ACCESS DENIED] User is not in sudoers file. This incident will be reported to Kimberly Sereduck in Carlsbad, NM.
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: &apos;{trimmed}&apos;. Type <span className="text-amber-300">&apos;help&apos;</span> to see available commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        timestamp: now,
        output,
      },
    ]);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const quickCommands = ['help', 'projects', 'skills', 'experience', 'github', 'neofetch', 'contact', 'clear'];

  return (
    <section id="terminal" className="py-20 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLI ENVIRONMENT</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Engineer <span className="text-rainbow">Terminal Console</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Inspect Kimberly&apos;s open source contributions, GitHub profiles, and competencies in the interactive shell.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="rounded-2xl bg-[#090b10] border border-slate-800/90 shadow-2xl overflow-hidden rainbow-gradient-border">
          
          {/* Terminal Window Bar */}
          <div className="px-4 py-3 bg-[#0c0f17] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
                bash ~ /home/kimberly/carlsbad
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLogs([])}
                className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear screen"
                aria-label="Clear screen"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick command buttons */}
          <div className="px-4 py-2 bg-[#0a0d14] border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <span className="text-slate-500 text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Quick:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 text-[11px]"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div 
            className="p-4 sm:p-5 font-mono text-xs text-slate-300 min-h-[320px] max-h-[460px] overflow-y-auto space-y-4"
            onClick={() => inputRef.current?.focus()}
          >
            {logs.map((log) => (
              <div key={log.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-pink-500 font-bold">&gt;</span>
                  <span className="text-cyan-400">kimberly@carlsbad:~$</span>
                  <span className="text-white font-semibold">{log.command}</span>
                  <span className="text-slate-600 text-[10px] ml-auto">{log.timestamp}</span>
                </div>
                <div className="pl-4 border-l border-slate-800/80">{log.output}</div>
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-pink-500 font-bold">&gt;</span>
              <span className="text-cyan-400 text-xs font-mono">kimberly@carlsbad:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'github', or any command..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-600 caret-pink-500"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                onClick={() => executeCommand(input)}
                className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                title="Send command"
                aria-label="Send command"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
};
