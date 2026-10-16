import { describe, expect, it } from 'vitest';
import { EXPERIENCES, PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from './portfolioData';

describe('portfolio data', () => {
  it('has unique project and experience identifiers', () => {
    const projectIds = PROJECTS.map(({ id }) => id);
    const experienceIds = EXPERIENCES.map(({ id }) => id);

    expect(new Set(projectIds).size).toBe(projectIds.length);
    expect(new Set(experienceIds).size).toBe(experienceIds.length);
  });

  it('uses valid project categories and absolute repository URLs', () => {
    const categories = new Set(['systems', 'tooling', 'fullstack', 'opensource']);

    expect(PROJECTS.length).toBeGreaterThan(0);
    for (const project of PROJECTS) {
      expect(categories.has(project.category)).toBe(true);
      expect(project.githubUrl).toMatch(/^https:\/\/\S+$/);
      expect(project.techStack.length).toBeGreaterThan(0);
    }
  });

  it('provides the content required by each portfolio section', () => {
    expect(PERSONAL_INFO.name.trim()).not.toBe('');
    expect(PERSONAL_INFO.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(EXPERIENCES.length).toBeGreaterThan(0);
    expect(SKILL_CATEGORIES.length).toBeGreaterThan(0);
    expect(SKILL_CATEGORIES.every(({ skills }) => skills.length > 0)).toBe(true);
  });
});
