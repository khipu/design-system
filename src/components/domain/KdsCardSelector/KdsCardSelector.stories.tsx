import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsCardSelector, KdsCardSelectorGroup } from './KdsCardSelector';

/**
 * KdsCardSelector — card grande clickeable con icon + título + descripción para selección de método.
 *
 * Layout & sizing (spec):
 * - `padding: 24px` (`var(--kds-spacing-3)`)
 * - `border: 2px solid var(--kds-border-light)`
 * - `border-radius: var(--kds-radius-md)`
 * - `text-align: left`, `cursor: pointer`
 * - `display: flex; flex-direction: column`
 *
 * Icon container (`.kds-card-selector-icon`):
 * - `48 x 48`, `border-radius: 8px`, `margin-bottom: 16px`
 * - `background: var(--kds-color-primary-focus)` (rgba primary 12%)
 * - Icon i: `24 x 24`, `color: var(--kds-color-primary-main)`
 *
 * Title (`.kds-card-selector-title`):
 * - `font-size: 16px`, `font-weight: 600`, `margin-bottom: 8px`
 * - `color: var(--kds-color-text-primary)`
 *
 * Description (`.kds-card-selector-description`):
 * - `font-size: 14px`, `line-height: 1.5`
 * - `color: var(--kds-color-text-secondary)`
 *
 * Estados:
 * - Hover: `border-color: #D1D5DB` (gray-300)
 * - **Selected** (fix Fase 1): `border-color: var(--kds-color-primary-main)` + `background: var(--kds-color-primary-faint)` + `box-shadow: var(--kds-shadow-md)`
 *
 * @css .kds-card-selector, .kds-card-selector-icon, .kds-card-selector-title, .kds-card-selector-description, .kds-card-selector.selected
 */
const meta: Meta<typeof KdsCardSelector> = {
  title: 'Domain/Selection/KdsCardSelector',
  component: KdsCardSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card grande clickeable para selección de método (típicamente pagos). Padding 24px, border 2px, radius md. Icon container 48×48 con bg primary-focus (12% purple). Title 16px/600, description 14px text-secondary. Estado `selected` aplica border + bg primary-main/primary-faint (corregido en Fase 1: antes usaba azul Material).',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean', description: 'Aplica border + background primary y shadow-md.' },
    title: { control: 'text', description: 'Título principal (16px semibold).' },
    description: { control: 'text', description: 'Descripción opcional (14px text-secondary).' },
    icon: { control: 'text', description: 'Material Symbol del icon container.' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCardSelector>;

/**
 * Tarjeta de seleccion para un metodo de pago.
 */
export const Default: Story = {
  args: {
    title: 'Transferencia bancaria',
    description: 'Paga directamente desde tu banco',
    icon: 'account_balance',
  },
};

/**
 * Tarjeta en estado seleccionado.
 */
export const Selected: Story = {
  args: {
    title: 'Transferencia bancaria',
    description: 'Paga directamente desde tu banco',
    icon: 'account_balance',
    selected: true,
  },
};

/**
 * Selector de metodo de pago interactivo con tres opciones.
 */
export const PaymentMethodSelector: Story = {
  render: function PaymentMethodSelectorExample() {
    const [selected, setSelected] = useState<string | null>(null);

    const methods = [
      {
        id: 'transfer',
        title: 'Transferencia bancaria',
        description: 'Paga directamente desde tu banco',
        icon: 'account_balance',
      },
      {
        id: 'qr',
        title: 'Codigo QR',
        description: 'Escanea y paga desde tu app',
        icon: 'qr_code_2',
      },
      {
        id: 'card',
        title: 'Tarjeta de credito',
        description: 'Visa, Mastercard o American Express',
        icon: 'credit_card',
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
        {methods.map((method) => (
          <KdsCardSelector
            key={method.id}
            title={method.title}
            description={method.description}
            icon={method.icon}
            selected={selected === method.id}
            onClick={() => setSelected(method.id)}
          />
        ))}
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
 * <button type="button" class="kds-card-selector selected">
 *   <span class="kds-card-selector-icon">
 *     <i class="material-symbols-outlined">credit_card</i>
 *   </span>
 *   <span class="kds-card-selector-title">Tarjeta de crédito</span>
 *   <span class="kds-card-selector-description">Pago instantáneo, sin necesidad de cuenta bancaria.</span>
 * </button>
 * ```
 *
 * Ver `Patterns/CSS-only → CardSelector` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<button type="button" class="kds-card-selector selected">
  <span class="kds-card-selector-icon">
    <i class="material-symbols-outlined">credit_card</i>
  </span>
  <span class="kds-card-selector-title">Tarjeta de crédito</span>
  <span class="kds-card-selector-description">
    Pago instantáneo, sin necesidad de cuenta bancaria.
  </span>
</button>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <button type="button" className="kds-card-selector selected">
        <span className="kds-card-selector-icon">
          <i className="material-symbols-outlined">credit_card</i>
        </span>
        <span className="kds-card-selector-title">Tarjeta de crédito</span>
        <span className="kds-card-selector-description">
          Pago instantáneo, sin necesidad de cuenta bancaria.
        </span>
      </button>
    </div>
  ),
};

/**
 * Opción de radio con contenido enriquecido — con `radio` + `name` + `value` la card deja de ser un
 * `<button>` y pasa a ser una opción de radio nativa (`.kds-card-selector--radio`):
 * `<input type="radio" class="kds-card-selector-radio">` arriba a la derecha y el título como
 * su `<label>`, estirado sobre toda la card. Hace falta para contenido de bloque como la lista
 * "Necesitarás" (`children`), que un `<button>` no admite.
 *
 * - Las cards con el mismo `name` forman un grupo nativo: flechas, un solo elegido y envío en
 *   el form, sin JS. El grupo va en `KdsCardSelectorGroup` (`role="radiogroup"`).
 * - El radio se describe con la descripción (`aria-describedby`).
 * - Estado elegido y foco salen de CSS con `:has` (en `@supports`): sin soporte, el radio
 *   nativo muestra la elección y su propio anillo de foco.
 * - Mismo indicador que `KdsCardPlan` seleccionable.
 *
 * En payment reemplaza el patrón de `merchant/selectFlowType.gsp` (cards `<div>` +
 * `khipu-onboarding.js` + hidden input), que hoy no se puede usar con teclado.
 */
export const RadioOption: Story = {
  name: 'Opción de radio (tipo de contribuyente)',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-selector-group" role="radiogroup" aria-label="Tipo de contribuyente">
  <div class="kds-card-selector kds-card-selector--radio">
    <input type="radio" class="kds-card-selector-radio" id="tipo-juridica" name="tipo"
           value="juridica" aria-describedby="tipo-juridica-desc"/>
    <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">business</i></span>
    <label for="tipo-juridica" class="kds-card-selector-title">Persona jurídica</label>
    <span class="kds-card-selector-description" id="tipo-juridica-desc">
      Empresas u organizaciones constituidas legalmente, con personalidad jurídica propia.
    </span>
    <div class="kds-card-selector-details">
      <span class="kds-card-selector-eyebrow">Necesitarás</span>
      <ul>
        <li>Acceso a la banca en línea empresas.</li>
        <li>Poder para firmar el contrato en línea.</li>
        <li>Datos del representante legal.</li>
      </ul>
    </div>
  </div>
  <!-- …misma estructura para "natural" -->
</div>

<!-- GSP (payment, merchant/selectFlowType.gsp): sin JS ni hidden input, el radio viaja en el form -->
<div class="kds-card-selector-group" role="radiogroup" aria-label="\${message(code: 'merchant.onboarding.selectFlow.title')}">
  <g:each in="\${[[type: OnboardingType.LEGAL_ENTITY, key: 'legal', icon: 'business'],
                 [type: OnboardingType.NATURAL, key: 'natural', icon: 'person']]}" var="opt">
    <div class="kds-card-selector kds-card-selector--radio">
      <input type="radio" class="kds-card-selector-radio" id="flow-\${opt.key}" name="flowType"
             value="\${opt.type.name()}" aria-describedby="flow-\${opt.key}-desc"/>
      <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">\${opt.icon}</i></span>
      <label for="flow-\${opt.key}" class="kds-card-selector-title">
        <g:message code="merchant.onboarding.selectFlow.\${opt.key}.title"/>
      </label>
      <span class="kds-card-selector-description" id="flow-\${opt.key}-desc">
        <g:message code="merchant.onboarding.selectFlow.\${opt.key}.description"/>
      </span>
      <div class="kds-card-selector-details">
        <span class="kds-card-selector-eyebrow"><g:message code="merchant.onboarding.selectFlow.\${opt.key}.requirements.title"/></span>
        <ul>…</ul>
      </div>
    </div>
  </g:each>
</div>`,
      },
    },
  },
  render: function RadioOptionStory() {
    const [tipo, setTipo] = useState('juridica');
    // Unique per instance: the docs page renders this story twice in one document.
    const groupName = useId();
    return (
      <KdsCardSelectorGroup label="Tipo de contribuyente" style={{ maxWidth: 720 }}>
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
 * Opción en fila (`layout="row"`): radio a la izquierda, ícono y texto. Para listas de
 * opciones que se leen de arriba abajo, en `KdsCardSelectorGroup layout="list"`. Mismo
 * comportamiento que la opción de radio: grupo nativo por `name`, sin JS.
 */
export const RowOption: Story = {
  name: 'Opción en fila (¿Qué quieres hacer?)',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-selector-group kds-card-selector-group--list" role="radiogroup" aria-label="¿Qué quieres hacer con Khipu?">
  <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row">
    <input type="radio" class="kds-card-selector-radio" id="cat-cobros" name="categoria"
           value="cobros" aria-describedby="cat-cobros-desc"/>
    <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">bolt</i></span>
    <label for="cat-cobros" class="kds-card-selector-title">Cobrar</label>
    <span class="kds-card-selector-description" id="cat-cobros-desc">
      Recibir pagos de mis clientes, al instante o de forma recurrente.
    </span>
  </div>
  <!-- …misma estructura para "datos" y "pagos" -->
</div>

<!-- GSP -->
<div class="kds-card-selector-group kds-card-selector-group--list" role="radiogroup"
     aria-label="\${message(code: 'merchant.onboarding.category.title')}">
  <g:each in="\${categories}" var="cat">
    <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row">
      <input type="radio" class="kds-card-selector-radio" id="cat-\${cat.key}" name="categoria"
             value="\${cat.key}" aria-describedby="cat-\${cat.key}-desc" required/>
      <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">\${cat.icon}</i></span>
      <label for="cat-\${cat.key}" class="kds-card-selector-title">
        <g:message code="merchant.onboarding.category.\${cat.key}.title"/>
      </label>
      <span class="kds-card-selector-description" id="cat-\${cat.key}-desc">
        <g:message code="merchant.onboarding.category.\${cat.key}.description"/>
      </span>
    </div>
  </g:each>
</div>`,
      },
    },
  },
  render: function RowOptionStory() {
    const [cat, setCat] = useState('cobros');
    const groupName = useId();
    const options = [
      ['cobros', 'bolt', 'Cobrar', 'Recibir pagos de mis clientes, al instante o de forma recurrente.'],
      ['datos', 'account_balance', 'Acceder a datos', 'Consultar datos bancarios o verificar la identidad de mis usuarios, con su autorización.'],
      ['pagos', 'shopping_cart', 'Pagar', 'Pagar una compra o una cuenta con Khipu, sin crear una cuenta.'],
    ];
    return (
      <KdsCardSelectorGroup label="¿Qué quieres hacer con Khipu?" layout="list" className="kds-max-w-md">
        {options.map(([value, icon, title, description]) => (
          <KdsCardSelector
            key={value}
            radio
            layout="row"
            name={groupName}
            value={value}
            checked={cat === value}
            onCheckedChange={setCat}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </KdsCardSelectorGroup>
    );
  },
};

/**
 * Producto con etiqueta (`badge`) y opciones deshabilitadas "Pronto" (`disabled` +
 * `badgeColor="neutral"`). La etiqueta se anuncia junto con la opción; una opción
 * deshabilitada no se puede elegir y se ve atenuada.
 */
export const RowOptionBadges: Story = {
  name: 'Opción en fila con etiqueta y "Pronto"',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-selector-group kds-card-selector-group--list" role="radiogroup" aria-label="¿Qué quieres hacer con Khipu?">
  <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row">
    <input type="radio" class="kds-card-selector-radio" id="prod-pi" name="producto" value="pi"
           aria-describedby="prod-pi-badge prod-pi-desc"/>
    <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">bolt</i></span>
    <span class="kds-card-selector-badge kds-card-selector-badge--info" id="prod-pi-badge">Pagos Instantáneos</span>
    <label for="prod-pi" class="kds-card-selector-title">Cobrar por transferencia</label>
    <span class="kds-card-selector-description" id="prod-pi-desc">Tus clientes pagan con transferencia desde su banco.</span>
  </div>
  <!-- "Pronto": radio disabled + etiqueta neutra -->
  <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row">
    <input type="radio" class="kds-card-selector-radio" id="prod-qr" name="producto" value="qr" disabled
           aria-describedby="prod-qr-badge prod-qr-desc"/>
    <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">qr_code_2</i></span>
    <span class="kds-card-selector-badge kds-card-selector-badge--neutral" id="prod-qr-badge">Pronto</span>
    <label for="prod-qr" class="kds-card-selector-title">Cobrar en moneda extranjera con QR</label>
    <span class="kds-card-selector-description" id="prod-qr-desc">Recibe pagos de clientes de otros países en tu local.</span>
  </div>
</div>

<!-- GSP: la disponibilidad y los textos vienen del controller -->
<g:each in="\${products}" var="p">
  <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row">
    <g:if test="\${p.available}">
      <input type="radio" class="kds-card-selector-radio" id="prod-\${p.key}" name="producto" value="\${p.key}"
             aria-describedby="prod-\${p.key}-badge prod-\${p.key}-desc" required/>
    </g:if>
    <g:else>
      <input type="radio" class="kds-card-selector-radio" id="prod-\${p.key}" name="producto" value="\${p.key}"
             aria-describedby="prod-\${p.key}-badge prod-\${p.key}-desc" disabled/>
    </g:else>
    <span class="kds-card-selector-icon" aria-hidden="true"><i class="material-symbols-outlined">\${p.icon}</i></span>
    <span class="kds-card-selector-badge kds-card-selector-badge--\${p.available ? 'info' : 'neutral'}" id="prod-\${p.key}-badge">
      <g:message code="\${p.available ? p.badgeCode : 'merchant.onboarding.product.soon'}"/>
    </span>
    <label for="prod-\${p.key}" class="kds-card-selector-title"><g:message code="\${p.titleCode}"/></label>
    <span class="kds-card-selector-description" id="prod-\${p.key}-desc"><g:message code="\${p.descriptionCode}"/></span>
  </div>
</g:each>`,
      },
    },
  },
  render: function RowOptionBadgesStory() {
    const [product, setProduct] = useState('pi');
    const groupName = useId();
    return (
      <KdsCardSelectorGroup label="¿Qué quieres hacer con Khipu?" layout="list" className="kds-max-w-md">
        <KdsCardSelector
          radio
          layout="row"
          name={groupName}
          value="pi"
          checked={product === 'pi'}
          onCheckedChange={setProduct}
          icon="bolt"
          badge="Pagos Instantáneos"
          title="Cobrar por transferencia"
          description="Tus clientes pagan con transferencia desde su banco."
        />
        <KdsCardSelector
          radio
          layout="row"
          name={groupName}
          value="pac"
          checked={product === 'pac'}
          onCheckedChange={setProduct}
          icon="autorenew"
          badge="Pagos Automáticos"
          title="Cobrar de forma recurrente"
          description="Cobra suscripciones y cuotas con un mandato de tus clientes."
        />
        <KdsCardSelector
          radio
          layout="row"
          name={groupName}
          value="ecommerce"
          disabled
          icon="storefront"
          badge="Pronto"
          badgeColor="neutral"
          title="Cobrar en una plataforma de ecommerce"
          description="Instala Khipu en tu tienda Shopify, VTEX u otra."
        />
        <KdsCardSelector
          radio
          layout="row"
          name={groupName}
          value="qr"
          disabled
          icon="qr_code_2"
          badge="Pronto"
          badgeColor="neutral"
          title="Cobrar en moneda extranjera con QR"
          description="Recibe pagos de clientes de otros países en tu local."
        />
      </KdsCardSelectorGroup>
    );
  },
};

/**
 * Opción en fila sin ícono y con requisitos (`children`): el bloque va separado por una
 * línea y su título ("Requisitos", `.kds-card-selector-eyebrow`) es neutro.
 */
export const RowOptionRequirements: Story = {
  name: 'Opción en fila con requisitos (¿Para qué vas a cobrar?)',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-selector kds-card-selector--radio kds-card-selector--row">
  <input type="radio" class="kds-card-selector-radio" id="uso-personal" name="uso" value="personal"
         aria-describedby="uso-personal-badge uso-personal-desc"/>
  <span class="kds-card-selector-badge kds-card-selector-badge--neutral" id="uso-personal-badge">Enlace de cobro</span>
  <label for="uso-personal" class="kds-card-selector-title">Para recibir dinero como persona</label>
  <span class="kds-card-selector-description" id="uso-personal-desc">
    Sin fines de lucro: colectas, cuotas o gastos compartidos.
  </span>
  <div class="kds-card-selector-details">
    <span class="kds-card-selector-eyebrow">Requisitos</span>
    <ul>
      <li>No necesitas inicio de actividades.</li>
      <li>Monto máximo de recaudación: $5.000.000 al mes.</li>
    </ul>
  </div>
</div>

<!-- GSP: misma estructura; los requisitos vienen del controller -->
<div class="kds-card-selector-details">
  <span class="kds-card-selector-eyebrow"><g:message code="merchant.onboarding.usage.requirements"/></span>
  <ul>
    <g:each in="\${usage.requirements}" var="req"><li>\${req}</li></g:each>
  </ul>
</div>`,
      },
    },
  },
  render: function RowOptionRequirementsStory() {
    const [usage, setUsage] = useState('personal');
    const groupName = useId();
    return (
      <KdsCardSelectorGroup label="¿Para qué vas a cobrar?" layout="list" className="kds-max-w-md">
        <KdsCardSelector
          radio
          layout="row"
          name={groupName}
          value="personal"
          checked={usage === 'personal'}
          onCheckedChange={setUsage}
          badge="Enlace de cobro"
          badgeColor="neutral"
          title="Para recibir dinero como persona"
          description="Sin fines de lucro: colectas, cuotas o gastos compartidos."
        >
          <span className="kds-card-selector-eyebrow">Requisitos</span>
          <ul>
            <li>No necesitas inicio de actividades.</li>
            <li>Monto máximo de recaudación: $5.000.000 al mes.</li>
          </ul>
        </KdsCardSelector>
        <KdsCardSelector
          radio
          layout="row"
          name={groupName}
          value="profesional"
          checked={usage === 'profesional'}
          onCheckedChange={setUsage}
          badge="Persona natural"
          badgeColor="neutral"
          title="Para cobrar por mis servicios como independiente"
          description="Trabajo por mi cuenta y quiero cobrar a mis clientes."
        >
          <span className="kds-card-selector-eyebrow">Requisitos</span>
          <ul>
            <li>Inicio de actividades declarado en el SII.</li>
            <li>Sin monto máximo de recaudación.</li>
          </ul>
        </KdsCardSelector>
      </KdsCardSelectorGroup>
    );
  },
};

/** Opción compacta (`layout="compact"`): opciones cortas como una cuenta bancaria. */
export const CompactOption: Story = {
  name: 'Opción compacta (cuenta de recaudación)',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-card-selector-group kds-card-selector-group--list" role="radiogroup" aria-label="Cuenta de recaudación">
  <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row kds-card-selector--compact">
    <input type="radio" class="kds-card-selector-radio" id="cuenta-cc1" name="cuenta" value="cc1"
           aria-describedby="cuenta-cc1-num"/>
    <label for="cuenta-cc1" class="kds-card-selector-title">Cuenta Corriente</label>
    <span class="kds-card-selector-description" id="cuenta-cc1-num">N° 0-000-1234567-8</span>
  </div>
</div>

<!-- GSP -->
<div class="kds-card-selector-group kds-card-selector-group--list" role="radiogroup"
     aria-label="\${message(code: 'merchant.onboarding.account.subtitle')}">
  <g:each in="\${bankAccounts}" var="account" status="i">
    <div class="kds-card-selector kds-card-selector--radio kds-card-selector--row kds-card-selector--compact">
      <input type="radio" class="kds-card-selector-radio" id="account-\${i}" name="accountId"
             value="\${account.id}" aria-describedby="account-\${i}-num" required/>
      <label for="account-\${i}" class="kds-card-selector-title">\${account.typeName}</label>
      <span class="kds-card-selector-description" id="account-\${i}-num">N° \${account.number}</span>
    </div>
  </g:each>
</div>`,
      },
    },
  },
  render: function CompactOptionStory() {
    const [account, setAccount] = useState('cc1');
    const groupName = useId();
    return (
      <KdsCardSelectorGroup label="Cuenta de recaudación" layout="list" className="kds-max-w-md">
        {[
          ['cc1', 'N° 0-000-1234567-8'],
          ['cc2', 'N° 0-000-7654321-0'],
        ].map(([value, number]) => (
          <KdsCardSelector
            key={value}
            radio
            layout="compact"
            name={groupName}
            value={value}
            checked={account === value}
            onCheckedChange={setAccount}
            title="Cuenta Corriente"
            description={number}
          />
        ))}
      </KdsCardSelectorGroup>
    );
  },
};
