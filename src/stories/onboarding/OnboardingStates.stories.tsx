import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsAlert,
  KdsButton,
  KdsSectionNote,
  KdsStatusBlock,
  KdsStepper,
  KdsTypography,
  type KdsStatusType,
} from '../../components/core';
import { KdsBottomSheet, KdsContract } from '../../components/domain';

/**
 * On boarding — estados del alta (KTUF-498). Pantallas que el backend del alta con borrador
 * ("Alta de comercios con borrador y flujo configurable") define y el prototipo no mostraba:
 * espera de la evaluación de riesgo, alta vencida o cancelada, producto no disponible, cambio
 * en el orden de los pasos, cuenta restringida, comercio no habilitado, contrato actualizado y
 * cobro pendiente fuera de Chile; más la lista "Tus altas en curso" y los modales de
 * confirmación.
 *
 * Todo se arma con componentes existentes (`KdsStatusBlock`, `KdsAlert`, la fila de
 * `KdsBankRow`, `KdsBottomSheet`, `KdsContract`): no hay componentes nuevos. Las vistas del
 * backend son GSP en payment: cada historia trae el HTML (lo que el taglib debe emitir) y el GSP
 * con los taglibs del DS (`kds:onboardingState`, `kds:button`) donde ya existen. Las claves i18n
 * son propuestas (`onboarding.*`): todavía no existen en payment.
 */
const meta: Meta = {
  title: 'On boarding/Estados del alta',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Pantallas de estado del alta de comercio y sus confirmaciones, hechas con componentes del DS. Bajo cada ejemplo está su código HTML + GSP.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="kds-max-w-lg kds-mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

const source = (code: string) => ({ docs: { source: { language: 'html', type: 'code', code } } });

type Action = { label: string; variant?: 'primary' | 'outlined' | 'text'; gspAction: string; i18n: string };

type StateScreen = {
  /** i18n key segment: `onboarding.state.<key>.*`. */
  key: string;
  status: KdsStatusType;
  icon: string;
  title: string;
  description: string;
  /** GSP expression passed as `args` to the description message, e.g. `[contactEmail]`. */
  descriptionArgs?: string;
  actions: Action[];
};

const btnClass = (variant: Action['variant'] = 'primary') => `kds-btn kds-btn-${variant} kds-btn-block`;

/** HTML + GSP of a state screen: `KdsStatusBlock` and its actions in a `.kds-btn-stack`. */
function stateScreenCode({ key, status, icon, title, description, descriptionArgs, actions }: StateScreen) {
  const html = `<div class="kds-status-block" data-status="${status}">
  <div class="kds-status-block-icon">
    <i class="material-symbols-outlined">${icon}</i>
  </div>
  <div>
    <h2 class="kds-status-block-title">${title}</h2>
    <p class="kds-status-block-description">${description}</p>
  </div>
</div>
<div class="kds-btn-stack">
${actions
  .map((a) => `  <a href="/onboarding/${a.gspAction}" class="${btnClass(a.variant)}"><span class="kds-btn-label">${a.label}</span></a>`)
  .join('\n')}
</div>`;
  const caseName = key.replace(/([A-Z])/g, '_$1').toUpperCase();
  const descriptionAttr = descriptionArgs
    ? `\n    description="\${message(code: 'onboarding.state.${key}.description', args: ${descriptionArgs})}"`
    : '';
  const gsp = `<%-- Taglib del DS (grails/taglibs-grails6). El HTML de arriba es lo que debe emitir. --%>
<kds:onboardingState case="\${com.khipu.designsystem.OnboardingStateCase.${caseName}}"${descriptionAttr}/>`;
  return `${html}\n\n<!-- GSP -->\n${gsp}`;
}

function StateScreenView({ status, icon, title, description, actions }: StateScreen) {
  return (
    <div>
      <KdsStatusBlock status={status} icon={icon} title={title} description={description} />
      <div className="kds-btn-stack">
        {actions.map((a) => (
          <KdsButton key={a.label} variant={a.variant ?? 'primary'} fullWidth>
            {a.label}
          </KdsButton>
        ))}
      </div>
    </div>
  );
}

const stateStory = (name: string, screen: StateScreen): Story => ({
  name,
  parameters: source(stateScreenCode(screen)),
  render: () => <StateScreenView {...screen} />,
});

const MY_DRAFTS: Action = {
  label: 'Ver mis altas en curso',
  variant: 'outlined',
  gspAction: 'drafts',
  i18n: 'onboarding.drafts.view',
};

/**
 * Evaluación de riesgo en curso al retomar el alta (p. ej. desde "Tus altas en curso"). Dentro
 * del flujo, la espera antes de firmar es la pantalla de evaluación con checklist (KTUF-493,
 * `On boarding/Flujo completo`). Ícono fijo de espera (`info`), no el spinner de `pending`.
 */
export const EsperandoEvaluacion = stateStory('1 · Esperando la evaluación de riesgo', {
  key: 'riskPending',
  status: 'info',
  icon: 'hourglass_top',
  title: 'Estamos revisando la información de tu empresa',
  description:
    'Suele tomar unos minutos. Puedes quedarte aquí: cuando terminemos, te mostraremos el contrato para firmar.',
  actions: [MY_DRAFTS],
});

/** La evaluación no respondió a tiempo: se avisa por correo y el alta queda guardada. */
export const AvisoPorCorreo = stateStory('2 · Evaluación sin respuesta (aviso por correo)', {
  key: 'riskByEmail',
  status: 'info',
  icon: 'mail',
  title: 'Te avisaremos por correo',
  description:
    'La revisión está tomando más de lo normal. Guardamos tu avance y te escribiremos a ana.perez@correo.cl cuando puedas firmar el contrato.',
  descriptionArgs: '[contactEmail]',
  actions: [{ label: 'Entendido', gspAction: 'drafts', i18n: 'default.understood' }],
});

/** Alta vencida (90 días sin avance) o cancelada: "El alta ya no existe" (REA-03). */
export const AltaNoExiste = stateStory('3 · Alta vencida o cancelada', {
  key: 'draftGone',
  status: 'warn',
  icon: 'event_busy',
  title: 'Esta alta ya no está disponible',
  description:
    'Venció por pasar 90 días sin avances o fue cancelada. Puedes empezar una nueva cuando quieras.',
  actions: [
    { label: 'Empezar una nueva alta', gspAction: 'start', i18n: 'onboarding.draft.new' },
    MY_DRAFTS,
  ],
});

/** El producto o el flujo dejó de estar disponible para nuevas altas. */
export const NoDisponible = stateStory('4 · Producto o flujo no disponible', {
  key: 'flowUnavailable',
  status: 'warn',
  icon: 'remove_shopping_cart',
  title: 'Este producto no está disponible por ahora',
  description:
    'No podemos continuar esta alta con el producto que elegiste. Revisa los otros productos disponibles para tu país.',
  actions: [
    { label: 'Ver productos disponibles', gspAction: 'start', i18n: 'onboarding.products.view' },
    MY_DRAFTS,
  ],
});

/** Identificador restringido (`IDENTIFIER_RESTRICTED`). */
export const CuentaRestringida = stateStory('5 · Cuenta restringida', {
  key: 'identifierRestricted',
  status: 'error',
  icon: 'gpp_bad',
  title: 'No podemos continuar con esta cuenta',
  description:
    'La cuenta bancaria que usaste no se puede asociar a una cuenta de cobro. Verifica tu identidad con otra cuenta a nombre de la empresa.',
  actions: [
    { label: 'Usar otra cuenta', gspAction: 'identity', i18n: 'onboarding.identity.retry' },
    { label: 'Contactar a soporte', variant: 'outlined', gspAction: 'support', i18n: 'default.contactSupport' },
  ],
});

/** Cuenta personal en un alta de empresa (`SIGNER_INCOMPLETE`). */
export const CuentaPersonal = stateStory('6 · Cuenta personal en alta de empresa', {
  key: 'signerIncomplete',
  status: 'warn',
  icon: 'person_off',
  title: 'Usaste una cuenta personal',
  description:
    'Para activar la cuenta de cobro de una empresa, verifica tu identidad con una cuenta bancaria de la empresa en la que seas apoderado.',
  actions: [
    { label: 'Verificar con la cuenta de la empresa', gspAction: 'identity', i18n: 'onboarding.identity.retry' },
    MY_DRAFTS,
  ],
});

/**
 * Comercio no habilitado (lista negra): no se explica el motivo, solo el camino a soporte.
 */
export const NoHabilitado = stateStory('7 · Comercio no habilitado', {
  key: 'merchantBlocked',
  status: 'error',
  icon: 'support_agent',
  title: 'No podemos activar tu cuenta de cobro',
  description: 'Para revisar tu caso, escríbenos a soporte. Te responderemos lo antes posible.',
  actions: [{ label: 'Contactar a soporte', gspAction: 'support', i18n: 'default.contactSupport' }],
});

/**
 * Fuera de Chile: la cuenta queda creada, pero el cobro espera la habilitación de Operaciones
 * (`needs-extra-steps-to-collect`).
 */
export const CobroPendiente = stateStory('8 · Cobro pendiente de habilitación (fuera de Chile)', {
  key: 'collectPending',
  status: 'info',
  icon: 'pending_actions',
  title: 'Tu cuenta está creada',
  description:
    'Antes de que puedas cobrar, nuestro equipo de Operaciones revisará la cuenta. Te avisaremos por correo cuando esté habilitada.',
  actions: [{ label: 'Ir a mi cuenta', gspAction: 'account', i18n: 'onboarding.account.go' }],
});

const RESUMED_STEPS = [
  'Perfil del comercio',
  'Verificación de identidad',
  'Información comercial',
  'Selección de plan',
  'Firma de contrato',
];

/**
 * Card of a resumed flow screen, same markup as the flow cards of "On boarding/Flujo completo":
 * title, optional notice, stepper and subtitle, spaced only by the card's gap.
 */
function ResumedScreen({
  notice,
  step,
  subtitle,
  children,
}: {
  notice: React.ReactNode;
  step: number;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="kds-card-elevated kds-flex kds-flex-col kds-gap-2">
      <KdsTypography variant="heading2" as="h1" className="kds-m-0">
        Creación de la cuenta de cobro
      </KdsTypography>
      {notice}
      <KdsStepper steps={RESUMED_STEPS} current={step} numbered color="primary" currentLabelOnly />
      <KdsTypography variant="body-large" as="h2" className="kds-m-0 kds-color-primary kds-fw-medium">
        {subtitle}
      </KdsTypography>
      {children}
    </div>
  );
}

/** One-paragraph notice: the lead in bold inside the description (no separate title). */
const noticeCode = (severity: 'info' | 'warning', icon: string, lead: string, text: string, key: string) => `<div class="kds-alert kds-${severity}" role="status">
  <div class="kds-alert-icon">
    <i class="material-symbols-outlined">${icon}</i>
  </div>
  <div class="kds-alert-content">
    <p class="kds-alert-description"><strong>${lead}</strong> ${text}</p>
  </div>
</div>

<!-- GSP -->
<div class="kds-alert kds-${severity}" role="status">
  <div class="kds-alert-icon">
    <i class="material-symbols-outlined">${icon}</i>
  </div>
  <div class="kds-alert-content">
    <p class="kds-alert-description">
      <strong><g:message code="onboarding.state.${key}.title"/></strong>
      <g:message code="onboarding.state.${key}.description"/>
    </p>
  </div>
</div>`;

/**
 * El orden de los pasos cambió (CAM-06): aviso persistente (sin cerrar) con `KdsAlert`, arriba
 * del stepper de la pantalla en la que se retoma el alta. En GSP va dentro de
 * `<g:if test="\${draft.flowChanged}">`.
 */
export const OrdenCambio: Story = {
  name: '9 · El orden de los pasos cambió (aviso)',
  parameters: source(
    noticeCode(
      'info',
      'info',
      'Actualizamos los pasos del alta.',
      'Guardamos lo que ya completaste y te llevamos al primer paso que falta.',
      'flowChanged',
    ),
  ),
  render: () => (
    <ResumedScreen
      step={2}
      subtitle="Completa los datos de contacto de tu empresa"
      notice={
        <KdsAlert severity="info" role="status">
          <KdsTypography variant="strong">Actualizamos los pasos del alta.</KdsTypography> Guardamos lo
          que ya completaste y te llevamos al primer paso que falta.
        </KdsAlert>
      }
    />
  ),
};

/**
 * Contrato actualizado (CA-13): el contrato cambió después de que se aceptó y hay que
 * aceptarlo de nuevo. `KdsAlert` + `KdsContract` (mismo markup que "On boarding/Componentes →
 * 8 · Firma de contrato"); la firma se habilita al aceptar.
 */
export const ContratoActualizado: Story = {
  name: '10 · Contrato actualizado: aceptar de nuevo',
  parameters: source(
    noticeCode(
      'warning',
      'warning',
      'Actualizamos el contrato.',
      'Léelo y acéptalo de nuevo para terminar tu alta.',
      'contractUpdated',
    ),
  ),
  render: function ContractUpdatedStory() {
    const [accepted, setAccepted] = useState(false);
    return (
      <ResumedScreen
        step={4}
        subtitle="Revisa y firma tu contrato"
        notice={
          <KdsAlert severity="warning" role="status">
            <KdsTypography variant="strong">Actualizamos el contrato.</KdsTypography> Léelo y acéptalo
            de nuevo para terminar tu alta.
          </KdsAlert>
        }
      >
        <KdsContract name="acepta" accepted={accepted} onAcceptedChange={setAccepted}>
          <p>
            <strong>MANDATO PARA PERCIBIR EL PAGO</strong>
          </p>
          <p>
            Primero: el Cobrador encarga a Khipu recibir, en su nombre, los pagos que sus clientes
            realicen mediante los medios de pago habilitados en su cuenta de cobro.
          </p>
          <p>
            Segundo: los fondos recibidos se transferirán a la cuenta corriente registrada por el
            Cobrador, según el plan elegido en este proceso.
          </p>
          <p>
            <em>[Texto referencial. El contrato vigente se carga desde el sistema.]</em>
          </p>
        </KdsContract>
        <KdsButton fullWidth disabled={!accepted}>
          Aceptar y firmar
        </KdsButton>
      </ResumedScreen>
    );
  },
};

type Draft = { id: string; merchant: string; product: string; step: string; expires: string };

const DRAFTS: Draft[] = [
  {
    id: 'd1',
    merchant: 'Comercial Ficticia SpA',
    product: 'Cobros con Khipu',
    step: 'Paso 3 de 5: Información comercial',
    expires: 'Vence el 12 de febrero',
  },
  {
    id: 'd2',
    merchant: 'Ana Pérez Ficticia',
    product: 'Cobro por link',
    step: 'Paso 1 de 3: Perfil del comercio',
    expires: 'Vence el 3 de enero',
  },
];

/**
 * One resumable draft: the same `<a class="kds-bank-row">` markup payment renders (a link to the
 * first pending screen), not the `KdsBankRow` button, so the story shows the real markup.
 */
function DraftRow({ draft }: { draft: Draft }) {
  return (
    <a href={`#resume-${draft.id}`} className="kds-bank-row">
      <span className="kds-bank-row-name">
        <span className="kds-flex kds-flex-col">
          <span>
            {draft.merchant} · {draft.product}
          </span>
          <span className="kds-text-body-small kds-text-secondary">
            {draft.step} · {draft.expires}
          </span>
        </span>
      </span>
      <i className="material-symbols-outlined" aria-hidden="true">
        chevron_right
      </i>
    </a>
  );
}

/**
 * "Tus altas en curso" (REA-01/02, D-23): se retoma siempre desde aquí. Cada alta es un link con
 * la fila de `KdsBankRow` (sin logo): nombre, producto, paso pendiente y vencimiento; lleva a la
 * primera pantalla pendiente. "Mi caso no está en el listado" lleva a soporte. Sin `role="list"`:
 * son links sueltos en un `.kds-bank-list`, no ítems de una lista.
 */
export const AltasEnCurso: Story = {
  name: '11 · Tus altas en curso',
  parameters: source(`<div class="kds-flex kds-flex-col kds-gap-1">
  <h2 class="kds-text-heading3 kds-m-0">Tus altas en curso</h2>
  <div class="kds-text-body kds-text-secondary">Elige una para seguir donde la dejaste.</div>
</div>
<div class="kds-bank-list">
  <a href="/onboarding/resume/d1" class="kds-bank-row">
    <span class="kds-bank-row-name">
      <span class="kds-flex kds-flex-col">
        <span>Comercial Ficticia SpA · Cobros con Khipu</span>
        <span class="kds-text-body-small kds-text-secondary">Paso 3 de 5: Información comercial · Vence el 12 de febrero</span>
      </span>
    </span>
    <i class="material-symbols-outlined" aria-hidden="true">chevron_right</i>
  </a>
</div>
<div class="kds-btn-stack">
  <a href="/onboarding/start" class="kds-btn kds-btn-primary kds-btn-block"><span class="kds-btn-label">Empezar una nueva alta</span></a>
  <a href="/onboarding/support" class="kds-btn kds-btn-text kds-btn-block"><span class="kds-btn-label">Mi caso no está en el listado</span></a>
</div>

<!-- GSP -->
<div class="kds-flex kds-flex-col kds-gap-1">
  <h2 class="kds-text-heading3 kds-m-0"><g:message code="onboarding.drafts.title"/></h2>
  <div class="kds-text-body kds-text-secondary"><g:message code="onboarding.drafts.subtitle"/></div>
</div>
<div class="kds-bank-list">
  <g:each in="\${drafts}" var="draft">
    <g:link action="resume" id="\${draft.id}" class="kds-bank-row">
      <span class="kds-bank-row-name">
        <span class="kds-flex kds-flex-col">
          <span>\${draft.merchantName} · <g:message code="product.\${draft.productCode}"/></span>
          <span class="kds-text-body-small kds-text-secondary">
            <g:message code="onboarding.drafts.step" args="\${[draft.stepNumber, draft.stepCount, message(code: 'onboarding.step.' + draft.nextStepKey)]}"/>
            · <g:message code="onboarding.drafts.expires" args="\${[formatDate(date: draft.expiresAt, format: 'd MMMM')]}"/>
          </span>
        </span>
      </span>
      <i class="material-symbols-outlined" aria-hidden="true">chevron_right</i>
    </g:link>
  </g:each>
</div>
<div class="kds-btn-stack">
  <kds:button type="primary" href="\${createLink(action: 'start')}" cssClass="kds-btn-block"><g:message code="onboarding.draft.new"/></kds:button>
  <kds:button type="text" href="\${createLink(action: 'support')}" cssClass="kds-btn-block"><g:message code="onboarding.drafts.notListed"/></kds:button>
</div>`),
  render: () => (
    <div>
      <div className="kds-flex kds-flex-col kds-gap-1">
        <KdsTypography variant="heading3" as="h2" className="kds-m-0">
          Tus altas en curso
        </KdsTypography>
        <KdsTypography variant="body" color="secondary" as="div">
          Elige una para seguir donde la dejaste.
        </KdsTypography>
      </div>
      <div className="kds-bank-list">
        {DRAFTS.map((d) => (
          <DraftRow key={d.id} draft={d} />
        ))}
      </div>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Empezar una nueva alta</KdsButton>
        <KdsButton variant="text" fullWidth>
          Mi caso no está en el listado
        </KdsButton>
      </div>
    </div>
  ),
};

/**
 * Sin altas en curso: misma pantalla de estado que el resto (`KdsStatusBlock` + acciones), con
 * el camino para empezar una y el de soporte si su caso no aparece.
 */
export const SinAltasEnCurso = stateStory('12 · Sin altas en curso', {
  key: 'draftsEmpty',
  status: 'info',
  icon: 'inbox',
  title: 'No tienes altas en curso',
  description: 'Las que empieces quedarán guardadas aquí por 90 días.',
  actions: [
    { label: 'Empezar una nueva alta', gspAction: 'start', i18n: 'onboarding.draft.new' },
    { label: 'Mi caso no está en el listado', variant: 'text', gspAction: 'support', i18n: 'onboarding.drafts.notListed' },
  ],
});

/**
 * Opens/closes a confirmation sheet: the bundle has no handler for these attributes, so the
 * page carries this script (in payment, inside `<kh:script>`). Escape and the scrim also close.
 */
const SHEET_SCRIPT = `(function () {
  document.querySelectorAll('[data-open-sheet]').forEach(function (opener) {
    var sheet = document.getElementById(opener.getAttribute('data-open-sheet'));
    function close() { sheet.hidden = true; opener.focus(); }
    opener.addEventListener('click', function () {
      sheet.hidden = false;
      sheet.querySelector('.kds-bottom-sheet-actions .kds-btn').focus();
    });
    sheet.querySelectorAll('[data-close-sheet]').forEach(function (b) { b.addEventListener('click', close); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) close(); });
    sheet.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  });
})();`;

/**
 * "Cancelar esta alta" (NAV-17, VEN-09): siempre visible en el flujo y con confirmación.
 * `KdsBottomSheet variant="dialog"`; la acción destructiva usa `error`.
 */
export const CancelarAlta: Story = {
  name: '13 · Confirmar: cancelar esta alta',
  parameters: source(`<button type="button" class="kds-btn kds-btn-error-text" data-open-sheet="cancel-draft-sheet">
  <span class="kds-btn-label">Cancelar esta alta</span>
</button>

<!-- The form lives outside the sheet; its submit button points to it with form="" -->
<form id="cancel-draft-form" method="post" action="/onboarding/cancel"></form>
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="cancel-draft-sheet" hidden>
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-draft-title">
    <div class="kds-bottom-sheet-grabber" aria-hidden="true"></div>
    <h2 class="kds-bottom-sheet-title" id="cancel-draft-title">¿Cancelar esta alta?</h2>
    <p class="kds-bottom-sheet-description">Borraremos los datos que ingresaste y no podrás retomarla. Si quieres, puedes empezar otra después.</p>
    <div class="kds-bottom-sheet-actions">
      <button type="submit" form="cancel-draft-form" class="kds-btn kds-btn-error kds-btn-block"><span class="kds-btn-label">Sí, cancelar alta</span></button>
      <button type="button" class="kds-btn kds-btn-outlined kds-btn-block" data-close-sheet><span class="kds-btn-label">Volver</span></button>
    </div>
  </div>
</div>
<script>
${SHEET_SCRIPT}
</script>

<!-- GSP: cancelar es un POST con token. kds:button pasa (escapados) form y data-*; mat:button de
     payment descarta form, por eso no sirve aquí. -->
<kds:button type="error-text" data-open-sheet="cancel-draft-sheet"><g:message code="onboarding.cancel.open"/></kds:button>
<g:form action="cancel" useToken="true" name="cancelDraftForm" id="cancel-draft-form"></g:form>
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="cancel-draft-sheet" hidden>
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-draft-title">
    <h2 class="kds-bottom-sheet-title" id="cancel-draft-title"><g:message code="onboarding.cancel.title"/></h2>
    <p class="kds-bottom-sheet-description"><g:message code="onboarding.cancel.description"/></p>
    <div class="kds-bottom-sheet-actions">
      <kds:button type="error" htmlType="submit" form="cancel-draft-form" cssClass="kds-btn-block">
        <g:message code="onboarding.cancel.confirm"/>
      </kds:button>
      <kds:button type="outlined" cssClass="kds-btn-block" data-close-sheet="true"><g:message code="default.back.link"/></kds:button>
    </div>
  </div>
</div>
<kh:script>
${SHEET_SCRIPT}
</kh:script>`),
  render: function CancelDraftStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton variant="error-text" onClick={() => setOpen(true)}>
          Cancelar esta alta
        </KdsButton>
        <KdsBottomSheet
          variant="dialog"
          open={open}
          onClose={() => setOpen(false)}
          title="¿Cancelar esta alta?"
          description="Borraremos los datos que ingresaste y no podrás retomarla. Si quieres, puedes empezar otra después."
          actions={
            <>
              <KdsButton variant="error" fullWidth onClick={() => setOpen(false)}>
                Sí, cancelar alta
              </KdsButton>
              <KdsButton variant="outlined" fullWidth onClick={() => setOpen(false)}>
                Volver
              </KdsButton>
            </>
          }
        >
          {null}
        </KdsBottomSheet>
      </>
    );
  },
};

const INVALIDATED = ['Verificación de identidad', 'Información comercial'];

/**
 * Rectificar un dato que invalida pasos posteriores: antes de guardar se avisa qué pasos
 * habrá que repetir. `KdsBottomSheet variant="dialog"` con la lista en el cuerpo.
 */
export const RectificarDato: Story = {
  name: '14 · Confirmar: cambiar un dato que invalida pasos',
  parameters: source(`<!-- "Guardar cambio" of the edited block opens the sheet instead of submitting -->
<button type="button" class="kds-btn kds-btn-outlined" data-open-sheet="rectify-sheet">
  <span class="kds-btn-label">Guardar cambio</span>
</button>

<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="rectify-sheet" hidden>
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="rectify-title">
    <div class="kds-bottom-sheet-grabber" aria-hidden="true"></div>
    <h2 class="kds-bottom-sheet-title" id="rectify-title">Si cambias este dato, tendrás que repetir algunos pasos</h2>
    <p class="kds-bottom-sheet-description">Lo que ingresaste en estos pasos depende del dato que vas a cambiar:</p>
    <div class="kds-bottom-sheet-body">
      <ul>
        <li>Verificación de identidad</li>
        <li>Información comercial</li>
      </ul>
      <p class="kds-section-note kds-neutral">
        <i class="material-symbols-outlined" aria-hidden="true">info</i>
        <span>El resto de tu avance queda guardado.</span>
      </p>
    </div>
    <div class="kds-bottom-sheet-actions">
      <button type="submit" form="profile-form" class="kds-btn kds-btn-primary kds-btn-block"><span class="kds-btn-label">Cambiar y repetir pasos</span></button>
      <button type="button" class="kds-btn kds-btn-outlined kds-btn-block" data-close-sheet><span class="kds-btn-label">Mantener el dato</span></button>
    </div>
  </div>
</div>
<script>
${SHEET_SCRIPT}
</script>

<!-- GSP: invalidatedSteps viene del backend (pasos que dependen del bloque editado). kds:button
     pasa el atributo form (mat:button de payment lo descarta). -->
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="rectify-sheet" hidden>
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="rectify-title">
    <h2 class="kds-bottom-sheet-title" id="rectify-title"><g:message code="onboarding.rectify.title"/></h2>
    <p class="kds-bottom-sheet-description"><g:message code="onboarding.rectify.description"/></p>
    <div class="kds-bottom-sheet-body">
      <ul>
        <g:each in="\${invalidatedSteps}" var="step">
          <li><g:message code="onboarding.step.\${step.key}"/></li>
        </g:each>
      </ul>
      <p class="kds-section-note kds-neutral">
        <i class="material-symbols-outlined" aria-hidden="true">info</i>
        <span><g:message code="onboarding.rectify.progressKept"/></span>
      </p>
    </div>
    <div class="kds-bottom-sheet-actions">
      <kds:button type="primary" htmlType="submit" form="profile-form" cssClass="kds-btn-block">
        <g:message code="onboarding.rectify.confirm"/>
      </kds:button>
      <kds:button type="outlined" cssClass="kds-btn-block" data-close-sheet="true"><g:message code="onboarding.rectify.keep"/></kds:button>
    </div>
  </div>
</div>
<kh:script>
${SHEET_SCRIPT}
</kh:script>`),
  render: function RectifyStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton variant="outlined" onClick={() => setOpen(true)}>
          Guardar cambio
        </KdsButton>
        <KdsBottomSheet
          variant="dialog"
          open={open}
          onClose={() => setOpen(false)}
          title="Si cambias este dato, tendrás que repetir algunos pasos"
          description="Lo que ingresaste en estos pasos depende del dato que vas a cambiar:"
          actions={
            <>
              <KdsButton fullWidth onClick={() => setOpen(false)}>
                Cambiar y repetir pasos
              </KdsButton>
              <KdsButton variant="outlined" fullWidth onClick={() => setOpen(false)}>
                Mantener el dato
              </KdsButton>
            </>
          }
        >
          <ul>
            {INVALIDATED.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <KdsSectionNote className="kds-neutral" icon="info">
            El resto de tu avance queda guardado.
          </KdsSectionNote>
        </KdsBottomSheet>
      </>
    );
  },
};
