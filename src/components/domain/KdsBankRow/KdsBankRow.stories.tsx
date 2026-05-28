import type { Meta, StoryObj } from '@storybook/react';
import { KdsBankRow } from './KdsBankRow';

/**
 * KdsBankRow — fila clickeable de selección de banco con logo + nombre + chevron.
 *
 * Layout & sizing (spec):
 * - `padding: 14px` (`var(--kds-spacing-1-75)`)
 * - `gap: 12px` (`var(--kds-spacing-1-5)`) entre logo, nombre y chevron
 * - Logo `40 x 40` (default) — wrapper `.kds-bank-row-logo`
 * - Logo `32 x 32` cuando lleva initials (`.kds-bank-row-logo.initials`)
 * - `border-radius: var(--kds-radius-card)`
 * - `font-size: var(--kds-font-size-sm)`, `font-weight: 500` (medium)
 *
 * Estado `selected`:
 * - `border-color: var(--kds-color-primary-main)` (#8347AD)
 * - `background: var(--kds-color-primary-faint)` (#F0F0FA)
 * - Icon final cambia de `chevron_right` → `check_circle`
 *
 * Uso típico: dentro de `KdsBankList` (gap entre filas = 8px). Renderiza un `<button>`.
 *
 * @gsp _bankModalMaterial.gsp, _choosePaymentMethodFormMaterial.gsp (vía `mat:bankRow`)
 * @css .kds-bank-row, .kds-bank-row-logo, .kds-bank-row-name, .kds-bank-row.selected
 */
const meta: Meta<typeof KdsBankRow> = {
  title: 'Domain/KdsBankRow',
  component: KdsBankRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Fila clickeable de selección de banco. Padding 14px, gap 12px, logo 40×40 (32×32 si tiene initials), font Public Sans sm/500, radius var(--kds-radius-card). Estado `selected` cambia border-color a primary-main, background a primary-faint, y reemplaza el icon chevron_right por check_circle.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nombre del banco mostrado como label principal.',
    },
    logoUrl: {
      control: 'text',
      description:
        'URL del logo del banco (recomendado 40×40 PNG/SVG). Si está vacío, se renderiza la inicial del `name` como fallback.',
    },
    selected: {
      control: 'boolean',
      description:
        'Cambia border a primary-main + background a primary-faint + icon a check_circle.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsBankRow>;

/** Caso por defecto: nombre sin logo (renderiza inicial). */
export const Default: Story = {
  args: { name: 'Banco Estado' },
};

/** Con logo del banco (40×40). */
export const WithLogo: Story = {
  args: {
    name: 'Banco Falabella',
    logoUrl: 'https://placehold.co/40x40/8347AD/white?text=BF',
  },
};

/** Sin logoUrl — fallback automático a inicial del nombre sobre fondo neutral. */
export const WithInitials: Story = {
  args: { name: 'Banco Estado' },
  parameters: {
    docs: {
      description: {
        story:
          'Cuando no hay `logoUrl`, se renderiza la primera letra del `name` como fallback. Ideal para bancos sin logo cargado en CDN.',
      },
    },
  },
};

/** Estado seleccionado — border + background primary + icon check_circle. */
export const Selected: Story = {
  args: { name: 'Banco Santander', selected: true },
  parameters: {
    docs: {
      description: {
        story:
          'Cuando `selected={true}`: `border-color: var(--kds-color-primary-main)` (#8347AD), `background: var(--kds-color-primary-faint)` (#F0F0FA), y el icon chevron_right se reemplaza por `check_circle`.',
      },
    },
  },
};

/** Disabled — usando el atributo HTML nativo. */
export const Disabled: Story = {
  args: { name: 'Banco BBVA', disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          'El `<button>` recibe el atributo HTML `disabled`. Opacidad reducida + cursor not-allowed via CSS estándar.',
      },
    },
  },
};

/**
 * Galería de variantes para verificación visual.
 *
 * @spec gap entre filas = 8px (`var(--kds-spacing-1)`) — provisto por `KdsBankList`.
 * Aquí simulado con `<div>` directo para mantener la story aislada.
 */
export const AllVariants: Story = {
  render: function AllBankRows() {
    return (
      <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow
          name="Banco Falabella"
          logoUrl="https://placehold.co/40x40/8347AD/white?text=BF"
        />
        <KdsBankRow name="Banco Santander" selected />
        <KdsBankRow
          name="Banco BCI"
          logoUrl="https://placehold.co/40x40/1A3B6E/white?text=BCI"
        />
        <KdsBankRow name="Banco BBVA" disabled />
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
 * <button type="button" class="kds-bank-row">
 *   <span class="kds-bank-row-logo">
 *     <span class="initials">B</span>
 *   </span>
 *   <span class="kds-bank-row-name">Banco Security</span>
 *   <i class="material-symbols-outlined">chevron_right</i>
 * </button>
 * ```
 *
 * Ver `Patterns/CSS-only → BankRow` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <button type="button" className="kds-bank-row">
        <span className="kds-bank-row-logo">
          <span className="initials">B</span>
        </span>
        <span className="kds-bank-row-name">Banco Security</span>
        <i className="material-symbols-outlined">chevron_right</i>
      </button>
    </div>
  ),
};
