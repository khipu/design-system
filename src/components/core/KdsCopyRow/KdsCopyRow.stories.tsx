import type { Meta, StoryObj } from '@storybook/react';
import { KdsCopyRow } from './KdsCopyRow';

/**
 * KdsCopyRow — fila clickeable que copia su valor al portapapeles.
 *
 * Layout (spec):
 * - El ROW ENTERO es el botón (`<button class="kds-copy-row">`)
 * - `display: flex; align-items: center; gap: 10px`
 * - `padding: 12px 14px`, `border: 1px solid`, `border-radius: var(--kds-radius-row)`
 * - Label: caption / uppercase / color text-secondary / margin-bottom 2px
 * - Value: font-weight medium / color text-primary
 * - Icon `<i>` (`content_copy`): 16px, color text-secondary, flex-shrink 0
 *
 * Estado `.copied`:
 * - `background: var(--kds-color-success-soft)`
 * - `border-color: var(--kds-color-success-main)`
 * - Toast `.kds-copy-toast` (position absolute right) aparece con opacity 0 → 1
 */
const meta: Meta<typeof KdsCopyRow> = {
  title: 'Core/KdsCopyRow',
  component: KdsCopyRow,
  tags: ['autodocs'],
  // Default decorator: envolver en `.kds-copy-list` (flex-column) con ancho fijo.
  // `.kds-copy-row` es un <button> que NO se estira a su contenedor por sí solo;
  // dentro de `.kds-copy-list` (flex column) los hijos sí se estiran (align-items: stretch).
  // Este es el patrón canónico de producción.
  decorators: [
    (Story) => (
      <div className="kds-copy-list" style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Fila copyable — el row entero es el botón. No tiene botón de copy separado: el icon copy es un `<i>` inline integrado y al copiar muestra `.kds-copy-toast` (position absolute) con check + texto "Copiado". Background cambia a success-soft. **Requiere ancho mínimo ~320px** para que el toast no se superponga visualmente al label/value.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label superior (uppercase, caption).' },
    value: { control: 'text', description: 'Valor mostrado y copiado al click.' },
    copiedText: { control: 'text', description: 'Texto del toast cuando se copia. Default "Copiado".' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCopyRow>;

/** Caso básico — copia RUT. */
export const Default: Story = {
  args: {
    label: 'RUT',
    value: '76.187.287-7',
  },
};

/** Cuenta bancaria. */
export const BankAccount: Story = {
  args: {
    label: 'N° cuenta',
    value: '98765432',
  },
};

/** Email — value largo. */
export const Email: Story = {
  args: {
    label: 'Email',
    value: 'transferencias@khipu.com',
  },
};

/**
 * Lista vertical de varios CopyRow — patrón para datos del destinatario en pagos manuales.
 *
 * @spec Gap entre rows = 0 (los rows comparten borders); usar `.kds-copy-list` para gap explícito.
 */
export const MultipleRows: Story = {
  render: function MultipleRowsCopyRow() {
    return (
      <div className="kds-copy-list" style={{ maxWidth: 400 }}>
        <KdsCopyRow label="Banco" value="Banco Security" />
        <KdsCopyRow label="RUT" value="76.187.287-7" />
        <KdsCopyRow label="N° cuenta" value="98765432" />
        <KdsCopyRow label="Email" value="transferencias@khipu.com" />
      </div>
    );
  },
};
