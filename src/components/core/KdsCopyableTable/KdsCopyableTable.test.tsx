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
    const btn = screen.getByLabelText('Copiar todo');
    expect(btn).toBeInTheDocument();
    expect(btn.classList.contains('kds-btn')).toBe(true);
    expect(btn.classList.contains('kds-btn-outlined')).toBe(true);
    expect(btn.classList.contains('kds-btn-block')).toBe(true);
    expect(btn.classList.contains('kds-copy-all-btn')).toBe(true);
  });
});
