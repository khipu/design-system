import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSelect } from './KdsSelect';

const banks = [
  { value: 'bci', label: 'BCI' },
  { value: 'santander', label: 'Santander' },
];

describe('KdsSelect', () => {
  it('renders the floating label', () => {
    render(<KdsSelect label="Banco" options={banks} />);
    expect(screen.getByText('Banco')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<KdsSelect label="Banco" options={banks} />);
    expect(screen.getByRole('option', { name: 'BCI' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Santander' })).toBeInTheDocument();
  });

  it('renders the placeholder as first option with value=""', () => {
    render(
      <KdsSelect label="Banco" options={banks} placeholder="Selecciona tu banco" />,
    );
    const placeholderOption = screen.getByRole('option', {
      name: 'Selecciona tu banco',
    }) as HTMLOptionElement;
    expect(placeholderOption.value).toBe('');
  });

  it('applies error class on wrapper', () => {
    const { container } = render(
      <KdsSelect label="Banco" options={banks} error helperText="Required" />,
    );
    expect(container.querySelector('.field.invalid')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <KdsSelect
        label="Banco"
        options={banks}
        value=""
        onChange={handleChange}
      />,
    );
    const select = getByRole('combobox') as HTMLSelectElement;
    select.value = 'bci';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders prefix icon when provided', () => {
    const { container } = render(
      <KdsSelect label="Banco" options={banks} prefixIcon="account_balance" />,
    );
    expect(container.querySelector('.field.prefix')).toBeInTheDocument();
    expect(container.querySelector('i.material-symbols-outlined')).toHaveTextContent(
      'account_balance',
    );
  });
});
