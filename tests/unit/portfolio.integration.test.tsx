// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';
import { PROJECTS } from '../../src/data/portfolioData';
import { ProjectShowcase } from '../../src/components/ProjectShowcase';
import { TerminalCLI } from '../../src/components/TerminalCLI';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('portfolio interactions', () => {
  it('shares and persists the theme between navigation and terminal', () => {
    Element.prototype.scrollIntoView = vi.fn();
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('devspectrum-theme')).toBe('light');

    const input = screen.getByPlaceholderText("type 'help', 'github', or any command...");
    fireEvent.change(input, { target: { value: 'theme' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeTruthy();
    expect(localStorage.getItem('devspectrum-theme')).toBe('dark');
  });

  it('filters projects and opens and dismisses their details', () => {
    render(<ProjectShowcase />);
    const sourceProject = PROJECTS.find((project) => project.category === 'opensource');
    const otherProject = PROJECTS.find((project) => project.category !== 'opensource');
    expect(sourceProject).toBeDefined();
    expect(otherProject).toBeDefined();
    if (!sourceProject || !otherProject) throw new Error('Expected projects in different categories');

    fireEvent.click(screen.getByRole('button', { name: 'Open Source' }));
    expect(screen.getByRole('heading', { name: sourceProject.title })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: otherProject.title })).toBeNull();

    const card = screen.getByRole('heading', { name: sourceProject.title }).closest<HTMLElement>('.group');
    if (!card) throw new Error('Project card not found');
    fireEvent.click(within(card).getByRole('button', { name: 'Deep Dive' }));
    expect(screen.getByText(sourceProject.architectureDetails.challenge)).toBeTruthy();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByText(sourceProject.architectureDetails.challenge)).toBeNull();
  });

  it('executes terminal commands, recalls history, and clears output', () => {
    Element.prototype.scrollIntoView = vi.fn();
    render(<TerminalCLI />);
    const input = screen.getByPlaceholderText("type 'help', 'github', or any command...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Available Terminal Commands:')).toBeTruthy();
    expect(input.value).toBe('');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('help');
    fireEvent.change(input, { target: { value: 'not-a-command' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText(/Command not recognized:/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Clear screen' }));
    expect(screen.queryByText(/Command not recognized:/)).toBeNull();
    expect(screen.queryByText('Available Terminal Commands:')).toBeNull();
  });
});
