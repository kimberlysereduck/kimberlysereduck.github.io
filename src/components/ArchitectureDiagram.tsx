import React from 'react';

interface ArchitectureDiagramProps {
  type: 'stream' | 'mesh' | 'compiler' | 'cache' | 'container' | 'socket';
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ type, className = '' }) => {
  return (
    <div className={`relative w-full h-48 rounded-xl overflow-hidden bg-[#0c0f17] dark:bg-[#080a10] border border-slate-800/80 flex items-center justify-center p-4 select-none ${className}`}>
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.35) 1px, transparent 0)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Subtle corner rainbow glow accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/10 via-amber-500/10 to-cyan-500/10 blur-2xl pointer-events-none" />

      {type === 'stream' && (
        <svg viewBox="0 0 360 140" className="w-full h-full max-w-sm text-slate-300">
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          {/* Producers */}
          <rect x="15" y="25" width="60" height="28" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="45" y="43" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">SELENIUM</text>
          <rect x="15" y="65" width="60" height="28" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="45" y="83" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">PYTEST</text>
          
          {/* Connector paths */}
          <path d="M 75 39 C 105 39, 105 59, 125 59" stroke="url(#streamGrad)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <path d="M 75 79 C 105 79, 105 59, 125 59" stroke="url(#streamGrad)" strokeWidth="2" strokeDasharray="3 3" fill="none" />

          {/* Central pytest-axe Core Engine */}
          <rect x="125" y="20" width="110" height="80" rx="8" fill="#161b2a" stroke="#475569" strokeWidth="1.5" />
          <text x="180" y="42" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono">PYTEST-AXE</text>
          <text x="180" y="58" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono">axe-core inject</text>
          <text x="180" y="72" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="JetBrains Mono">WCAG 2.1 AA Rules</text>
          <text x="180" y="86" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">0 Violations</text>

          {/* Forward connection */}
          <path d="M 235 59 L 275 59" stroke="url(#streamGrad)" strokeWidth="2" fill="none" />

          {/* Consumers */}
          <rect x="275" y="25" width="70" height="28" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="310" y="43" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">CI REPORT</text>
          <rect x="275" y="65" width="70" height="28" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="310" y="83" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">A11Y LOGS</text>
          
          {/* Signal Indicator */}
          <circle cx="105" cy="59" r="3" fill="#f43f5e" />
          <circle cx="255" cy="59" r="3" fill="#38bdf8" />
        </svg>
      )}

      {type === 'mesh' && (
        <svg viewBox="0 0 360 140" className="w-full h-full max-w-sm">
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* Mesh Nodes */}
          <line x1="60" y1="40" x2="180" y2="30" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="130" y2="100" stroke="#334155" strokeWidth="1.5" />
          <line x1="180" y1="30" x2="290" y2="50" stroke="#334155" strokeWidth="1.5" />
          <line x1="130" y1="100" x2="230" y2="105" stroke="#334155" strokeWidth="1.5" />
          <line x1="180" y1="30" x2="230" y2="105" stroke="url(#meshGrad)" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="290" y1="50" x2="230" y2="105" stroke="#334155" strokeWidth="1.5" />

          {/* Active Probes */}
          <circle cx="60" cy="40" r="18" fill="#131826" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="60" y="44" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="JetBrains Mono">API-01</text>
          
          <circle cx="180" cy="30" r="22" fill="#161b2a" stroke="#a855f7" strokeWidth="1.5" />
          <text x="180" y="34" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="JetBrains Mono">AUTH</text>

          <circle cx="130" cy="100" r="18" fill="#131826" stroke="#34d399" strokeWidth="1.5" />
          <text x="130" y="104" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="JetBrains Mono">BILLING</text>

          <circle cx="230" cy="105" r="20" fill="#161b2a" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="230" y="109" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="JetBrains Mono">CACHE</text>

          <circle cx="290" cy="50" r="19" fill="#131826" stroke="#ec4899" strokeWidth="1.5" />
          <text x="290" y="54" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="JetBrains Mono">SQL</text>

          {/* eBPF Probe tag */}
          <rect x="135" y="58" width="90" height="20" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="0.8" />
          <text x="180" y="72" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono">eBPF Probe: 0.38%</text>
        </svg>
      )}

      {type === 'compiler' && (
        <svg viewBox="0 0 360 140" className="w-full h-full max-w-sm">
          <defs>
            <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="35%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* GraphQL Query Box */}
          <rect x="20" y="25" width="85" height="70" rx="6" fill="#131826" stroke="#475569" strokeWidth="1" />
          <text x="62" y="42" textAnchor="middle" fill="#ec4899" fontSize="9" fontWeight="600" fontFamily="JetBrains Mono">GraphQL AST</text>
          <text x="62" y="58" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">user &#123; team &#123;</text>
          <text x="62" y="72" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">projects &#125;&#125;</text>
          <text x="62" y="85" textAnchor="middle" fill="#f43f5e" fontSize="7" fontFamily="JetBrains Mono">N+1 Threat</text>

          {/* Transform Pipeline */}
          <path d="M 105 60 L 140 60" stroke="url(#compGrad)" strokeWidth="2" />
          
          <rect x="140" y="20" width="100" height="80" rx="8" fill="#161b2a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="190" y="42" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono">PRISM COMPILER</text>
          <text x="190" y="58" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono">AST Flattening</text>
          <text x="190" y="72" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">CTE Generation</text>
          <text x="190" y="86" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="JetBrains Mono">0ms Runtime</text>

          <path d="M 240 60 L 275 60" stroke="url(#compGrad)" strokeWidth="2" />

          {/* Optimized SQL Output */}
          <rect x="275" y="25" width="75" height="70" rx="6" fill="#131826" stroke="#475569" strokeWidth="1" />
          <text x="312" y="42" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="600" fontFamily="JetBrains Mono">Unified SQL</text>
          <text x="312" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono">WITH q AS (</text>
          <text x="312" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono">json_agg()...)</text>
          <text x="312" y="85" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="JetBrains Mono">1 Roundtrip</text>
        </svg>
      )}

      {type === 'cache' && (
        <svg viewBox="0 0 360 140" className="w-full h-full max-w-sm">
          <rect x="30" y="25" width="80" height="75" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="70" y="45" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">Region US-E</text>
          <rect x="42" y="55" width="56" height="18" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
          <text x="70" y="68" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="JetBrains Mono">L1 Cache</text>
          <text x="70" y="88" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">0.45ms</text>

          <path d="M 110 62 L 155 62" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />
          
          <rect x="155" y="20" width="90" height="85" rx="8" fill="#161b2a" stroke="#a855f7" strokeWidth="1.2" />
          <text x="200" y="42" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono">AETHER KV</text>
          <text x="200" y="60" textAnchor="middle" fill="#fb923c" fontSize="8" fontFamily="JetBrains Mono">HLC Clock Sync</text>
          <text x="200" y="76" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono">Linearizable</text>
          <text x="200" y="92" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">4.8M ops/sec</text>

          <path d="M 245 62 L 285 62" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />

          <rect x="285" y="25" width="60" height="75" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="315" y="45" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono">Region EU</text>
          <rect x="290" y="55" width="50" height="18" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
          <text x="315" y="68" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="JetBrains Mono">L1 Cache</text>
          <text x="315" y="88" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">0.48ms</text>
        </svg>
      )}

      {type === 'container' && (
        <svg viewBox="0 0 360 140" className="w-full h-full max-w-sm">
          <rect x="30" y="30" width="85" height="65" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="72" y="50" textAnchor="middle" fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono">Base Snapshot</text>
          <text x="72" y="66" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">Read-Only Tree</text>
          <text x="72" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono">Shared Cache</text>

          <path d="M 115 62 L 155 62" stroke="#38bdf8" strokeWidth="1.5" />

          <rect x="155" y="20" width="105" height="85" rx="8" fill="#161b2a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="207" y="42" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono">DEVBOX DAEMON</text>
          <text x="207" y="58" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">cgroups v2 + ns</text>
          <text x="207" y="74" textAnchor="middle" fill="#fb923c" fontSize="8" fontFamily="JetBrains Mono">OverlayFS CoW</text>
          <text x="207" y="90" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="JetBrains Mono">Boot: &lt;240ms</text>

          <path d="M 260 62 L 295 62" stroke="#34d399" strokeWidth="1.5" />

          <rect x="295" y="30" width="55" height="65" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="322" y="50" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="JetBrains Mono">Sandbox</text>
          <text x="322" y="66" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="JetBrains Mono">Isolated</text>
          <text x="322" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="JetBrains Mono">Live Port</text>
        </svg>
      )}

      {type === 'socket' && (
        <svg viewBox="0 0 360 140" className="w-full h-full max-w-sm">
          <circle cx="50" cy="40" r="14" fill="#131826" stroke="#ec4899" strokeWidth="1" />
          <text x="50" y="43" textAnchor="middle" fill="#f43f5e" fontSize="7" fontFamily="JetBrains Mono">WS 1</text>
          
          <circle cx="50" cy="70" r="14" fill="#131826" stroke="#f59e0b" strokeWidth="1" />
          <text x="50" y="73" textAnchor="middle" fill="#fb923c" fontSize="7" fontFamily="JetBrains Mono">WS 2</text>

          <circle cx="50" cy="100" r="14" fill="#131826" stroke="#34d399" strokeWidth="1" />
          <text x="50" y="103" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="JetBrains Mono">WS ...n</text>

          <path d="M 65 40 L 140 65" stroke="#ec4899" strokeWidth="1.2" />
          <path d="M 65 70 L 140 70" stroke="#f59e0b" strokeWidth="1.2" />
          <path d="M 65 100 L 140 75" stroke="#34d399" strokeWidth="1.2" />

          <rect x="140" y="25" width="115" height="80" rx="8" fill="#161b2a" stroke="#06b6d4" strokeWidth="1.2" />
          <text x="197" y="45" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono">OMNISOCKET</text>
          <text x="197" y="62" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono">uWebSockets.js</text>
          <text x="197" y="78" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="JetBrains Mono">RingBuffer Catchup</text>
          <text x="197" y="92" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="JetBrains Mono">250k Conns/Node</text>

          <path d="M 255 70 L 290 70" stroke="#06b6d4" strokeWidth="1.5" />

          <rect x="290" y="35" width="60" height="60" rx="6" fill="#131826" stroke="#334155" strokeWidth="1" />
          <text x="320" y="55" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="JetBrains Mono">REDIS</text>
          <text x="320" y="70" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="JetBrains Mono">STREAMS</text>
          <text x="320" y="84" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="JetBrains Mono">Pub/Sub</text>
        </svg>
      )}
    </div>
  );
};
