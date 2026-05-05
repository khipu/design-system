import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCopyRow } from './KdsCopyRow';

describe('KdsCopyRow', () => {
  it('renders label and value', () => {
    render(<KdsCopyRow label="RUT" value="12.345.678-9" />);
    expect(screen.getByText('RUT')).toBeInTheDocument();
    expect(screen.getByText('12.345.678-9')).toBeInTheDocument();
  });

  it('has copy button with aria-label', () => {
    render(<KdsCopyRow label="RUT" value="123" />);
    expect(screen.getByLabelText('Copiar RUT')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<KdsCopyRow label="L" value="V" className="extra" />);
    expect(container.firstChild).toHaveClass('kds-copy-row', 'extra');
  });
});
