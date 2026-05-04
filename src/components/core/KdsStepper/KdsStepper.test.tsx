/**
 * KdsStepper - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KdsStepper } from './KdsStepper';

describe('KdsStepper', () => {
  it('renders correct number of steps', () => {
    const { container } = render(<KdsStepper steps={4} current={1} />);
    const steps = container.querySelectorAll('.kds-step');
    expect(steps).toHaveLength(4);
  });

  it('marks current step correctly', () => {
    const { container } = render(<KdsStepper steps={3} current={1} />);
    const currentStep = container.querySelector('.kds-step.current');
    expect(currentStep).toBeInTheDocument();
  });
});
