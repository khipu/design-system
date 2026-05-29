import type { Meta, StoryObj } from '@storybook/react';
import { KdsCardPlan } from './KdsCardPlan';
import { KdsButton } from '../../core/KdsButton';
import { spacing } from '../../../tokens';

/**
 * KdsCardPlan — card de plan/pricing para flujos de suscripción.
 *
 * Layout & sizing (spec):
 * - `padding: 32px` (`var(--kds-spacing-4)`)
 * - `gap: 16px` (`var(--kds-spacing-2)`) entre secciones internas
 * - `max-width: 400px`
 * - `border: 2px solid var(--kds-border-medium)`
 * - `border-radius: var(--kds-radius-lg)`
 *
 * Header / Title:
 * - h3 con `font-size: heading3`, `font-weight: semibold`
 *
 * Price section:
 * - `padding: 32px 0`, `min-height: 88px`
 * - Price font: `font-size: 3xl` (~32px), `font-weight: 700`
 * - Period (`/mes`): `font-size: lg`, color text-secondary
 *
 * Features list:
 * - `<ul class="kds-card-plan-features">` — li con check icon
 * - gap entre features: `12px`
 *
 * Badge (cuando `recommended`):
 * - Position absolute: `top: -12px; right: 48px`
 * - `padding: 8px 32px`
 * - `background: var(--kds-color-primary-main)`, color white
 *
 * Estados:
 * - Hover: `transform: translateY(-2px)` + shadow elevation-2
 * - `recommended`: border purple + gradient bg suave + shadow más fuerte
 *
 * Grid responsive:
 * - `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
 *
 * **Nota**: Este componente es para flows de marketing/billing — NO se usa en payment flow.
 *
 * @css .kds-card-plan, .kds-card-plan-badge, .kds-card-plan-header, .kds-card-plan-price, .kds-card-plan-features, .kds-card-plan.recommended
 */
const meta: Meta<typeof KdsCardPlan> = {
  title: 'Domain/KdsCardPlan',
  component: KdsCardPlan,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card de pricing/plan para suscripciones. Padding 32px, max-width 400px, border 2px, radius lg. Header (heading3 semibold) + price section (3xl bold, padding-y 32px, min-height 88px) + features list (gap 12px) + action. Estado `recommended` agrega badge absolute (top -12px right 48px), gradient bg suave, hover translateY -2px.',
      },
    },
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

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-card-plan recommended">
 *   <span class="kds-card-plan-badge">Recomendado</span>
 *   <div class="kds-card-plan-header">
 *     <h3>Plan Pro</h3>
 *   </div>
 *   <div class="kds-card-plan-price">
 *     <span class="kds-price">$29.990</span>
 *     <span class="kds-price-period">/mes</span>
 *   </div>
 *   <ul class="kds-card-plan-features">
 *     <li>Hasta 1000 transacciones/mes</li>
 *     <li>Soporte prioritario</li>
 *   </ul>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → CardPlan` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-plan recommended">
  <span class="kds-card-plan-badge">Recomendado</span>
  <div class="kds-card-plan-header">
    <h3>Plan Pro</h3>
  </div>
  <div class="kds-card-plan-price">
    <span class="kds-price">$29.990</span>
    <span class="kds-price-period">/mes</span>
  </div>
  <ul class="kds-card-plan-features">
    <li>Hasta 1000 transacciones/mes</li>
    <li>Soporte prioritario</li>
    <li>Reportes avanzados</li>
  </ul>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-card-plan recommended">
        <span className="kds-card-plan-badge">Recomendado</span>
        <div className="kds-card-plan-header">
          <h3>Plan Pro</h3>
        </div>
        <div className="kds-card-plan-price">
          <span className="kds-price">$29.990</span>
          <span className="kds-price-period">/mes</span>
        </div>
        <ul className="kds-card-plan-features">
          <li>Hasta 1000 transacciones/mes</li>
          <li>Soporte prioritario</li>
          <li>Reportes avanzados</li>
        </ul>
      </div>
    </div>
  ),
};
