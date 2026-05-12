import type { Meta, StoryObj } from '@storybook/react';
import { KdsButton } from './KdsButton';

const meta: Meta<typeof KdsButton> = {
  title: 'Core/KdsButton',
  component: KdsButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'outlined-white', 'text', 'success'],
    },
    size: { control: 'select', options: [undefined, 'sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof KdsButton>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Continuar' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secundario' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Cancelar' },
};

export const Text: Story = {
  args: { variant: 'text', children: 'Ver más' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Finalizar' },
};

export const WithStartIcon: Story = {
  args: { variant: 'outlined', startIcon: 'download', children: 'Descargar comprobante' },
};

export const FullWidth: Story = {
  args: { variant: 'primary', fullWidth: true, children: 'Continuar' },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Procesando' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Pequeño' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Deshabilitado' },
};
