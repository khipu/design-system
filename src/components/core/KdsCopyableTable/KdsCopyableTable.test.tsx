import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCopyableTable } from './KdsCopyableTable';

describe('KdsCopyableTable', () => {
  const rows = [
    { label: 'Banco', value: 'BCI' },
    { label: 'Cuenta', value: '12345' },
  ];

  it('renders all rows', () => {
    render(<KdsCopyableTable rows={rows} />);
    expect(screen.getByText('Banco')).toBeInTheDocument();
    expect(screen.getByText('BCI')).toBeInTheDocument();
    expect(screen.getByText('Cuenta')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
  });

  it('has copy all button with bundle classes', () => {
    render(<KdsCopyableTable rows={rows} />);
    const btn = screen.getByLabelText('Copiar todos los datos');
    expect(btn).toBeInTheDocument();
    expect(btn.classList.contains('kds-btn')).toBe(true);
    expect(btn.classList.contains('kds-btn-outlined')).toBe(true);
    expect(btn.classList.contains('kds-btn-block')).toBe(true);
    expect(btn.classList.contains('kds-copy-all-btn')).toBe(true);
  });

  describe('grid variant', () => {
    const gridRows = [
      ['Banco Security', '$3.300'],
      ['Banco de Chile', '$5.100'],
    ];

    it('renders all grid cells', () => {
      render(<KdsCopyableTable variant="grid" gridRows={gridRows} />);
      expect(screen.getByText('Banco Security')).toBeInTheDocument();
      expect(screen.getByText('$3.300')).toBeInTheDocument();
      expect(screen.getByText('Banco de Chile')).toBeInTheDocument();
      expect(screen.getByText('$5.100')).toBeInTheDocument();
      expect(screen.getAllByTestId('kds-grid-row')).toHaveLength(2);
    });

    it('does not render the copy-all button in grid mode', () => {
      render(<KdsCopyableTable variant="grid" gridRows={gridRows} />);
      expect(screen.queryByLabelText('Copiar todos los datos')).not.toBeInTheDocument();
    });

    it('does not give grid rows a button role', () => {
      render(<KdsCopyableTable variant="grid" gridRows={gridRows} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('applies disabled modifier to cells when disabled', () => {
      render(<KdsCopyableTable variant="grid" gridRows={gridRows} disabled />);
      const cell = screen.getByText('Banco Security');
      expect(cell.classList.contains('kds-grid-cell--disabled')).toBe(true);
    });

    it('does not apply disabled modifier by default', () => {
      render(<KdsCopyableTable variant="grid" gridRows={gridRows} />);
      const cell = screen.getByText('Banco Security');
      expect(cell.classList.contains('kds-grid-cell--disabled')).toBe(false);
    });
  });

  it('keeps copyable mode intact by default (renders rows + copy-all button)', () => {
    render(<KdsCopyableTable rows={rows} />);
    expect(screen.getByText('Banco')).toBeInTheDocument();
    expect(screen.getByLabelText('Copiar todos los datos')).toBeInTheDocument();
    expect(screen.queryByTestId('kds-grid-row')).not.toBeInTheDocument();
  });
});
