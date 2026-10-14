import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { KdsBottomSheet } from './KdsBottomSheet';
import { KdsButton } from '../../core/KdsButton';
import { KdsDocumentFrame } from '../../core/KdsDocumentFrame';
import { KdsProgressChecklist } from '../../core/KdsProgressChecklist';
import { KdsSectionNote } from '../../core/KdsSectionNote';
import { KdsSpinner } from '../../core/KdsSpinner';

/**
 * KdsBottomSheet — único componente de modales del DS (KdsModal fue unificado aquí).
 *
 * Bottom-sheet basado en Radix Dialog. En mobile sube desde abajo, en desktop se
 * centra. Soporta: title, description, body, actions (footer), grabber (handle),
 * close button (X), y prevención de cierre al click adentro.
 */
const meta: Meta<typeof KdsBottomSheet> = {
  title: 'Components/Overlays/KdsBottomSheet',
  component: KdsBottomSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Único componente de modales del DS. Reemplaza a `KdsModal`. Slots: title, description, body, actions. Flags: showGrabber, showCloseButton.',
      },
    },
  },
  argTypes: {
    showGrabber: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['auto', 'full'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsBottomSheet>;

export const Default: Story = {
  render: function DefaultBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir bottom sheet</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Información"
        >
          <p style={{ margin: 0 }}>Contenido del bottom sheet.</p>
        </KdsBottomSheet>
      </>
    );
  },
};

export const WithActions: Story = {
  render: function BottomSheetWithActions() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir bottom sheet</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar acción"
          actions={
            <>
              <KdsButton variant="success" onClick={() => setOpen(false)}>
                Confirmar
              </KdsButton>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            ¿Deseas confirmar esta acción? Esta operación no se puede deshacer.
          </p>
        </KdsBottomSheet>
      </>
    );
  },
};

export const TransferConfirmation: Story = {
  render: function TransferBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Confirmar transferencia</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="¿Ya transferiste?"
          actions={
            <>
              <KdsButton variant="success" onClick={() => setOpen(false)}>
                Finalizar
              </KdsButton>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Volver
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Si ya realizaste la transferencia desde tu banco, presiona
            &quot;Finalizar&quot; para completar el pago. Khipu verificará la
            transacción en los próximos minutos.
          </p>
        </KdsBottomSheet>
      </>
    );
  },
};

/** Con description bajo el título. */
export const WithDescription: Story = {
  render: function BottomSheetWithDescription() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Confirmar pago</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar pago"
          description="Revisa los datos antes de proceder."
          actions={
            <>
              <KdsButton variant="success" onClick={() => setOpen(false)}>
                Confirmar
              </KdsButton>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            ¿Estás seguro de que deseas realizar este pago por <strong>$150.000</strong>?
          </p>
        </KdsBottomSheet>
      </>
    );
  },
};

/** Con X de cierre en el top-right (`showCloseButton`). */
export const WithCloseButton: Story = {
  render: function BottomSheetWithClose() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir con X</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Con botón de cerrar"
          showCloseButton
        >
          <p style={{ margin: 0 }}>El usuario puede cerrar con la X del top-right, ESC, o click fuera.</p>
        </KdsBottomSheet>
      </>
    );
  },
};

/** Sin grabber visual (`showGrabber={false}`). */
export const NoGrabber: Story = {
  render: function BottomSheetNoGrabber() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Sin grabber</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Sin handle visual"
          showGrabber={false}
        >
          <p style={{ margin: 0 }}>Sin el handle visual del top.</p>
        </KdsBottomSheet>
      </>
    );
  },
};

export const LongContent: Story = {
  render: function LongContentBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Ver términos</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Términos y condiciones"
          actions={
            <KdsButton variant="success" onClick={() => setOpen(false)}>
              Aceptar
            </KdsButton>
          }
        >
          <div>
            <p style={{ margin: '0 0 16px 0' }}>
              Al utilizar los servicios de pago de Khipu, aceptas los siguientes
              términos y condiciones. Te recomendamos leerlos detenidamente antes
              de continuar.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              Khipu actúa como intermediario entre el pagador y el cobrador,
              facilitando transferencias electrónicas de forma segura. La
              plataforma no almacena credenciales bancarias y opera bajo los
              estándares de seguridad exigidos por la normativa chilena.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              El usuario es responsable de verificar los datos del cobro antes de
              confirmar el pago. Una vez realizada la transferencia, Khipu
              notificará al comercio y al pagador sobre el estado de la
              transacción.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              En caso de reclamos o disputas, el usuario puede contactar al
              equipo de soporte de Khipu a través de los canales oficiales. Los
              plazos de resolución dependerán de la entidad bancaria involucrada.
            </p>
            <p style={{ margin: 0 }}>
              Khipu se reserva el derecho de modificar estos términos previo
              aviso a los usuarios registrados. El uso continuado del servicio
              implica la aceptación de las condiciones actualizadas.
            </p>
          </div>
        </KdsBottomSheet>
      </>
    );
  },
};

const DESKTOP_DOCUMENT = `data:text/html;charset=utf-8,${encodeURIComponent(
  '<style>body{margin:20px;font-family:Verdana,Arial;color:#333}h3{font-size:40px;margin:0 0 10px}p{font-size:25px;line-height:1.56;margin:20px;text-align:justify}</style><h3>Mandato para pago</h3><p>Cláusula 1. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 2. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 3. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 4. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 5. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 6. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 7. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p><p>Cláusula 8. Documento de ejemplo con estilos de escritorio: letra de 25px, títulos de 40px y márgenes amplios, como la página de términos de payment.</p>',
)}`;

/**
 * `size="full"` + `KdsDocumentFrame`: documento largo de terceros (términos, mandatos).
 * El sheet usa todo su alto máximo y el frame lo llena; `scale={0.6}` achica un documento
 * pensado para escritorio que no se puede reestilar.
 */
export const FullDocument: Story = {
  render: function FullDocumentBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Ver términos</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Términos y condiciones de uso"
          showCloseButton
          size="full"
        >
          <KdsDocumentFrame src={DESKTOP_DOCUMENT} title="Términos y condiciones de uso" scale={0.6} />
        </KdsBottomSheet>
      </>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — estructura del sheet (scrim + panel + slots).
 * Show/hide es JS-driven (Radix Dialog maneja portal/focus-trap/ESC); en
 * contextos sin Radix, togglear la clase `.open` en `.kds-bottom-sheet-scrim`
 * la muestra/oculta. La clase `.open` SIEMPRE debe estar presente al renderizar
 * (sin ella el scrim queda `display: none`). El grabber, close button, title,
 * description y actions son todos slots opcionales.
 *
 * Ver `Patterns/CSS-only → BottomSheet` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-bottom-sheet-scrim open">
  <div class="kds-bottom-sheet" role="dialog" aria-modal="true">
    <div class="kds-bottom-sheet-grabber" aria-hidden="true"></div>
    <button type="button" class="kds-bottom-sheet-close" aria-label="Cerrar">
      <i class="material-symbols-outlined">close</i>
    </button>
    <h2 class="kds-bottom-sheet-title">Confirmar acción</h2>
    <p class="kds-bottom-sheet-description">Revisa los datos antes de proceder.</p>
    <div class="kds-bottom-sheet-body">
      <p>¿Deseas confirmar esta acción? Esta operación no se puede deshacer.</p>
    </div>
    <div class="kds-bottom-sheet-actions">
      <button type="button" class="kds-btn kds-btn-primary">Confirmar</button>
      <button type="button" class="kds-btn-ghost">Cancelar</button>
    </div>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-bottom-sheet" role="dialog" aria-modal="true">
        <div className="kds-bottom-sheet-grabber" aria-hidden="true" />
        <button type="button" className="kds-bottom-sheet-close" aria-label="Cerrar">
          <i className="material-symbols-outlined">close</i>
        </button>
        <h2 className="kds-bottom-sheet-title">Confirmar acción</h2>
        <p className="kds-bottom-sheet-description">Revisa los datos antes de proceder.</p>
        <div className="kds-bottom-sheet-body">
          <p>¿Deseas confirmar esta acción? Esta operación no se puede deshacer.</p>
        </div>
        <div className="kds-bottom-sheet-actions">
          <button type="button" className="kds-btn kds-btn-primary">Confirmar</button>
          <button type="button" className="kds-btn-ghost">Cancelar</button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Onboarding — aviso antes de redirigir a la banca en línea, como modal corriente
 * (`variant="dialog"`): en escritorio centrado, texto a la izquierda y acciones lado a lado
 * (Volver | Continuar); en mobile, bottom sheet con las acciones apiladas. Volver cierra el
 * modal; Continuar lleva al banco.
 */
export const OnboardingBankRedirect: Story = {
  name: 'Onboarding: redirección al banco',
  render: function OnboardingRedirectSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Continuar</KdsButton>
        <KdsBottomSheet
          variant="dialog"
          open={open}
          onClose={() => setOpen(false)}
          title="Continúa en la banca en línea de Banco Santander"
          description="Allí podrás revisar qué datos se consultan y para qué, antes de autorizar la verificación de tu cuenta."
          actions={
            <>
              <KdsButton fullWidth onClick={() => setOpen(false)}>
                Continuar
              </KdsButton>
              <KdsButton variant="outlined" fullWidth onClick={() => setOpen(false)}>
                Volver
              </KdsButton>
            </>
          }
        >
          <KdsSectionNote className="kds-neutral" icon="lock">
            Tus credenciales están encriptadas de extremo a extremo. Khipu no almacena tus
            contraseñas bancarias.
          </KdsSectionNote>
        </KdsBottomSheet>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Primary action first: on desktop it is shown on the right, on mobile on top -->
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="bank-redirect-sheet" hidden>
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="bank-redirect-title">
    <div class="kds-bottom-sheet-grabber" aria-hidden="true"></div>
    <h2 class="kds-bottom-sheet-title" id="bank-redirect-title">Continúa en la banca en línea de Banco Santander</h2>
    <p class="kds-bottom-sheet-description">Allí podrás revisar qué datos se consultan y para qué, antes de autorizar la verificación de tu cuenta.</p>
    <div class="kds-bottom-sheet-body">
      <p class="kds-section-note kds-neutral">
        <i class="material-symbols-outlined" aria-hidden="true">lock</i>
        <span>Tus credenciales están encriptadas de extremo a extremo. Khipu no almacena tus contraseñas bancarias.</span>
      </p>
    </div>
    <div class="kds-bottom-sheet-actions">
      <a href="/onboarding/bank-login" class="kds-btn kds-btn-primary kds-btn-block"><span class="kds-btn-label">Continuar</span></a>
      <button type="button" class="kds-btn kds-btn-outlined kds-btn-block" data-close-sheet><span class="kds-btn-label">Volver</span></button>
    </div>
  </div>
</div>

<!-- GSP: el sheet se renderiza oculto y se abre con el botón del paso "Selección de banco" -->
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="bank-redirect-sheet" hidden>
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="bank-redirect-title">
    <h2 class="kds-bottom-sheet-title" id="bank-redirect-title">
      <g:message code="onboarding.bankRedirect.title" args="\${[bank.name]}"/>
    </h2>
    <div class="kds-bottom-sheet-actions">
      <mat:button type="primary" href="\${createLink(action: 'bankLogin')}" textCode="default.continue" cssClass="kds-btn-block"/>
      <mat:button type="outlined" textCode="default.back" cssClass="kds-btn-block" onclick="this.closest('.kds-bottom-sheet-scrim').hidden = true"/>
    </div>
  </div>
</div>`,
      },
    },
  },
};

/**
 * Onboarding — validación automática de la información comercial (unos segundos), como
 * modal de estado (`variant="dialog"` + `align="center"`): en escritorio centrado en pantalla,
 * en mobile bottom sheet.
 *
 * - Mientras valida: `dismissible={false}` (no se cierra con Escape, click fuera ni grabber;
 *   no hay grabber ni X), un `KdsSpinner` arriba (`icon`), el progreso en
 *   `KdsProgressChecklist`, la nota "No cierres esta ventana." (`hint`) y la acción
 *   deshabilitada "Validando…".
 * - Al terminar: el modal **no se cierra solo**. El spinner pasa a un check, el título a
 *   "Validamos tu información", el botón se habilita como "Continuar a la firma" y recibe el
 *   foco; **solo ese botón** cierra el modal y avanza el flujo.
 */
export const OnboardingValidating: Story = {
  name: 'Onboarding: validando información (no se puede cerrar)',
  render: function OnboardingValidatingSheet() {
    const labels = ['Datos de la empresa', 'Representante legal', 'Evaluación de riesgo'];
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const done = step >= labels.length;
    const finishRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (!open || done) return undefined;
      const t = setTimeout(() => setStep((s) => s + 1), 1300);
      return () => clearTimeout(t);
    }, [open, done, step]);

    // Keyboard and screen-reader users land on the control that ends the flow.
    useEffect(() => {
      if (open && done) finishRef.current?.focus();
    }, [open, done]);

    return (
      <>
        <KdsButton
          onClick={() => {
            setStep(0);
            setOpen(true);
          }}
        >
          Validar información
        </KdsButton>
        <KdsBottomSheet
          variant="dialog"
          align="center"
          open={open}
          onClose={() => undefined}
          dismissible={false}
          icon={
            done ? (
              <i className="material-symbols-outlined kds-color-success" aria-hidden="true">
                check_circle
              </i>
            ) : (
              <KdsSpinner />
            )
          }
          title={done ? 'Validamos tu información' : 'Validando información comercial'}
          description={
            done
              ? 'Todo está en orden. Continúa para revisar y firmar tu contrato.'
              : 'Revisamos la información de Comercial Ficticia SpA y de su representante legal, y evaluamos el riesgo de tu empresa. Esto toma unos segundos.'
          }
          hint={done ? undefined : 'No cierres esta ventana.'}
          actions={
            <KdsButton ref={finishRef} fullWidth disabled={!done} onClick={() => setOpen(false)}>
              {done ? 'Continuar a la firma' : 'Validando…'}
            </KdsButton>
          }
        >
          <KdsProgressChecklist
            items={labels.map((label, i) => ({
              label,
              status: i < step ? 'done' : i === step ? 'active' : 'pending',
            }))}
          />
        </KdsBottomSheet>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Mientras valida: sin grabber, sin X y sin listeners de cierre. La acción es el
     control que finaliza: deshabilitada hasta que termina. -->
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open">
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog kds-bottom-sheet--center" role="dialog" aria-modal="true" aria-labelledby="validating-title">
    <div class="kds-bottom-sheet-icon" id="validating-icon">
      <progress class="circle indeterminate"></progress>
    </div>
    <h2 class="kds-bottom-sheet-title" id="validating-title">Validando información comercial</h2>
    <p class="kds-bottom-sheet-description" id="validating-desc">Revisamos la información de Comercial Ficticia SpA y de su representante legal, y evaluamos el riesgo de tu empresa. Esto toma unos segundos.</p>
    <div class="kds-bottom-sheet-body">
      <ul class="kds-progress-checklist" aria-live="polite">…ver KdsProgressChecklist…</ul>
    </div>
    <p class="kds-bottom-sheet-hint" id="validating-hint">No cierres esta ventana.</p>
    <div class="kds-bottom-sheet-actions">
      <button type="button" class="kds-btn kds-btn-primary kds-btn-block" id="validating-finish" disabled>
        <span class="kds-btn-label">Validando…</span>
      </button>
    </div>
  </div>
</div>

<!-- Al terminar: el modal NO se cierra solo; solo este botón finaliza y cierra -->
<script>
  function onValidationDone() {
    document.getElementById('validating-icon').innerHTML =
      '<i class="material-symbols-outlined kds-color-success" aria-hidden="true">check_circle</i>';
    document.getElementById('validating-title').textContent = 'Validamos tu información';
    document.getElementById('validating-desc').textContent =
      'Todo está en orden. Continúa para revisar y firmar tu contrato.';
    document.getElementById('validating-hint').remove();
    var finish = document.getElementById('validating-finish');
    finish.disabled = false;
    finish.innerHTML = '<span class="kds-btn-label">Continuar a la firma</span>';
    finish.focus();
    finish.addEventListener('click', function () {
      window.location.href = '/onboarding/firma'; // avanza y cierra el modal
    });
  }
</script>

<!-- GSP: el servidor pinta el estado según el resultado; terminado, el botón lleva a la firma -->
<div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open">
  <div class="kds-bottom-sheet kds-bottom-sheet--dialog kds-bottom-sheet--center" role="dialog" aria-modal="true" aria-labelledby="validating-title">
    <div class="kds-bottom-sheet-icon">
      <g:if test="\${validationDone}">
        <i class="material-symbols-outlined kds-color-success" aria-hidden="true">check_circle</i>
      </g:if>
      <g:else>
        <progress class="circle indeterminate"></progress>
      </g:else>
    </div>
    <h2 class="kds-bottom-sheet-title" id="validating-title">
      <g:message code="\${validationDone ? 'onboarding.validated.title' : 'onboarding.validating.title'}"/>
    </h2>
    <div class="kds-bottom-sheet-body">
      <g:render template="/onboarding/validationChecklist" model="[steps: validationSteps]"/>
    </div>
    <g:unless test="\${validationDone}">
      <p class="kds-bottom-sheet-hint"><g:message code="onboarding.validating.doNotClose"/></p>
    </g:unless>
    <div class="kds-bottom-sheet-actions">
      <g:if test="\${validationDone}">
        <mat:button type="primary" href="\${createLink(action: 'contract')}" textCode="onboarding.validated.continue" cssClass="kds-btn-block"/>
      </g:if>
      <g:else>
        <mat:button type="primary" textCode="onboarding.validating.wait" cssClass="kds-btn-block" disabled="true"/>
      </g:else>
    </div>
  </div>
</div>`,
      },
    },
  },
};
