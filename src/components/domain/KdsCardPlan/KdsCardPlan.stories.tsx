import type { Meta, StoryObj } from '@storybook/react';
import { KdsCardPlan } from './KdsCardPlan';
import { KdsButton } from '../../core/KdsButton';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsCardPlan> = {
  title: 'Domain/KdsCardPlan',
  component: KdsCardPlan,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof KdsCardPlan>;

/**
 * Plan basico con funcionalidades limitadas.
 */
export const Default: Story = {
  render: function DefaultCardPlan() {
    return (
      <div style={{ width: 300 }}>
        <KdsCardPlan
          title="Plan Basico"
          price="$9.990"
          period="mes"
          features={['Hasta 50 cobros', 'Soporte por email', 'Dashboard basico']}
          action={
            <KdsButton variant="outlined" fullWidth>
              Seleccionar
            </KdsButton>
          }
        />
      </div>
    );
  },
};

/**
 * Plan recomendado con badge destacado.
 */
export const Recommended: Story = {
  render: function RecommendedCardPlan() {
    return (
      <div style={{ width: 300 }}>
        <KdsCardPlan
          title="Plan Pro"
          price="$29.990"
          period="mes"
          recommended={true}
          badgeText="Recomendado"
          features={[
            'Cobros ilimitados',
            'Soporte prioritario',
            'Dashboard avanzado',
            'Reportes personalizados',
            'API de integracion',
          ]}
          action={
            <KdsButton variant="primary" fullWidth>
              Seleccionar
            </KdsButton>
          }
        />
      </div>
    );
  },
};

/**
 * Grilla con tres planes lado a lado.
 */
export const PlanGrid: Story = {
  render: function PlanGridExample() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: spacing[2],
          maxWidth: 900,
        }}
      >
        <KdsCardPlan
          title="Plan Basico"
          price="$9.990"
          period="mes"
          features={['Hasta 50 cobros', 'Soporte por email', 'Dashboard basico']}
          action={
            <KdsButton variant="outlined" fullWidth>
              Seleccionar
            </KdsButton>
          }
        />
        <KdsCardPlan
          title="Plan Pro"
          price="$29.990"
          period="mes"
          recommended={true}
          badgeText="Recomendado"
          features={[
            'Cobros ilimitados',
            'Soporte prioritario',
            'Dashboard avanzado',
            'Reportes personalizados',
          ]}
          action={
            <KdsButton variant="primary" fullWidth>
              Seleccionar
            </KdsButton>
          }
        />
        <KdsCardPlan
          title="Plan Enterprise"
          price="$89.990"
          period="mes"
          features={[
            'Todo lo del Plan Pro',
            'SLA garantizado',
            'Ejecutivo dedicado',
            'Integracion a medida',
            'Facturacion personalizada',
          ]}
          action={
            <KdsButton variant="outlined" fullWidth>
              Contactar ventas
            </KdsButton>
          }
        />
      </div>
    );
  },
};
