import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { KdsInvoiceMerchant } from './KdsInvoiceMerchant';
import { measureLogoLuminance } from './logoLuminance';

vi.mock('./logoLuminance', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./logoLuminance')>();
  return { ...actual, measureLogoLuminance: vi.fn(() => Promise.resolve(null)) };
});

describe('KdsInvoiceMerchant', () => {
  it('renders the merchant logo when logoUrl is provided', () => {
    render(<KdsInvoiceMerchant data-testid="m" logoUrl="https://x/logo.png" />);
    const el = screen.getByTestId('m');
    expect(el).toHaveClass('kds-invoice-merchant');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    const img = el.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://x/logo.png');
    expect(img).toHaveAttribute('alt', '');
  });

  it('falls back to the storefront icon when no logoUrl', () => {
    render(<KdsInvoiceMerchant data-testid="m" />);
    const el = screen.getByTestId('m');
    expect(el.querySelector('img')).toBeNull();
    expect(el.querySelector('i.material-symbols-outlined')?.textContent).toBe('storefront');
  });

  it('falls back to the storefront icon when the logo fails to load', () => {
    render(<KdsInvoiceMerchant data-testid="m" logoUrl="https://x/broken.png" />);
    const el = screen.getByTestId('m');
    fireEvent.error(el.querySelector('img')!);
    expect(el.querySelector('img')).toBeNull();
    expect(el.querySelector('i.material-symbols-outlined')?.textContent).toBe('storefront');
  });

  it('applies the brand color as background', () => {
    render(<KdsInvoiceMerchant data-testid="m" brandColor="#3f2971" />);
    expect(screen.getByTestId('m')).toHaveStyle({ background: '#3f2971' });
  });

  it('renders the logo on the neutral background, ignoring the brand color', () => {
    render(<KdsInvoiceMerchant data-testid="m" logoUrl="https://x/logo.png" brandColor="#e2001a" />);
    const el = screen.getByTestId('m');
    expect(el).toHaveClass('kds-invoice-merchant-neutral');
    expect(el).not.toHaveStyle({ background: '#e2001a' });
  });

  it('applies the brand color to the fallback tile after the logo fails to load', () => {
    render(<KdsInvoiceMerchant data-testid="m" logoUrl="https://x/broken.png" brandColor="#e2001a" />);
    const el = screen.getByTestId('m');
    fireEvent.error(el.querySelector('img')!);
    expect(el).not.toHaveClass('kds-invoice-merchant-neutral');
    expect(el).toHaveStyle({ background: '#e2001a' });
  });

  it('uses the dark neutral backdrop when the logo is light', async () => {
    vi.mocked(measureLogoLuminance).mockResolvedValueOnce(0.95);
    render(<KdsInvoiceMerchant data-testid="m" logoUrl="https://x/light-logo.png" />);
    await waitFor(() => expect(screen.getByTestId('m')).toHaveClass('dark'));
    expect(screen.getByTestId('m')).toHaveClass('kds-invoice-merchant-neutral');
  });

  it('keeps the paper backdrop when the logo luminance is not measurable', async () => {
    vi.mocked(measureLogoLuminance).mockResolvedValueOnce(null);
    render(<KdsInvoiceMerchant data-testid="m" logoUrl="https://x/no-cors.png" />);
    await waitFor(() => expect(vi.mocked(measureLogoLuminance)).toHaveBeenCalled());
    expect(screen.getByTestId('m')).not.toHaveClass('dark');
    expect(screen.getByTestId('m')).toHaveClass('kds-invoice-merchant-neutral');
  });
});
