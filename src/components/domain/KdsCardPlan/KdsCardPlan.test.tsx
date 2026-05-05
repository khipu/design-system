import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCardPlan } from './KdsCardPlan';

describe('KdsCardPlan', () => {
  it('renders title and price', () => {
    render(<KdsCardPlan title="Plan Basico" price="$9.990" />);
    expect(screen.getByText('Plan Basico')).toBeInTheDocument();
    expect(screen.getByText('$9.990')).toBeInTheDocument();
  });

  it('applies kds-card-plan class to container', () => {
    render(<KdsCardPlan title="Plan" price="$0" data-testid="plan" />);
    expect(screen.getByTestId('plan')).toHaveClass('kds-card-plan');
  });

  it('renders period when provided', () => {
    render(<KdsCardPlan title="Plan" price="$9.990" period="mes" />);
    expect(screen.getByText('/mes')).toBeInTheDocument();
  });

  it('renders features list', () => {
    render(
      <KdsCardPlan
        title="Pro"
        price="$19.990"
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

  it('renders recommended class and custom badge text', () => {
    render(
      <KdsCardPlan title="Premium" price="$29.990" recommended badgeText="Mejor opcion" data-testid="plan" />,
    );
    expect(screen.getByTestId('plan')).toHaveClass('kds-card-plan', 'recommended');
    expect(screen.getByText('Mejor opcion')).toHaveClass('kds-card-plan-badge');
  });

  it('does not render badge when not provided', () => {
    render(<KdsCardPlan title="Plan" price="$0" />);
    expect(screen.queryByText('Recomendado')).toBeNull();
  });

  it('renders action node', () => {
    render(
      <KdsCardPlan title="Plan" price="$0" action={<button>Seleccionar</button>} />,
    );
    expect(screen.getByText('Seleccionar')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<KdsCardPlan title="Plan" price="$0" data-testid="plan" className="custom" />);
    expect(screen.getByTestId('plan')).toHaveClass('kds-card-plan', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsCardPlan ref={ref} title="Plan" price="$0" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
