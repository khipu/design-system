import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsStepper } from './KdsStepper';
import { KdsButton } from '../KdsButton';

/**
 * KdsStepper — indicador de progreso multi-stage usado en onboarding y checkout flows.
 *
 * Layout (spec):
 * - Container: flex space-between, padding 24px 0, bg paper
 * - Línea conectora horizontal: `.kds-stepper::before` (NO un `<div>`)
 * - Step: flex column align-center, flex 1 1 0 (anchura igual entre todos)
 * - Indicator: círculo 40×40 (light-gray pending / info-main current / success-main completed)
 * - Label: 14px, color text-secondary (text-primary cuando current/completed)
 * - Checkmark de completed: `::after { content: "check" }` (Material Symbols 24px white)
 *
 * El componente requiere un container con ancho razonable (≥ 320px) para que la línea
 * conectora horizontal se vea bien — por eso el decorator default le da `width: 480px`.
 *
 * @gsp `mat:stepper` taglib en payment
 */
const meta: Meta<typeof KdsStepper> = {
  title: 'Components/Navigation/KdsStepper',
  component: KdsStepper,
  tags: ['autodocs'],
  // Container fluido (100%) con max-width — ocupa todo el ancho disponible
  // del preview pero no se estira indefinidamente en pantallas anchas.
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stepper con labels visible bajo cada indicador. Flex space-between, conector horizontal vía `::before`, checkmark de completed vía `::after { content: "check" }`. Container fluido (100% con `max-width: 560px`) — requiere ≥ 320px para verse correctamente.',
      },
    },
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 0 },
      description: 'Índice 0-based del step actual.',
    },
    steps: {
      control: 'object',
      description: 'Array de labels (string[]).',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsStepper>;

const DEFAULT_LABELS = ['Seleccionar banco', 'Autorizar pago', 'Confirmar', 'Comprobante'];

/** Segundo paso (índice 1) de cuatro. */
export const Default: Story = {
  args: {
    steps: DEFAULT_LABELS,
    current: 1,
  },
};

/** Primer paso — nada completado todavía. */
export const FirstStep: Story = {
  args: {
    steps: DEFAULT_LABELS,
    current: 0,
  },
};

/** Último paso — todos los anteriores con check verde. */
export const LastStep: Story = {
  args: {
    steps: DEFAULT_LABELS,
    current: 3,
  },
};

/** Tres pasos solamente — el container se reparte equitativamente. */
export const ThreeSteps: Story = {
  args: {
    steps: ['Datos', 'Verificar', 'Listo'],
    current: 1,
  },
};

/**
 * Stepper interactivo con botones Anterior / Siguiente.
 */
export const Interactive: Story = {
  render: function InteractiveStepper() {
    const [current, setCurrent] = useState(0);
    const labels = DEFAULT_LABELS;

    return (
      <div>
        <KdsStepper steps={labels} current={current} />
        <p style={{ textAlign: 'center', margin: '16px 0', fontWeight: 600 }}>
          Paso {current + 1} de {labels.length}: {labels[current]}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          <KdsButton
            variant="outlined"
            onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
            disabled={current === 0}
          >
            Anterior
          </KdsButton>
          <KdsButton
            onClick={() => setCurrent((prev) => Math.min(labels.length - 1, prev + 1))}
            disabled={current === labels.length - 1}
          >
            Siguiente
          </KdsButton>
        </div>
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
 * <div class="kds-stepper">
 *   <div class="kds-step completed">
 *     <div class="kds-step-indicator"></div>
 *     <div class="kds-step-label">Datos</div>
 *   </div>
 *   <div class="kds-step current">
 *     <div class="kds-step-indicator"></div>
 *     <div class="kds-step-label">Banco</div>
 *   </div>
 *   <div class="kds-step">
 *     <div class="kds-step-indicator"></div>
 *     <div class="kds-step-label">Confirmar</div>
 *   </div>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → Stepper` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-stepper">
  <div class="kds-step completed">
    <div class="kds-step-indicator"></div>
    <div class="kds-step-label">Datos</div>
  </div>
  <div class="kds-step current">
    <div class="kds-step-indicator"></div>
    <div class="kds-step-label">Banco</div>
  </div>
  <div class="kds-step">
    <div class="kds-step-indicator"></div>
    <div class="kds-step-label">Confirmar</div>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-stepper">
        <div className="kds-step completed">
          <div className="kds-step-indicator" />
          <div className="kds-step-label">Datos</div>
        </div>
        <div className="kds-step current">
          <div className="kds-step-indicator" />
          <div className="kds-step-label">Banco</div>
        </div>
        <div className="kds-step">
          <div className="kds-step-indicator" />
          <div className="kds-step-label">Confirmar</div>
        </div>
      </div>
    </div>
  ),
};
