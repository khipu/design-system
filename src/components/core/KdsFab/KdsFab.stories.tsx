import type { Meta, StoryObj } from '@storybook/react';
import { KdsFab } from './KdsFab';

const meta: Meta<typeof KdsFab> = {
  title: 'Components/Actions/KdsFab',
  component: KdsFab,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '320px',
          height: '200px',
          background: 'var(--kds-color-background, #F5F5F5)',
          borderRadius: 'var(--kds-radius-card, 14px)',
        }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    icon: { control: 'text' },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'none'],
    },
    hidden: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsFab>;

/** Cancel action — a minimalist "X", pinned to the top-right corner of its container. */
export const Cancel: Story = {
  args: { icon: 'close', 'aria-label': 'Cancelar pago', position: 'top-right' },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '320px',
          height: '200px',
          background: '#FFFFFF',
          borderRadius: 'var(--kds-radius-card, 14px)',
          border: '1px solid var(--kds-color-divider, #E0E0E0)',
        }}>
        <Story />
      </div>
    ),
  ],
};

/** Hidden state — animated out (fade + slight move); used while scrolling down. */
export const Hidden: Story = {
  args: { icon: 'close', 'aria-label': 'Cancelar pago', position: 'top-right', hidden: true },
};

/** Generic use — any Material Symbols icon. */
export const CustomIcon: Story = {
  args: { icon: 'attach_money', 'aria-label': 'Pagar', position: 'top-right' },
};
