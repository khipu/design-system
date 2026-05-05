/**
 * KdsSpinner - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSpinner } from './KdsSpinner';

describe('KdsSpinner', () => {
  it('renders spinner with default label', () => {
    render(<KdsSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Cargando')).toBeInTheDocument();
  });

  it('renders spinner with custom label', () => {
    render(<KdsSpinner label="Procesando..." />);
    expect(screen.getByText('Procesando...')).toBeInTheDocument();
  });
});
