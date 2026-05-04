/**
 * KdsStepper - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KdsStepper } from './KdsStepper';

describe('KdsStepper', () => {
  it('renders stepper with correct number of steps', () => {
    const { container } = render(<KdsStepper steps={3} current={1} />);
    const stepElements = container.querySelectorAll('.kds-step');
    expect(stepElements).toHaveLength(3);
  });

  it('marks current step correctly', () => {
    const { container } = render(<KdsStepper steps={3} current={1} />);
    const currentStep = container.querySelectorAll('.kds-step')[1];
    expect(currentStep).toHaveClass('current');
  });

  it('marks completed steps correctly', () => {
    const { container } = render(<KdsStepper steps={3} current={2} />);
    const completedSteps = container.querySelectorAll('.kds-step.completed');
    expect(completedSteps).toHaveLength(2);
  });
});
