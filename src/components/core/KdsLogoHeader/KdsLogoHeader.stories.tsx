import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
} from './KdsLogoHeader';
import { colors, fontWeights, fontSizes, borderRadius, spacing } from '../../../tokens';

const meta: Meta<typeof KdsLogoHeader> = {
  title: 'Core/KdsLogoHeader',
  component: KdsLogoHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof KdsLogoHeader>;

/**
 * Default KdsLogoHeader with all sub-components.
 */
export const Default: Story = {
  render: () => (
    <KdsLogoHeader>
      <KdsLogoHeaderLogo />
      <KdsLogoHeaderSeparator />
      <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
      <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
    </KdsLogoHeader>
  ),
};

/**
 * KdsLogoHeader without close button.
 */
export const WithoutCloseButton: Story = {
  render: () => (
    <KdsLogoHeader>
      <KdsLogoHeaderLogo />
      <KdsLogoHeaderSeparator />
      <KdsLogoHeaderCode>ABCD-1234-EFGH</KdsLogoHeaderCode>
    </KdsLogoHeader>
  ),
};

/**
 * KdsLogoHeader with a longer code.
 */
export const LongCode: Story = {
  render: () => (
    <KdsLogoHeader>
      <KdsLogoHeaderLogo />
      <KdsLogoHeaderSeparator />
      <KdsLogoHeaderCode>PAYMENT-2024-12-09-ABC123</KdsLogoHeaderCode>
      <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
    </KdsLogoHeader>
  ),
};

/**
 * KdsLogoHeader with custom logo.
 */
export const CustomLogo: Story = {
  render: () => (
    <KdsLogoHeader>
      <KdsLogoHeaderLogo>
        <span
          style={{
            fontWeight: fontWeights.bold,
            fontSize: fontSizes.sm,
            color: colors.primary.main,
          }}
        >
          CustomBrand
        </span>
      </KdsLogoHeaderLogo>
      <KdsLogoHeaderSeparator />
      <KdsLogoHeaderCode>CUSTOM-LOGO</KdsLogoHeaderCode>
      <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
    </KdsLogoHeader>
  ),
};

/**
 * KdsLogoHeader with custom separator.
 */
export const CustomSeparator: Story = {
  render: () => (
    <KdsLogoHeader>
      <KdsLogoHeaderLogo />
      <KdsLogoHeaderSeparator>&bull;</KdsLogoHeaderSeparator>
      <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
      <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
    </KdsLogoHeader>
  ),
};

/**
 * KdsLogoHeader in context - showing usage within a container.
 */
export const InContext: Story = {
  render: () => (
    <div style={{ maxWidth: 400, border: '1px solid #e0e0e0', borderRadius: borderRadius.md }}>
      <KdsLogoHeader>
        <KdsLogoHeaderLogo />
        <KdsLogoHeaderSeparator />
        <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
        <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
      </KdsLogoHeader>
      <div style={{ padding: spacing[2.5], backgroundColor: colors.background.elevated, minHeight: '200px' }}>
        Payment content goes here...
      </div>
    </div>
  ),
};

/**
 * All sub-components showcase.
 */
export const SubComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3], padding: spacing[2.5] }}>
      <div>
        <div style={{ fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>LogoHeaderLogo (default)</div>
        <KdsLogoHeaderLogo />
      </div>

      <div>
        <div style={{ fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>LogoHeaderLogo (custom)</div>
        <KdsLogoHeaderLogo>
          <span style={{ fontWeight: fontWeights.bold, color: colors.success.main }}>GreenBrand</span>
        </KdsLogoHeaderLogo>
      </div>

      <div>
        <div style={{ fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>LogoHeaderSeparator</div>
        <KdsLogoHeaderSeparator />
      </div>

      <div>
        <div style={{ fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>LogoHeaderCode</div>
        <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
      </div>

      <div>
        <div style={{ fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>LogoHeaderCloseButton</div>
        <div style={{ width: '100px' }}>
          <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
        </div>
      </div>
    </div>
  ),
};
