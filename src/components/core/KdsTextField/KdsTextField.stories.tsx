import type { Meta, StoryObj } from '@storybook/react';
import { KdsTextField } from './KdsTextField';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsTextField> = {
  title: 'Core/KdsTextField',
  component: KdsTextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    multiline: { control: 'boolean' },
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

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'flex-start' }}>
      <KdsTextField label="Small" size="small" placeholder="Small input" />
      <KdsTextField label="Medium" size="medium" placeholder="Medium input" />
    </div>
  ),
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

export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <KdsTextField
        label="Monto"
        placeholder="0"
        startAdornment={<span style={{ color: 'rgba(0,0,0,0.6)' }}>$</span>}
      />
      <KdsTextField
        label="Peso"
        placeholder="0"
        endAdornment={<span style={{ color: 'rgba(0,0,0,0.6)' }}>kg</span>}
      />
      <KdsTextField
        label="Email"
        placeholder="usuario"
        endAdornment={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(0,0,0,0.56)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        }
      />
    </div>
  ),
};

export const Multiline: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Escriba una descripción...',
    multiline: true,
    rows: 4,
  },
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <KdsTextField label="Texto" type="text" placeholder="Texto normal" />
      <KdsTextField label="Password" type="password" placeholder="••••••••" />
      <KdsTextField label="Email" type="email" placeholder="nombre@ejemplo.com" />
      <KdsTextField label="Número" type="number" placeholder="0" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <KdsTextField label="Nombre completo" required />
      <KdsTextField label="RUT" placeholder="12.345.678-9" required />
      <KdsTextField label="Email" type="email" required />
      <KdsTextField label="Teléfono" type="tel" placeholder="+56 9 1234 5678" />
      <KdsTextField
        label="Comentarios"
        multiline
        rows={3}
        placeholder="Escriba sus comentarios aquí..."
      />
    </form>
  ),
};
