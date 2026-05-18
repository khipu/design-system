import type { Meta, StoryObj } from '@storybook/react';
import { KdsCopyRow } from './KdsCopyRow';

const meta: Meta<typeof KdsCopyRow> = {
  title: 'Core/KdsCopyRow',
  component: KdsCopyRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsCopyRow>;

export const Default: Story = {
  args: {
    label: 'RUT',
    value: '76.187.287-7',
  },
};

export const BankAccount: Story = {
  args: {
    label: 'N° cuenta',
    value: '98765432',
  },
};

export const MultipleRows: Story = {
  render: function MultipleRowsCopyRow() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <KdsCopyRow label="Banco" value="Banco Estado" />
        <KdsCopyRow label="RUT" value="76.187.287-7" />
        <KdsCopyRow label="Email" value="pagos@khipu.com" />
      </div>
    );
  },
};
