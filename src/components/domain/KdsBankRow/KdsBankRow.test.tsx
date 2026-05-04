import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsBankRow } from './KdsBankRow';

describe('KdsBankRow', () => {
  it('renders button with bank name', () => {
    render(<KdsBankRow bankName="Banco Estado" />);
    const btn = screen.getByRole('button', { name: 'Banco Estado' });
    expect(btn).toHaveClass('kds-bank-row');
    expect(screen.getByText('Banco Estado')).toHaveClass('kds-bank-row-name');
  });

  it('applies selected class and aria-pressed', () => {
    render(<KdsBankRow bankName="Banco Chile" selected />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-bank-row', 'selected');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders bank logo when provided', () => {
    render(<KdsBankRow bankName="Banco Chile" bankLogo="/logo.png" />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('kds-bank-row-logo');
    expect(img).toHaveAttribute('src', '/logo.png');
  });

  it('does not render img when bankLogo is omitted', () => {
    render(<KdsBankRow bankName="Banco Chile" />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsBankRow bankName="Banco Chile" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsBankRow bankName="Banco Chile" className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('kds-bank-row', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsBankRow ref={ref} bankName="Banco Chile" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
