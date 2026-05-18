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
