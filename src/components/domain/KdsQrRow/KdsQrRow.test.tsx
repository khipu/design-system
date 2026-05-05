import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsQrRow } from './KdsQrRow';

describe('KdsQrRow', () => {
  it('renders button with kds-qr-row class', () => {
    render(<KdsQrRow name="Pago QR" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-qr-row');
  });

  it('renders name in .title span', () => {
    render(<KdsQrRow name="Pago QR" />);
    expect(screen.getByText('Pago QR')).toHaveClass('title');
  });

  it('renders description in .sub span when provided', () => {
    render(<KdsQrRow name="Pago QR" description="Escanea el codigo" />);
    expect(screen.getByText('Escanea el codigo')).toHaveClass('sub');
  });

  it('does not render description when omitted', () => {
    const { container } = render(<KdsQrRow name="Pago QR" />);
    expect(container.querySelector('.sub')).toBeNull();
  });

  it('renders default qr_code_2 icon in avatar', () => {
    render(<KdsQrRow name="Pago QR" />);
    expect(screen.getByText('qr_code_2')).toHaveClass('material-symbols-outlined');
  });

  it('renders custom icon when provided', () => {
    render(<KdsQrRow name="Pago QR" icon="smartphone" />);
    expect(screen.getByText('smartphone')).toHaveClass('material-symbols-outlined');
  });

  it('renders badge when provided', () => {
    render(<KdsQrRow name="Pago QR" badge="Rápido" />);
    expect(screen.getByText('Rápido')).toHaveClass('kds-qr-badge');
  });

  it('does not render badge when omitted', () => {
    const { container } = render(<KdsQrRow name="Pago QR" />);
    expect(container.querySelector('.kds-qr-badge')).toBeNull();
  });

  it('renders kds-qr-avatar with aria-hidden', () => {
    const { container } = render(<KdsQrRow name="Pago QR" />);
    const avatar = container.querySelector('.kds-qr-avatar');
    expect(avatar).toBeTruthy();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
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
    expect(screen.getByRole('button')).toHaveClass('kds-qr-row', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsQrRow ref={ref} name="Pago QR" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
