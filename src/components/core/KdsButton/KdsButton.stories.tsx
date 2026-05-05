import type { Meta, StoryObj } from '@storybook/react';
import { KdsButton } from './KdsButton';

const meta: Meta<typeof KdsButton> = {
  title: 'Core/KdsButton',
  component: KdsButton,
  tags: ['autodocs'],
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
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Procesando' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Pequeño' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="kds-flex kds-flex-col kds-gap-4" style={{ maxWidth: 300 }}>
      <KdsButton variant="primary">Primary</KdsButton>
      <KdsButton variant="secondary">Secondary</KdsButton>
      <KdsButton variant="outlined">Outlined</KdsButton>
      <KdsButton variant="text">Text</KdsButton>
      <KdsButton variant="success">Success</KdsButton>
      <KdsButton variant="primary" startIcon="download">With Icon</KdsButton>
      <KdsButton variant="primary" loading>Loading</KdsButton>
      <KdsButton variant="primary" disabled>Disabled</KdsButton>
    </div>
  ),
};
