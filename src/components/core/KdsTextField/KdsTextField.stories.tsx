import type { Meta, StoryObj } from '@storybook/react';
import { KdsTextField } from './KdsTextField';
import { spacing, semanticSpacing } from '../../../tokens';

const meta: Meta<typeof KdsTextField> = {
  title: 'Core/KdsTextField',
  component: KdsTextField,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTextField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'nombre@ejemplo.com',
  },
};

export const WithValue: Story = {
  args: {
    label: 'RUT',
    defaultValue: '12.345.678-9',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Mínimo 8 caracteres',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    defaultValue: 'invalid-email',
    error: true,
    helperText: 'Por favor ingrese un email válido',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Nombre',
    defaultValue: 'Juan Pérez',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Monto',
    value: '$1.000',
    readOnly: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Dirección',
    placeholder: 'Ingrese su dirección completa',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <KdsTextField
        label="Buscar"
        placeholder="Buscar por nombre"
        startIcon="search"
      />
      <KdsTextField
        label="Contraseña"
        type="password"
        endIcon="visibility_off"
      />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <KdsTextField label="Texto" type="text" placeholder="Texto normal" />
      <KdsTextField label="Password" type="password" placeholder="Contraseña" />
      <KdsTextField label="Email" type="email" placeholder="nombre@ejemplo.com" />
      <KdsTextField label="Número" type="number" placeholder="0" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formGap, maxWidth: '400px' }}>
      <KdsTextField label="Nombre completo" required />
      <KdsTextField label="RUT" placeholder="12.345.678-9" required />
      <KdsTextField label="Email" type="email" required />
      <KdsTextField label="Teléfono" type="tel" placeholder="+56 9 1234 5678" />
    </form>
  ),
};
