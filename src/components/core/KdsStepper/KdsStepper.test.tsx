/**
 * KdsStepper - Test Suite
 */
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

  describe('steps as objects (configurable flows)', () => {
    it('renders the same classes as strings when statuses come from current', () => {
      const { container } = render(
        <KdsStepper steps={[{ label: 'Perfil' }, { label: 'Verificación' }, { label: 'Plan' }]} current={1} />,
      );
      const steps = container.querySelectorAll('.kds-step');
      expect(steps[0]).toHaveClass('completed');
      expect(steps[1]).toHaveClass('current');
      expect(steps[1]).toHaveAttribute('aria-current', 'step');
      expect(steps[2]).not.toHaveClass('completed', 'current');
    });

    it('an explicit status wins and allows non-linear progress', () => {
      const { container } = render(
        <KdsStepper
          steps={[
            { label: 'Perfil', status: 'completed' },
            { label: 'Verificación', status: 'current' },
            { label: 'Información comercial', status: 'completed' },
            { label: 'Plan', status: 'skipped' },
          ]}
        />,
      );
      const steps = container.querySelectorAll('.kds-step');
      expect(steps[1]).toHaveClass('current');
      expect(steps[2]).toHaveClass('completed');
      expect(steps[3]).toHaveClass('skipped');
      expect(screen.getByText(', omitido')).toHaveClass('kds-step-status');
    });

    it('shows the optional mark under the label', () => {
      render(<KdsStepper steps={[{ label: 'Contactos', optional: true }]} current={0} />);
      expect(screen.getByText('Opcional')).toHaveClass('kds-step-optional');
    });

    it('a completed step with href is a link named by its label and status', () => {
      const { container } = render(
        <KdsStepper
          steps={[{ label: 'Perfil del comercio', href: '/onboarding/perfil' }, { label: 'Verificación' }]}
          current={1}
        />,
      );
      const link = screen.getByRole('link', { name: 'Perfil del comercio, completado' });
      expect(link).toHaveAttribute('href', '/onboarding/perfil');
      expect(link).toHaveClass('kds-step-link');
      expect(container.querySelector('.kds-step')).toHaveClass('kds-step--interactive');
      // The visible label is not read twice.
      expect(container.querySelector('.kds-step-label')).toHaveAttribute('aria-hidden', 'true');
    });

    it('a completed step with onClick is a button', () => {
      const onClick = vi.fn();
      render(<KdsStepper steps={[{ label: 'Perfil', onClick }, { label: 'Plan' }]} current={1} />);
      fireEvent.click(screen.getByRole('button', { name: 'Perfil, completado' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('the current and pending steps are never links', () => {
      render(
        <KdsStepper
          steps={[
            { label: 'Perfil', href: '/a' },
            { label: 'Plan', href: '/b' },
          ]}
          current={0}
        />,
      );
      expect(screen.queryByRole('link')).toBeNull();
    });

    it('statusLabels translates the texts', () => {
      render(
        <KdsStepper
          steps={[{ label: 'Profile', status: 'skipped', optional: true }]}
          statusLabels={{ skipped: 'skipped', optional: 'Optional' }}
        />,
      );
      expect(screen.getByText('Optional')).toBeInTheDocument();
      expect(screen.getByText(', skipped')).toBeInTheDocument();
    });
  });
});
