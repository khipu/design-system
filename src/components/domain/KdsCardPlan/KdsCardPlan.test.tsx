import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCardPlan } from './KdsCardPlan';

describe('KdsCardPlan', () => {
  it('renders title and price', () => {
    render(<KdsCardPlan title="Plan Básico" price="$9.990/mes" />);
    expect(screen.getByText('Plan Básico')).toHaveClass('kds-card-plan-title');
    expect(screen.getByText('$9.990/mes')).toHaveClass('kds-card-plan-price');
  });

  it('applies kds-card-plan class to container', () => {
    render(<KdsCardPlan title="Plan" price="$0" data-testid="plan" />);
    expect(screen.getByTestId('plan')).toHaveClass('kds-card-plan');
  });

  it('renders features list', () => {
    render(
      <KdsCardPlan
        title="Pro"
        price="$19.990/mes"
        features={['Feature A', 'Feature B']}
      />,
    );
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
  });

  it('does not render features when omitted', () => {
    const { container } = render(<KdsCardPlan title="Plan" price="$0" />);
    expect(container.querySelector('.kds-card-plan-features')).toBeNull();
  });

  it('renders recommended badge and class', () => {
    render(<KdsCardPlan title="Premium" price="$29.990/mes" recommended data-testid="plan" />);
    expect(screen.getByTestId('plan')).toHaveClass('kds-card-plan', 'recommended');
    expect(screen.getByText('Recomendado')).toHaveClass('kds-card-plan-badge');
  });

  it('does not render badge when not recommended', () => {
    render(<KdsCardPlan title="Plan" price="$0" />);
    expect(screen.queryByText('Recomendado')).toBeNull();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsCardPlan ref={ref} title="Plan" price="$0" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
