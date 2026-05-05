import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsButton } from './KdsButton';

describe('KdsButton', () => {
  it('renders with default primary variant', () => {
    render(<KdsButton>Click</KdsButton>);
    const btn = screen.getByRole('button', { name: 'Click' });
    expect(btn).toHaveClass('kds-btn', 'kds-btn-primary');
  });

  it('applies variant class', () => {
    render(<KdsButton variant="outlined">Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn-outlined');
  });

  it('applies size class', () => {
    render(<KdsButton size="sm">Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn-sm');
  });

  it('applies fullWidth class', () => {
    render(<KdsButton fullWidth>Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn-block');
  });

  it('renders start icon as Material Symbols', () => {
    render(<KdsButton startIcon="download">Download</KdsButton>);
    const icon = screen.getByText('download');
    expect(icon).toHaveClass('material-symbols-outlined');
  });

  it('shows loader when loading', () => {
    render(<KdsButton loading>Submit</KdsButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.querySelector('.loader')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    render(<KdsButton disabled>Click</KdsButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsButton onClick={onClick}>Click</KdsButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsButton className="custom">Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsButton ref={ref}>Click</KdsButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
