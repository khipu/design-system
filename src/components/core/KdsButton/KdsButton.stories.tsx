import type { Meta, StoryObj } from '@storybook/react';
import { KdsButton } from './KdsButton';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsButton> = {
  title: 'Core/KdsButton',
  component: KdsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsButton>;

export const Default: Story = {
  args: {
    children: 'Ingresar',
    variant: 'contained',
    color: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
      <KdsButton variant="contained">Contained</KdsButton>
      <KdsButton variant="outlined">Outlined</KdsButton>
      <KdsButton variant="text">Text</KdsButton>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
      <KdsButton color="primary">Primary</KdsButton>
      <KdsButton color="secondary">Secondary</KdsButton>
      <KdsButton color="success">Success</KdsButton>
      <KdsButton color="error">Error</KdsButton>
      <KdsButton color="warning">Warning</KdsButton>
      <KdsButton color="info">Info</KdsButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
      <KdsButton size="small">Small</KdsButton>
      <KdsButton size="medium">Medium</KdsButton>
      <KdsButton size="large">Large</KdsButton>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Procesando...',
    loading: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2] }}>
      <KdsButton disabled variant="contained">Contained</KdsButton>
      <KdsButton disabled variant="outlined">Outlined</KdsButton>
      <KdsButton disabled variant="text">Text</KdsButton>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width KdsButton',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
      <KdsButton
        startIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        }
      >
        Add Item
      </KdsButton>
      <KdsButton
        endIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        }
      >
        Continue
      </KdsButton>
    </div>
  ),
};

export const OutlinedVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
      <KdsButton variant="outlined" color="primary">Primary</KdsButton>
      <KdsButton variant="outlined" color="secondary">Secondary</KdsButton>
      <KdsButton variant="outlined" color="success">Success</KdsButton>
      <KdsButton variant="outlined" color="error">Error</KdsButton>
      <KdsButton variant="outlined" color="warning">Warning</KdsButton>
      <KdsButton variant="outlined" color="info">Info</KdsButton>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
      <KdsButton variant="text" color="primary">Primary</KdsButton>
      <KdsButton variant="text" color="secondary">Secondary</KdsButton>
      <KdsButton variant="text" color="success">Success</KdsButton>
      <KdsButton variant="text" color="error">Error</KdsButton>
      <KdsButton variant="text" color="warning">Warning</KdsButton>
      <KdsButton variant="text" color="info">Info</KdsButton>
    </div>
  ),
};
