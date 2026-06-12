/**
 * KdsCopyButton - Test Suite
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { KdsCopyButton } from './KdsCopyButton';

describe('KdsCopyButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders the value', () => {
    render(<KdsCopyButton value="bbre-ujtb-sk0n" />);
    expect(screen.getByText('bbre-ujtb-sk0n')).toBeInTheDocument();
  });

  it('copies the value to the clipboard on click', () => {
    render(<KdsCopyButton value="bbre-ujtb-sk0n" />);
    fireEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('bbre-ujtb-sk0n');
  });

  it('shows the copied text after copying', async () => {
    render(<KdsCopyButton value="x" copiedText="Copiado!" />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Copiado!')).toBeInTheDocument());
  });
});
