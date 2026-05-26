/**
 * KdsStepper - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KdsStepper } from './KdsStepper';

const STEPS = ['A', 'B', 'C'];

describe('KdsStepper', () => {
  it('renders stepper with correct number of steps', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} />);
    const stepElements = container.querySelectorAll('.kds-step');
    expect(stepElements).toHaveLength(3);
  });

  it('marks current step correctly', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} />);
    const currentStep = container.querySelectorAll('.kds-step')[1];
    expect(currentStep).toHaveClass('current');
  });

  it('marks completed steps correctly', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={2} />);
    const completedSteps = container.querySelectorAll('.kds-step.completed');
    expect(completedSteps).toHaveLength(2);
  });

  it('renders step labels', () => {
    const { getByText } = render(<KdsStepper steps={STEPS} current={0} />);
    expect(getByText('A')).toBeInTheDocument();
    expect(getByText('B')).toBeInTheDocument();
    expect(getByText('C')).toBeInTheDocument();
  });

  it('renders empty indicator divs (no inline text)', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} />);
    const indicators = container.querySelectorAll('.kds-step-indicator');
    indicators.forEach((ind) => expect(ind.textContent).toBe(''));
  });
});
