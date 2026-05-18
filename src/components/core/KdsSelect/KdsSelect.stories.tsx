import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsSelect } from './KdsSelect';

const meta: Meta<typeof KdsSelect> = {
  title: 'Core/KdsSelect',
  component: KdsSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof KdsSelect>;

/**
 * Select basico con lista de bancos.
 */
export const Default: Story = {
  render: function DefaultSelect() {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <KdsSelect
          label="Banco"
          value={value}
          onValueChange={setValue}
          placeholder="Selecciona tu banco"
        >
          <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
          <KdsSelect.Item value="santander">Santander</KdsSelect.Item>
          <KdsSelect.Item value="estado">Banco Estado</KdsSelect.Item>
          <KdsSelect.Item value="chile">Banco de Chile</KdsSelect.Item>
        </KdsSelect>
      </div>
    );
  },
};

/**
 * Select con texto de ayuda descriptivo.
 */
export const WithHelperText: Story = {
  render: function SelectWithHelperText() {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <KdsSelect
          label="Banco"
          value={value}
          onValueChange={setValue}
          placeholder="Selecciona tu banco"
          helperText="Selecciona el banco desde donde realizaras la transferencia"
        >
          <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
          <KdsSelect.Item value="santander">Santander</KdsSelect.Item>
          <KdsSelect.Item value="estado">Banco Estado</KdsSelect.Item>
          <KdsSelect.Item value="chile">Banco de Chile</KdsSelect.Item>
        </KdsSelect>
      </div>
    );
  },
};

/**
 * Select en estado de error con mensaje de validacion.
 */
export const ErrorState: Story = {
  render: function SelectErrorState() {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <KdsSelect
          label="Banco"
          value={value}
          onValueChange={setValue}
          placeholder="Selecciona tu banco"
          error={true}
          helperText="Debes seleccionar un banco"
        >
          <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
          <KdsSelect.Item value="santander">Santander</KdsSelect.Item>
          <KdsSelect.Item value="estado">Banco Estado</KdsSelect.Item>
          <KdsSelect.Item value="chile">Banco de Chile</KdsSelect.Item>
        </KdsSelect>
      </div>
    );
  },
};

/**
 * Select deshabilitado.
 */
export const Disabled: Story = {
  render: function SelectDisabled() {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <KdsSelect
          label="Banco"
          value={value}
          onValueChange={setValue}
          placeholder="Selecciona tu banco"
          disabled={true}
        >
          <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
          <KdsSelect.Item value="santander">Santander</KdsSelect.Item>
          <KdsSelect.Item value="estado">Banco Estado</KdsSelect.Item>
          <KdsSelect.Item value="chile">Banco de Chile</KdsSelect.Item>
        </KdsSelect>
      </div>
    );
  },
};
