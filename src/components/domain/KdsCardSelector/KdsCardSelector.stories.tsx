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
