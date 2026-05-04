import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsSnackbar } from './KdsSnackbar';

describe('KdsSnackbar', () => {
  it('renders message', () => {
    render(<KdsSnackbar message="Copied!" />);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('applies type class', () => {
    render(<KdsSnackbar message="Done" type="success" />);
    expect(screen.getByRole('status')).toHaveClass('snackbar', 'active', 'success');
  });

  it('shows close button when onClose provided', async () => {
    const onClose = vi.fn();
    render(<KdsSnackbar message="Hi" onClose={onClose} />);
    await userEvent.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when open=false', () => {
    render(<KdsSnackbar message="Hi" open={false} />);
    expect(screen.queryByText('Hi')).not.toBeInTheDocument();
  });
});
