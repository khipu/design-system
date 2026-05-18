import type { Meta, StoryObj } from '@storybook/react';
import { KdsCountdown } from './KdsCountdown';

const meta: Meta<typeof KdsCountdown> = {
  title: 'Core/KdsCountdown',
  component: KdsCountdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsCountdown>;

export const Default: Story = {
  render: function DefaultCountdown() {
    return <KdsCountdown deadline={new Date(Date.now() + 3600000).toISOString()} />;
  },
};

export const WithLabel: Story = {
  render: function WithLabelCountdown() {
    return (
      <KdsCountdown
        deadline={new Date(Date.now() + 1800000).toISOString()}
        label="Tiempo restante"
      />
    );
  },
};

export const Urgent: Story = {
  render: function UrgentCountdown() {
    return (
      <KdsCountdown
        deadline={new Date(Date.now() + 120000).toISOString()}
        label="¡Apúrate!"
      />
    );
  },
};
