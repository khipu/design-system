import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsConsentCard, type KdsConsentSection } from './KdsConsentCard';
import { KdsMerchantTile } from '../KdsMerchantTile';
import { KdsSecureFooter } from '../KdsSecureFooter';

/**
 * KdsConsentCard — autorización de acceso: "Khipu solicita acceso a {banco}", qué datos se
 * piden, por cuánto tiempo y para qué, y los botones Autorizar / Rechazar. Es la pantalla que
 * ve el usuario después de ingresar a su banca en línea durante el onboarding.
 *
 * - Las secciones y sus textos vienen del consumidor (`sections`): los textos legales de
 *   finalidad y vigencia no viven en el DS. **Validarlos con Legal/Cumplimiento** antes de
 *   usarlos (tratamiento de datos personales, Ley 21.719).
 * - `loading` muestra "Autorizando" con spinner y deshabilita ambas acciones (sin doble envío).
 * - Títulos como `div[role=heading]` (nivel 2 la card, nivel 3 cada sección); cada sección es
 *   un `role="group"` con nombre. Íconos decorativos.
 * - `heading` reemplaza el título por defecto (otro idioma); `acceptLabel`, `rejectLabel` y
 *   `loadingLabel` para los botones.
 * - El footer seguro va **fuera** de la card, como hermano bajo `.kds-screen`: dentro de una
 *   `.kds-card-elevated` queda oculto por diseño.
 *
 * @css .kds-consent-card, .kds-consent-card-header, .kds-consent-card-logo, .kds-consent-card-title, .kds-consent-card-subtitle, .kds-consent-card-body, .kds-consent-card-section, .kds-consent-card-section-title, .kds-consent-card-items, .kds-consent-card-item, .kds-consent-card-actions
 */
const meta: Meta<typeof KdsConsentCard> = {
  title: 'Domain/Onboarding/KdsConsentCard',
  component: KdsConsentCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof KdsConsentCard>;

const SECTIONS: KdsConsentSection[] = [
  {
    title: 'Datos solicitados',
    items: [
      { icon: 'check_circle', text: 'Identidad del titular de la cuenta bancaria' },
      { icon: 'check_circle', text: 'Información de la cuenta bancaria' },
    ],
  },
  {
    title: 'Vigencia de la autorización',
    items: [{ icon: 'schedule', text: '12 meses (revocable)' }],
  },
  {
    title: 'Finalidad',
    items: [
      { icon: 'verified', text: 'Validación de datos bancarios' },
      { icon: 'verified', text: 'Validación de transacciones de pago' },
      { icon: 'verified', text: 'Evaluación de riesgo de tu negocio' },
    ],
  },
];

/** Pantalla completa: card + footer seguro afuera, como hermano bajo `.kds-screen`. */
export const Default: Story = {
  render: function DefaultConsent() {
    const [loading, setLoading] = useState(false);
    return (
      <div className="kds-screen active" style={{ maxWidth: 460, margin: '0 auto' }}>
        <KdsConsentCard
          requester="Khipu"
          resource="Banco Santander"
          subtitle="Revisa la información solicitada para autorizar o rechazar su uso"
          logo={<KdsMerchantTile name="Khipu" initials="K" />}
          sections={SECTIONS}
          loading={loading}
          onAccept={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
          onReject={() => undefined}
        />
        <KdsSecureFooter>Operado por</KdsSecureFooter>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-screen active">
  <section class="kds-card-elevated kds-consent-card" aria-labelledby="consent-title">
    <div class="kds-consent-card-header">
      <div class="kds-consent-card-logo"><!-- KdsMerchantTile / logo --></div>
      <div class="kds-consent-card-title" role="heading" aria-level="2" id="consent-title">
        <strong>Khipu</strong> solicita acceso a <strong>Banco Santander</strong>
      </div>
      <div class="kds-consent-card-subtitle">Revisa la información solicitada para autorizar o rechazar su uso</div>
    </div>
    <div class="kds-consent-card-body">
      <div class="kds-consent-card-section" role="group" aria-labelledby="consent-s0">
        <div class="kds-consent-card-section-title" role="heading" aria-level="3" id="consent-s0">Datos solicitados</div>
        <ul class="kds-consent-card-items">
          <li class="kds-consent-card-item">
            <i class="material-symbols-outlined" aria-hidden="true">check_circle</i>
            <span>Identidad del titular de la cuenta bancaria</span>
          </li>
        </ul>
      </div>
      <!-- …Vigencia de la autorización, Finalidad -->
      <div class="kds-consent-card-actions">
        <button type="submit" name="decision" value="accept" class="kds-btn kds-btn-primary kds-btn-block">
          <span class="kds-btn-label">Autorizar</span>
        </button>
        <button type="submit" name="decision" value="reject" class="kds-btn kds-btn-outlined kds-btn-block">
          <span class="kds-btn-label">Rechazar</span>
        </button>
      </div>
    </div>
  </section>
  <footer class="kds-secure-footer">…</footer>
</div>

<!-- GSP: un form con dos submits; las secciones vienen del controller (textos validados con Legal) -->
<g:form action="consent" useToken="true">
  <div class="kds-screen active">
    <section class="kds-card-elevated kds-consent-card" aria-labelledby="consent-title">
      <div class="kds-consent-card-header">
        <div class="kds-consent-card-title" role="heading" aria-level="2" id="consent-title">
          <strong>Khipu</strong> <g:message code="consent.requestsAccessTo"/> <strong>\${bank.name}</strong>
        </div>
      </div>
      <div class="kds-consent-card-body">
        <g:each in="\${consentSections}" var="section" status="i">
          <div class="kds-consent-card-section" role="group" aria-labelledby="consent-s\${i}">
            <div class="kds-consent-card-section-title" role="heading" aria-level="3" id="consent-s\${i}">
              <g:message code="\${section.titleCode}"/>
            </div>
            <ul class="kds-consent-card-items">
              <g:each in="\${section.items}" var="item">
                <li class="kds-consent-card-item">
                  <i class="material-symbols-outlined" aria-hidden="true">\${item.icon}</i>
                  <span><g:message code="\${item.code}"/></span>
                </li>
              </g:each>
            </ul>
          </div>
        </g:each>
        <div class="kds-consent-card-actions">
          <mat:button type="primary" htmlType="submit" name="decision" value="accept" textCode="consent.accept" cssClass="kds-btn-block"/>
          <mat:button type="outlined" htmlType="submit" name="decision" value="reject" textCode="consent.reject" cssClass="kds-btn-block"/>
        </div>
      </div>
    </section>
  </div>
</g:form>`,
      },
    },
  },
};

/** Autorizando: spinner en el botón principal y ambas acciones deshabilitadas. */
export const Loading: Story = {
  name: 'Autorizando',
  args: {
    requester: 'Khipu',
    resource: 'Banco Santander',
    sections: SECTIONS,
    loading: true,
    onAccept: () => undefined,
    onReject: () => undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};
