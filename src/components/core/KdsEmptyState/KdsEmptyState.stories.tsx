import type { Meta, StoryObj } from '@storybook/react';
import { KdsEmptyState } from './KdsEmptyState';
import { KdsSearchField } from '../KdsSearchField';

/**
 * KdsEmptyState — estado "sin resultados" para búsquedas y listas filtradas.
 *
 * Canoniza el patrón usado en la búsqueda de bancos (khenshin-web y
 * direct-debit-mandate-manager): ícono Material Symbols + mensaje principal
 * + sugerencia secundaria, centrados.
 *
 * Es composición pura de utilidades `kds-*` existentes (flex-col, text-center,
 * gap-2, text-secondary): no define CSS propio.
 */
const meta: Meta<typeof KdsEmptyState> = {
  title: 'Components/Feedback/KdsEmptyState',
  component: KdsEmptyState,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KdsEmptyState>;

export const Default: Story = {
  args: {
    title: 'Sin coincidencias',
    description: 'Intenta buscando otro banco',
  },
};

export const SinDescripcion: Story = {
  args: {
    title: 'Sin resultados',
  },
};

export const IconoPersonalizado: Story = {
  args: {
    icon: 'search_off',
    title: 'No encontramos lo que buscas',
    description: 'Revisa el término e intenta de nuevo',
  },
};

/** Contexto de producción: debajo de un KdsSearchField sin resultados. */
export const ConBusqueda: Story = {
  render: () => (
    <div className="kds-flex-col kds-gap-2">
      <KdsSearchField placeholder="Buscar por nombre" value="Banco inexistente" onChange={() => {}} />
      <KdsEmptyState title="Sin coincidencias" description="Intenta buscando otro banco" />
    </div>
  ),
};
