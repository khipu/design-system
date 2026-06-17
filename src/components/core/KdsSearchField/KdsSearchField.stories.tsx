import type { Meta, StoryObj } from '@storybook/react';
import { KdsSearchField } from './KdsSearchField';

const meta: Meta<typeof KdsSearchField> = {
  title: 'Components/Inputs/KdsSearchField',
  component: KdsSearchField,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    withIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSearchField>;

/** Campo de búsqueda por defecto (sin ícono, mismo look que el del KdsBankModal). */
export const Default: Story = {
  args: { placeholder: 'Buscar banco...' },
};

/** Variante con ícono de lupa (additive). */
export const WithIcon: Story = {
  args: { placeholder: 'Buscar banco...', withIcon: true },
};

/** Deshabilitado. */
export const Disabled: Story = {
  args: { placeholder: 'Buscar banco...', disabled: true },
};
