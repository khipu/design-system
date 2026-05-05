/**
 * KdsChip - Test Suite
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsChip } from './KdsChip';

describe('KdsChip', () => {
  it('renders chip with text', () => {
    render(<KdsChip>Pagado</KdsChip>);
    expect(screen.getByText('Pagado')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(<KdsChip onDelete={onDelete}>Test</KdsChip>);
    const deleteBtn = screen.getByRole('button', { name: /eliminar/i });
    await userEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
