/**
 * KdsSearchField - Test Suite
 */
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { KdsSearchField } from './KdsSearchField';

describe('KdsSearchField', () => {
  it('renders a search input with the kds-search-field class', () => {
    render(<KdsSearchField placeholder="Buscar banco..." />);
    const input = screen.getByPlaceholderText('Buscar banco...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveClass('kds-search-field');
  });

  it('forwards value and onChange', () => {
    const handleChange = vi.fn();
    render(<KdsSearchField value="banco" onChange={handleChange} placeholder="x" />);
    const input = screen.getByPlaceholderText('x') as HTMLInputElement;
    expect(input.value).toBe('banco');
    fireEvent.change(input, { target: { value: 'estado' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('merges custom className', () => {
    render(<KdsSearchField className="custom" placeholder="x" />);
    expect(screen.getByPlaceholderText('x')).toHaveClass('kds-search-field', 'custom');
  });

  it('forwards the ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<KdsSearchField ref={ref} placeholder="x" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('does not render the search icon by default', () => {
    const { container } = render(<KdsSearchField placeholder="x" />);
    expect(container.querySelector('.kds-search-field-icon')).toBeNull();
  });

  it('renders a search icon when withIcon is set', () => {
    const { container } = render(<KdsSearchField withIcon placeholder="x" />);
    expect(container.querySelector('.kds-search-field-icon')).not.toBeNull();
  });
});
