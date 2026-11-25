import type { Meta, StoryObj } from '@storybook/react';
import { KdsChip } from './KdsChip';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsChip> = {
  title: 'Components/Data Display/KdsChip',
  component: KdsChip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsChip>;

export const Default: Story = {
  args: {
    children: 'Etiqueta',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Activo',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    children: 'Verificado',
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    children: 'Rechazado',
  },
};

export const WithIcon: Story = {
  args: {
    color: 'info',
    icon: 'info',
    children: 'Información',
  },
};

export const Deletable: Story = {
  args: {
    children: 'Eliminar',
    onDelete: () => {},
  },
};

export const AllColors: Story = {
  render: function AllColorsChip() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[1] }}>
        <KdsChip>Sin color</KdsChip>
        <KdsChip color="primary">Primario</KdsChip>
        <KdsChip color="success">Exitoso</KdsChip>
        <KdsChip color="error">Error</KdsChip>
        <KdsChip color="warning">Advertencia</KdsChip>
        <KdsChip color="info">Información</KdsChip>
        <KdsChip color="neutral">Neutro</KdsChip>
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
 * <span class="kds-badge success">
 *   <i class="material-symbols-outlined">check_circle</i>
 *   <span>Pagado</span>
 * </span>
 * ```
 *
 * Ver `Patterns/CSS-only → Chip` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<span class="kds-badge success">
  <i class="material-symbols-outlined">check_circle</i>
  <span>Pagado</span>
</span>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <span className="kds-badge success">
        <i className="material-symbols-outlined">check_circle</i>
        <span>Pagado</span>
      </span>
    </div>
  ),
};

/**
 * Neutro — estado fijo sin carga semántica, con ícono opcional. Onboarding: "Verificado" en
 * los datos que vienen del SII/banco y "Fijo" en los que no se pueden cambiar (KTUF-468).
 * Mismos tokens que el badge neutro de `KdsCardSelector`: se adapta solo al modo oscuro.
 */
export const Neutral: Story = {
  name: 'Neutro (Verificado / Fijo)',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<span class="kds-badge neutral">
  <i class="material-symbols-outlined">verified</i>
  <span>Verificado</span>
</span>
<span class="kds-badge neutral">
  <i class="material-symbols-outlined">lock</i>
  <span>Fijo</span>
</span>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: spacing[1] }}>
      <KdsChip color="neutral" icon="verified">
        Verificado
      </KdsChip>
      <KdsChip color="neutral" icon="lock">
        Fijo
      </KdsChip>
    </div>
  ),
};
