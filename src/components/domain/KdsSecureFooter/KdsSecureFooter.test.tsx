import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSecureFooter } from './KdsSecureFooter';

describe('KdsSecureFooter', () => {
  it('renders footer with lock icon, lead-in text and Khipu wordmark', () => {
    const { container } = render(<KdsSecureFooter />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('kds-secure-footer');
    expect(container.querySelector('.kds-secure-footer-lock')).toBeInTheDocument();
    // El texto NO incluye "Khipu": la marca la aporta el logo.
    expect(screen.getByText('Pago seguro procesado por')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Khipu' })).toHaveClass('khipu-mark');
  });

  it('hides the Khipu wordmark when showLogo is false', () => {
    render(<KdsSecureFooter showLogo={false} />);
    expect(screen.queryByRole('img', { name: 'Khipu' })).toBeNull();
  });

  it('renders custom children instead of default text', () => {
    render(<KdsSecureFooter>Pago protegido</KdsSecureFooter>);
    expect(screen.getByText('Pago protegido')).toBeInTheDocument();
    expect(screen.queryByText('Pago seguro procesado por')).toBeNull();
  });

  it('renders a PSP logo with a separator when psp is provided', () => {
    const { container } = render(
      <KdsSecureFooter psp={<img src="data:," alt="klap" className="kds-psp-mark" />} />,
    );
    expect(container.querySelector('.kds-secure-footer-sep')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'klap' })).toBeInTheDocument();
  });

  it('does not render a separator when psp is absent', () => {
    const { container } = render(<KdsSecureFooter />);
    expect(container.querySelector('.kds-secure-footer-sep')).toBeNull();
  });

  it('applies inside variant class', () => {
    render(<KdsSecureFooter variant="inside" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('kds-secure-footer', 'inside');
  });

  it('does not apply inside class for default variant', () => {
    render(<KdsSecureFooter variant="default" />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('kds-secure-footer');
    expect(footer).not.toHaveClass('inside');
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
