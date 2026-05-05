import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KdsCheckbox } from './KdsCheckbox';
import { borderRadius, borders, fontWeights, spacing } from '../../../tokens';

const meta: Meta<typeof KdsCheckbox> = {
  title: 'Core/KdsCheckbox',
  component: KdsCheckbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCheckbox>;

export const Default: Story = {
  args: {
    label: 'Acepto los términos y condiciones',
  },
};

export const Checked: Story = {
  args: {
    label: 'Opción seleccionada',
    checked: true,
  },
};

export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
      <KdsCheckbox
        label={checked ? 'Activado' : 'Desactivado'}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
      <KdsCheckbox label="Disabled unchecked" disabled />
      <KdsCheckbox label="Disabled checked" disabled checked />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[1] }}>
      <KdsCheckbox aria-label="Option 1" />
      <KdsCheckbox aria-label="Option 2" defaultChecked />
      <KdsCheckbox aria-label="Option 3" />
    </div>
  ),
};

export const FormExample: Story = {
  render: function FormCheckboxes() {
    const [preferences, setPreferences] = useState({
      email: true,
      sms: false,
      push: true,
    });

    const handleChange = (key: keyof typeof preferences) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPreferences((prev) => ({ ...prev, [key]: e.target.checked }));
    };

    return (
      <fieldset style={{ border: borders.inputOutlined, borderRadius: borderRadius.md, padding: spacing[2] }}>
        <legend style={{ padding: `0 ${spacing[1]}`, fontWeight: fontWeights.medium }}>Preferencias de notificación</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
          <KdsCheckbox
            label="Notificaciones por email"
            checked={preferences.email}
            onChange={handleChange('email')}
          />
          <KdsCheckbox
            label="Notificaciones por SMS"
            checked={preferences.sms}
            onChange={handleChange('sms')}
          />
          <KdsCheckbox
            label="Notificaciones push"
            checked={preferences.push}
            onChange={handleChange('push')}
          />
        </div>
      </fieldset>
    );
  },
};

export const SelectAllExample: Story = {
  render: function SelectAllCheckboxes() {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: true },
      { id: 2, label: 'Item 2', checked: false },
      { id: 3, label: 'Item 3', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);

    const handleSelectAll = () => {
      setItems((prev) => prev.map((item) => ({ ...item, checked: !allChecked })));
    };

    const handleItemChange = (id: number) => () => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[0.5] }}>
        <KdsCheckbox
          label="Seleccionar todo"
          checked={allChecked}
          onChange={handleSelectAll}
        />
        <div style={{ marginLeft: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[0.5] }}>
          {items.map((item) => (
            <KdsCheckbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={handleItemChange(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};
