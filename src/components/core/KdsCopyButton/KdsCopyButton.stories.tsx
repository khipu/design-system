import type { Meta, StoryObj } from '@storybook/react';
import { KdsCopyButton } from './KdsCopyButton';

const meta: Meta<typeof KdsCopyButton> = {
  title: 'Components/Data Display/KdsCopyButton',
  component: KdsCopyButton,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    copiedText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCopyButton>;

/** Código de operación. */
export const Code: Story = {
  args: { value: 'bbre-ujtb-sk0n', copiedText: 'Código copiado' },
};

/** URL / link para compartir. */
export const Url: Story = {
  args: { value: 'https://khipu.com/pay/abc123', copiedText: 'Link copiado' },
};
