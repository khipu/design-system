import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsEmptyState } from './KdsEmptyState';

describe('KdsEmptyState', () => {
  it('renders title and description', () => {
    render(<KdsEmptyState title="Sin coincidencias" description="Intenta buscando otro banco" />);
    expect(screen.getByText('Sin coincidencias')).toBeInTheDocument();
    expect(screen.getByText('Intenta buscando otro banco')).toBeInTheDocument();
  });

  it('renders without description', () => {
    render(<KdsEmptyState title="Sin resultados" />);
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  it('uses hide_source icon by default and accepts overrides', () => {
    const { rerender, container } = render(<KdsEmptyState title="T" />);
    expect(container.querySelector('i')).toHaveTextContent('hide_source');
    rerender(<KdsEmptyState title="T" icon="search_off" />);
    expect(container.querySelector('i')).toHaveTextContent('search_off');
  });

  it('announces as status region', () => {
    render(<KdsEmptyState title="Sin coincidencias" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className over the utility classes', () => {
    const { container } = render(<KdsEmptyState title="T" className="extra" />);
    expect(container.firstChild).toHaveClass('kds-empty-state', 'extra');
  });
});
