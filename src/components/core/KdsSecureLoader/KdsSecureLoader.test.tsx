/**
 * KdsSecureLoader - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSecureLoader } from './KdsSecureLoader';

describe('KdsSecureLoader', () => {
  it('renders the spinner with status role', () => {
    render(<KdsSecureLoader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders title and message when provided', () => {
    render(<KdsSecureLoader title="Conectando" message="Iniciando una conexión segura" />);
    expect(screen.getByText('Conectando')).toBeInTheDocument();
    expect(screen.getByText('Iniciando una conexión segura')).toBeInTheDocument();
  });

  it('omits the text block when no title or message is given', () => {
    const { container } = render(<KdsSecureLoader />);
    expect(container.querySelector('.kds-secure-loader-text')).toBeNull();
  });
});
