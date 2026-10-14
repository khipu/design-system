import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsFeedbackCard } from './KdsFeedbackCard';
import { KdsSelect } from '../../core/KdsSelect';

/**
 * KdsFeedbackCard — pregunta opcional con un control de respuesta y un botón de envío; al
 * enviar, la card pasa a un agradecimiento en verde. Pensada para la pantalla de éxito del
 * onboarding ("Cuéntanos cómo nos conociste"), donde no debe bloquear ninguna acción.
 *
 * - El control va como `children` (típicamente un `KdsSelect`). El botón se habilita con
 *   `canSubmit` (por ejemplo, cuando hay una opción elegida).
 * - El cambio a "enviado" ocurre dentro de la misma región `aria-live`: el lector lo anuncia.
 * - Textos e ícono configurables (`submitLabel`, `thanksTitle`, `thanksDescription`, `icon`).
 *
 * En GSP la card es un `<form>`: el envío recarga la página con `submitted` y se renderiza
 * el estado de agradecimiento desde el servidor (o se hace por fetch y se reemplaza el HTML).
 *
 * @css .kds-feedback-card, .kds-feedback-card--submitted, .kds-feedback-card-icon, .kds-feedback-card-body, .kds-feedback-card-text, .kds-feedback-card-title, .kds-feedback-card-description
 */
const meta: Meta<typeof KdsFeedbackCard> = {
  title: 'Domain/Feedback/KdsFeedbackCard',
  component: KdsFeedbackCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KdsFeedbackCard>;

/** Same options as the onboarding prototype. */
const OPTIONS = [
  'Google, ChatGPT, Gemini AI u otro buscador',
  'Publicidad en internet',
  'LinkedIn',
  'Instagram',
  'Facebook',
  'Recomendación de un colega',
  'Alianza con un banco',
  'Evento o webinar',
  'Ya uso Khipu',
  'Otro',
].map((label, i) => ({ value: `opt-${i}`, label }));

/** Interactiva: elegir una opción habilita "Enviar"; al enviar aparece el agradecimiento. */
export const Default: Story = {
  render: function DefaultFeedbackCard() {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    return (
      <KdsFeedbackCard
        title="Cuéntanos cómo nos conociste"
        description="Nos ayuda a mejorar cómo llegamos a nuevos clientes."
        canSubmit={value !== ''}
        onSubmit={() => setSubmitted(true)}
        submitted={submitted}
      >
        <KdsSelect
          label="¿Cómo nos conociste?"
          placeholder="Selecciona una opción"
          options={OPTIONS}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </KdsFeedbackCard>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<section class="kds-feedback-card" aria-labelledby="feedback-title" aria-live="polite">
  <span class="kds-feedback-card-icon" aria-hidden="true">
    <i class="material-symbols-outlined">auto_awesome</i>
  </span>
  <div class="kds-feedback-card-body">
    <div class="kds-feedback-card-text">
      <div class="kds-feedback-card-title" id="feedback-title">Cuéntanos cómo nos conociste</div>
      <div class="kds-feedback-card-description">Nos ayuda a mejorar cómo llegamos a nuevos clientes.</div>
    </div>
    <div class="field label border">
      <select id="source" name="source" required>
        <option value="">Selecciona una opción</option>
        <option value="search">Google, ChatGPT, Gemini AI u otro buscador</option>
      </select>
      <label for="source">¿Cómo nos conociste?</label>
    </div>
    <button type="submit" class="kds-btn kds-btn-outlined"><span>Enviar</span></button>
  </div>
</section>

<!-- Enviado -->
<section class="kds-feedback-card kds-feedback-card--submitted" aria-labelledby="feedback-title" aria-live="polite">
  <span class="kds-feedback-card-icon" aria-hidden="true">
    <i class="material-symbols-outlined">check</i>
  </span>
  <div class="kds-feedback-card-body">
    <div class="kds-feedback-card-text">
      <div class="kds-feedback-card-title" id="feedback-title">¡Gracias por contarnos!</div>
      <div class="kds-feedback-card-description">Tu respuesta nos ayuda a llegar a más negocios como el tuyo.</div>
    </div>
  </div>
</section>

<!-- GSP: la card como form; al volver con submitted=true se pinta el agradecimiento -->
<g:form action="saveAcquisitionSource">
  <section class="kds-feedback-card\${submitted ? ' kds-feedback-card--submitted' : ''}"
           aria-labelledby="feedback-title" aria-live="polite">
    <span class="kds-feedback-card-icon" aria-hidden="true">
      <i class="material-symbols-outlined">\${submitted ? 'check' : 'auto_awesome'}</i>
    </span>
    <div class="kds-feedback-card-body">
      <div class="kds-feedback-card-text">
        <div class="kds-feedback-card-title" id="feedback-title">
          <g:message code="\${submitted ? 'feedback.thanks.title' : 'feedback.source.title'}"/>
        </div>
      </div>
      <g:unless test="\${submitted}">
        <mat:select name="source" bean="\${feedback}" value="\${feedback?.source}" from="\${sources}"
                    labelCode="feedback.source.label" noSelection="['': message(code: 'default.select')]"/>
        <mat:button type="outlined" htmlType="submit" text="\${message(code: 'default.send')}"/>
      </g:unless>
    </div>
  </section>
</g:form>`,
      },
    },
  },
};

/** Estado enviado. */
export const Submitted: Story = {
  name: 'Enviado',
  args: {
    title: 'Cuéntanos cómo nos conociste',
    canSubmit: true,
    onSubmit: () => undefined,
    submitted: true,
  },
};
