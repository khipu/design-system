import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { KdsTypography } from './KdsTypography';
import { colors } from '../../../tokens';

const meta: Meta<typeof KdsTypography> = {
  title: 'Core/KdsTypography',
  component: KdsTypography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display1', 'display2',
        'heading1', 'heading2', 'heading3',
        'body-large', 'body', 'body-small',
        'label', 'label-small',
        'muted', 'link',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'error', 'success', 'inherit'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTypography>;

export const Default: Story = {
  args: {
    children: 'KdsTypography component text',
    variant: 'body',
    color: 'primary',
  },
};

export const DisplayVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <KdsTypography variant="display1">Display 1 - Hero Headline (40px Bold)</KdsTypography>
      <KdsTypography variant="display2">Display 2 - Large Headline (32px Bold)</KdsTypography>
    </Box>
  ),
};

export const HeadingVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <KdsTypography variant="heading1">Heading 1 - Section Heading (28px SemiBold)</KdsTypography>
      <KdsTypography variant="heading2">Heading 2 - Subsection Heading (24px SemiBold)</KdsTypography>
      <KdsTypography variant="heading3">Heading 3 - Page Title (20px SemiBold)</KdsTypography>
    </Box>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <KdsTypography variant="body-large">
        Body Large - 16px Regular. Used for large paragraphs and main content areas.
      </KdsTypography>
      <KdsTypography variant="body">
        Body - 14px Regular. Default body text for most content throughout the application.
      </KdsTypography>
      <KdsTypography variant="body-small">
        Body Small - 12px Regular. Used for captions, help text, and secondary information.
      </KdsTypography>
    </Box>
  ),
};

export const LabelVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <KdsTypography variant="label">Label - 12px Uppercase</KdsTypography>
      <KdsTypography variant="label-small">Label Small - 10px Medium</KdsTypography>
    </Box>
  ),
};

export const CardVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, bgcolor: colors.background.elevated, borderRadius: 1 }}>
      <KdsTypography variant="heading3">Card Title - 20px SemiBold</KdsTypography>
      <KdsTypography variant="body" color="muted">Card Subtitle - 14px Regular</KdsTypography>
      <KdsTypography variant="body">Product Name - 14px Regular</KdsTypography>
    </Box>
  ),
};

export const SemanticVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <KdsTypography variant="muted">Muted text - For secondary/less important information</KdsTypography>
      <KdsTypography variant="link">Link text - Clickable link style</KdsTypography>
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <KdsTypography variant="body" color="primary">Primary color</KdsTypography>
      <KdsTypography variant="body" color="secondary">Secondary color</KdsTypography>
      <KdsTypography variant="body" color="muted">Muted color</KdsTypography>
      <KdsTypography variant="body" color="error">Error color</KdsTypography>
      <KdsTypography variant="body" color="success">Success color</KdsTypography>
    </Box>
  ),
};


export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <KdsTypography variant="label" color="muted" sx={{ mb: 1, display: 'block' }}>Display</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="display1">Display 1</KdsTypography>
        <KdsTypography variant="display2">Display 2</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="muted" sx={{ mb: 1, display: 'block' }}>Headings</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="heading1">Heading 1</KdsTypography>
        <KdsTypography variant="heading2">Heading 2</KdsTypography>
        <KdsTypography variant="heading3">Heading 3</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="muted" sx={{ mb: 1, display: 'block' }}>Body</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="body-large">Body Large</KdsTypography>
        <KdsTypography variant="body">Body</KdsTypography>
        <KdsTypography variant="body-small">Body Small</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="muted" sx={{ mb: 1, display: 'block' }}>Labels</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="label">Label</KdsTypography>
        <KdsTypography variant="label-small">Label Small</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="muted" sx={{ mb: 1, display: 'block' }}>Semantic</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="muted">Muted</KdsTypography>
        <KdsTypography variant="link">Link</KdsTypography>
      </Box>
    </Box>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <Box sx={{ maxWidth: 390, bgcolor: colors.background.paper, p: 3, borderRadius: 2 }}>
      <KdsTypography variant="heading3" sx={{ mb: 2, display: 'block' }}>
        Detalle de suscripcion
      </KdsTypography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <KdsTypography variant="label" color="muted" sx={{ display: 'block' }}>Tipo de pago</KdsTypography>
          <KdsTypography variant="body">Monto variable</KdsTypography>
        </Box>

        <Divider />

        <Box>
          <KdsTypography variant="label" color="muted" sx={{ display: 'block' }}>Tope por cargo</KdsTypography>
          <KdsTypography variant="body">$50.000</KdsTypography>
        </Box>

        <Divider />

        <Box>
          <KdsTypography variant="label" color="muted" sx={{ display: 'block' }}>Tope mensual</KdsTypography>
          <KdsTypography variant="body">$150.000</KdsTypography>
        </Box>
      </Box>

      <Box sx={{ mt: 3, p: 2, bgcolor: colors.info[50], borderRadius: 1 }}>
        <KdsTypography variant="body-small" color="muted">
          El tope mensual corresponde al monto maximo posible a cobrar mensualmente.
        </KdsTypography>
      </Box>

      <KdsTypography variant="label-small" color="muted" sx={{ mt: 3, textAlign: 'center', display: 'block' }}>
        CODIGO * HUSK-P7ZZ-XGYG
      </KdsTypography>
    </Box>
  ),
};
