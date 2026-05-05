import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsAlert } from './KdsAlert';

describe('KdsAlert', () => {
  it('renders with role="alert"', () => {
    render(<KdsAlert severity="info">Message</KdsAlert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies severity class', () => {
    render(<KdsAlert severity="error">Error</KdsAlert>);
    expect(screen.getByRole('alert')).toHaveClass('kds-alert', 'kds-error');
  });

  it('renders title when provided', () => {
    render(<KdsAlert severity="info" title="Title">Body</KdsAlert>);
    expect(screen.getByText('Title')).toHaveClass('kds-alert-title');
  });

  it('renders icon when provided', () => {
    render(<KdsAlert severity="info" icon="info">Body</KdsAlert>);
    expect(screen.getByText('info')).toHaveClass('material-symbols-outlined');
  });

  it('renders close button and fires onClose', async () => {
    const onClose = vi.fn();
    render(<KdsAlert severity="info" onClose={onClose}>Body</KdsAlert>);
    await userEvent.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies inline variant', () => {
    render(<KdsAlert severity="success" inline>OK</KdsAlert>);
    expect(screen.getByRole('alert')).toHaveClass('kds-alert-inline');
  });
});
