import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { KdsCardPlan, KdsCardPlanGroup } from './KdsCardPlan';

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

  it('renders the optional description right after the price', () => {
    const { container } = render(
      <KdsCardPlan title="Tarifa fija" price="0,0105 UF" description="Incluye descuentos por volumen." />,
    );
    const description = screen.getByText('Incluye descuentos por volumen.');
    expect(description).toHaveClass('kds-card-plan-description');
    expect(container.querySelector('.kds-card-plan-price')?.nextElementSibling).toBe(description);
  });

  it('checkFeatures adds a decorative check per feature', () => {
    const { container } = render(
      <KdsCardPlan title="Full" price="2,9%" features={['API', 'Soporte']} checkFeatures />,
    );
    expect(container.querySelector('.kds-card-plan-features')).toHaveClass('kds-card-plan-features--check');
    const icons = container.querySelectorAll('.kds-card-plan-features li > i');
    expect(icons).toHaveLength(2);
    icons.forEach((i) => expect(i).toHaveAttribute('aria-hidden', 'true'));
    expect(screen.getByText('Soporte')).toBeInTheDocument();
  });

  it('is not selectable without name and value', () => {
    render(<KdsCardPlan title="Plan" price="$0" data-testid="plan" />);
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.getByTestId('plan')).not.toHaveClass('kds-card-plan--selectable');
  });

  describe('selectable', () => {
    it('renders a native radio labelled by the title', () => {
      render(
        <KdsCardPlan title="Full" price="2,9%" name="plan" value="full" data-testid="plan" />,
      );
      expect(screen.getByTestId('plan')).toHaveClass('kds-card-plan', 'kds-card-plan--selectable');
      const radio = screen.getByRole('radio', { name: 'Full' }) as HTMLInputElement;
      expect(radio.name).toBe('plan');
      expect(radio.value).toBe('full');
      expect(radio).toHaveClass('kds-card-plan-radio');
    });

    it('reflects the selected prop', () => {
      render(<KdsCardPlan title="Full" price="2,9%" name="plan" value="full" selected />);
      expect(screen.getByRole('radio', { name: 'Full' })).toBeChecked();
    });

    it('calls onSelectedChange with its value when the title is clicked', () => {
      const onSelectedChange = vi.fn();
      render(
        <KdsCardPlan
          title="Full"
          price="2,9%"
          name="plan"
          value="full"
          selected={false}
          onSelectedChange={onSelectedChange}
        />,
      );
      fireEvent.click(screen.getByText('Full'));
      expect(onSelectedChange).toHaveBeenCalledWith('full');
    });

    it('describes the radio with the price so it is announced with the plan name', () => {
      render(<KdsCardPlan title="Full" price="2,9%" period="transacción" name="plan" value="full" />);
      expect(screen.getByRole('radio', { name: 'Full' })).toHaveAccessibleDescription(
        '2,9%/transacción',
      );
    });

    it('also announces the badge with the option (it is shown above the title)', () => {
      render(
        <KdsCardPlan title="Full" price="2,9%" name="plan" value="full" recommended badgeText="Recomendado" />,
      );
      expect(screen.getByRole('radio', { name: 'Full' })).toHaveAccessibleDescription('2,9% Recomendado');
    });

    it('groups with sibling cards by name (only one checked)', () => {
      render(
        <div>
          <KdsCardPlan title="Tarifa fija" price="0,0105 UF" name="plan" value="fija" />
          <KdsCardPlan title="Full" price="2,9%" name="plan" value="full" />
        </div>,
      );
      fireEvent.click(screen.getByText('Tarifa fija'));
      fireEvent.click(screen.getByText('Full'));
      expect(screen.getByRole('radio', { name: 'Full' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Tarifa fija' })).not.toBeChecked();
    });
  });
});

describe('KdsCardPlanGroup', () => {
  it('renders a labelled radiogroup with the responsive plan grid', () => {
    render(
      <KdsCardPlanGroup label="Plan de cobro" className="custom">
        <KdsCardPlan title="Tarifa fija" price="0,0105 UF" name="plan" value="fija" />
        <KdsCardPlan title="Full" price="2,9%" name="plan" value="full" />
      </KdsCardPlanGroup>,
    );
    const group = screen.getByRole('radiogroup', { name: 'Plan de cobro' });
    expect(group).toHaveClass('kds-card-plan-group', 'custom');
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsCardPlanGroup ref={ref} label="Plan" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
