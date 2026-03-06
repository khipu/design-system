import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
} from './KdsLogoHeader';
import Box from '@mui/material/Box';
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
        <Box
          component="span"
          sx={{
            fontWeight: fontWeights.bold,
            fontSize: fontSizes.sm,
            color: colors.primary.main,
          }}
        >
          CustomBrand
        </Box>
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
      <KdsLogoHeaderSeparator>•</KdsLogoHeaderSeparator>
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
    <Box sx={{ maxWidth: 400, border: '1px solid #e0e0e0', borderRadius: borderRadius.md }}>
      <KdsLogoHeader>
        <KdsLogoHeaderLogo />
        <KdsLogoHeaderSeparator />
        <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
        <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
      </KdsLogoHeader>
      <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '200px' }}>
        Payment content goes here...
      </Box>
    </Box>
  ),
};

/**
 * All sub-components showcase.
 */
export const SubComponents: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing[3], padding: '20px' }}>
      <Box>
        <Box sx={{ fontWeight: fontWeights.semiBold, marginBottom: '8px' }}>LogoHeaderLogo (default)</Box>
        <KdsLogoHeaderLogo />
      </Box>

      <Box>
        <Box sx={{ fontWeight: fontWeights.semiBold, marginBottom: '8px' }}>LogoHeaderLogo (custom)</Box>
        <KdsLogoHeaderLogo>
          <span style={{ fontWeight: fontWeights.bold, color: '#2E7D32' }}>GreenBrand</span>
        </KdsLogoHeaderLogo>
      </Box>

      <Box>
        <Box sx={{ fontWeight: fontWeights.semiBold, marginBottom: '8px' }}>LogoHeaderSeparator</Box>
        <KdsLogoHeaderSeparator />
      </Box>

      <Box>
        <Box sx={{ fontWeight: fontWeights.semiBold, marginBottom: '8px' }}>LogoHeaderCode</Box>
        <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
      </Box>

      <Box>
        <Box sx={{ fontWeight: fontWeights.semiBold, marginBottom: '8px' }}>LogoHeaderCloseButton</Box>
        <Box sx={{ width: '100px' }}>
          <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
        </Box>
      </Box>
    </Box>
  ),
};
