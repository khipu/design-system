import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsPaymentTotal } from './KdsPaymentTotal';

describe('KdsPaymentTotal', () => {
  it('renders with decimals as <sup>', () => {
    render(<KdsPaymentTotal amount="1500.50" data-testid="pt" />);
    const sup = screen.getByText('50');
    expect(sup.tagName.toLowerCase()).toBe('sup');
    expect(sup).toHaveClass('kds-payment-total-decimal-sup');
    expect(screen.getByTestId('pt')).toHaveTextContent('S/ 1500');
  });

  it('renders without decimals (decimals=0)', () => {
    render(<KdsPaymentTotal amount="250" decimals={0} data-testid="pt" />);
    expect(screen.queryByText(/^50$/)).not.toBeInTheDocument();
    expect(screen.getByTestId('pt').querySelector('sup')).toBeNull();
    expect(screen.getByTestId('pt')).toHaveTextContent('S/ 250');
  });

  it('renders without decimals when amount string has no dot', () => {
    render(<KdsPaymentTotal amount="1500" data-testid="pt" />);
    expect(screen.getByTestId('pt').querySelector('sup')).toBeNull();
  });

  it('formats numeric amount with locale separators and decimals', () => {
    render(<KdsPaymentTotal amount={1500.5} locale="en-US" data-testid="pt" />);
    expect(screen.getByTestId('pt')).toHaveTextContent('S/ 1,500');
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('applies the email variant modifier class', () => {
    render(<KdsPaymentTotal variant="email" amount="1500.50" data-testid="pt" />);
    expect(screen.getByTestId('pt')).toHaveClass('kds-payment-total', 'kds-payment-total--email');
  });

  it('hides title elements in email variant', () => {
    render(<KdsPaymentTotal variant="email" amount="1500.50" />);
    expect(screen.queryByText('Escanea el QR')).not.toBeInTheDocument();
    expect(screen.queryByText('Descarga el QR')).not.toBeInTheDocument();
  });

  it('renders custom currency symbol', () => {
    render(<KdsPaymentTotal amount="1500.50" currency="$" data-testid="pt" />);
    expect(screen.getByTestId('pt')).toHaveTextContent('$ 1500');
  });

  it('renders default titles in default variant', () => {
    render(<KdsPaymentTotal amount="1500.50" />);
    expect(screen.getByText('Escanea el QR')).toBeInTheDocument();
    expect(screen.getByText('Descarga el QR')).toBeInTheDocument();
    expect(screen.getByText('Monto a pagar')).toBeInTheDocument();
  });

  it('omits desktop title when title is null', () => {
    render(<KdsPaymentTotal amount="1500.50" title={null} />);
    expect(screen.queryByText('Escanea el QR')).not.toBeInTheDocument();
    expect(screen.getByText('Descarga el QR')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsPaymentTotal ref={ref} amount="100" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    render(<KdsPaymentTotal amount="100" className="custom" data-testid="pt" />);
    const el = screen.getByTestId('pt');
    expect(el).toHaveClass('kds-payment-total', 'custom');
  });

  it('forwards HTML attributes', () => {
    render(<KdsPaymentTotal amount="100" data-testid="pt" role="region" aria-label="total" />);
    const el = screen.getByTestId('pt');
    expect(el).toHaveAttribute('role', 'region');
    expect(el).toHaveAttribute('aria-label', 'total');
  });
});
