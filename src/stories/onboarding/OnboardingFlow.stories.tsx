import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsAlert,
  KdsButton,
  KdsCheckbox,
  KdsChip,
  KdsDivider,
  KdsProgressChecklist,
  KdsSectionNote,
  KdsSelect,
  KdsSnackbar,
  KdsSpinner,
  KdsStatusBlock,
  KdsStepper,
  KdsTextField,
  KdsTypography,
  type KdsProgressChecklistStatus,
} from '../../components/core';
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
import FLOW_GSP from './OnboardingFlow.example.gsp?raw';

/**
 * On boarding — flujo completo de activación de la cuenta de cobro (persona jurídica, Chile),
 * armado solo con componentes del DS y navegable de punta a punta, con los datos ficticios
 * del prototipo precargados.
 *
 * Orden: activación → país → moneda → tipo de contribuyente → (1) banco + aviso de
 * redirección → (2) autorización bancaria (fuera del panel) y cuenta de recaudación → (3) plan
 * → (4) información comercial en 3 pantallas + validación → (5) firma de contrato → cuenta
 * creada con la encuesta.
 *
 * El ingreso a la banca en línea (usuario y clave del banco) no está: es una página del banco,
 * fuera del DS. Bajo el ejemplo (pestaña Docs) está el flujo completo en GSP para payment
 * (`OnboardingFlow.example.gsp`); el código de cada componente por separado está en
 * `On boarding/Componentes`.
 */
const meta: Meta = {
  title: 'On boarding/Flujo completo',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      // Code panel open by default: the GSP of the whole flow is the point of the docs page.
      canvas: { sourceState: 'shown' },
      source: { language: 'html', type: 'code', code: FLOW_GSP },
      story: { inline: false, height: '760px' },
    },
  },
};

export default meta;
type Story = StoryObj;

const STEPS = [
  'Selección de banco',
  'Selección de cuenta',
  'Selección de plan',
  'Información comercial',
  'Firma de contrato',
];

/** Steps of the account creation, before the 5-step configuration. */
const SETUP_STEPS = ['País', 'Moneda', 'Tipo de contribuyente'];

const BANKS = ['Banco de Chile', 'BancoEstado', 'Banco Santander', 'Bci', 'Itaú', 'Scotiabank'];

const INDUSTRIES = [
  'Fintech y finanzas',
  'Comercio y e-commerce',
  'Proveedor de servicios de pago (PSP)',
  'Logística y distribución',
  'Tecnología y software',
  'Servicios profesionales y consultoría',
  'Educación y capacitación',
  'Salud y bienestar',
  'Startups y emprendimientos',
];

const MODELS = [
  'Vendo mis propios productos y servicios',
  'Soy pasarela de pagos/cobro por terceros',
  'Manejo múltiples subcuentas monorrubro',
  'Manejo múltiples subcuentas multirrubro',
  'Ninguna aplica a mi negocio',
];

const SALES = [
  'Hasta $5.000.000 CLP al mes',
  'Entre $5.000.000 y $50.000.000 CLP al mes',
  'Más de $50.000.000 CLP al mes',
];

const SERVICES = ['Pagos Instantáneos', 'Pagos Automáticos', 'OpenData (WaaS)'];

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

const CONTACTS = [
  ['comercial', 'Contacto comercial'],
  ['tecnico', 'Contacto técnico'],
  ['operaciones', 'Contacto de operaciones'],
  ['administrativo', 'Contacto administrativo'],
  ['pagos', 'Encargado de pagos'],
] as const;

type ContactKey = (typeof CONTACTS)[number][0];
type Contact = { name: string; email: string; phone: string; whatsapp: string };

const DEMO_CONTACT: Contact = {
  name: 'Camila Rojas Ficticia',
  email: 'camila@comercialficticia.cl',
  phone: '+56 9 2222 3333',
  whatsapp: '+56 9 2222 3333',
};

const SOURCES = [
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
];

const VALIDATION = ['Datos de la empresa', 'Representante legal', 'Evaluación de riesgo'];

const COMPANY = { name: 'Comercial Ficticia SpA', rut: '76.543.210-3' };

const REJECT_MESSAGE = 'Para crear la cuenta de cobro necesitas aceptar el contrato.';

const SCREENS = [
  'activa',
  'pais',
  'moneda',
  'tipo',
  'banco',
  'autoriza',
  'cuenta',
  'plan',
  'negocio',
  'empresa',
  'contactos',
  'firma',
  'exito',
] as const;

type Screen = (typeof SCREENS)[number];

/** Stepper step of each screen inside the 5-step part of the flow. */
const STEP_OF: Partial<Record<Screen, number>> = {
  banco: 0,
  cuenta: 1,
  plan: 2,
  negocio: 3,
  empresa: 3,
  contactos: 3,
  firma: 4,
};

const options = (labels: readonly string[]) => labels.map((label) => ({ value: label, label }));

/** Fictitious data of the prototype, prefilled so the whole flow can be clicked through. */
const initialData = () => ({
  pais: 'Chile',
  tipo: 'juridica',
  banco: 'Banco Santander',
  cuenta: 'cc1',
  plan: 'full',
  industria: 'Tecnología y software',
  modelo: MODELS[0],
  ventas: SALES[1],
  servicio: SERVICES[0],
  telefono: '+56 2 2345 6789',
  correo: 'contacto@comercialficticia.cl',
  giro: 'Venta al por menor de artículos de ferretería',
  direccion: 'Avenida Ficticia 1234, Providencia',
  representante: 'Ana Pérez Ficticia',
  representanteRut: '12.345.678-5',
  contactos: Object.fromEntries(
    CONTACTS.map(([key]) => [key, key === 'comercial' ? DEMO_CONTACT : { name: '', email: '', phone: '', whatsapp: '' }]),
  ) as Record<ContactKey, Contact>,
  mismosContactos: false,
});

type Data = ReturnType<typeof initialData>;

/** Card of a flow screen: title, optional stepper, subtitle and content. */
function FlowCard({
  title,
  step,
  steps = STEPS,
  subtitle,
  lead,
  children,
}: {
  title: string;
  step?: number;
  steps?: string[];
  subtitle?: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="kds-card-elevated kds-max-w-md kds-flex kds-flex-col kds-gap-2">
      <KdsTypography variant="heading2" as="h1" className="kds-m-0">
        {title}
      </KdsTypography>
      {step !== undefined && (
        <KdsStepper steps={steps} current={step} numbered color="primary" currentLabelOnly />
      )}
      {subtitle && (
        <KdsTypography variant="body-large" as="h2" className="kds-m-0 kds-color-primary kds-fw-medium">
          {subtitle}
        </KdsTypography>
      )}
      {lead && <KdsTypography variant="body">{lead}</KdsTypography>}
      {children}
    </div>
  );
}

/** Two fields side by side from tablet up, stacked on phones. */
function FieldPair({ children }: { children: ReactNode }) {
  return <div className="kds-grid">{children}</div>;
}

function Half({ children }: { children: ReactNode }) {
  return <div className="kds-col-sm-12 kds-col-md-6">{children}</div>;
}

/**
 * Flujo completo, navegable: "Continuar" avanza, "Volver" retrocede. Los datos ficticios ya
 * vienen cargados; se pueden cambiar en cada pantalla. En mobile (≤ 768px) el panel pasa a
 * hamburguesa + drawer, el stepper muestra solo el paso actual y los modales son bottom sheets.
 */
export const FlujoCompleto: Story = {
  name: 'Flujo completo',
  render: function OnboardingFlow() {
    const [screen, setScreen] = useState<Screen>('activa');
    const [data, setData] = useState<Data>(initialData);
    const [menuOpen, setMenuOpen] = useState(false);
    const [redirectOpen, setRedirectOpen] = useState(false);
    const [validating, setValidating] = useState(false);
    const [validationStep, setValidationStep] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(0);
    const [notice, setNotice] = useState<string | null>(null);
    const [source, setSource] = useState('');
    const [surveySent, setSurveySent] = useState(false);
    const finishRef = useRef<HTMLButtonElement>(null);
    const ids = useId();
    const validationDone = validationStep >= VALIDATION.length;

    const set = <K extends keyof Data>(key: K, value: Data[K]) => setData((d) => ({ ...d, [key]: value }));
    const go = (to: Screen) => {
      setScreen(to);
      setMenuOpen(false);
      // Notices belong to the screen that raised them.
      setRejected(0);
      setNotice(null);
      window.scrollTo({ top: 0 });
    };
    const next = () => go(SCREENS[Math.min(SCREENS.indexOf(screen) + 1, SCREENS.length - 1)]);
    const back = () => go(SCREENS[Math.max(SCREENS.indexOf(screen) - 1, 0)]);

    const setContact = (key: ContactKey, field: keyof Contact, value: string) =>
      setData((d) => {
        const contactos = { ...d.contactos, [key]: { ...d.contactos[key], [field]: value } };
        // "Usar estos datos para todos" keeps the other contacts in sync while typing.
        if (key === 'comercial' && d.mismosContactos) {
          CONTACTS.forEach(([k]) => {
            contactos[k] = { ...contactos.comercial };
          });
        }
        return { ...d, contactos };
      });

    const toggleSameContacts = (checked: boolean) =>
      setData((d) => ({
        ...d,
        mismosContactos: checked,
        contactos: checked
          ? (Object.fromEntries(CONTACTS.map(([k]) => [k, { ...d.contactos.comercial }])) as Record<ContactKey, Contact>)
          : d.contactos,
      }));

    // Validation runs by itself; the dialog only closes with its own button when it ends.
    useEffect(() => {
      if (!validating || validationDone) return undefined;
      const t = setTimeout(() => setValidationStep((s) => s + 1), 1300);
      return () => clearTimeout(t);
    }, [validating, validationDone, validationStep]);

    useEffect(() => {
      if (validating && validationDone) finishRef.current?.focus();
    }, [validating, validationDone]);

    const actions = (canContinue = true, onContinue = next, label = 'Continuar') => (
      <div className="kds-flex kds-gap-1">
        {screen !== 'activa' && (
          <KdsButton variant="outlined" className="kds-flex-1" onClick={back}>
            Volver
          </KdsButton>
        )}
        <KdsButton className="kds-flex-1" disabled={!canContinue} onClick={onContinue}>
          {label}
        </KdsButton>
      </div>
    );

    const companyTitle = 'Configuración de cuenta para persona jurídica';
    const step = STEP_OF[screen];

    const content = (() => {
      switch (screen) {
        case 'activa':
          return (
            <FlowCard title="Activa tu cuenta de cobro">
              <KdsTypography variant="body-large">
                Para habilitar tu cuenta de cobro, necesitamos validar algunos datos de tu negocio y
                de tu cuenta bancaria.
              </KdsTypography>
              <KdsButton fullWidth onClick={next}>
                Comenzar activación
              </KdsButton>
              <KdsButton variant="text" fullWidth onClick={() => setNotice('Te recordaremos activar tu cuenta más tarde.')}>
                Lo haré más tarde
              </KdsButton>
            </FlowCard>
          );
        case 'pais':
          return (
            <FlowCard title="Creación de la cuenta de cobro" step={0} steps={SETUP_STEPS} subtitle="¿En qué país vas a cobrar?">
              <KdsSelect
                label="País"
                placeholder="Selecciona un país"
                options={options(['Chile', 'Perú', 'Argentina'])}
                value={data.pais}
                onChange={(e) => set('pais', e.target.value)}
              />
              {actions(data.pais === 'Chile')}
            </FlowCard>
          );
        case 'moneda':
          return (
            <FlowCard title="Creación de la cuenta de cobro" step={1} steps={SETUP_STEPS} subtitle="¿En qué moneda vas a cobrar?">
              <KdsTextField
                label="Moneda de la cuenta"
                value="Peso chileno (CLP)"
                readOnly
                helperText="En Chile solo puedes cobrar en pesos chilenos."
              />
              {actions()}
            </FlowCard>
          );
        case 'tipo':
          return (
            <FlowCard
              title="Creación de la cuenta de cobro"
              step={2} steps={SETUP_STEPS}
              subtitle="¿Qué tipo de contribuyente eres?"
            >
              <KdsCardSelectorGroup label="Tipo de contribuyente">
                <KdsCardSelector
                  radio
                  name={`${ids}-tipo`}
                  value="juridica"
                  checked={data.tipo === 'juridica'}
                  onCheckedChange={(v) => set('tipo', v)}
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
                  name={`${ids}-tipo`}
                  value="natural"
                  checked={data.tipo === 'natural'}
                  onCheckedChange={(v) => set('tipo', v)}
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
              {data.tipo === 'natural' && (
                <KdsAlert severity="info">Este recorrido muestra el flujo de persona jurídica.</KdsAlert>
              )}
              {actions(data.tipo === 'juridica')}
            </FlowCard>
          );
        case 'banco':
          return (
            <FlowCard
              title={companyTitle}
              step={step}
              subtitle="¿En qué banco recibirás tus pagos?"
              lead="Luego validaremos el acceso a tu cuenta bancaria."
            >
              <FieldPair>
                <Half>
                  <KdsSelect
                    label="Banca"
                    name="banca"
                    options={options(['Personas', 'Empresas'])}
                    value="Empresas"
                    readOnly
                  />
                </Half>
                <Half>
                  <KdsSelect
                    label="Banco de recaudación"
                    placeholder="Selecciona un banco"
                    options={options(BANKS)}
                    value={data.banco}
                    onChange={(e) => set('banco', e.target.value)}
                  />
                </Half>
              </FieldPair>
              {actions(data.banco !== '', () => setRedirectOpen(true))}
            </FlowCard>
          );
        case 'cuenta':
          return (
            <FlowCard title={companyTitle} step={step}>
              <KdsAlert severity="success">Validamos el acceso a tu cuenta en {data.banco}.</KdsAlert>
              <KdsTypography variant="body-large" as="h2" className="kds-m-0 kds-color-primary kds-fw-medium">
                ¿En qué cuenta quieres recibir tus pagos?
              </KdsTypography>
              <KdsCardSelectorGroup label="Cuenta de recaudación">
                {[
                  ['cc1', 'N° 0-000-1234567-8'],
                  ['cc2', 'N° 0-000-7654321-0'],
                ].map(([value, number]) => (
                  <KdsCardSelector
                    key={value}
                    radio
                    name={`${ids}-cuenta`}
                    value={value}
                    checked={data.cuenta === value}
                    onCheckedChange={(v) => set('cuenta', v)}
                    icon="account_balance"
                    title="Cuenta Corriente"
                    description={number}
                  />
                ))}
              </KdsCardSelectorGroup>
              {actions(data.cuenta !== '')}
            </FlowCard>
          );
        case 'plan':
          return (
            <FlowCard title={companyTitle} step={step} subtitle="Elige el plan de cobro que mejor se ajuste a tu negocio">
              <KdsCardPlanGroup label="Plan de cobro">
                <KdsCardPlan
                  name={`${ids}-plan`}
                  value="fija"
                  selected={data.plan === 'fija'}
                  onSelectedChange={(v) => set('plan', v)}
                  title="Tarifa fija"
                  price="0,0105 UF + IVA por transacción"
                  description="Incluye descuentos por volumen."
                  features={PLAN_FEATURES}
                  checkFeatures
                />
                <KdsCardPlan
                  name={`${ids}-plan`}
                  value="full"
                  selected={data.plan === 'full'}
                  onSelectedChange={(v) => set('plan', v)}
                  recommended
                  badgeText="Recomendado"
                  title="Full"
                  price="2,9% + IVA por transacción"
                  features={PLAN_FEATURES}
                  checkFeatures
                />
              </KdsCardPlanGroup>
              {actions(data.plan !== '')}
            </FlowCard>
          );
        case 'negocio':
          return (
            <FlowCard title={companyTitle} step={step} subtitle="Completa tu información comercial (1/3)">
              <KdsTypography variant="label" as="h3" className="kds-m-0">
                Sobre tu negocio
              </KdsTypography>
              <KdsSelect
                label="Industria"
                placeholder="Selecciona una industria"
                options={options(INDUSTRIES)}
                value={data.industria}
                onChange={(e) => set('industria', e.target.value)}
              />
              <KdsSelect
                label="Modelo de recaudación"
                placeholder="Selecciona un modelo"
                options={options(MODELS)}
                value={data.modelo}
                onChange={(e) => set('modelo', e.target.value)}
              />
              <KdsSelect
                label="Ventas online al mes"
                placeholder="Selecciona un tramo"
                helperText="Montos referenciales"
                options={options(SALES)}
                value={data.ventas}
                onChange={(e) => set('ventas', e.target.value)}
              />
              <KdsDivider />
              <KdsTypography variant="label" as="h3" className="kds-m-0">
                Qué te interesa de Khipu
              </KdsTypography>
              <KdsSelect
                label="Servicio de interés"
                placeholder="Selecciona un servicio"
                options={options(SERVICES)}
                value={data.servicio}
                onChange={(e) => set('servicio', e.target.value)}
              />
              {actions(Boolean(data.industria && data.modelo && data.ventas && data.servicio))}
            </FlowCard>
          );
        case 'empresa':
          return (
            <FlowCard title={companyTitle} step={step} subtitle="Completa tu información comercial (2/3)">
              <KdsTypography variant="label" as="h3" className="kds-m-0">
                Datos de la empresa
              </KdsTypography>
              <FieldPair>
                <Half>
                  <KdsTextField label="Nombre de la empresa" value={COMPANY.name} readOnly />
                </Half>
                <Half>
                  <KdsTextField label="RUT de la empresa" value={COMPANY.rut} readOnly />
                </Half>
              </FieldPair>
              <KdsSectionNote className="kds-neutral" icon="lock">
                Datos obtenidos de tu cuenta en {data.banco}.
              </KdsSectionNote>
              <FieldPair>
                <Half>
                  <KdsTextField label="Teléfono" type="tel" value={data.telefono} onChange={(e) => set('telefono', e.target.value)} />
                </Half>
                <Half>
                  <KdsTextField label="Correo corporativo" type="email" value={data.correo} onChange={(e) => set('correo', e.target.value)} />
                </Half>
              </FieldPair>
              <KdsTextField label="Giro comercial" value={data.giro} onChange={(e) => set('giro', e.target.value)} />
              <KdsTextField label="Dirección de la empresa" value={data.direccion} onChange={(e) => set('direccion', e.target.value)} />
              <KdsDivider />
              <KdsTypography variant="label" as="h3" className="kds-m-0">
                Datos del firmante
              </KdsTypography>
              <FieldPair>
                <Half>
                  <KdsTextField
                    label="Representante legal"
                    value={data.representante}
                    onChange={(e) => set('representante', e.target.value)}
                  />
                </Half>
                <Half>
                  <KdsTextField
                    label="RUT del representante legal"
                    value={data.representanteRut}
                    onChange={(e) => set('representanteRut', e.target.value)}
                  />
                </Half>
              </FieldPair>
              {actions(
                [data.telefono, data.correo, data.giro, data.direccion, data.representante, data.representanteRut].every(
                  (v) => v.trim() !== '',
                ),
              )}
            </FlowCard>
          );
        case 'contactos': {
          const commercial = data.contactos.comercial;
          return (
            <FlowCard title={companyTitle} step={step} subtitle="Completa tu información comercial (3/3)">
              {CONTACTS.map(([key, label], i) => (
                <div key={key} className="kds-flex kds-flex-col kds-gap-2">
                  {i > 0 && <KdsDivider />}
                  <KdsTypography variant="label" as="h3" className="kds-m-0">
                    {label}
                    {i > 0 && ' (opcional)'}
                  </KdsTypography>
                  <FieldPair>
                    <Half>
                      <KdsTextField
                        label="Nombre y apellido"
                        value={data.contactos[key].name}
                        onChange={(e) => setContact(key, 'name', e.target.value)}
                        readOnly={i > 0 && data.mismosContactos}
                      />
                    </Half>
                    <Half>
                      <KdsTextField
                        label="Email"
                        type="email"
                        value={data.contactos[key].email}
                        onChange={(e) => setContact(key, 'email', e.target.value)}
                        readOnly={i > 0 && data.mismosContactos}
                      />
                    </Half>
                    <Half>
                      <KdsTextField
                        label="Teléfono"
                        type="tel"
                        value={data.contactos[key].phone}
                        onChange={(e) => setContact(key, 'phone', e.target.value)}
                        readOnly={i > 0 && data.mismosContactos}
                      />
                    </Half>
                    <Half>
                      <KdsTextField
                        label="WhatsApp"
                        type="tel"
                        value={data.contactos[key].whatsapp}
                        onChange={(e) => setContact(key, 'whatsapp', e.target.value)}
                        readOnly={i > 0 && data.mismosContactos}
                      />
                    </Half>
                  </FieldPair>
                  {i === 0 && (
                    <KdsCheckbox
                      label="Usar estos datos para todos los contactos"
                      checked={data.mismosContactos}
                      onChange={(e) => toggleSameContacts(e.target.checked)}
                    />
                  )}
                </div>
              ))}
              {actions(
                Object.values(commercial).every((v) => v.trim() !== ''),
                () => {
                  setValidationStep(0);
                  setValidating(true);
                },
              )}
            </FlowCard>
          );
        }
        case 'firma':
          return (
            <FlowCard title={companyTitle} step={step}>
              <KdsAlert severity="success">Validamos tu información comercial.</KdsAlert>
              <KdsTypography variant="body-large" as="h2" className="kds-m-0 kds-color-primary kds-fw-medium">
                A continuación, revisa los detalles para la firma de tu contrato
              </KdsTypography>
              <KdsTypography variant="label" as="h3" className="kds-m-0">
                Datos del firmante
              </KdsTypography>
              <FieldPair>
                <Half>
                  <KdsTextField label="Representante legal" value={data.representante} readOnly />
                </Half>
                <Half>
                  <KdsTextField label="RUT del representante legal" value={data.representanteRut} readOnly />
                </Half>
              </FieldPair>
              <KdsDivider />
              <KdsTypography variant="label" as="h3" className="kds-m-0">
                Revisa tu contrato antes de firmarlo
              </KdsTypography>
              <KdsContract name="acepta" accepted={accepted} onAcceptedChange={setAccepted}>
                <p>
                  <strong>MANDATO PARA PERCIBIR EL PAGO</strong>
                </p>
                <p>
                  <strong>Khipu SpA y {COMPANY.name}</strong>
                </p>
                <p>
                  En Santiago, entre Khipu SpA, en adelante “Khipu”, y {COMPANY.name}, RUT{' '}
                  {COMPANY.rut}, representada por {data.representante}, RUT {data.representanteRut},
                  ambos con domicilio en {data.direccion}, en adelante “el Cobrador”, se acuerda el
                  siguiente mandato.
                </p>
                <p>
                  Primero: el Cobrador encarga a Khipu recibir, en su nombre, los pagos que sus
                  clientes realicen mediante los medios de pago habilitados en su cuenta de cobro.
                </p>
                <p>
                  Segundo: los fondos recibidos se transferirán a la cuenta corriente registrada por
                  el Cobrador, según el plan {data.plan === 'fija' ? 'Tarifa fija' : 'Full'} elegido
                  en este proceso.
                </p>
                <p>
                  <em>[Texto referencial. El contrato vigente se carga desde el sistema.]</em>
                </p>
              </KdsContract>
              <div className="kds-flex kds-gap-1">
                <KdsButton variant="outlined" className="kds-flex-1" onClick={() => setRejected((n) => n + 1)}>
                  Rechazar condiciones
                </KdsButton>
                <KdsButton className="kds-flex-1" disabled={!accepted} onClick={next}>
                  Aceptar y firmar
                </KdsButton>
              </div>
            </FlowCard>
          );
        case 'exito':
          return (
            <div className="kds-max-w-md kds-flex kds-flex-col kds-gap-2">
              <FlowCard title="¡Listo! Creamos tu cuenta de cobro">
                <KdsStatusBlock status="success" icon="check" title="Tu cuenta ya está habilitada para cobrar" />
                <div className="kds-flex kds-justify-center">
                  <KdsChip color="primary">{`${COMPANY.name} · ID 302.360`}</KdsChip>
                </div>
                <KdsButton fullWidth onClick={() => setNotice('Aquí partiría el panel de cobros.')}>
                  Ir a cobrar
                </KdsButton>
                <KdsButton variant="text" fullWidth onClick={() => setNotice('Aquí se abrirían las opciones de la cuenta.')}>
                  Opciones de la cuenta
                </KdsButton>
              </FlowCard>
              <KdsFeedbackCard
                title="Cuéntanos cómo nos conociste"
                description="Nos ayuda a mejorar cómo llegamos a nuevos clientes."
                canSubmit={source !== ''}
                onSubmit={() => setSurveySent(true)}
                submitted={surveySent}
              >
                <KdsSelect
                  label="¿Cómo nos conociste?"
                  placeholder="Selecciona una opción"
                  options={options(SOURCES)}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </KdsFeedbackCard>
              <KdsButton
                variant="outlined"
                onClick={() => {
                  setData(initialData());
                  setAccepted(false);
                  setSource('');
                  setSurveySent(false);
                  go('activa');
                }}
              >
                Reiniciar recorrido
              </KdsButton>
            </div>
          );
        default:
          return null;
      }
    })();

    const overlays = (
      <>
        <KdsBottomSheet
          variant="dialog"
          open={redirectOpen}
          onClose={() => setRedirectOpen(false)}
          title={`Continúa en la banca en línea de ${data.banco}`}
          description="Allí podrás revisar qué datos se consultan y para qué, antes de autorizar la verificación de tu cuenta."
          actions={
            <>
              <KdsButton
                fullWidth
                onClick={() => {
                  setRedirectOpen(false);
                  go('autoriza');
                }}
              >
                Continuar
              </KdsButton>
              <KdsButton variant="outlined" fullWidth onClick={() => setRedirectOpen(false)}>
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
        <KdsBottomSheet
          variant="dialog"
          align="center"
          open={validating}
          onClose={() => undefined}
          dismissible={false}
          icon={
            validationDone ? (
              <i className="material-symbols-outlined kds-color-success" aria-hidden="true">
                check_circle
              </i>
            ) : (
              <KdsSpinner />
            )
          }
          title={validationDone ? 'Validamos tu información' : 'Validando información comercial'}
          description={
            validationDone
              ? 'Todo está en orden. Continúa para revisar y firmar tu contrato.'
              : `Revisamos la información de ${COMPANY.name} y de su representante legal, y evaluamos el riesgo de tu empresa. Esto toma unos segundos.`
          }
          hint={validationDone ? undefined : 'No cierres esta ventana.'}
          actions={
            <KdsButton
              ref={finishRef}
              fullWidth
              disabled={!validationDone}
              onClick={() => {
                setValidating(false);
                go('firma');
              }}
            >
              {validationDone ? 'Continuar a la firma' : 'Validando…'}
            </KdsButton>
          }
        >
          <KdsProgressChecklist
            items={VALIDATION.map((label, i) => ({
              label,
              status: (i < validationStep
                ? 'done'
                : i === validationStep
                  ? 'active'
                  : 'pending') as KdsProgressChecklistStatus,
            }))}
          />
        </KdsBottomSheet>
        {rejected > 0 && (
          <KdsSnackbar key={`reject-${rejected}`} message={REJECT_MESSAGE} type="info" onClose={() => setRejected(0)} />
        )}
        {notice && <KdsSnackbar key={notice} message={notice} type="info" onClose={() => setNotice(null)} />}
      </>
    );

    // Bank authorization is Khipu's authorization page, outside the panel.
    if (screen === 'autoriza') {
      return (
        <div className="kds-screen active kds-max-w-500 kds-mx-auto">
          <KdsConsentCard
            requester="Khipu"
            resource={data.banco}
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
            onAccept={() => go('cuenta')}
            onReject={() => go('banco')}
          />
          <KdsSecureFooter>Operado por</KdsSecureFooter>
        </div>
      );
    }

    return (
      <div>
        <KdsNavbar
          brand={<strong>khipu</strong>}
          onMenuClick={() => setMenuOpen(true)}
          menuOpen={menuOpen}
          menuControls={`${ids}-sidebar`}
        />
        {/* Same structure as payment's layouts/material.gsp */}
        <div className="kds-container-center kds-page-layout">
          <KdsSidebar
            id={`${ids}-sidebar`}
            header={{ title: 'Configurar', subtitle: 'ana.perez@correo.cl', icon: 'settings' }}
            items={[
              { label: 'Perfil de usuario', href: '#perfil', icon: 'account_circle' },
              { label: 'Cuentas de cobro', href: '#cuentas', icon: 'list', active: true },
              { label: 'Contactos', href: '#contactos', icon: 'favorite' },
            ]}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
          <main className="kds-main-content">{content}</main>
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
        {overlays}
      </div>
    );
  },
};
