import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsSelect } from './KdsSelect';

describe('KdsSelect', () => {
  it('renders trigger with placeholder', () => {
    render(
      <KdsSelect placeholder="Seleccionar banco" value="" onValueChange={vi.fn()}>
        <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
      </KdsSelect>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('applies label text', () => {
    render(
      <KdsSelect label="Banco" value="" onValueChange={vi.fn()}>
        <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
      </KdsSelect>
    );
    expect(screen.getByText('Banco')).toBeInTheDocument();
  });

  it('renders with kds-select class', () => {
    const { container } = render(
      <KdsSelect label="Test" value="" onValueChange={vi.fn()}>
        <KdsSelect.Item value="a">A</KdsSelect.Item>
      </KdsSelect>
    );
    expect(container.querySelector('.kds-select')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const { container } = render(
      <KdsSelect label="Test" value="" onValueChange={vi.fn()} error helperText="Required">
        <KdsSelect.Item value="a">A</KdsSelect.Item>
      </KdsSelect>
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(container.querySelector('.kds-select-error')).toBeInTheDocument();
  });
});
