/**
 * KdsStatusBlock - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsStatusBlock } from './KdsStatusBlock';

describe('KdsStatusBlock', () => {
  it('renders status block with title', () => {
    render(<KdsStatusBlock status="success" title="Payment successful" />);
    expect(screen.getByText('Payment successful')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <KdsStatusBlock 
        status="success" 
        title="Done" 
        description="Transaction completed" 
      />
    );
    expect(screen.getByText('Transaction completed')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(
      <KdsStatusBlock 
        status="success" 
        title="Done" 
        icon="check_circle" 
      />
    );
    expect(screen.getByText('check_circle')).toBeInTheDocument();
  });
});
