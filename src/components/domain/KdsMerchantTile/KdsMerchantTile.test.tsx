import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { KdsMerchantTile } from './KdsMerchantTile';
import { measureLogoLuminance } from '../KdsInvoiceMerchant/logoLuminance';

vi.mock('../KdsInvoiceMerchant/logoLuminance', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../KdsInvoiceMerchant/logoLuminance')>();
  return { ...actual, measureLogoLuminance: vi.fn(() => Promise.resolve(null)) };
});

describe('KdsMerchantTile', () => {
  it('renders the logo variant when logoUrl is provided', () => {
    render(<KdsMerchantTile data-testid="t" name="Comercio" logoUrl="https://x/logo.png" />);
    const el = screen.getByTestId('t');
    expect(el).toHaveClass('kds-merchant-tile', 'logo');
    expect(el.querySelector('img')).toHaveAttribute('src', 'https://x/logo.png');
  });

  it('renders the initials fallback without the logo classes', () => {
    render(<KdsMerchantTile data-testid="t" name="Comercio" />);
    const el = screen.getByTestId('t');
    expect(el).not.toHaveClass('logo');
    expect(el).not.toHaveClass('dark');
    expect(el).toHaveTextContent('CO');
  });

  it('uses the dark neutral backdrop when the logo is light', async () => {
    vi.mocked(measureLogoLuminance).mockResolvedValueOnce(0.95);
    render(<KdsMerchantTile data-testid="t" name="Comercio" logoUrl="https://x/light.png" />);
    await waitFor(() => expect(screen.getByTestId('t')).toHaveClass('dark'));
  });

  it('keeps the transparent backdrop when the logo luminance is not measurable', async () => {
    vi.mocked(measureLogoLuminance).mockResolvedValueOnce(null);
    render(<KdsMerchantTile data-testid="t" name="Comercio" logoUrl="https://x/no-cors.png" />);
    await waitFor(() => expect(vi.mocked(measureLogoLuminance)).toHaveBeenCalled());
    expect(screen.getByTestId('t')).not.toHaveClass('dark');
  });
});
