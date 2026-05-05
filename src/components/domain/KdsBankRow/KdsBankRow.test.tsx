import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsBankRow } from './KdsBankRow';

describe('KdsBankRow', () => {
  it('renders button with bank name', () => {
    render(<KdsBankRow name="Banco Estado" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-bank-row');
    expect(screen.getByText('Banco Estado')).toHaveClass('kds-bank-row-name');
  });

  it('applies selected class', () => {
    render(<KdsBankRow name="Banco Chile" selected />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-bank-row', 'selected');
  });

  it('renders logo image when logoUrl is provided', () => {
    render(<KdsBankRow name="Banco Chile" logoUrl="/logo.png" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/logo.png');
    expect(img).toHaveAttribute('alt', 'Banco Chile');
  });

  it('renders initials fallback when no logoUrl', () => {
    render(<KdsBankRow name="Banco Chile" />);
    expect(screen.getByText('B')).toHaveClass('initials');
  });

  it('shows check_circle icon when selected', () => {
    render(<KdsBankRow name="Banco Chile" selected />);
    expect(screen.getByText('check_circle')).toHaveClass('material-symbols-outlined');
  });

  it('shows chevron_right icon when not selected', () => {
    render(<KdsBankRow name="Banco Chile" />);
    expect(screen.getByText('chevron_right')).toHaveClass('material-symbols-outlined');
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsBankRow name="Banco Chile" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsBankRow name="Banco Chile" className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('kds-bank-row', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsBankRow ref={ref} name="Banco Chile" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
