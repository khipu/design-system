import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsLinearProgress } from './KdsLinearProgress';

const meta: Meta<typeof KdsLinearProgress> = {
  title: 'Core/KdsLinearProgress',
  component: KdsLinearProgress,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsLinearProgress>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 60 },
};

export const Complete: Story = {
  args: { value: 100 },
};

export const Animated: Story = {
  render: function AnimatedProgress() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 80);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <KdsLinearProgress value={value} />
        <span style={{ fontSize: '14px', color: '#666' }}>{value}%</span>
      </div>
    );
  },
};
