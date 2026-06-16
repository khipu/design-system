import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  describe('revealable (password toggle)', () => {
    it('renders an accessible toggle and starts hidden (type=password)', () => {
      const { container } = render(<KdsTextField label="Contraseña" revealable />);
      const input = container.querySelector('input')!;
      const toggle = screen.getByRole('button', { name: 'Mostrar u ocultar contraseña' });
      expect(input).toHaveAttribute('type', 'password');
      expect(toggle).toHaveClass('kds-field-reveal');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      expect(container.firstElementChild).toHaveClass('suffix');
    });

    it('toggles input visibility on click', () => {
      const { container } = render(<KdsTextField label="Contraseña" revealable />);
      const input = container.querySelector('input')!;
      const toggle = screen.getByRole('button');
      fireEvent.click(toggle);
      expect(input).toHaveAttribute('type', 'text');
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      fireEvent.click(toggle);
      expect(input).toHaveAttribute('type', 'password');
    });

    it('toggles with keyboard (Enter / Space)', () => {
      const { container } = render(<KdsTextField label="Contraseña" revealable />);
      const input = container.querySelector('input')!;
      const toggle = screen.getByRole('button');
      fireEvent.keyDown(toggle, { key: 'Enter' });
      expect(input).toHaveAttribute('type', 'text');
      fireEvent.keyDown(toggle, { key: ' ' });
      expect(input).toHaveAttribute('type', 'password');
    });

    it('supports a custom revealLabel for i18n', () => {
      render(<KdsTextField label="Clave" revealable revealLabel="Ver clave" />);
      expect(screen.getByRole('button', { name: 'Ver clave' })).toBeInTheDocument();
    });

    it('renders no toggle when not revealable', () => {
      render(<KdsTextField label="Email" />);
      expect(screen.queryByRole('button')).toBeNull();
    });

    it('readOnly takes precedence: no toggle, shows lock', () => {
      const { container } = render(<KdsTextField label="Clave" revealable readOnly value="x" />);
      expect(screen.queryByRole('button')).toBeNull();
      expect(container.querySelector('.material-symbols-outlined')).toHaveTextContent('lock');
    });

    it('disabled renders no interactive toggle', () => {
      render(<KdsTextField label="Clave" revealable disabled />);
      expect(screen.queryByRole('button')).toBeNull();
    });
  });

  describe('requiredMark', () => {
    it('shows the " *" mark when required (default)', () => {
      const { container } = render(<KdsTextField label="Email" required />);
      expect(container.querySelector('label')?.textContent).toBe('Email *');
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('keeps the required attribute but hides the mark with requiredMark={false}', () => {
      const { container } = render(<KdsTextField label="RUT" required requiredMark={false} />);
      expect(screen.getByRole('textbox')).toBeRequired();
      expect(container.querySelector('label')?.textContent).toBe('RUT');
    });
  });
});
