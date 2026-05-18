import type { Meta, StoryObj } from '@storybook/react';
import { KdsDivider } from './KdsDivider';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsDivider> = {
  title: 'Core/KdsDivider',
  component: KdsDivider,
  tags: ['autodocs'],
  argTypes: {
    dashed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsDivider>;

export const Default: Story = {};

export const Dashed: Story = {
  args: { dashed: true },
};

export const AllVariants: Story = {
  render: function AllDividerVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], maxWidth: '400px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>Sólido</span>
        <KdsDivider />
        <span style={{ fontSize: '14px', color: '#666' }}>Punteado</span>
        <KdsDivider dashed />
      </div>
    );
  },
};
