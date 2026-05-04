import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsQrRow } from './KdsQrRow';

describe('KdsQrRow', () => {
  it('renders button with name', () => {
    render(<KdsQrRow name="Pago QR" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-bank-row');
    expect(screen.getByText('Pago QR')).toHaveClass('kds-bank-row-name');
  });

  it('renders description when provided', () => {
    render(<KdsQrRow name="Pago QR" description="Escanea el codigo" />);
    expect(screen.getByText('Escanea el codigo')).toHaveClass('kds-text-secondary');
  });

  it('does not render description when omitted', () => {
    const { container } = render(<KdsQrRow name="Pago QR" />);
    expect(container.querySelector('.kds-text-secondary')).toBeNull();
  });

  it('renders logo image when logoUrl is provided', () => {
    render(<KdsQrRow name="MACH" logoUrl="/mach.png" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/mach.png');
    expect(img).toHaveAttribute('alt', 'MACH');
  });

  it('renders qr_code icon fallback when no logoUrl', () => {
    render(<KdsQrRow name="Pago QR" />);
    expect(screen.getByText('qr_code')).toHaveClass('material-symbols-outlined');
  });

  it('renders chevron_right icon', () => {
    render(<KdsQrRow name="Pago QR" />);
    expect(screen.getByText('chevron_right')).toHaveClass('material-symbols-outlined');
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsQrRow name="Pago QR" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsQrRow name="Pago QR" className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('kds-bank-row', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsQrRow ref={ref} name="Pago QR" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
