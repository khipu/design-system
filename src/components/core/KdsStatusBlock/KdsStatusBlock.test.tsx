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

  it('renders status block with description', () => {
    render(
      <KdsStatusBlock
        status="error"
        title="Error"
        description="Something went wrong"
      />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
