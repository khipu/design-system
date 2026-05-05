import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsTextField } from './KdsTextField';

describe('KdsTextField', () => {
  it('renders with BeerCSS field classes', () => {
    const { container } = render(<KdsTextField label="Name" />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('field', 'label', 'border');
  });

  it('renders label after input (BeerCSS requirement)', () => {
    const { container } = render(<KdsTextField label="Email" />);
    const input = container.querySelector('input');
    const label = container.querySelector('label');
    expect(input).toBeTruthy();
    expect(label).toBeTruthy();
    // Label must come AFTER input for BeerCSS floating label to work
    expect(input!.compareDocumentPosition(label!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('adds placeholder=" " for floating label CSS', () => {
    render(<KdsTextField label="Test" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', ' ');
  });

  it('renders error state with invalid class', () => {
    const { container } = render(<KdsTextField label="RUT" error helperText="Inválido" />);
    expect(container.firstElementChild).toHaveClass('invalid');
    expect(screen.getByText('Inválido')).toBeInTheDocument();
  });

  it('renders readonly state with lock icon', () => {
    const { container } = render(<KdsTextField label="Amount" readOnly value="$1.000" />);
    expect(container.firstElementChild).toHaveClass('locked');
    expect(container.querySelector('.material-symbols-outlined')).toHaveTextContent('lock');
  });

  it('renders start icon', () => {
    render(<KdsTextField label="Search" startIcon="search" />);
    expect(screen.getByText('search')).toHaveClass('material-symbols-outlined');
  });

  it('forwards ref to input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<KdsTextField label="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
