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

  it('keeps today markup without the new props (no modifier classes)', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} />);
    expect(container.firstElementChild?.className).toBe('kds-stepper');
  });

  it('marks the current step with aria-current="step"', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} />);
    const steps = container.querySelectorAll('.kds-step');
    expect(steps[1]).toHaveAttribute('aria-current', 'step');
    expect(steps[0]).not.toHaveAttribute('aria-current');
    expect(steps[2]).not.toHaveAttribute('aria-current');
  });

  it('numbered: shows the 1-based number inside each indicator', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} numbered />);
    expect(container.firstElementChild).toHaveClass('kds-stepper', 'kds-stepper--numbered');
    const numbers = [...container.querySelectorAll('.kds-step-indicator')].map((i) => i.textContent);
    expect(numbers).toEqual(['1', '2', '3']);
  });

  it('color="primary" adds the primary modifier', () => {
    const { container } = render(<KdsStepper steps={STEPS} current={1} color="primary" />);
    expect(container.firstElementChild).toHaveClass('kds-stepper--primary');
  });

  it('currentLabelOnly adds the modifier and keeps every label in the DOM', () => {
    const { container, getByText } = render(
      <KdsStepper steps={STEPS} current={1} currentLabelOnly />,
    );
    expect(container.firstElementChild).toHaveClass('kds-stepper--current-label');
    STEPS.forEach((s) => expect(getByText(s)).toBeInTheDocument());
  });
});
