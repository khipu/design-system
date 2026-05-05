import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsCardSelector } from './KdsCardSelector';

describe('KdsCardSelector', () => {
  it('renders title with kds-card-selector class', () => {
    render(<KdsCardSelector title="Transferencia" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-card-selector');
    expect(screen.getByText('Transferencia')).toHaveClass('kds-card-selector-title');
  });

  it('applies selected class', () => {
    render(<KdsCardSelector title="Tarjeta" selected />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-card-selector', 'selected');
  });

  it('renders icon wrapped in kds-card-selector-icon', () => {
    render(<KdsCardSelector title="QR" icon="qr_code" />);
    const iconWrapper = screen.getByText('qr_code').parentElement;
    expect(iconWrapper).toHaveClass('kds-card-selector-icon');
    expect(screen.getByText('qr_code')).toHaveClass('material-symbols-outlined');
  });

  it('renders description when provided', () => {
    render(<KdsCardSelector title="QR" description="Escanea el codigo" />);
    expect(screen.getByText('Escanea el codigo')).toHaveClass('kds-card-selector-description');
  });

  it('does not render description when omitted', () => {
    const { container } = render(<KdsCardSelector title="QR" />);
    expect(container.querySelector('.kds-card-selector-description')).toBeNull();
  });

  it('does not render icon when omitted', () => {
    const { container } = render(<KdsCardSelector title="QR" />);
    expect(container.querySelector('.kds-card-selector-icon')).toBeNull();
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsCardSelector title="Click" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsCardSelector title="Test" className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('kds-card-selector', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsCardSelector ref={ref} title="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
