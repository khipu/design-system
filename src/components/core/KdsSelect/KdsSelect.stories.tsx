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
