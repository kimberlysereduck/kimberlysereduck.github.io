/**
 * Categories available for classifying portfolio projects.
 *
 * @public
 */
export type ProjectCategory = 'all' | 'systems' | 'tooling' | 'fullstack' | 'opensource';

/**
 * A portfolio project and its supporting technical details.
 *
 * @public
 */
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

/**
 * A professional experience entry displayed in the timeline.
 *
 * @public
 */
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

/**
 * A group of related technical skills.
 *
 * @public
 */
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

/**
 * A command and its rendered output in the portfolio terminal.
 *
 * @public
 */
export interface TerminalCommand {
  command: string;
  output: string | React.ReactNode;
}
