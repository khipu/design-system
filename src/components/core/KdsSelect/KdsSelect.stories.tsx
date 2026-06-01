import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsSelect } from './KdsSelect';

/**
 * KdsSelect — wrapper React del taglib `mat:select` de payment.
 *
 * Usa `<select>` nativo dentro del patrón BeerCSS `field label border`.
 * Floating label + chevron automático + focus ring vía BeerCSS.
 *
 * API:
 * - `label` (string, required) — floating label
 * - `options` (KdsSelectOption[]) — lista de pares value/label
 * - `placeholder?` — primer option con value="" (equivale a `noSelection` del taglib)
 * - `error?` + `helperText?` — estado inválido con mensaje
 * - `prefixIcon?` — Material Symbol al inicio
 * - `required`, `disabled`, `value`, `onChange` — props nativas de `<select>`
 */
const meta: Meta<typeof KdsSelect> = {
  title: 'Components/Form Inputs/KdsSelect',
  component: KdsSelect,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Select nativo (`<select>`) wrapped en `field label border`. Matchea exactamente el markup del taglib `mat:select` de payment — chevron, floating label y focus ring vienen de BeerCSS.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSelect>;

const banks = [
  { value: 'bci', label: 'BCI' },
  { value: 'santander', label: 'Santander' },
  { value: 'estado', label: 'Banco Estado' },
  { value: 'chile', label: 'Banco de Chile' },
];

/** Caso básico con placeholder. */
export const Default: Story = {
  render: function DefaultSelect() {
    const [value, setValue] = useState('');
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={banks}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/** Con helper text descriptivo. */
export const WithHelperText: Story = {
  render: function SelectWithHelperText() {
    const [value, setValue] = useState('');
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={banks}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Selecciona el banco desde donde realizarás la transferencia"
      />
    );
  },
};

/** Estado de error — wrapper recibe clase `.invalid`. */
export const ErrorState: Story = {
  render: function SelectErrorState() {
    const [value, setValue] = useState('');
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={banks}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error
        helperText="Debes seleccionar un banco"
      />
    );
  },
};

/** Required — agrega `*` después del label. */
export const Required: Story = {
  render: function SelectRequired() {
    const [value, setValue] = useState('');
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={banks}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    );
  },
};

/** Disabled. */
export const Disabled: Story = {
  render: function SelectDisabled() {
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={banks}
        value="bci"
        onChange={() => undefined}
        disabled
      />
    );
  },
};

/** Con prefix icon — agrega `.prefix` al wrapper y renderiza `<i>` antes del select. */
export const WithPrefixIcon: Story = {
  render: function SelectWithPrefixIcon() {
    const [value, setValue] = useState('');
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={banks}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        prefixIcon="account_balance"
      />
    );
  },
};

/** Con un value pre-seleccionado. */
export const WithSelectedValue: Story = {
  render: function SelectWithValue() {
    const [value, setValue] = useState('santander');
    return (
      <KdsSelect
        label="Banco"
        options={banks}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/** Opción individual disabled dentro de la lista. */
export const OptionDisabled: Story = {
  render: function SelectOptionDisabled() {
    const [value, setValue] = useState('');
    return (
      <KdsSelect
        label="Banco"
        placeholder="Selecciona tu banco"
        options={[
          { value: 'bci', label: 'BCI' },
          { value: 'santander', label: 'Santander (no disponible)', disabled: true },
          { value: 'estado', label: 'Banco Estado' },
          { value: 'chile', label: 'Banco de Chile' },
        ]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — `<select>` nativo dentro del patrón
 * `field label border`. BeerCSS dibuja el chevron, floating label y focus
 * ring automáticamente; el truco floating-label funciona porque la primera
 * `<option value="">` actúa como placeholder. Modificadores combinables con
 * `.field.label.border`: `.prefix` (icon antes), `.invalid`/`.valid`/`.info`/`.warning`.
 *
 * Ver `Patterns/CSS-only → Select` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="field label border">
  <select id="bank" name="bank" required>
    <option value="">Selecciona tu banco</option>
    <option value="bci">BCI</option>
    <option value="santander">Santander</option>
    <option value="estado">Banco Estado</option>
    <option value="chile">Banco de Chile</option>
  </select>
  <label for="bank">Banco *</label>
  <span class="helper">Te enviaremos la confirmación aquí</span>
</div>

<!-- Variante con prefix icon + estado inválido -->
<div class="field label border prefix invalid">
  <i class="material-symbols-outlined">account_balance</i>
  <select id="bank-err" name="bank">
    <option value="">Selecciona tu banco</option>
    <option value="bci">BCI</option>
  </select>
  <label for="bank-err">Banco</label>
  <span class="helper">Debes seleccionar un banco</span>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="field label border">
        <select id="bank-html" name="bank" required defaultValue="">
          <option value="">Selecciona tu banco</option>
          <option value="bci">BCI</option>
          <option value="santander">Santander</option>
          <option value="estado">Banco Estado</option>
          <option value="chile">Banco de Chile</option>
        </select>
        <label htmlFor="bank-html">Banco *</label>
        <span className="helper">Te enviaremos la confirmación aquí</span>
      </div>
    </div>
  ),
};
