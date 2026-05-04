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

  it('has copy all button', () => {
    render(<KdsCopyableTable rows={rows} />);
    expect(screen.getByLabelText('Copiar todo')).toBeInTheDocument();
  });
});
