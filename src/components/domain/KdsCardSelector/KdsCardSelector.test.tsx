import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsCardSelector } from './KdsCardSelector';

describe('KdsCardSelector', () => {
  it('renders label with kds-card-selector class', () => {
    render(<KdsCardSelector label="Transferencia" />);
    const btn = screen.getByRole('button', { name: 'Transferencia' });
    expect(btn).toHaveClass('kds-card-selector');
    expect(screen.getByText('Transferencia')).toHaveClass('kds-card-selector-label');
  });

  it('applies selected class and aria-pressed', () => {
    render(<KdsCardSelector label="Tarjeta" selected />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-card-selector', 'selected');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders icon when provided', () => {
    render(<KdsCardSelector label="QR" icon="qr_code" />);
    expect(screen.getByText('qr_code')).toHaveClass('material-symbols-outlined');
  });

  it('renders description when provided', () => {
    render(<KdsCardSelector label="QR" description="Escanea el código" />);
    expect(screen.getByText('Escanea el código')).toHaveClass('kds-card-selector-description');
  });

  it('does not render description when omitted', () => {
    render(<KdsCardSelector label="QR" />);
    expect(screen.queryByText(/description/i)).toBeNull();
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsCardSelector label="Click" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsCardSelector ref={ref} label="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
