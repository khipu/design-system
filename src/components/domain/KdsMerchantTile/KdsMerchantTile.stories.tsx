import type { Meta, StoryObj } from '@storybook/react';
import { KdsMerchantTile } from './KdsMerchantTile';

/**
 * KdsMerchantTile — tile cuadrado con logo del comercio o initials sobre purple-deep.
 *
 * Layout (spec):
 * - `56 x 56` (default) / `40 x 40` (`compact`)
 * - `border-radius: var(--kds-radius-card)`
 * - `background: var(--kds-color-primary-deep)` (#5B3DB5)
 * - Initials: white, `font-size: xl` (20px), `font-weight: 700`
 *
 * Variante con logo (`logoUrl`):
 * - Agrega clase `.logo`, padding 4px
 * - `<img>` cover, radius md
 *
 * Compose with: este componente SOLO renderiza el tile cuadrado. Para el header
 * de comercio completo ("estás pagando a" + nombre) envolver en `.kds-merchant`
 * > tile + `.kds-merchant-meta` (`.kds-merchant-label` + `<strong>`), con gap
 * `var(--kds-spacing-1-75)` y label `margin-bottom: var(--kds-spacing-0-25)`.
 * Ver `Patterns/CSS-only → MerchantHeader`.
 */
const meta: Meta<typeof KdsMerchantTile> = {
  title: 'Domain/Payment Identity/KdsMerchantTile',
  component: KdsMerchantTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tile 56×56 (o 40×40 compact) con logo del merchant o initials fallback. Background `var(--kds-color-primary-deep)`, initials white xl/700. Cuando hay `logoUrl`, renderiza `<img>` con object-fit cover y padding 4px. Compose with: este componente SOLO renderiza el tile; para el header completo ("estás pagando a" + nombre) envolver en `.kds-merchant` > tile + `.kds-merchant-meta`(`.kds-merchant-label` + `<strong>`), gap `var(--kds-spacing-1-75)`, label `margin-bottom var(--kds-spacing-0-25)`. Ver `Patterns/CSS-only → MerchantHeader`.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Nombre del merchant (usado para alt y initials fallback).' },
    logoUrl: { control: 'text', description: 'URL del logo. Si está vacío, renderiza initials.' },
    initials: { control: 'text', description: 'Override de initials (2-3 letras). Si no se provee, usa las primeras 2 de `name`.' },
    compact: { control: 'boolean', description: 'Modo compacto: 40×40 en vez de 56×56.' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsMerchantTile>;

/** Con initials fallback (sin logo). */
export const WithInitials: Story = {
  args: { name: 'Belén Fuentes Mejías' },
};

/** Con logo del merchant. */
export const WithLogo: Story = {
  args: {
    name: 'Comercial Santiago SpA',
    logoUrl: 'https://placehold.co/56x56/8347AD/white?text=CS',
  },
};

/** Initials custom (3 letras). */
export const CustomInitials: Story = {
  args: { name: 'Comercial Santiago', initials: 'CMS' },
};

/** Variante compacta (40×40). */
export const Compact: Story = {
  args: { name: 'Belén Fuentes', compact: true },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML (solo el tile — lo que renderiza este componente):
 * ```html
 * <div class="kds-merchant-tile" aria-label="Comercial Santiago SpA">CS</div>
 * ```
 *
 * Variantes:
 * - Con logo: `<div class="kds-merchant-tile logo"><img src="..." alt="..."/></div>`
 * - Compacta (40×40): agregar clase `compact`.
 *
 * **Composición completa**: para el header de comercio ("Estás pagando a" + nombre),
 * envolver en el patrón `.kds-merchant`. Ver `Patterns/CSS-only → MerchantHeader`.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-merchant-tile" aria-label="Comercial Santiago SpA">CS</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-merchant-tile" aria-label="Comercial Santiago SpA">
        CS
      </div>
    </div>
  ),
};
