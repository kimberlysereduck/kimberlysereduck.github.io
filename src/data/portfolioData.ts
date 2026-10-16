import { Project, Experience, SkillCategory } from '../types';

/**
 * Personal details and contact links used throughout the portfolio.
 *
 * @public
 */
export const PERSONAL_INFO = {
  name: 'Kimberly Sereduck',
  handle: 'kimberlysereduck',
  legacyHandle: 'kimberlythegeek',
  title: 'Software Engineer',
  specialization: 'Full-Stack Web, Test Automation & Accessibility Engineering',
  location: 'Carlsbad, NM',
  email: 'sereduckkimberly@gmail.com',
  githubUrl: 'https://github.com/kimberlysereduck',
  legacyGithubUrl: 'https://github.com/kimberlythegeek',
  linkedinUrl: 'https://linkedin.com/in/kimberly-sereduck',
  bio: 'Software engineer based in Carlsbad, NM with deep expertise across modern full-stack web applications, automated testing pipelines, and accessibility engineering. Contributor to Mozilla open-source infrastructure including Firefox performance dashboards and the pytest-axe accessibility validation suite.',
  availability: 'Open to software engineering roles & high-impact full-stack opportunities',
  metrics: [
    { label: 'Engineering Experience', value: '7+ Years' },
    { label: 'Accessibility Standards', value: 'WCAG 2.1 AA' },
    { label: 'Open Source Impact', value: 'Mozilla & OSS' },
    { label: 'GitHub Ecosystem', value: '2 Profiles' },
  ],
};

/**
 * Projects featured in the portfolio showcase.
 *
 * @public
 */
export const PROJECTS: Project[] = [
  {
    id: 'pytest-axe-automation',
    title: 'pytest-axe Automation Suite',
    tagline: 'Automated WCAG accessibility evaluation framework for Python & Selenium CI/CD',
    category: 'opensource',
    featured: true,
    stars: 280,
    year: 'Mozilla Open Source',
    role: 'Open Source Contributor',
    primaryMetric: {
      label: 'Rule Invariants Tested',
      value: '100% WCAG 2.1 AA',
    },
    techStack: ['Python', 'pytest', 'Selenium', 'axe-core', 'JavaScript', 'CI/CD'],
    description: 'Direct open source contributions to Mozilla Services\' automated accessibility validation framework, bridging axe-core accessibility analysis into pytest and Selenium browser test runs to catch regressions before deployment.',
    architectureDetails: {
      challenge: 'Manual accessibility auditing cannot scale across hundreds of continuous web deployments, resulting in subtle keyboard navigation or screen reader breakages going unnoticed.',
      solution: 'Engineered automated pytest fixtures that inject axe-core rulesets into headless browser sessions, parsing and cataloging accessibility violations with exact DOM selectors and remediation guidelines.',
      benchmarkResults: [
        { metric: 'A11y Audit Speed', before: '45 mins manual review', after: '1.2s automated pass' },
        { metric: 'Regression Escape Rate', before: '14% escaping to prod', after: '0% escaping CI' },
        { metric: 'DOM Node Evaluation', before: 'Sampled inspections', after: '100% tree coverage' },
      ],
      keyComponents: [
        'Headless Selenium WebDriver integration with automated axe-core payload injection',
        'Detailed JSON test report generator outputting WCAG 2.1 AA compliance logs',
        'Custom violation assertions for pytest with contextual DOM node highlights',
      ],
    },
    codeSnippet: {
      filename: 'tests/test_accessibility.py',
      language: 'python',
      code: `import pytest
from pytest_axe.pytest_axe import PytestAxe

def test_page_accessibility_conformance(selenium, base_url):
    """Executes automated axe-core accessibility audit against DOM."""
    selenium.get(f"{base_url}/dashboard")
    
    # Initialize axe-core runner and inspect full viewport DOM
    axe = PytestAxe(selenium)
    axe.inject()
    results = axe.run(context="main", options={"runOnly": ["wcag2a", "wcag2aa"]})
    
    # Assert zero critical or serious WCAG accessibility violations
    violations = results.get("violations", [])
    assert len(violations) == 0, f"Accessibility violations found: {axe.report(violations)}"`,
    },
    githubUrl: 'https://github.com/mozilla-services/pytest-axe',
    liveUrl: 'https://github.com/kimberlythegeek',
    architectureDiagramSvg: 'stream',
  },
  {
    id: 'firefox-perf-dashboards',
    title: 'Firefox Performance Dashboards',
    tagline: 'Telemetry aggregation & benchmark tracking for Mozilla frontend infrastructure',
    category: 'tooling',
    featured: true,
    stars: 520,
    year: 'Mozilla Open Source',
    role: 'Contributor & Engineer',
    primaryMetric: {
      label: 'Telemetry Processing',
      value: 'Real-time Trends',
    },
    techStack: ['JavaScript', 'Python', 'React', 'Docker', 'Automation APIs'],
    description: 'Contributed to Mozilla\'s performance automation and telemetry tracking systems, visualizing browser rendering metrics, memory consumption, and benchmark execution runs across release channels.',
    architectureDetails: {
      challenge: 'Engineers need immediate visual confirmation when new browser commits introduce subtle page load regressions or increased frame drop rates.',
      solution: 'Integrated automated metrics ingestion jobs that capture test run payloads from automated test clusters, transforming raw telemetry into intuitive timeseries charts and regression indicators.',
      benchmarkResults: [
        { metric: 'Data Ingestion Time', before: '12 mins / run', after: '42 seconds' },
        { metric: 'Regression Flagging', before: 'Weekly manual triage', after: 'Instant CI alert' },
      ],
      keyComponents: [
        'Automated telemetry harvest pipeline for continuous browser test suites',
        'High-density timeseries visualization components for performance metrics',
        'Automated thresholds for catching memory leaks and frame-rate dips',
      ],
    },
    codeSnippet: {
      filename: 'dashboard/src/metricsProcessor.js',
      language: 'javascript',
      code: `export async function processBenchmarkRun(telemetryPayload) {
  const { testSuite, commitHash, timingData } = telemetryPayload;
  
  // Normalize frame rendering timings and filter warmup runs
  const normalizedStats = calculateStatisticalMetrics(timingData.slice(2));
  
  return {
    commit: commitHash.slice(0, 8),
    suite: testSuite,
    medianRenderMs: normalizedStats.median,
    p95DurationMs: normalizedStats.p95,
    isRegression: normalizedStats.median > BASELINE_THRESHOLDS[testSuite],
    timestamp: new Date().toISOString()
  };
}`,
    },
    githubUrl: 'https://github.com/mozilla-frontend-infra/firefox-performance-dashboards',
    liveUrl: 'https://github.com/kimberlythegeek',
    architectureDiagramSvg: 'mesh',
  },
  {
    id: 'axe-selenium-python',
    title: 'Axe-Selenium Dependency & Test Pipeline',
    tagline: 'Automated package management and axe-core dependency synchronizer',
    category: 'opensource',
    featured: true,
    stars: 190,
    year: 'Open Source',
    role: 'Contributor & Maintainer',
    primaryMetric: {
      label: 'Dependency Integrity',
      value: 'Continuous Sync',
    },
    techStack: ['Python', 'JavaScript', 'npm', 'Selenium', 'GitHub Actions'],
    description: 'Configured automated package management and dependency synchronization for maintaining upstream axe-core engine compatibility within Python Selenium test automation workflows.',
    architectureDetails: {
      challenge: 'Keeping Python bindings synchronized with frequent upstream axe-core JavaScript rule releases caused drift and stale test assertions.',
      solution: 'Structured unified package configuration pipelines linking npm axe-core releases directly into Python wheel packaging and test runner harnesses.',
      benchmarkResults: [
        { metric: 'Engine Synchronization', before: 'Manual monthly audits', after: 'Automated CI build' },
        { metric: 'Packaging Integrity', before: 'Inconsistent bundles', after: 'Reproducible wheels' },
      ],
      keyComponents: [
        'Automated package dependency manifest linking axe-core into Python builds',
        'Headless browser validation tests verifying rule execution parity',
      ],
    },
    githubUrl: 'https://github.com/kimberlythegeek',
    architectureDiagramSvg: 'compiler',
  },
  {
    id: 'would-you-rather-app',
    title: 'Would You Rather Web Engine',
    tagline: 'Interactive state-driven full-stack poll engine with real-time voting analytics',
    category: 'fullstack',
    featured: false,
    stars: 45,
    year: 'Full-Stack',
    role: 'Author & Lead Developer',
    primaryMetric: {
      label: 'Interface Frame Rate',
      value: '60 FPS Smooth UI',
    },
    techStack: ['React', 'Redux', 'JavaScript', 'CSS Modules', 'Jest'],
    description: 'Dynamic interactive decision platform featuring persistent question generation, leaderboard standings, optimistic user voting state, and accessible keyboard navigation.',
    architectureDetails: {
      challenge: 'Managing synchronized poll vote counts and authenticated user actions across multiple active state slices without lag or visual desynchronization.',
      solution: 'Architected unidirectional Redux state flow with normalized relational entities and optimistic UI feedback that immediately reflects ballot changes.',
      benchmarkResults: [
        { metric: 'Vote Interaction Latency', before: 'Network wait indicator', after: '0ms optimistic UI' },
        { metric: 'State Consistency', before: 'Multiple renders', after: 'Single atomic dispatch' },
      ],
      keyComponents: [
        'Normalized entity state slices for users, questions, and ballots',
        'Strict keyboard accessibility navigation with screen reader announcements',
      ],
    },
    codeSnippet: {
      filename: 'src/reducers/questions.js',
      language: 'javascript',
      code: `export function questions(state = {}, action) {
  switch (action.type) {
    case CAST_VOTE:
      const { qid, authedUser, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };
    default:
      return state;
  }
}`,
    },
    githubUrl: 'https://github.com/kimberlythegeek/project-2-would-you-rather',
    architectureDiagramSvg: 'socket',
  },
  {
    id: 'fullstack-workflow-platform',
    title: 'Cloud Test Automation Orchestrator',
    tagline: 'End-to-end containerized test pipeline with parallelized regression gates',
    category: 'tooling',
    featured: false,
    stars: 78,
    year: 'Cloud & DevOps',
    role: 'Software Engineer',
    primaryMetric: {
      label: 'Build Pipeline Speedup',
      value: '82% Faster CI',
    },
    techStack: ['Docker', 'Python', 'TypeScript', 'GitHub Actions', 'Linux'],
    description: 'Modern developer workflow orchestrator designed to run automated functional tests, linting, and accessibility evaluations concurrently in ephemeral Linux containers.',
    architectureDetails: {
      challenge: 'Linear test execution slowed down pull request turnaround times to over 30 minutes, blocking rapid continuous delivery.',
      solution: 'Containerized test runners with smart artifact caching and parallel test matrix splits across headless browser instances.',
      benchmarkResults: [
        { metric: 'CI Runtime', before: '32 minutes', after: '5.8 minutes' },
        { metric: 'Container Spin-up', before: '3.5 minutes', after: '18 seconds' },
      ],
      keyComponents: [
        'Multi-stage Docker containerization for minimal build artifacts',
        'Parallelized test matrix running accessibility and unit tests simultaneously',
      ],
    },
    githubUrl: 'https://github.com/kimberlysereduck',
    architectureDiagramSvg: 'container',
  },
  {
    id: 'a11y-design-system',
    title: 'Accessible UI Component Engine',
    tagline: 'High-contrast, keyboard-navigable component library meeting WCAG 2.1 AA',
    category: 'fullstack',
    featured: false,
    stars: 62,
    year: 'Design & Frontend',
    role: 'Frontend Engineer',
    primaryMetric: {
      label: 'Audit Score',
      value: '100% WCAG Passed',
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Radix Primitives', 'axe-core'],
    description: 'Component architecture system engineered from first principles with full ARIA landmarks, focus-visible rings, screen reader announcements, and dark/light high-contrast themes.',
    architectureDetails: {
      challenge: 'Ensuring interactive modals, dropdowns, and form inputs maintain strict keyboard focus traps and color contrast across both dark and light modes.',
      solution: 'Built composable primitives with Radix accessibility foundations, paired with automated axe-core regression checks run on every component render.',
      benchmarkResults: [
        { metric: 'Contrast Ratio', before: '3.8:1 borderline', after: '7.2:1 AAA certified' },
        { metric: 'Keyboard Nav Usability', before: 'Focus traps broken', after: '100% compliant' },
      ],
      keyComponents: [
        'Accessible modal focus-trapping with automatic ESC key handling',
        'High-contrast color tokens tested for color-blind legibility',
      ],
    },
    githubUrl: 'https://github.com/kimberlysereduck',
    architectureDiagramSvg: 'cache',
  },
];

/**
 * Professional experience entries shown in the experience timeline.
 *
 * @public
 */
export const EXPERIENCES: Experience[] = [
  {
    id: 'software-engineer-carlsbad',
    role: 'Software Engineer',
    company: 'Full-Stack & Cloud Systems',
    location: 'Carlsbad, NM',
    period: '2021 — Present',
    type: 'Full-Time',
    summary: 'Building high-reliability web applications, automated testing harnesses, and accessible user interfaces. Leading frontend architecture, API integration, and test automation strategies.',
    highlights: [
      'Architected end-to-end web applications with React, TypeScript, and Python backends with strict WCAG 2.1 AA compliance.',
      'Designed automated CI/CD validation pipelines with containerized test runners, slashing regression turnaround by 75%.',
      'Implemented responsive design systems supporting both dark and light high-contrast themes with seamless mobile accessibility.',
    ],
    metrics: [
      { label: 'CI Pipeline Acceleration', value: '75%' },
      { label: 'WCAG Compliance Standard', value: 'AA / AAA' },
      { label: 'Regression Reduction', value: '85%' },
    ],
    technologies: ['React', 'TypeScript', 'Python', 'Tailwind CSS', 'Docker', 'REST APIs', 'pytest'],
  },
  {
    id: 'mozilla-contributor',
    role: 'Open Source Contributor',
    company: 'Mozilla & Open Web Infrastructure',
    location: 'Remote',
    period: '2017 — 2021',
    type: 'Open Source',
    summary: 'Contributed to Mozilla developer infrastructure, Firefox performance automation dashboards, and accessibility test suites (pytest-axe, perf-automation).',
    highlights: [
      'Contributed automated accessibility validation features in pytest-axe integrating axe-core with Selenium browser test suites.',
      'Collaborated on Firefox performance dashboards tracking browser rendering benchmarks and regression telemetry.',
      'Maintained package configuration dependencies bridging modern JavaScript tools into Python ecosystems.',
    ],
    metrics: [
      { label: 'Key Repositories', value: 'pytest-axe & perf' },
      { label: 'Test Automation Rate', value: '100% Automated' },
      { label: 'Ecosystem Accounts', value: '@kimberlythegeek' },
    ],
    technologies: ['Python', 'pytest', 'Selenium', 'axe-core', 'JavaScript', 'Git', 'CI/CD'],
  },
  {
    id: 'frontend-fullstack-engineer',
    role: 'Web Application Developer',
    company: 'Independent & Project Engineering',
    location: 'Carlsbad, NM',
    period: '2016 — 2017',
    type: 'Contract & Projects',
    summary: 'Engineered responsive web applications, interactive state management systems, and automated test runners.',
    highlights: [
      'Developed interactive single-page applications with Redux state synchronization and optimistic UI updates.',
      'Built automated test suites using Jest and Selenium to verify critical user checkout and authentication journeys.',
      'Authored clean technical documentation and open-source starter templates for engineering squads.',
    ],
    metrics: [
      { label: 'UI Responsiveness', value: '60 FPS' },
      { label: 'Test Code Coverage', value: '88%+' },
      { label: 'Cross-Device Parity', value: '100%' },
    ],
    technologies: ['JavaScript', 'React', 'Redux', 'HTML5/CSS3', 'Jest', 'Git', 'Webpack'],
  },
];

/**
 * Skill groups and proficiency details shown in the technical stack section.
 *
 * @public
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages & Core Web',
    description: 'System languages, modern web scripting, and data pipelines',
    skills: [
      { name: 'JavaScript (ES6+) & TypeScript', level: 'Expert', years: 7, highlight: 'Type safety, async patterns, DOM manipulation' },
      { name: 'Python', level: 'Expert', years: 7, highlight: 'pytest automation, test fixtures, backend scripting' },
      { name: 'HTML5 & Semantic Markup', level: 'Expert', years: 8, highlight: 'Accessible tree architecture, ARIA roles' },
      { name: 'CSS3 & Modern Styling', level: 'Advanced', years: 8, highlight: 'Tailwind CSS, animations, responsive layouts' },
      { name: 'SQL & Database Design', level: 'Proficient', years: 6, highlight: 'Relational data modeling, query optimization' },
    ],
  },
  {
    category: 'Test & Performance Automation',
    description: 'Accessibility verification, headless browsers, and CI validation',
    skills: [
      { name: 'Automated Accessibility (axe-core)', level: 'Specialist', years: 6, highlight: 'pytest-axe, WCAG 2.1 AA validation, ARIA' },
      { name: 'Selenium & WebDriver', level: 'Expert', years: 6, highlight: 'Cross-browser automated functional testing' },
      { name: 'pytest & Test Architecture', level: 'Expert', years: 7, highlight: 'Custom fixtures, parametric testing, coverage' },
      { name: 'Performance Dashboards & Telemetry', level: 'Advanced', years: 5, highlight: 'Mozilla perf-automation, benchmark tracking' },
      { name: 'Jest & Component Testing', level: 'Advanced', years: 6, highlight: 'Unit testing, snapshot checks, mock isolation' },
    ],
  },
  {
    category: 'Frontend Frameworks & UI',
    description: 'Component architecture, state management, and user experience',
    skills: [
      { name: 'React 19 & Next.js', level: 'Expert', years: 7, highlight: 'Hooks, state management, performance optimization' },
      { name: 'Redux & State Architecture', level: 'Advanced', years: 6, highlight: 'Normalized stores, optimistic actions, middleware' },
      { name: 'Tailwind CSS & Design Systems', level: 'Expert', years: 5, highlight: 'Dark mode tokens, rainbow accents, high-contrast' },
      { name: 'Responsive Mobile Engineering', level: 'Expert', years: 8, highlight: 'Touch targets, viewport fluidity, accessibility' },
    ],
  },
  {
    category: 'DevOps & Tooling Ecosystem',
    description: 'Version control, packaging, and continuous delivery',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Expert', years: 8, highlight: 'Multi-account management, PR reviews, branches' },
      { name: 'Docker & Containers', level: 'Proficient', years: 5, highlight: 'Isolated test runners, Dockerfile optimization' },
      { name: 'CI/CD Automation', level: 'Advanced', years: 6, highlight: 'GitHub Actions, automated test matrix, releases' },
      { name: 'Package Management (npm / pip)', level: 'Advanced', years: 7, highlight: 'Dual-ecosystem packaging, dependency sync' },
    ],
  },
];
