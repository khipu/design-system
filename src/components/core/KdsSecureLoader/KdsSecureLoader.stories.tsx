import type { Meta, StoryObj } from '@storybook/react';
import { KdsSecureLoader } from './KdsSecureLoader';

const meta: Meta<typeof KdsSecureLoader> = {
  title: 'Components/Feedback/KdsSecureLoader',
  component: KdsSecureLoader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSecureLoader>;

/** Solo el spinner con candado (uso embebido, sin texto). */
export const Default: Story = {
  args: {},
};

/** Con frases de estado (uso típico durante la espera de la operación). */
export const WithText: Story = {
  args: {
    title: 'Conectando',
    message: 'Iniciando una conexión segura',
  },
};

/** Otra fase del flujo. */
export const SubmittingCredentials: Story = {
  args: {
    title: 'Iniciando operación',
    message: 'Ingresando credenciales',
  },
};
