import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsCopyRow } from './KdsCopyRow';

describe('KdsCopyRow', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders label and value', () => {
    render(<KdsCopyRow label="RUT" value="12.345.678-9" />);
    expect(screen.getByText('RUT')).toBeInTheDocument();
    expect(screen.getByText('12.345.678-9')).toBeInTheDocument();
  });

  it('copies value on click', async () => {
    render(<KdsCopyRow label="RUT" value="12.345.678-9" />);
    await userEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('12.345.678-9');
  });

  it('shows icon when provided', () => {
    render(<KdsCopyRow label="RUT" value="123" icon="badge" />);
    expect(screen.getByText('badge')).toBeInTheDocument();
  });

  it('has kds-copy-row class', () => {
    render(<KdsCopyRow label="Test" value="val" />);
    expect(screen.getByRole('button')).toHaveClass('kds-copy-row');
  });
});
