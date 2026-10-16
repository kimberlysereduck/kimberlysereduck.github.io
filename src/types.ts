export type ProjectCategory = 'all' | 'systems' | 'tooling' | 'fullstack' | 'opensource';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  stars?: number;
  year: string;
  role: string;
  primaryMetric: {
    label: string;
    value: string;
  };
  techStack: string[];
  description: string;
  architectureDetails: {
    challenge: string;
    solution: string;
    benchmarkResults: { metric: string; before: string; after: string }[];
    keyComponents: string[];
  };
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  githubUrl: string;
  liveUrl?: string;
  architectureDiagramSvg: 'stream' | 'mesh' | 'compiler' | 'cache' | 'container' | 'socket';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string;
    years: number;
    highlight?: string;
  }[];
}

export interface TerminalCommand {
  command: string;
  output: string | React.ReactNode;
}
