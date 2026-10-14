import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsCardPlan, KdsCardPlanGroup } from './KdsCardPlan';
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
  title: 'Domain/Selection/KdsCardPlan',
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

const onboardingFeatures = [
  'Transferencias desde todos los bancos',
  'Webpay Crédito y Redcompra',
  'App de pagos',
  'API de integración',
  'Plugins para e-commerce',
  'Plugins para aplicaciones móviles',
  'Cobros por links, emails y redes sociales',
  'Herramienta de auditoría',
  'Soporte',
  'Informes diarios y mensuales',
];

/**
 * Selección de plan — con `name` + `value` la card se vuelve una opción de radio:
 * renderiza un `<input type="radio" class="kds-card-plan-radio">` arriba a la derecha y el
 * título pasa a ser su `<label>`, estirado sobre toda la card (cualquier click la elige).
 *
 * - Las cards con el mismo `name` forman un grupo nativo: flechas del teclado, un solo
 *   elegido y envío en el form, sin JS.
 * - El estado elegido sale de CSS (`:has(.kds-card-plan-radio:checked)`): borde y fondo
 *   suave en `--primary`. En GSP no hay que togglear clases.
 * - En modo seleccionable `recommended` deja solo el badge: el borde queda reservado para
 *   la selección, si no la recomendada parecería elegida de antemano.
 * - El grupo va en `KdsCardPlanGroup` (`role="radiogroup"` + `aria-label`, grilla de 1 columna
 *   tantas como quepan en su propio ancho). En HTML/GSP: un `div.kds-card-plan-group` con esos atributos.
 * - El radio se describe con el precio (`aria-describedby`): el lector anuncia
 *   "Full, 2,9%/transacción" y no solo el título.
 * - Sin soporte de `:has` (navegadores previos a 2023) la card no se pinta al elegirla:
 *   el radio muestra la elección y su propio anillo de foco.
 *
 * Contrato HTML y ejemplo GSP en el panel de código.
 */
export const Selectable: Story = {
  name: 'Seleccionable',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-plan-group" role="radiogroup" aria-label="Plan de cobro">
  <div class="kds-card-plan kds-card-plan--selectable">
    <input type="radio" class="kds-card-plan-radio" id="plan-fija" name="plan" value="fija"
           aria-describedby="plan-fija-price"/>
    <div class="kds-card-plan-header">
      <h3><label for="plan-fija">Tarifa fija</label></h3>
    </div>
    <div class="kds-card-plan-price" id="plan-fija-price">
      <span class="kds-price">0,0105 UF + IVA por transacción</span>
    </div>
    <div class="kds-card-plan-description">Incluye descuentos por volumen.</div>
    <ul class="kds-card-plan-features kds-card-plan-features--check">
      <li><i class="material-symbols-outlined" aria-hidden="true">check</i>Transferencias desde todos los bancos</li>
      <li><i class="material-symbols-outlined" aria-hidden="true">check</i>API de integración</li>
    </ul>
  </div>

  <div class="kds-card-plan kds-card-plan--selectable recommended">
    <input type="radio" class="kds-card-plan-radio" id="plan-full" name="plan" value="full" checked
           aria-describedby="plan-full-price plan-full-badge"/>
    <div class="kds-card-plan-header">
      <h3><label for="plan-full">Full</label></h3>
    </div>
    <div class="kds-card-plan-price" id="plan-full-price">
      <span class="kds-price">2,9% + IVA por transacción</span>
    </div>
    <!-- En las cards seleccionables el badge sube arriba del título (order: -1) -->
    <span class="kds-card-plan-badge" id="plan-full-badge">Recomendado</span>
    <ul class="kds-card-plan-features kds-card-plan-features--check">
      <li><i class="material-symbols-outlined" aria-hidden="true">check</i>Transferencias desde todos los bancos</li>
      <li><i class="material-symbols-outlined" aria-hidden="true">check</i>API de integración</li>
    </ul>
  </div>
</div>

<!-- GSP (payment): un solo form, el plan elegido viaja como "plan" -->
<g:form action="selectPlan">
  <div class="kds-card-plan-group" role="radiogroup" aria-label="\${message(code: 'plan.select.label')}">
    <g:each in="\${plans}" var="plan">
      <div class="kds-card-plan kds-card-plan--selectable\${plan.recommended ? ' recommended' : ''}">
        <input type="radio" class="kds-card-plan-radio" id="plan-\${plan.code}" name="plan"
               value="\${plan.code}"\${plan.code == selectedPlan ? ' checked' : ''}
               aria-describedby="plan-\${plan.code}-price\${plan.recommended ? ' plan-' + plan.code + '-badge' : ''}"/>
        <div class="kds-card-plan-header">
          <h3><label for="plan-\${plan.code}">\${plan.name}</label></h3>
        </div>
        <div class="kds-card-plan-price" id="plan-\${plan.code}-price">
          <span class="kds-price">\${plan.feeDescription}</span>
        </div>
        <g:if test="\${plan.description}">
          <div class="kds-card-plan-description">\${plan.description}</div>
        </g:if>
        <g:if test="\${plan.recommended}">
          <span class="kds-card-plan-badge" id="plan-\${plan.code}-badge"><g:message code="plan.recommended"/></span>
        </g:if>
        <ul class="kds-card-plan-features kds-card-plan-features--check">
          <g:each in="\${plan.features}" var="feature">
            <li><i class="material-symbols-outlined" aria-hidden="true">check</i>\${feature}</li>
          </g:each>
        </ul>
      </div>
    </g:each>
  </div>
  <mat:button type="primary" htmlType="submit" text="\${message(code: 'default.continue')}"/>
</g:form>`,
      },
    },
  },
  render: function SelectableCardPlans() {
    const [plan, setPlan] = useState('full');
    // Unique per instance: the docs page renders this story twice in one document.
    const groupName = useId();
    return (
      <KdsCardPlanGroup label="Plan de cobro" style={{ maxWidth: 720 }}>
        <KdsCardPlan
          name={groupName}
          value="fija"
          selected={plan === 'fija'}
          onSelectedChange={setPlan}
          title="Tarifa fija"
          price="0,0105 UF + IVA por transacción"
          description="Incluye descuentos por volumen."
          features={onboardingFeatures}
          checkFeatures
        />
        <KdsCardPlan
          name={groupName}
          value="full"
          selected={plan === 'full'}
          onSelectedChange={setPlan}
          recommended
          badgeText="Recomendado"
          title="Full"
          price="2,9% + IVA por transacción"
          features={onboardingFeatures}
          checkFeatures
        />
      </KdsCardPlanGroup>
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
