import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsProgressChecklist,
  type KdsProgressChecklistItem,
  type KdsProgressChecklistStatus,
} from './KdsProgressChecklist';
import { KdsButton } from '../KdsButton';

/**
 * KdsProgressChecklist — lista de pasos que avanzan pendiente → en curso → listo (o error).
 * Pensada para validaciones automáticas, como la "Validación de información comercial" del
 * onboarding de cuenta de cobro.
 *
 * - Pendiente: punto gris y texto `text-secondary`.
 * - En curso: puntos animados (`.kds-dots-loader`, respeta `prefers-reduced-motion`) y
 *   `aria-current="step"`.
 * - Listo: check en `success-main`. Error: ícono `error` en `error-main`.
 * - La lista es `aria-live="polite"`: el lector anuncia los cambios. Cada ítem lleva su
 *   estado como texto oculto (`.kds-progress-checklist-status`), configurable con
 *   `statusLabels` para otros idiomas.
 *
 * Para mostrarla durante una espera, componer con `KdsBottomSheet` (no con un modal
 * centrado) o junto a `KdsSecureLoader`.
 *
 * @css .kds-progress-checklist, .kds-progress-checklist-item(--pending | --active | --done | --error), .kds-progress-checklist-mark, .kds-progress-checklist-dot, .kds-progress-checklist-label, .kds-progress-checklist-status
 */
const meta: Meta<typeof KdsProgressChecklist> = {
  title: 'Components/Feedback/KdsProgressChecklist',
  component: KdsProgressChecklist,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KdsProgressChecklist>;

const LABELS = ['Datos de la empresa', 'Representante legal', 'Evaluación de riesgo'];

const itemsAt = (step: number): KdsProgressChecklistItem[] =>
  LABELS.map((label, i) => ({
    label,
    status: (i < step ? 'done' : i === step ? 'active' : 'pending') as KdsProgressChecklistStatus,
  }));

/** Validación en curso: el primer paso listo, el segundo en curso, el tercero pendiente. */
export const Default: Story = {
  args: { items: itemsAt(1) },
};

/** Todos los estados, incluido el de error. */
export const AllStates: Story = {
  name: 'Todos los estados',
  args: {
    items: [
      { label: 'Datos de la empresa', status: 'done' },
      { label: 'Representante legal', status: 'error' },
      { label: 'Evaluación de riesgo', status: 'active' },
      { label: 'Firma de contrato', status: 'pending' },
    ],
  },
};

/** Simulación de la validación del onboarding: avanza sola cada 1,3 s. */
export const Simulated: Story = {
  name: 'Simulación de validación',
  render: function SimulatedChecklist() {
    const [step, setStep] = useState(0);
    useEffect(() => {
      if (step >= LABELS.length) return undefined;
      const t = setTimeout(() => setStep((s) => s + 1), 1300);
      return () => clearTimeout(t);
    }, [step]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KdsProgressChecklist items={itemsAt(step)} />
        <KdsButton variant="outlined" onClick={() => setStep(0)}>
          Reiniciar
        </KdsButton>
      </div>
    );
  },
};

/**
 * Markup HTML plano y GSP. Para avanzar los estados sin React, cambiar la clase del `<li>`
 * (`--pending` → `--active` → `--done`; son modificadores BEM porque BeerCSS ya tiene `.error`/`.active` globales), su marca y el texto oculto; `aria-current="step"` va solo
 * en el ítem activo.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<ul class="kds-progress-checklist" aria-live="polite">
  <li class="kds-progress-checklist-item kds-progress-checklist-item--done">
    <span class="kds-progress-checklist-mark" aria-hidden="true">
      <i class="material-symbols-outlined">check</i>
    </span>
    <span class="kds-progress-checklist-label">Datos de la empresa</span>
    <span class="kds-progress-checklist-status">: listo</span>
  </li>
  <li class="kds-progress-checklist-item kds-progress-checklist-item--active" aria-current="step">
    <span class="kds-progress-checklist-mark" aria-hidden="true">
      <span class="kds-dots-loader"><span></span><span></span><span></span></span>
    </span>
    <span class="kds-progress-checklist-label">Representante legal</span>
    <span class="kds-progress-checklist-status">: en curso</span>
  </li>
  <li class="kds-progress-checklist-item kds-progress-checklist-item--pending">
    <span class="kds-progress-checklist-mark" aria-hidden="true">
      <span class="kds-progress-checklist-dot"></span>
    </span>
    <span class="kds-progress-checklist-label">Evaluación de riesgo</span>
    <span class="kds-progress-checklist-status">: pendiente</span>
  </li>
</ul>

<!-- GSP: estado inicial desde el servidor; un script cambia las clases a medida que avanza -->
<ul class="kds-progress-checklist" aria-live="polite">
  <g:each in="\${validationSteps}" var="step">
    <li class="kds-progress-checklist-item kds-progress-checklist-item--\${step.status}" \${step.status == 'active' ? 'aria-current="step"' : ''}>
      <span class="kds-progress-checklist-mark" aria-hidden="true">
        <g:if test="\${step.status == 'done'}"><i class="material-symbols-outlined">check</i></g:if>
        <g:elseif test="\${step.status == 'error'}"><i class="material-symbols-outlined">error</i></g:elseif>
        <g:elseif test="\${step.status == 'active'}"><span class="kds-dots-loader"><span></span><span></span><span></span></span></g:elseif>
        <g:else><span class="kds-progress-checklist-dot"></span></g:else>
      </span>
      <span class="kds-progress-checklist-label"><g:message code="\${step.labelCode}"/></span>
      <span class="kds-progress-checklist-status">: <g:message code="validation.status.\${step.status}"/></span>
    </li>
  </g:each>
</ul>`,
      },
    },
  },
  args: { items: itemsAt(1) },
};
