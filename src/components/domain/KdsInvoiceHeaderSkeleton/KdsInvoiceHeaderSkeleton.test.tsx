import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsInvoiceHeaderSkeleton } from './KdsInvoiceHeaderSkeleton';

describe('KdsInvoiceHeaderSkeleton', () => {
  it('renders as an invoice sticky card marked as skeleton', () => {
    render(<KdsInvoiceHeaderSkeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('kds-card-elevated', 'kds-invoice-sticky', 'kds-invoice-skeleton');
  });

  it('is hidden from assistive technology', () => {
    render(<KdsInvoiceHeaderSkeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('mirrors the real header slots so the swap does not shift the layout', () => {
    render(<KdsInvoiceHeaderSkeleton data-testid="skeleton" />);
    const el = screen.getByTestId('skeleton');
    expect(el.querySelector('.kds-invoice-header .kds-invoice-amount .kds-skeleton--text')).not.toBeNull();
    expect(el.querySelector('.kds-invoice-header .kds-invoice-code .kds-skeleton--text')).not.toBeNull();
    expect(el.querySelector('.kds-invoice-header .kds-invoice-merchant.kds-skeleton')).not.toBeNull();
    expect(el.querySelectorAll('.kds-invoice-summary .kds-kv dd .kds-skeleton--text')).toHaveLength(2);
    expect(el.querySelector('.kds-invoice-collapsible > .kds-expand-toggle .kds-skeleton--text')).not.toBeNull();
  });

  it('merges custom className and forwards ref', () => {
    const ref = { current: null as HTMLElement | null };
    render(<KdsInvoiceHeaderSkeleton ref={ref} className="custom" />);
    expect(ref.current?.tagName).toBe('ARTICLE');
    expect(ref.current).toHaveClass('kds-invoice-skeleton', 'custom');
  });
});
