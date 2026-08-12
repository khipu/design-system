/**
 * KdsThemeProvider - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsThemeProvider } from './KdsThemeProvider';

describe('KdsThemeProvider', () => {
  it('defaults to light mode and sets the data-theme contract', () => {
    render(
      <KdsThemeProvider>
        <span>contenido</span>
      </KdsThemeProvider>,
    );
    const root = screen.getByText('contenido').parentElement as HTMLElement;
    expect(root).toHaveAttribute('data-theme', 'light');
    expect(root.className).toContain('kds-theme-root');
    expect(root.className).toContain('light');
  });

  it('sets data-theme="dark" (the selector the dark tokens key on)', () => {
    render(
      <KdsThemeProvider mode="dark">
        <span>contenido</span>
      </KdsThemeProvider>,
    );
    const root = screen.getByText('contenido').parentElement as HTMLElement;
    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(root.className).toContain('dark');
  });

  it('applies merchant primary-color overrides as CSS custom properties', () => {
    render(
      <KdsThemeProvider primaryColor="#FF0000">
        <span>contenido</span>
      </KdsThemeProvider>,
    );
    const root = screen.getByText('contenido').parentElement as HTMLElement;
    expect(root.style.getPropertyValue('--primary')).toBe('#FF0000');
  });
});
