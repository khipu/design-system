import type { Meta, StoryObj } from '@storybook/react';
import { KdsSecureFooter } from './KdsSecureFooter';

const meta: Meta<typeof KdsSecureFooter> = {
  title: 'Domain/KdsSecureFooter',
  component: KdsSecureFooter,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inside'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSecureFooter>;

export const Default: Story = {
  args: {
    children: 'Pago seguro procesado por Khipu',
  },
};

export const InsideVariant: Story = {
  args: {
    variant: 'inside',
    children: 'Pago seguro procesado por Khipu',
  },
};

export const CustomText: Story = {
  args: {
    children: 'Transacción protegida por Khipu',
  },
};

export const AllVariants: Story = {
  render: function AllFooterVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#666' }}>
            Variante default
          </p>
          <KdsSecureFooter>Pago seguro procesado por Khipu</KdsSecureFooter>
        </div>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#666' }}>
            Variante inside
          </p>
          <KdsSecureFooter variant="inside">
            Pago seguro procesado por Khipu
          </KdsSecureFooter>
        </div>
      </div>
    );
  },
};
