import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KdsFab } from './KdsFab';

describe('KdsFab', () => {
  it('renders an icon-only button with the accessible label and default top-right position', () => {
    render(<KdsFab icon="close" aria-label="Cancelar pago" />);
    const btn = screen.getByRole('button', { name: 'Cancelar pago' });
    expect(btn).toHaveClass('kds-fab', 'kds-fab--top-right');
    expect(btn.querySelector('i.material-symbols-outlined')?.textContent).toBe('close');
  });

  it('applies the hidden state (class + aria-hidden + removed from tab order)', () => {
    // aria-hidden pulls it from the a11y tree, so query the DOM node directly.
    const { container } = render(<KdsFab icon="close" aria-label="Cancelar pago" hidden />);
    const btn = container.querySelector<HTMLButtonElement>('button.kds-fab');
    expect(btn).not.toBeNull();
    expect(btn).toHaveClass('kds-fab--hidden');
    expect(btn).toHaveAttribute('aria-hidden', 'true');
    expect(btn).toHaveAttribute('tabindex', '-1');
  });

  it('omits the position class when position is "none"', () => {
    render(<KdsFab icon="close" aria-label="Cancelar pago" position="none" />);
    const btn = screen.getByRole('button', { name: 'Cancelar pago' });
    expect(btn).toHaveClass('kds-fab');
    expect(btn.className).not.toMatch(/kds-fab--/);
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<KdsFab icon="close" aria-label="Cancelar pago" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar pago' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
