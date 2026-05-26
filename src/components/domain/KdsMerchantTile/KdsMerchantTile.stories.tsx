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
 */
const meta: Meta<typeof KdsMerchantTile> = {
  title: 'Domain/KdsMerchantTile',
  component: KdsMerchantTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tile 56×56 (o 40×40 compact) con logo del merchant o initials fallback. Background `var(--kds-color-primary-deep)`, initials white xl/700. Cuando hay `logoUrl`, renderiza `<img>` con object-fit cover y padding 4px.',
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
