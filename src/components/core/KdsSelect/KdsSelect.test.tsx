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

  describe('readOnly', () => {
    it('renders a locked text input with the selected option label instead of a select', () => {
      const { container } = render(
        <KdsSelect label="Banco" options={banks} value="santander" readOnly />,
      );
      expect(screen.queryByRole('combobox')).toBeNull();
      expect(container.firstElementChild).toHaveClass('field', 'label', 'border', 'locked', 'suffix');
      const input = screen.getByLabelText('Banco') as HTMLInputElement;
      expect(input.type).toBe('text');
      expect(input.readOnly).toBe(true);
      expect(input.value).toBe('Santander');
    });

    it('shows the lock icon', () => {
      const { container } = render(
        <KdsSelect label="Banco" options={banks} value="bci" readOnly />,
      );
      const icons = container.querySelectorAll('i.material-symbols-outlined');
      expect(icons[icons.length - 1]).toHaveTextContent('lock');
    });

    it('submits the option value (not the label) through a hidden input carrying the name', () => {
      const { container } = render(
        <KdsSelect label="Banco" name="bank" options={banks} value="santander" readOnly />,
      );
      const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;
      expect(hidden.name).toBe('bank');
      expect(hidden.value).toBe('santander');
      expect((screen.getByLabelText('Banco') as HTMLInputElement).name).toBe('');
    });

    it('resolves the label from defaultValue when uncontrolled', () => {
      render(<KdsSelect label="Banco" options={banks} defaultValue="bci" readOnly />);
      expect((screen.getByLabelText('Banco') as HTMLInputElement).value).toBe('BCI');
    });

    it('keeps the prefix icon first and the required mark', () => {
      const { container } = render(
        <KdsSelect
          label="Banco"
          options={banks}
          value="bci"
          prefixIcon="account_balance"
          required
          readOnly
        />,
      );
      expect(container.firstElementChild).toHaveClass('prefix');
      expect(container.firstElementChild?.firstElementChild).toHaveTextContent('account_balance');
      expect(screen.getByText('Banco *')).toBeInTheDocument();
    });

    it('forwards aria-*, data-* and title to the visible input and form to the hidden one', () => {
      const { container } = render(
        <KdsSelect
          label="Banco"
          name="bank"
          options={banks}
          value="bci"
          aria-label="Banco de recaudación"
          data-testid="bank-field"
          title="Viene de tu banco"
          form="onboarding"
          readOnly
        />,
      );
      const input = screen.getByTestId('bank-field') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-label', 'Banco de recaudación');
      expect(input).toHaveAttribute('title', 'Viene de tu banco');
      expect(input).toHaveAttribute('readonly');
      const hidden = container.querySelector('input[type="hidden"]') as HTMLInputElement;
      expect(hidden).toHaveAttribute('form', 'onboarding');
    });

    it('keeps the visual required mark but not the required attribute (readonly skips validation)', () => {
      render(<KdsSelect label="Banco" options={banks} value="bci" required readOnly />);
      expect(screen.getByText('Banco *')).toBeInTheDocument();
      expect(screen.getByLabelText('Banco *')).not.toBeRequired();
    });

    it('renders an empty locked field when the value is not among the options', () => {
      render(<KdsSelect label="Banco" options={banks} value="itau" readOnly />);
      expect((screen.getByLabelText('Banco') as HTMLInputElement).value).toBe('');
    });

    it('disabled takes precedence and keeps the native select', () => {
      render(<KdsSelect label="Banco" options={banks} value="bci" readOnly disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });
});
