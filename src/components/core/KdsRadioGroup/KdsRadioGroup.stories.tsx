import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsRadioGroup } from './KdsRadioGroup';

const accountOptions = [
  { value: 'corriente', label: 'Cuenta corriente' },
  { value: 'vista', label: 'Cuenta vista' },
  { value: 'ahorro', label: 'Cuenta de ahorro' },
];

const meta: Meta<typeof KdsRadioGroup> = {
  title: 'Core/KdsRadioGroup',
  component: KdsRadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsRadioGroup>;

export const Default: Story = {
  args: {
    name: 'bank-type',
    label: 'Tipo de cuenta',
    options: accountOptions,
  },
};

export const Controlled: Story = {
  render: function ControlledRadioGroup() {
    const [value, setValue] = useState('vista');
    return (
      <KdsRadioGroup
        name="bank-type-controlled"
        label="Tipo de cuenta"
        options={accountOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDisabledOption: Story = {
  args: {
    name: 'bank-type-disabled',
    label: 'Tipo de cuenta',
    options: [
      { value: 'corriente', label: 'Cuenta corriente' },
      { value: 'vista', label: 'Cuenta vista' },
      { value: 'ahorro', label: 'Cuenta de ahorro', disabled: true },
    ],
  },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <fieldset class="kds-radio-group">
 *   <legend>Elige tu banco</legend>
 *   <label class="radio">
 *     <input type="radio" name="banco" value="security" checked />
 *     <span>Banco Security</span>
 *   </label>
 *   <label class="radio">
 *     <input type="radio" name="banco" value="estado" />
 *     <span>BancoEstado</span>
 *   </label>
 * </fieldset>
 * ```
 *
 * Ver `Patterns/CSS-only → RadioGroup` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<fieldset class="kds-radio-group">
  <legend>Elige tu banco</legend>
  <label class="radio">
    <input type="radio" name="banco" value="security" checked/>
    <span>Banco Security</span>
  </label>
  <label class="radio">
    <input type="radio" name="banco" value="estado"/>
    <span>BancoEstado</span>
  </label>
</fieldset>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <fieldset className="kds-radio-group">
        <legend>Elige tu banco</legend>
        <label className="radio">
          <input type="radio" name="banco-html" value="security" defaultChecked />
          <span>Banco Security</span>
        </label>
        <label className="radio">
          <input type="radio" name="banco-html" value="estado" />
          <span>BancoEstado</span>
        </label>
      </fieldset>
    </div>
  ),
};
