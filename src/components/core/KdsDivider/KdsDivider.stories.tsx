import type { Meta, StoryObj } from '@storybook/react';
import { KdsDivider } from './KdsDivider';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsDivider> = {
  title: 'Core/KdsDivider',
  component: KdsDivider,
  tags: ['autodocs'],
  argTypes: {
    dashed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsDivider>;

export const Default: Story = {};

export const Dashed: Story = {
  args: { dashed: true },
};

export const AllVariants: Story = {
  render: function AllDividerVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], maxWidth: '400px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>Sólido</span>
        <KdsDivider />
        <span style={{ fontSize: '14px', color: '#666' }}>Punteado</span>
        <KdsDivider dashed />
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
 * <hr class="kds-hr" />
 * <hr class="kds-hr-dashed" />
 * ```
 *
 * Ver `Patterns/CSS-only → Divider` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <p>Sección superior</p>
      <hr className="kds-hr" />
      <p>Sección intermedia</p>
      <hr className="kds-hr-dashed" />
      <p>Sección inferior</p>
    </div>
  ),
};
