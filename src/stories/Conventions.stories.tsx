import type { Meta, StoryObj } from '@storybook/react';

/**
 * Convenciones del Khipu Design System para agentes IA.
 *
 * Esta página existe para que el Storybook MCP entregue las reglas
 * transversales que NO viven en la doc de un componente puntual. Leerla antes
 * de generar UI con el DS (React o HTML plano).
 */
const meta: Meta = {
  title: 'Design System/Conventions',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Reglas transversales del Khipu DS para generar UI (consumir vía MCP antes de construir).',
          '',
          '## Dos targets de consumo',
          '- **React**: componentes `Kds*` (ej. `<KdsButton/>`, `<KdsMerchantTile/>`).',
          '- **HTML plano (BeerCSS)**: clases `kds-*` directas en GSP/Grails/legacy.',
          'Las clases `kds-*` son la FUENTE DE VERDAD (definidas en `src/beercss/customizations/khipu-components.css`); los componentes React solo las envuelven. Para una pantalla en HTML plano, componer los contratos de `Patterns/CSS-only`.',
          '',
          '## Regla 1 — Spacing por padre, nunca margin en hijos',
          'El espaciado entre elementos viene del `padding` + `gap` del contenedor, NO de `margin` en los hijos. Auditar: cualquier `.kds-foo-* { margin-* }` para layout es sospechoso.',
          '',
          '## Regla 2 — Siempre tokens, nunca valores hardcoded',
          'Usar siempre `var(--kds-*)`: nunca `font-size: 16px`, `font-weight: 600` ni hex de color. Namespaces: `--kds-spacing-*`, `--kds-font-size-*`, `--kds-font-weight-*`, `--kds-color-*`, `--kds-radius-*`, `--kds-border-width-*`, `--kds-line-height-*`. (Excepción: `transition` aún no tokenizado.)',
          '',
          '## Regla 3 — Gotcha BeerCSS al envolver `<button>` u otros elementos',
          'BeerCSS aplica estilos globales a `button` (inline-flex, height 2.5rem, bg primary) que se filtran a componentes custom. Al envolver, resetear explícitamente. El ripple `::after` usa `currentColor` con selector `:is(...)` (especificidad 0,2,4 en Chrome) → para sobre-escribirlo suele requerirse `!important`.',
          '',
          '## Regla 4 — Iconos',
          'Material Symbols Outlined. `info_i` usa nuestro círculo decorativo; el icono de `KdsStatusBlock` NO gira; `pending` muestra spinner sin icono.',
          '',
          '## Composición',
          'Los patrones de "glue" entre componentes están en `Patterns/CSS-only` con contrato HTML + spec: `MerchantHeader` (`.kds-merchant`), `ButtonStack` (`.kds-btn-stack`), `SecureFooter` (par responsive), `PaymentStage` (shell mobile), `FieldGroup` (forms). Componer pantallas a partir de esos contratos.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const Row = ({
  bad,
  good,
}: {
  bad: { label: string; code: string };
  good: { label: string; code: string };
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--kds-spacing-2)',
      maxWidth: 820,
    }}
  >
    {[
      { ...bad, color: 'var(--kds-color-error-dark)', sign: '✗' },
      { ...good, color: 'var(--kds-color-success-dark)', sign: '✓' },
    ].map((c) => (
      <div
        key={c.label}
        style={{
          border: 'var(--kds-border-width-sm) solid var(--kds-color-border-light)',
          borderRadius: 'var(--kds-radius-md)',
          padding: 'var(--kds-spacing-2)',
        }}
      >
        <div
          style={{
            color: c.color,
            marginBottom: 'var(--kds-spacing-1)',
          }}
        >
          {c.sign} {c.label}
        </div>
        <pre
          style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: 'var(--kds-font-size-xs)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {c.code}
        </pre>
      </div>
    ))}
  </div>
);

/**
 * El espaciado entre hijos lo maneja el contenedor (`gap`/`padding`), no los
 * hijos con `margin`.
 */
export const SpacingViaParent: Story = {
  name: 'Regla 1 — Spacing por padre',
  render: () => (
    <Row
      bad={{
        label: 'margin en hijos',
        code: '.icon  { margin-bottom: 12px; }\n.title { margin-bottom: 8px; }',
      }}
      good={{
        label: 'gap en el padre',
        code: '.card {\n  display: flex;\n  flex-direction: column;\n  gap: var(--kds-spacing-1-5);\n}',
      }}
    />
  ),
};

/**
 * Siempre variables de token; nunca valores literales de tipografía/color.
 */
export const AlwaysTokens: Story = {
  name: 'Regla 2 — Siempre tokens',
  render: () => (
    <Row
      bad={{
        label: 'hardcoded',
        code: 'font-size: 16px;\nfont-weight: 600;\ncolor: #8347AD;',
      }}
      good={{
        label: 'tokens',
        code: 'font-size: var(--kds-font-size-base);\nfont-weight: var(--kds-font-weight-semibold);\ncolor: var(--kds-color-primary-main);',
      }}
    />
  ),
};

const Note = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      maxWidth: 820,
      padding: 'var(--kds-spacing-2)',
      border: 'var(--kds-border-width-sm) solid var(--kds-color-border-light)',
      borderRadius: 'var(--kds-radius-md)',
      fontSize: 'var(--kds-font-size-sm)',
      lineHeight: 'var(--kds-line-height-relaxed)',
    }}
  >
    {children}
  </div>
);

/**
 * BeerCSS aplica estilos globales a `button` (inline-flex, height 2.5rem, bg
 * primary) que se filtran a componentes custom; al envolver un `<button>`
 * resetear explícitamente. El ripple `::after` usa `currentColor` con selector
 * `:is(...)` (especificidad 0,2,4 en Chrome) → para sobre-escribirlo suele
 * requerirse `!important`. El overlay/hover por defecto puede salir negro:
 * forzar colores primary.
 */
export const BeerCssButtonGotcha: Story = {
  name: 'Regla 3 — Gotcha BeerCSS al envolver button',
  render: () => (
    <Note>
      Al crear un componente React que renderiza <code>&lt;button&gt;</code>,
      resetear los estilos globales de BeerCSS (inline-flex, height, bg). El
      ripple <code>::after</code> hereda <code>currentColor</code> vía{' '}
      <code>:is(...)</code> (especificidad 0,2,4) → usar <code>!important</code>{' '}
      para overridear. Evitar hover/overlay negro: mapear a primary.
    </Note>
  ),
};

/**
 * Iconos: Material Symbols Outlined. `info_i` usa nuestro círculo decorativo;
 * el icono de `KdsStatusBlock` NO gira; `pending` muestra spinner azul sin
 * icono. El spinner de carga es azul, sin icono superpuesto.
 */
export const Icons: Story = {
  name: 'Regla 4 — Iconos',
  render: () => (
    <Note>
      Material Symbols Outlined. <code>info_i</code> con círculo decorativo; el
      icono de <code>KdsStatusBlock</code> no gira; <code>pending</code> = solo
      spinner azul (sin icono).
    </Note>
  ),
};

/**
 * Dos targets: React (`Kds*`) y HTML plano BeerCSS (clases `kds-*` en
 * GSP/Grails). Las clases `kds-*` son la fuente de verdad; React solo las
 * envuelve. Para una pantalla en HTML plano, componer los contratos de
 * `Patterns/CSS-only`: MerchantHeader + KeyValue + MontoRow + ButtonStack +
 * SecureFooter dentro del shell PaymentStage.
 */
export const ReactVsHtml: Story = {
  name: 'Targets — React vs HTML plano',
  render: () => (
    <Note>
      Mismo DS, dos consumos: componentes React <code>Kds*</code> o markup HTML
      con clases <code>kds-*</code> (GSP/Grails). Componer pantallas HTML desde{' '}
      <code>Patterns/CSS-only</code>.
    </Note>
  ),
};
