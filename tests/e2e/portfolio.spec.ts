import { expect, test } from '@playwright/test';
import { PROJECTS } from '../../src/data/portfolioData';

test('renders the portfolio and navigates to projects', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('accessible full-stack');
  await page.getByRole('link', { name: 'Explore Projects' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects').getByRole('heading', { name: PROJECTS[0].title })).toBeVisible();
});

test('filters projects and closes the deep dive with Escape', async ({ page }) => {
  const project = PROJECTS.find((item) => item.category === 'opensource');
  const other = PROJECTS.find((item) => item.category !== 'opensource');
  if (!project || !other) throw new Error('Expected projects in different categories');

  await page.goto('/');
  const projects = page.locator('#projects');
  await projects.getByRole('button', { name: 'Open Source' }).click();
  await expect(projects.getByRole('heading', { name: other.title })).toHaveCount(0);
  const card = projects.locator('.group').filter({ has: page.getByRole('heading', { name: project.title }) });
  await card.getByRole('button', { name: 'Deep Dive' }).click();
  await expect(page.getByText(project.architectureDetails.challenge)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByText(project.architectureDetails.challenge)).toHaveCount(0);
});

test('persists theme changes across reloads', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveClass(/light/);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/light/);
});

test('runs terminal commands and clears their output', async ({ page }) => {
  await page.goto('/');
  const terminal = page.locator('#terminal');
  const input = terminal.getByPlaceholder("type 'help', 'github', or any command...");
  await input.fill('help');
  await input.press('Enter');
  await expect(terminal.getByText('Available Terminal Commands:')).toBeVisible();
  await input.fill('bad-command');
  await input.press('Enter');
  await expect(terminal.getByText(/Command not recognized:/)).toBeVisible();
  await terminal.getByRole('button', { name: 'Clear screen' }).click();
  await expect(terminal.getByText(/Command not recognized:/)).toHaveCount(0);
  await expect(terminal.getByText('Available Terminal Commands:')).toHaveCount(0);
});

test('mobile navigation opens and closes after navigating', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile navigation is only displayed on small screens');
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await expect(page.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.getByRole('link', { name: 'Experience', exact: true })).not.toBeVisible();
});
