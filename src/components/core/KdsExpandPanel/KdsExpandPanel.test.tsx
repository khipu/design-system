import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsExpandPanel } from './KdsExpandPanel';

describe('KdsExpandPanel', () => {
  it('renders collapsed by default', () => {
    render(<KdsExpandPanel label="Details">Content</KdsExpandPanel>);
    expect(screen.getByRole('button', { name: /details/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands when toggle clicked', async () => {
    render(<KdsExpandPanel label="Details">Content</KdsExpandPanel>);
    await userEvent.click(screen.getByRole('button', { name: /details/i }));
    expect(screen.getByRole('button', { name: /details/i })).toHaveAttribute('aria-expanded', 'true');
  });

  it('starts expanded when defaultExpanded is true', () => {
    render(<KdsExpandPanel label="Info" defaultExpanded>Content</KdsExpandPanel>);
    expect(screen.getByRole('button', { name: /info/i })).toHaveAttribute('aria-expanded', 'true');
  });
});
