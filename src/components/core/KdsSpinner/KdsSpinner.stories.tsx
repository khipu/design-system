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

export const WithLabel: Story = {
  args: {
    size: 'medium',
    label: 'Cargando datos...',
  },
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
      <KdsButton disabled>
        <KdsSpinner size="small" style={{ marginRight: spacing[1] }} />
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

export const AllSizesGrid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[3] }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing[2],
        }}
      >
        <KdsSpinner size="small" />
        <KdsSpinner size="medium" />
        <KdsSpinner size="large" />
      </div>
    </div>
  ),
};
