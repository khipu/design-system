import type { Meta, StoryObj } from '@storybook/react';
import { KdsSectionNote } from './KdsSectionNote';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsSectionNote> = {
  title: 'Components/Feedback/KdsSectionNote',
  component: KdsSectionNote,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsSectionNote>;

export const Default: Story = {
  args: {
    children: 'Los depósitos por caja no serán procesados.',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: 'warning',
    children: 'Recuerda verificar los datos antes de transferir.',
  },
};

export const AllVariants: Story = {
  render: function AllSectionNoteVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], maxWidth: '500px' }}>
        <KdsSectionNote>
          Los depósitos por caja no serán procesados.
        </KdsSectionNote>
        <KdsSectionNote icon="warning">
          Recuerda verificar los datos antes de transferir.
        </KdsSectionNote>
        <KdsSectionNote icon="schedule">
          El proceso de verificación puede tomar hasta 24 horas hábiles.
        </KdsSectionNote>
        <KdsSectionNote icon="account_balance">
          Solo se aceptan transferencias desde cuentas bancarias chilenas.
        </KdsSectionNote>
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
 * <p class="kds-section-note kds-info">
 *   <i class="material-symbols-outlined">info</i>
 *   <span>El pago puede tardar hasta 24 horas en verse reflejado.</span>
 * </p>
 * ```
 *
 * Ver `Patterns/CSS-only → SectionNote` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<p class="kds-section-note kds-info">
  <i class="material-symbols-outlined">info</i>
  <span>El pago puede tardar hasta 24 horas en verse reflejado.</span>
</p>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <p className="kds-section-note kds-info">
        <i className="material-symbols-outlined">info</i>
        <span>El pago puede tardar hasta 24 horas en verse reflejado.</span>
      </p>
    </div>
  ),
};
