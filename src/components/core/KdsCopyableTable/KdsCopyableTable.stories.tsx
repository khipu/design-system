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

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-copyable-table">
 *   <div class="kds-copyable-table-row" role="button" tabindex="0">
 *     <span class="k">Banco</span>
 *     <span class="v">Banco Security</span>
 *   </div>
 *   <div class="kds-copyable-table-row" role="button" tabindex="0">
 *     <span class="k">Cuenta</span>
 *     <span class="v">12345678</span>
 *   </div>
 * </div>
 * <button type="button" class="kds-btn kds-btn-outlined kds-btn-block kds-copy-all-btn">
 *   <span class="kds-icon"><i class="material-symbols-outlined">content_copy</i></span>
 *   <span>Copiar todos los datos</span>
 * </button>
 * ```
 *
 * Ver `Patterns/CSS-only → CopyableTable` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-copyable-table">
        <div className="kds-copyable-table-row" role="button" tabIndex={0}>
          <span className="k">Banco</span>
          <span className="v">Banco Security</span>
        </div>
        <div className="kds-copyable-table-row" role="button" tabIndex={0}>
          <span className="k">Cuenta</span>
          <span className="v">12345678</span>
        </div>
        <div className="kds-copyable-table-row" role="button" tabIndex={0}>
          <span className="k">RUT</span>
          <span className="v">76.123.456-7</span>
        </div>
      </div>
      <button
        type="button"
        className="kds-btn kds-btn-outlined kds-btn-block kds-copy-all-btn"
      >
        <span className="kds-icon">
          <i className="material-symbols-outlined">content_copy</i>
        </span>
        <span>Copiar todos los datos</span>
      </button>
    </div>
  ),
};
