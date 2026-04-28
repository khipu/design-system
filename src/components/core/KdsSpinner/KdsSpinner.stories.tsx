import type { Meta, StoryObj } from '@storybook/react';
import { KdsSpinner } from './KdsSpinner';
import { KdsButton } from '../KdsButton';
import { colors, fontSizes, borderRadius, spacing, borders } from '../../../tokens';

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
        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.text.secondary }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner size="medium" />
        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.text.secondary }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner size="large" />
        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.text.secondary }}>Large</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[4], alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner color="primary" />
        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.text.secondary }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <KdsSpinner color="secondary" />
        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.text.secondary }}>Secondary</p>
      </div>
      <div
        style={{
          textAlign: 'center',
          backgroundColor: colors.primary.main,
          padding: spacing[2],
          borderRadius: borderRadius.md,
        }}
      >
        <KdsSpinner color="inherit" style={{ color: colors.primary.contrastText }} />
        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.primary.contrastText }}>Inherit</p>
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
          <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: fontSizes.sm, color: colors.text.secondary }}>
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
        <KdsSpinner size="small" color="inherit" style={{ marginRight: spacing[1] }} />
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
        border: borders.inputOutlined,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: spacing[2] }}>
        <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Contenido</h4>
        <p style={{ margin: 0, color: colors.text.secondary }}>
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
          backgroundColor: colors.overlay,
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
      <p style={{ margin: 0, color: colors.text.secondary }}>Cargando datos...</p>
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
