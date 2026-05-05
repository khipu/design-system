/**
 * KdsLinearProgress - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsLinearProgress } from './KdsLinearProgress';

describe('KdsLinearProgress', () => {
  it('renders progress element', () => {
    render(<KdsLinearProgress aria-label="Loading" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<KdsLinearProgress value={50} aria-label="Progress" />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('value', '50');
  });
});
