import type { Meta, StoryObj } from '@storybook/react';
import { KdsCopyableTable } from './KdsCopyableTable';
import { KdsCard } from '../KdsCard';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsCopyableTable> = {
  title: 'Core/KdsCopyableTable',
  component: KdsCopyableTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsCopyableTable>;

const fullRows = [
  { label: 'Banco', value: 'Banco Security' },
  { label: 'RUT', value: '76.187.287-7' },
  { label: 'N° cuenta', value: '98765432' },
  { label: 'Tipo', value: 'Corriente' },
  { label: 'Titular', value: 'Khipu CLBS' },
  { label: 'Email', value: 'transferencias@khipu.com' },
  { label: 'Monto', value: '$3.300' },
];

export const Default: Story = {
  args: {
    rows: fullRows,
  },
};

export const FewRows: Story = {
  args: {
    rows: [
      { label: 'Banco', value: 'Banco Security' },
      { label: 'RUT', value: '76.187.287-7' },
      { label: 'Monto', value: '$3.300' },
    ],
  },
};

export const InCardContext: Story = {
  render: function CopyableTableInCard() {
    const rows = [
      { label: 'Banco', value: 'Banco Security' },
      { label: 'RUT', value: '76.187.287-7' },
      { label: 'N° cuenta', value: '98765432' },
      { label: 'Tipo', value: 'Corriente' },
      { label: 'Titular', value: 'Khipu CLBS' },
      { label: 'Email', value: 'transferencias@khipu.com' },
      { label: 'Monto', value: '$3.300' },
    ];

    return (
      <KdsCard style={{ maxWidth: '400px', padding: spacing[3] }}>
        <h2 className="kds-card-title">Datos del destinatario</h2>
        <KdsCopyableTable rows={rows} />
      </KdsCard>
    );
  },
};
