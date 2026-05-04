import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSecureFooter } from './KdsSecureFooter';

describe('KdsSecureFooter', () => {
  it('renders footer with lock icon and default text', () => {
    render(<KdsSecureFooter />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('kds-secure-footer');
    expect(screen.getByText('lock')).toHaveClass('material-symbols-outlined');
    expect(screen.getByText('Pago seguro con Khipu')).toBeInTheDocument();
  });

  it('renders custom children instead of default text', () => {
    render(<KdsSecureFooter>Pago protegido</KdsSecureFooter>);
    expect(screen.getByText('Pago protegido')).toBeInTheDocument();
    expect(screen.queryByText('Pago seguro con Khipu')).toBeNull();
  });

  it('merges custom className', () => {
    render(<KdsSecureFooter className="custom" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('kds-secure-footer', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLElement | null };
    render(<KdsSecureFooter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('FOOTER');
  });
});
