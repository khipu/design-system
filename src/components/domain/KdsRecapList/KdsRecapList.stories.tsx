import type { Meta, StoryObj } from '@storybook/react';
import { KdsRecapList } from './KdsRecapList';

const meta: Meta<typeof KdsRecapList> = {
  title: 'Domain/KdsRecapList',
  component: KdsRecapList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsRecapList>;

export const Default: Story = {
  args: {
    items: [
      { label: 'RUT / DNI Titular', value: '12.345.678-9' },
      { label: 'Nombre', value: 'Juan Pérez González' },
      { label: 'Email', value: 'juan.perez@email.cl' },
    ],
  },
};

export const WithPlaceholders: Story = {
  args: {
    items: [
      { label: 'RUT / DNI Titular', placeholder: '\u2014' },
      { label: 'Nombre', placeholder: '\u2014' },
      { label: 'Email', value: 'test@khipu.com' },
    ],
  },
};

export const PaymentRecap: Story = {
  args: {
    items: [
      { label: 'Banco', value: 'Banco de Chile' },
      { label: 'RUT', value: '18.765.432-1' },
      { label: 'N\u00b0 cuenta', value: '00-123-45678-90' },
      { label: 'Tipo', value: 'Cuenta corriente' },
      { label: 'Titular', value: 'María Catalina Rojas Soto' },
      { label: 'Email', value: 'maria.rojas@gmail.com' },
      { label: 'Monto', value: '$3.300' },
    ],
  },
};
