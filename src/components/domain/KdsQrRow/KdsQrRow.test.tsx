import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsQrRow } from './KdsQrRow';

describe('KdsQrRow', () => {
  it('renders label and value with kds-qr-row class', () => {
    render(<KdsQrRow label="Código QR" qrValue="ABC123" />);
    expect(screen.getByText('Código QR')).toHaveClass('kds-qr-row-label');
    expect(screen.getByText('ABC123')).toHaveClass('kds-qr-row-value');
  });

  it('applies kds-qr-row class to container', () => {
    render(<KdsQrRow label="QR" qrValue="XYZ" data-testid="qr" />);
    expect(screen.getByTestId('qr')).toHaveClass('kds-qr-row');
  });

  it('merges custom className', () => {
    render(<KdsQrRow label="QR" qrValue="XYZ" data-testid="qr" className="custom" />);
    expect(screen.getByTestId('qr')).toHaveClass('kds-qr-row', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsQrRow ref={ref} label="QR" qrValue="XYZ" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
