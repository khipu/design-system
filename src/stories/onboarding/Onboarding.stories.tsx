import { useEffect, useId, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsButton,
  KdsProgressChecklist,
  KdsSectionNote,
  KdsSelect,
  KdsSnackbar,
  KdsSpinner,
  KdsStepper,
  KdsTextField,
  KdsTypography,
  type KdsProgressChecklistStatus,
} from '../../components/core';
import * as SectionNoteStories from '../../components/core/KdsSectionNote/KdsSectionNote.stories';
import {
  KdsBottomSheet,
  KdsCardPlan,
  KdsCardPlanGroup,
  KdsCardSelector,
  KdsCardSelectorGroup,
  KdsConsentCard,
  KdsContract,
  KdsFeedbackCard,
  KdsFooter,
  KdsMerchantTile,
  KdsNavbar,
  KdsSecureFooter,
  KdsSidebar,
} from '../../components/domain';
import * as TextFieldStories from '../../components/core/KdsTextField/KdsTextField.stories';
import * as SelectStories from '../../components/core/KdsSelect/KdsSelect.stories';
import * as StepperStories from '../../components/core/KdsStepper/KdsStepper.stories';
import * as ChecklistStories from '../../components/core/KdsProgressChecklist/KdsProgressChecklist.stories';
import * as CardPlanStories from '../../components/domain/KdsCardPlan/KdsCardPlan.stories';
import * as CardSelectorStories from '../../components/domain/KdsCardSelector/KdsCardSelector.stories';
import * as ContractStories from '../../components/domain/KdsContract/KdsContract.stories';
import * as FeedbackCardStories from '../../components/domain/KdsFeedbackCard/KdsFeedbackCard.stories';
import * as ConsentCardStories from '../../components/domain/KdsConsentCard/KdsConsentCard.stories';
import * as SidebarStories from '../../components/domain/KdsSidebar/KdsSidebar.stories';
import * as NavbarStories from '../../components/domain/KdsNavbar/KdsNavbar.stories';
import * as FooterStories from '../../components/domain/KdsFooter/KdsFooter.stories';
import * as BottomSheetStories from '../../components/domain/KdsBottomSheet/KdsBottomSheet.stories';

type WithSource = { parameters?: { docs?: { source?: { code?: string } } } };

/**
 * Docs "code" panel of a section story: the HTML + GSP examples of the component stories it
 * uses, taken from those stories (single source of truth), each under a header comment.
 */
const htmlFrom = (...parts: [label: string, story: WithSource][]) => ({
  docs: {
    source: {
      language: 'html',
      type: 'code',
      code: parts
        .map(([label, story]) => `<!-- ${label} -->\n${story.parameters?.docs?.source?.code ?? ''}`)
        .join('\n\n'),
    },
  },
});

/**
 * On boarding — componentes del flujo de activación de la cuenta de cobro (épica KTUF-395),
 * en el orden en que aparecen: tipo de contribuyente → banco → autorización → datos
 * precargados → plan → validación → contrato → cuenta creada, dentro del marco del panel.
 *
 * Cada historia muestra el componente en su pantalla del flujo, con textos y datos ficticios
 * del prototipo. Bajo cada ejemplo (pestaña Docs) está su código HTML + GSP, el mismo de la
 * historia del componente.
 */
const meta: Meta = {
  title: 'On boarding/Componentes',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      // Code panel open by default: the HTML/GSP examples are the point of this section.
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Componentes del onboarding de cuenta de cobro, en el orden del flujo. Bajo cada ejemplo está su código HTML + GSP para usarlo en HTML plano o Grails/GSP.',
      },
    },
  },
  decorators: [
    // Full-screen stories (the panel frame) keep the whole width.
    (Story, context) =>
      context.parameters.layout === 'fullscreen' ? (
        <Story />
      ) : (
        <div className="kds-max-w-lg kds-mx-auto">
          <Story />
        </div>
      ),
  ],
};

export default meta;
type Story = StoryObj;

const PLAN_FEATURES = [
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

/** The two plans of the plan screen (prototype copy), shared by stories 6 and 10. */
function PlanCards({
  name,
  plan,
  onChange,
}: {
  name: string;
  plan: string;
  onChange: (value: string) => void;
}) {
  return (
    <KdsCardPlanGroup label="Plan de cobro">
      <KdsCardPlan
        name={name}
        value="fija"
        selected={plan === 'fija'}
        onSelectedChange={onChange}
        title="Tarifa fija"
        price="0,0105 UF + IVA por transacción"
        description="Incluye descuentos por volumen."
        features={PLAN_FEATURES}
        checkFeatures
      />
      <KdsCardPlan
        name={name}
        value="full"
        selected={plan === 'full'}
        onSelectedChange={onChange}
        recommended
        badgeText="Recomendado"
        title="Full"
        price="2,9% + IVA por transacción"
        features={PLAN_FEATURES}
        checkFeatures
      />
    </KdsCardPlanGroup>
  );
}

const STEPS = [
  'Selección de banco',
  'Selección de cuenta',
  'Selección de plan',
  'Información comercial',
  'Firma de contrato',
];

/**
 * Tipo de contribuyente (solo Chile): `KdsCardSelector` como opción de radio con la lista
 * "Necesitarás", agrupado en `KdsCardSelectorGroup`. KTUF-403 — ver
 * `Domain/Selection/KdsCardSelector → Opción de radio`.
 */
export const TipoDeContribuyente: Story = {
  name: '1 · Tipo de contribuyente',
  parameters: htmlFrom(['KdsCardSelector (opción de radio)', CardSelectorStories.RadioOption]),
  render: function TipoStory() {
    const [tipo, setTipo] = useState('juridica');
    // Unique per instance: the docs page renders each story twice in one document.
    const groupName = useId();
    return (
      <KdsCardSelectorGroup label="Tipo de contribuyente">
        <KdsCardSelector
          radio
          name={groupName}
          value="juridica"
          checked={tipo === 'juridica'}
          onCheckedChange={setTipo}
          icon="business"
          title="Persona jurídica"
          description="Empresas u organizaciones constituidas legalmente, con personalidad jurídica propia."
        >
          <span className="kds-card-selector-eyebrow">Necesitarás</span>
          <ul>
            <li>Acceso a la banca en línea empresas.</li>
            <li>Poder para firmar el contrato en línea.</li>
            <li>Datos del representante legal.</li>
          </ul>
        </KdsCardSelector>
        <KdsCardSelector
          radio
          name={groupName}
          value="natural"
          checked={tipo === 'natural'}
          onCheckedChange={setTipo}
          icon="person"
          title="Persona natural"
          description="Trabajadores independientes o emprendedores que operan su negocio sin constituir una empresa."
        >
          <span className="kds-card-selector-eyebrow">Necesitarás</span>
          <ul>
            <li>Acceso a la banca en línea personas.</li>
            <li>Poder para firmar el contrato en línea.</li>
          </ul>
        </KdsCardSelector>
      </KdsCardSelectorGroup>
    );
  },
};

/**
 * Stepper del flujo: `KdsStepper` numerado, paso actual en color de marca y, en mobile, solo
 * la etiqueta del paso actual. KTUF-402 — ver `Components/Navigation/KdsStepper → Onboarding`.
 */
export const Stepper: Story = {
  name: '2 · Stepper del flujo',
  parameters: htmlFrom(['KdsStepper', StepperStories.Onboarding]),
  render: function StepperStory() {
    const [current, setCurrent] = useState(0);
    return (
      <div className="kds-flex kds-flex-col kds-gap-2">
        <KdsStepper steps={STEPS} current={current} numbered color="primary" currentLabelOnly />
        <div className="kds-flex kds-justify-center kds-gap-1">
          <KdsButton variant="outlined" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            Anterior
          </KdsButton>
          <KdsButton disabled={current === STEPS.length - 1} onClick={() => setCurrent((c) => c + 1)}>
            Siguiente
          </KdsButton>
        </div>
      </div>
    );
  },
};

/**
 * Selección de banco → aviso de redirección: `KdsBottomSheet` (los modales del DS son bottom
 * sheets). KTUF-405 — ver `Components/Overlays/KdsBottomSheet → Onboarding: redirección`.
 */
export const RedireccionAlBanco: Story = {
  name: '3 · Redirección al banco',
  parameters: htmlFrom(['KdsBottomSheet', BottomSheetStories.OnboardingBankRedirect]),
  render: function RedirectStory() {
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
};

/**
 * Autorización de acceso bancario: `KdsConsentCard` + `KdsSecureFooter` afuera de la card.
 * Los textos de finalidad y vigencia vienen del consumidor y deben validarse con
 * Legal/Cumplimiento. KTUF-401 — ver `Domain/Onboarding/KdsConsentCard`.
 */
export const AutorizacionBancaria: Story = {
  name: '4 · Autorización bancaria',
  parameters: htmlFrom(['KdsConsentCard + KdsSecureFooter', ConsentCardStories.Default]),
  render: function ConsentStory() {
    const [loading, setLoading] = useState(false);
    return (
      <div className="kds-screen active kds-max-w-500 kds-mx-auto">
        <KdsConsentCard
          requester="Khipu"
          resource="Banco Santander"
          subtitle="Revisa la información solicitada para autorizar o rechazar su uso"
          logo={<KdsMerchantTile name="Khipu" initials="K" />}
          sections={[
            {
              title: 'Datos solicitados',
              items: [
                { icon: 'check_circle', text: 'Identidad del titular de la cuenta bancaria' },
                { icon: 'check_circle', text: 'Información de la cuenta bancaria' },
              ],
            },
            { title: 'Vigencia de la autorización', items: [{ icon: 'schedule', text: '12 meses (revocable)' }] },
            {
              title: 'Finalidad',
              items: [
                { icon: 'verified', text: 'Validación de datos bancarios' },
                { icon: 'verified', text: 'Validación de transacciones de pago' },
                { icon: 'verified', text: 'Evaluación de riesgo de tu negocio' },
              ],
            },
          ]}
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
};

/**
 * Datos precargados desde el banco: `KdsTextField` y `KdsSelect` en solo lectura (candado,
 * contraste AA, foco neutro). KTUF-396 — ver `Components/Form Inputs/KdsTextField → ReadOnly`
 * y `KdsSelect → Solo lectura`.
 */
export const DatosPrecargados: Story = {
  name: '5 · Datos precargados (solo lectura)',
  parameters: htmlFrom(
    ['KdsTextField solo lectura', TextFieldStories.ReadOnly],
    ['KdsSelect solo lectura', SelectStories.ReadOnly],
    ['KdsSectionNote neutra (origen de los datos)', SectionNoteStories.Neutral],
  ),
  render: () => (
    <div className="kds-flex kds-flex-col kds-gap-2">
      <KdsSelect
        label="Banca"
        name="banca"
        options={[
          { value: 'personas', label: 'Personas' },
          { value: 'empresas', label: 'Empresas' },
        ]}
        value="empresas"
        readOnly
      />
      <KdsTextField label="Nombre de la empresa" value="Comercial Ficticia SpA" readOnly />
      <KdsTextField label="RUT de la empresa" value="76.543.210-3" readOnly />
      <KdsSectionNote className="kds-neutral" icon="lock">
        Datos obtenidos de tu cuenta en Banco Santander.
      </KdsSectionNote>
      <KdsTextField label="Teléfono" defaultValue="+56 2 2345 6789" />
    </div>
  ),
};

/**
 * Selección de plan: `KdsCardPlan` seleccionable en `KdsCardPlanGroup`; "Recomendado" queda
 * solo como badge. KTUF-397 — ver `Domain/Selection/KdsCardPlan → Seleccionable`.
 */
export const SeleccionDePlan: Story = {
  name: '6 · Selección de plan',
  parameters: htmlFrom(['KdsCardPlan seleccionable + KdsCardPlanGroup', CardPlanStories.Selectable]),
  render: function PlanStory() {
    const [plan, setPlan] = useState('full');
    const groupName = useId();
    return <PlanCards name={groupName} plan={plan} onChange={setPlan} />;
  },
};

const VALIDATION = ['Datos de la empresa', 'Representante legal', 'Evaluación de riesgo'];

/**
 * Validación de información comercial: `KdsBottomSheet dismissible={false}` (no se cierra
 * mientras corre) con `KdsProgressChecklist`. Al terminar no se cierra solo: el botón
 * "Validando" pasa a "Continuar a la firma" y es el único control que finaliza y cierra el
 * paso. KTUF-399 y KTUF-405 — ver
 * `Components/Feedback/KdsProgressChecklist` y `KdsBottomSheet → Onboarding: validando`.
 */
export const Validacion: Story = {
  name: '7 · Validación de información',
  parameters: htmlFrom(
    ['KdsBottomSheet no cerrable', BottomSheetStories.OnboardingValidating],
    ['KdsProgressChecklist', ChecklistStories.HtmlMarkup],
  ),
  render: function ValidationStory() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const done = step >= VALIDATION.length;
    const finishRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      if (!open || done) return undefined;
      const t = setTimeout(() => setStep((s) => s + 1), 1300);
      return () => clearTimeout(t);
    }, [open, done, step]);
    // The sheet does not close by itself: the finish control gets the focus when enabled.
    useEffect(() => {
      if (open && done) finishRef.current?.focus();
    }, [open, done]);
    const items = VALIDATION.map((label, i) => ({
      label,
      status: (i < step ? 'done' : i === step ? 'active' : 'pending') as KdsProgressChecklistStatus,
    }));
    return (
      <>
        <KdsButton
          onClick={() => {
            setStep(0);
            setOpen(true);
          }}
        >
          Continuar
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
          <KdsProgressChecklist items={items} />
        </KdsBottomSheet>
      </>
    );
  },
};

const REJECT_MESSAGE = 'Para crear la cuenta de cobro necesitas aceptar el contrato.';

/** Accept / reject actions under the contract; rejecting shows a `KdsSnackbar`. */
const CONTRACT_ACTIONS: WithSource = {
  parameters: {
    docs: {
      source: {
        code: `<div class="kds-flex kds-gap-1">
  <button type="button" class="kds-btn kds-btn-outlined kds-flex-1" id="reject-contract">
    <span>Rechazar condiciones</span>
  </button>
  <button type="submit" class="kds-btn kds-btn-primary kds-flex-1" id="sign-contract" disabled>
    <span>Aceptar y firmar</span>
  </button>
</div>

<script>
  // Rechazar no sale del flujo: avisa con el snackbar del DS (Khipu.showSnackbar del bundle).
  document.getElementById('reject-contract').addEventListener('click', function () {
    Khipu.showSnackbar('${REJECT_MESSAGE}', 'info');
  });
</script>

<!-- GSP -->
<div class="kds-flex kds-gap-1">
  <mat:button type="outlined" id="reject-contract" cssClass="kds-flex-1"
              text="\${message(code: 'contract.reject')}"/>
  <mat:button type="primary" htmlType="submit" id="sign-contract" cssClass="kds-flex-1" disabled="true"
              text="\${message(code: 'contract.acceptAndSign')}"/>
</div>
<%-- payment imprime los scripts con <kh:deferredScripts/>: van en <kh:script> --%>
<kh:script>
  document.getElementById('reject-contract').addEventListener('click', function () {
    Khipu.showSnackbar('\${message(code: 'contract.reject.snackbar').encodeAsJavaScript()}', 'info');
  });
</kh:script>`,
      },
    },
  },
};

/**
 * Firma de contrato: `KdsContract`, el checkbox se habilita al llegar al final. En GSP lo
 * maneja `Khipu.initContract` del bundle. "Rechazar condiciones" no sale del flujo: muestra
 * un `KdsSnackbar` (en GSP, `Khipu.showSnackbar`). KTUF-398 — ver `Domain/Forms/KdsContract`
 * y `Core/KdsSnackbar`.
 */
export const FirmaDeContrato: Story = {
  name: '8 · Firma de contrato',
  parameters: htmlFrom(['KdsContract', ContractStories.Default], ['Acciones + KdsSnackbar', CONTRACT_ACTIONS]),
  render: function ContractStory() {
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(0);
    return (
      <div className="kds-flex kds-flex-col kds-gap-2">
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
            Tercero: el Cobrador declara que la información entregada durante la activación es
            verídica y se compromete a mantenerla actualizada.
          </p>
          <p>
            Cuarto: este mandato es indefinido y cualquiera de las partes puede ponerle término
            avisando a la otra con treinta días de anticipación.
          </p>
          <p>
            <em>[Texto referencial. El contrato vigente se carga desde el sistema.]</em>
          </p>
        </KdsContract>
        <div className="kds-flex kds-gap-1">
          <KdsButton variant="outlined" className="kds-flex-1" onClick={() => setRejected((n) => n + 1)}>
            Rechazar condiciones
          </KdsButton>
          <KdsButton className="kds-flex-1" disabled={!accepted}>
            Aceptar y firmar
          </KdsButton>
        </div>
        {rejected > 0 && (
          <KdsSnackbar key={rejected} message={REJECT_MESSAGE} type="info" onClose={() => setRejected(0)} />
        )}
      </div>
    );
  },
};

/**
 * Cuenta creada: `KdsFeedbackCard` con "¿Cómo nos conociste?", opcional y sin bloquear nada.
 * KTUF-400 — ver `Domain/Feedback/KdsFeedbackCard`.
 */
export const CuentaCreada: Story = {
  name: '9 · Cuenta creada (encuesta)',
  parameters: htmlFrom(['KdsFeedbackCard', FeedbackCardStories.Default]),
  render: function FeedbackStory() {
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
          options={[
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
          ].map((label, i) => ({ value: `opt-${i}`, label }))}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </KdsFeedbackCard>
    );
  },
};

/**
 * Marco del panel donde vive el flujo: `KdsNavbar` + `KdsSidebar` + `KdsFooter`. Achicá el
 * viewport a ≤ 768px para ver la hamburguesa y el drawer. KTUF-404 — ver
 * `Domain/Layout/KdsSidebar → Panel completo`.
 */
export const MarcoDelPanel: Story = {
  name: '10 · Marco del panel',
  parameters: {
    layout: 'fullscreen',
    ...htmlFrom(
      ['KdsNavbar', NavbarStories.Primary],
      ['KdsSidebar', SidebarStories.Default],
      ['KdsFooter', FooterStories.Default],
    ),
  },
  render: function PanelStory() {
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState('full');
    const planName = useId();
    return (
      <div>
        <KdsNavbar
          brand={<strong>khipu</strong>}
          onMenuClick={() => setOpen(true)}
          menuOpen={open}
          menuControls="onboarding-sidebar"
        />
        {/* Same structure as payment's layouts/material.gsp */}
        <div className="kds-container-center kds-page-layout">
          <KdsSidebar
            id="onboarding-sidebar"
            header={{ title: 'Configurar', subtitle: 'ana.perez@correo.cl', icon: 'settings' }}
            items={[
              { label: 'Perfil de usuario', href: '#perfil', icon: 'account_circle' },
              { label: 'Cuentas de cobro', href: '#cuentas', icon: 'list', active: true },
              { label: 'Contactos', href: '#contactos', icon: 'favorite' },
            ]}
            open={open}
            onClose={() => setOpen(false)}
          />
          <main className="kds-main-content">
            <div className="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
              <KdsTypography variant="heading2" as="h1" className="kds-m-0">
                Configuración de cuenta para persona jurídica
              </KdsTypography>
              <KdsStepper steps={STEPS} current={2} numbered color="primary" currentLabelOnly />
              <KdsTypography variant="body-large">
                Elige el plan de cobro que mejor se ajuste a tu negocio
              </KdsTypography>
              <PlanCards name={planName} plan={plan} onChange={setPlan} />
              <KdsButton fullWidth>Continuar</KdsButton>
            </div>
          </main>
        </div>
        <KdsFooter
          columns={[
            {
              title: 'Productos',
              links: [{ label: 'Pagos Instantáneos', href: 'https://www.khipu.com/page/product/pagos-instantaneos', external: true }],
            },
            { title: 'Desarrolladores', links: [{ label: 'APIs', href: 'https://docs.khipu.com/', external: true }] },
            { title: 'Legal', links: [{ label: 'Contrato cobrador', href: 'https://www.khipu.com/page/contrato-cobrador', external: true }] },
          ]}
        >
          <p className="small kds-text-center">© 2026 Khipu SpA. Todos los derechos reservados.</p>
        </KdsFooter>
      </div>
    );
  },
};
