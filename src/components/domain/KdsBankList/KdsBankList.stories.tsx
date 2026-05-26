import type { Meta, StoryObj } from '@storybook/react';
import { KdsBankList } from './KdsBankList';
import { KdsBankRow } from '../KdsBankRow';
import { KdsQrRow } from '../KdsQrRow';

/**
 * KdsBankList — contenedor vertical de filas de selección (`KdsBankRow`, `KdsQrRow`).
 *
 * Layout (spec):
 * - `display: flex; flex-direction: column`
 * - `gap: 8px` (`var(--kds-spacing-1)`) entre filas
 * - `margin-bottom: 8px`
 *
 * Comportamiento en `KdsBankModal`:
 * - Cuando es descendiente de `.kds-bank-modal-body`, el `gap` se reduce a `4px` automáticamente para mantener
 *   más densidad visual en el modal scrolleable.
 *
 * Convención `data-kds-tab-panel`:
 * - Se puede emparejar con `KdsSegmentedTabs` para que actúe como panel auto-toggleable. Ver `_choosePaymentMethodFormMaterial.gsp`.
 *
 * @gsp _choosePaymentMethodFormMaterial.gsp, _bankModalMaterial.gsp
 * @css .kds-bank-list
 */
const meta: Meta<typeof KdsBankList> = {
  title: 'Domain/KdsBankList',
  component: KdsBankList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Lista vertical de filas de selección. `display: flex; flex-direction: column; gap: 8px`. Dentro de `KdsBankModal` el gap se reduce a 4px. Acepta hijos `KdsBankRow`, `KdsQrRow` o `<button class="kds-bank-row">` para casos especiales (ej. "Todos los bancos").',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsBankList>;

/** Lista básica de 3 bancos. */
export const Default: Story = {
  render: function DefaultBankList() {
    return (
      <KdsBankList>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow
          name="Banco Falabella"
          logoUrl="https://placehold.co/40x40/8347AD/white?text=BF"
        />
        <KdsBankRow name="Banco BCI" />
      </KdsBankList>
    );
  },
};

/**
 * Con `KdsQrRow` como primer item — patrón canónico del flow Personas.
 *
 * @spec QrRow primero → BankRows después; gap 8px entre todos.
 */
export const WithQrRow: Story = {
  render: function BankListWithQr() {
    return (
      <KdsBankList>
        <KdsQrRow
          name="Pagar escaneando QR"
          description="Escanea con la app de tu banco"
          badge="Rapido"
        />
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow
          name="Banco de Chile"
          logoUrl="https://placehold.co/40x40/003DA5/white?text=BC"
        />
      </KdsBankList>
    );
  },
};

/** Uno de los bancos en estado `selected` — caso "banco pre-seleccionado". */
export const WithSelectedBank: Story = {
  render: function BankListWithSelected() {
    return (
      <KdsBankList>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow name="Banco Santander" selected />
        <KdsBankRow
          name="Banco Falabella"
          logoUrl="https://placehold.co/40x40/8347AD/white?text=BF"
        />
      </KdsBankList>
    );
  },
};

/**
 * Lista larga con scroll — caso del bank modal cuando hay 15+ bancos.
 *
 * @spec Container con max-height fuerza scroll. Dentro de `KdsBankModal` el body
 * tiene `overflow-y: auto` por defecto.
 */
export const ScrollingLongList: Story = {
  render: function LongBankList() {
    const banks = [
      'Banco Estado', 'Banco de Chile', 'Banco Santander', 'Banco BCI', 'Banco Falabella',
      'Banco Itaú', 'Banco Security', 'Banco Internacional', 'Banco Edwards Citi',
      'Banco BBVA', 'Banco Ripley', 'Banco Consorcio', 'Scotiabank', 'HSBC',
      'Banco BICE', 'Banco Corpbanca', 'Coopeuch',
    ];
    return (
      <div style={{ maxHeight: 320, overflowY: 'auto', maxWidth: 400, border: '1px solid #eee', borderRadius: 12 }}>
        <KdsBankList>
          {banks.map((name) => <KdsBankRow key={name} name={name} />)}
        </KdsBankList>
      </div>
    );
  },
};

/**
 * Botón custom "Todos los bancos" como hijo directo de la lista.
 *
 * @pattern Cuando el flow simplified tiene > 5 bancos, se muestra un botón final
 * que abre `KdsBankModal`. Pattern usado en `_choosePaymentMethodFormMaterial.gsp`.
 */
export const WithCustomActionRow: Story = {
  render: function BankListWithAction() {
    return (
      <KdsBankList>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow name="Banco Santander" />
        <KdsBankRow name="Banco de Chile" />
        <button type="button" className="kds-bank-row">
          <span className="kds-bank-row-logo neutral">
            <i className="material-symbols-outlined">account_balance</i>
          </span>
          <span className="kds-bank-row-name">Todos los bancos y billeteras</span>
          <span className="kds-badge primary">+17</span>
          <i className="material-symbols-outlined">chevron_right</i>
        </button>
      </KdsBankList>
    );
  },
};
