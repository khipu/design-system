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
      <KdsTypography variant="labelSmall">Label Small - 10px Medium</KdsTypography>
    </Box>
  ),
};

export const CardVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, bgcolor: colors.background.elevated, borderRadius: 1 }}>
      <KdsTypography variant="cardTitle">Card Title - 16px SemiBold</KdsTypography>
      <KdsTypography variant="cardSubtitle" color="tertiary">Card Subtitle - 14px SemiBold</KdsTypography>
      <KdsTypography variant="cardSubtitle">Product Name - 14px SemiBold</KdsTypography>
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
      <KdsTypography variant="body" color="primary">Primary - #272930</KdsTypography>
      <KdsTypography variant="body" color="secondary">Secondary - rgba(0,0,0,0.60)</KdsTypography>
      <KdsTypography variant="body" color="tertiary">Tertiary - #81848F</KdsTypography>
      <KdsTypography variant="body" color="disabled">Disabled - #9797A5</KdsTypography>
      <KdsTypography variant="body" color="error">Error - #D32F2F</KdsTypography>
      <KdsTypography variant="body" color="success">Success - #2E7D32</KdsTypography>
      <KdsTypography variant="body" color="info">Info - #0288D1</KdsTypography>
    </Box>
  ),
};

export const Truncation: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
      <Box>
        <KdsTypography variant="label" color="tertiary">Single line truncate</KdsTypography>
        <KdsTypography variant="body" truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width.
        </KdsTypography>
      </Box>
      <Box>
        <KdsTypography variant="label" color="tertiary">Multi-line truncate (2 lines)</KdsTypography>
        <KdsTypography variant="body" truncate maxLines={2}>
          This is a very long text that will be truncated after two lines. It continues with more content that should be hidden after the second line with an ellipsis.
        </KdsTypography>
      </Box>
      <Box>
        <KdsTypography variant="label" color="tertiary">Multi-line truncate (3 lines)</KdsTypography>
        <KdsTypography variant="body" truncate maxLines={3}>
          This is a very long text that will be truncated after three lines. It continues with more content that should be hidden after the third line. This allows for slightly more content to be visible before truncation occurs.
        </KdsTypography>
      </Box>
    </Box>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <KdsTypography variant="label" color="tertiary" sx={{ mb: 1 }}>Display</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="display1">Display 1</KdsTypography>
        <KdsTypography variant="display2">Display 2</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="tertiary" sx={{ mb: 1 }}>Headings</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="heading1">Heading 1</KdsTypography>
        <KdsTypography variant="heading2">Heading 2</KdsTypography>
        <KdsTypography variant="heading3">Heading 3</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="tertiary" sx={{ mb: 1 }}>Body</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="bodyLarge">Body Large</KdsTypography>
        <KdsTypography variant="body">Body</KdsTypography>
        <KdsTypography variant="bodySmall">Body Small</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="tertiary" sx={{ mb: 1 }}>Labels</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="label">Label</KdsTypography>
        <KdsTypography variant="labelSmall">Label Small</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="tertiary" sx={{ mb: 1 }}>Card Elements</KdsTypography>
        <Divider sx={{ mb: 2 }} />
        <KdsTypography variant="cardTitle">Card Title</KdsTypography>
        <KdsTypography variant="cardSubtitle">Card Subtitle</KdsTypography>
      </Box>

      <Box>
        <KdsTypography variant="label" color="tertiary" sx={{ mb: 1 }}>Semantic</KdsTypography>
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
      <KdsTypography variant="heading3" sx={{ mb: 2 }}>
        Detalle de suscripcion
      </KdsTypography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <KdsTypography variant="label" color="secondary">Tipo de pago</KdsTypography>
          <KdsTypography variant="body">Monto variable</KdsTypography>
        </Box>

        <Divider />

        <Box>
          <KdsTypography variant="label" color="secondary">Tope por cargo</KdsTypography>
          <KdsTypography variant="body">$50.000</KdsTypography>
        </Box>

        <Divider />

        <Box>
          <KdsTypography variant="label" color="secondary">Tope mensual</KdsTypography>
          <KdsTypography variant="body">$150.000</KdsTypography>
        </Box>
      </Box>

      <Box sx={{ mt: 3, p: 2, bgcolor: colors.info[50], borderRadius: 1 }}>
        <KdsTypography variant="bodySmall" color="info">
          El tope mensual corresponde al monto maximo posible a cobrar mensualmente.
        </KdsTypography>
      </Box>

      <KdsTypography variant="labelSmall" color="disabled" sx={{ mt: 3, textAlign: 'center', display: 'block' }}>
        CODIGO * HUSK-P7ZZ-XGYG
      </KdsTypography>
    </Box>
  ),
};
