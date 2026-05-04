import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCountdown } from './KdsCountdown';

describe('KdsCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders countdown time', () => {
    render(<KdsCountdown deadline="2026-01-01T01:30:45Z" />);
    expect(screen.getByText('01:30:45')).toBeInTheDocument();
  });

  it('applies urgent class when under 5 minutes', () => {
    const { container } = render(<KdsCountdown deadline="2026-01-01T00:04:00Z" />);
    expect(container.firstChild).toHaveClass('kds-countdown', 'urgent');
  });

  it('renders nothing when expired', () => {
    const { container } = render(<KdsCountdown deadline="2025-12-31T23:00:00Z" />);
    expect(container.innerHTML).toBe('');
  });
});
