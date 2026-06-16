/**
 * KdsCheckbox - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCheckbox } from './KdsCheckbox';

describe('KdsCheckbox', () => {
  it('renders checkbox with label', () => {
    render(<KdsCheckbox label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('forwards checked state', () => {
    render(<KdsCheckbox label="Checked" checked readOnly />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders a ReactNode label with an embedded link', () => {
    render(
      <KdsCheckbox
        label={
          <>
            Acepto los <a href="https://khipu.com/terminos">términos</a>
          </>
        }
      />
    );
    const link = screen.getByRole('link', { name: 'términos' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://khipu.com/terminos');
  });
});
