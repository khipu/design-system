import type { Meta, StoryObj } from '@storybook/react';
import { KdsCopyableTable } from './KdsCopyableTable';
import { KdsCard } from '../KdsCard';
import { spacing } from '../../../tokens';

/**
 * KdsCopyableTable — tabla compacta con filas copy-on-click + botón "Copiar todo".
 *
 * Layout (spec):
 * - Container: border 1px divider, radius md, padding 4px 6px, background paper
 * - Row: flex space-between, gap 12px, padding 10px 8px, border-top divider, font sm
 * - Row hover: bg `var(--kds-color-primary-faint)` + icon copy aparece (`.v::after`)
 * - Row `.copied`: bg `var(--kds-color-success-soft)`, `.v` color success-dark, icon → check
 * - Copy-all button: kds-btn-outlined-block + tinta primary, `.copied` → bg success-soft
 *
 * Comportamiento:
 * - Click en row → copia `row.copy ?? row.value` y aplica `.copied` por 2s
 * - Click en "Copiar todo" → copia `label: value\n...` y aplica `.copied` a TODAS las rows
 * - Keyboard: Enter/Space también dispara copy (role="button" en cada row)
 *
 * @gsp `mat:copyableTable` taglib usado en `manualVerifyMaterial.gsp`
 */
const meta: Meta<typeof KdsCopyableTable> = {
  title: 'Core/KdsCopyableTable',
  component: KdsCopyableTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tabla compacta con filas copy-on-click. Cada row se copia individualmente al click; el botón "Copiar todo" (outlined-block) copia el conjunto entero y aplica `.copied` a TODAS las rows (cambian a bg success-soft). El estado dura 2s antes de volver al normal. Acceso por teclado (Enter/Space).',
      },
    },
  },
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
