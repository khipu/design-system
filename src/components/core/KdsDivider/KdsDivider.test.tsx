/**
 * KdsDivider - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KdsDivider } from './KdsDivider';

describe('KdsDivider', () => {
  it('renders solid divider by default', () => {
    const { container } = render(<KdsDivider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('kds-hr');
  });

  it('renders dashed divider when dashed prop is true', () => {
    const { container } = render(<KdsDivider dashed />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveClass('kds-hr-dashed');
  });
});
