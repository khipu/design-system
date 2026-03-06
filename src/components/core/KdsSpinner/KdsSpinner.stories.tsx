import type { Meta, StoryObj } from '@storybook/react';
import { KdsSpinner } from './KdsSpinner';
import { KdsButton } from '../KdsButton';
import { colors, fontSizes, borderRadius, spacing } from '../../../tokens';

const meta: Meta<typeof KdsSpinner> = {
  title: 'Core/KdsSpinner',
  component: KdsSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
    },
    thickness: {
      control: { type: 'range', min: 1, max: 8, step: 0.5 },
    },
    customSize: {
      control: { type: 'range', min: 16, max: 100, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSpinner>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[4], alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner size="small" />
        <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'rgba(0,0,0,0.6)' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner size="medium" />
        <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'rgba(0,0,0,0.6)' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner size="large" />
        <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'rgba(0,0,0,0.6)' }}>Large</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[4], alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner color="primary" />
        <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'rgba(0,0,0,0.6)' }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner color="secondary" />
        <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'rgba(0,0,0,0.6)' }}>Secondary</p>
      </div>
      <div
        style={{
          textAlign: 'center',
          backgroundColor: colors.primary.main,
          padding: '16px',
          borderRadius: borderRadius.md,
        }}
      >
        <KdsSpinner color="inherit" style={{ color: 'white' }} />
        <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'white' }}>Inherit</p>
      </div>
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    customSize: 80,
    thickness: 2,
  },
};

export const Thickness: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[4], alignItems: 'center' }}>
      {[2, 4, 6, 8].map((thickness) => (
        <div key={thickness} style={{ textAlign: 'center' }}>
          <KdsSpinner thickness={thickness} />
          <p style={{ margin: '8px 0 0 0', fontSize: fontSizes.sm, color: 'rgba(0,0,0,0.6)' }}>
            thickness={thickness}
          </p>
        </div>
      ))}
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
      <KdsButton disabled>
        <KdsSpinner size="small" color="inherit" style={{ marginRight: '8px' }} />
        Cargando...
      </KdsButton>
      <KdsButton loading>
        Procesando...
      </KdsButton>
    </div>
  ),
};

export const LoadingOverlay: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '300px',
        height: '200px',
        border: '1px solid #ddd',
        borderRadius: borderRadius.md,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Contenido</h4>
        <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)' }}>
          Este contenido está siendo cargado...
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <KdsSpinner />
      </div>
    </div>
  ),
};

export const CenteredLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        gap: spacing[2],
      }}
    >
      <KdsSpinner size="large" />
      <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)' }}>Cargando datos...</p>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1] }}>
      <KdsSpinner size="small" />
      <span>Procesando transacción...</span>
    </div>
  ),
};

export const MultipleSpinners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[3] }}>
      {['primary', 'secondary'].map((color) => (
        <div
          key={color}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: spacing[2],
          }}
        >
          <KdsSpinner size="small" color={color as 'primary' | 'secondary'} />
          <KdsSpinner size="medium" color={color as 'primary' | 'secondary'} />
          <KdsSpinner size="large" color={color as 'primary' | 'secondary'} />
        </div>
      ))}
    </div>
  ),
};
