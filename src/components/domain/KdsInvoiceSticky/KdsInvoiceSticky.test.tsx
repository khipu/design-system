import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsInvoiceSticky } from './KdsInvoiceSticky';

describe('KdsInvoiceSticky', () => {
  it('renders children', () => {
    render(
      <KdsInvoiceSticky>
        <span>Total: $100.000</span>
      </KdsInvoiceSticky>,
    );
    expect(screen.getByText('Total: $100.000')).toBeInTheDocument();
  });

  it('has both kds-card-elevated and kds-invoice-sticky classes', () => {
    render(<KdsInvoiceSticky data-testid="sticky" />);
    const el = screen.getByTestId('sticky');
    expect(el).toHaveClass('kds-card-elevated');
    expect(el).toHaveClass('kds-invoice-sticky');
  });

  it('merges custom className', () => {
    render(<KdsInvoiceSticky data-testid="sticky" className="custom" />);
    const el = screen.getByTestId('sticky');
    expect(el).toHaveClass('kds-card-elevated', 'kds-invoice-sticky', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsInvoiceSticky ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders multiple children', () => {
    render(
      <KdsInvoiceSticky>
        <span>Monto</span>
        <button>Pagar</button>
      </KdsInvoiceSticky>,
    );
    expect(screen.getByText('Monto')).toBeInTheDocument();
    expect(screen.getByText('Pagar')).toBeInTheDocument();
  });

  it('forwards HTML attributes', () => {
    render(<KdsInvoiceSticky data-testid="sticky" role="region" />);
    expect(screen.getByTestId('sticky')).toHaveAttribute('role', 'region');
  });
});
