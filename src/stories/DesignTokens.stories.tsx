import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import { KdsTypography as Typography } from '../components/core/KdsTypography';
import { colors, colorsByMode, tokensByMode, fontFamilies, borderRadius, shadows, borders } from '../tokens';

/**
 * Design Tokens - Colors, Typography, and Spacing
 *
 * This documents the Khipu Design System tokens extracted from the Figma design:
 * "Pagos Automáticos - MUI v610"
 */

// Color Swatch Component
const ColorSwatch = ({
  name,
  value,
  borderColor,
}: {
  name: string;
  value: string;
  textColor?: string;
  borderColor?: string;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        backgroundColor: value,
        borderRadius: 1,
        border: `1px solid ${borderColor ?? 'divider'}`,
        flexShrink: 0,
      }}
    />
    <Box>
      <Typography variant="body">{name}</Typography>
      <Typography
        variant="bodySmall"
        sx={{
          color: 'text.secondary',
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

// Spacing Demo Component
const SpacingDemo = ({ size, label }: { size: number; label: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
    <Box
      sx={{
        width: size,
        height: 24,
        backgroundColor: colors.primary.main,
        borderRadius: 1,
      }}
    />
    <Typography variant="body">
      {label} - {size}px
    </Typography>
  </Box>
);

// Typography Sample Component
const TypographySample = ({
  name,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
}: {
  name: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
}) => (
  <Box sx={{ mb: 3, pb: 2, borderBottom: borders.divider }}>
    <Box
      sx={{
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing: letterSpacing || 'normal',
        mb: 1,
      }}
    >
      {name}
    </Box>
    <Typography variant="bodySmall" color="tertiary">
      {fontFamily} • {fontWeight} • {fontSize} • Line Height: {lineHeight}
      {letterSpacing && ` • Letter Spacing: ${letterSpacing}`}
    </Typography>
  </Box>
);

const meta: Meta = {
  title: 'Design Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// COLORS (mode-aware via toolbar toggle)
// =============================================================================

function ColorsStory() {
  const isDark = useDarkMode();
  const mode = isDark ? 'dark' : 'light';
  const modeColors = tokensByMode[mode].colors;
  const border = colorsByMode[mode].divider;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="bodySmall" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
        Showing: {mode} mode tokens
      </Typography>

      {/* Primary */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Primary
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value={modeColors.primary.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.primary.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.primary.dark} borderColor={border} />
          <ColorSwatch name="Contrast Text" value={modeColors.primary.contrastText} borderColor={border} />
        </Box>
        <Typography variant="label" color="tertiary" sx={{ mt: 2 }}>
          States
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
          <ColorSwatch name="Hover" value={modeColors.primary.states.hover} borderColor={border} />
          <ColorSwatch name="Selected" value={modeColors.primary.states.selected} borderColor={border} />
          <ColorSwatch name="Focus" value={modeColors.primary.states.focus} borderColor={border} />
          <ColorSwatch name="Focus Visible" value={modeColors.primary.states.focusVisible} borderColor={border} />
          <ColorSwatch name="Outlined Border" value={modeColors.primary.states.outlinedBorder} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Info */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Info (Blue)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value={modeColors.info.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.info.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.info.dark} borderColor={border} />
          <ColorSwatch name="Contrast Text" value={modeColors.info.contrastText} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Success */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Success (Green)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value={modeColors.success.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.success.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.success.dark} borderColor={border} />
          <ColorSwatch name="Background" value={modeColors.success.container} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Warning */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Warning (Orange)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value={modeColors.warning.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.warning.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.warning.dark} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Error */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Error (Red)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value={modeColors.error.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.error.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.error.dark} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Text Colors */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Text Colors
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Strong" value={modeColors.text.strong} borderColor={border} />
          <ColorSwatch name="Primary" value={modeColors.text.primary} borderColor={border} />
          <ColorSwatch name="Secondary" value={modeColors.text.secondary} borderColor={border} />
          <ColorSwatch name="Muted" value={modeColors.text.muted} borderColor={border} />
          <ColorSwatch name="Disabled" value={modeColors.text.disabled} borderColor={border} />
          <ColorSwatch name="Hint" value={modeColors.text.hint} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Background */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Background Colors
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Default" value={modeColors.background.default} borderColor={border} />
          <ColorSwatch name="Paper" value={modeColors.background.paper} borderColor={border} />
          <ColorSwatch name="Elevated" value={modeColors.background.elevated} borderColor={border} />
          <ColorSwatch name="Muted" value={modeColors.background.muted} borderColor={border} />
          <ColorSwatch name="Brand Subtle" value={modeColors.background.brandSubtle} borderColor={border} />
        </Box>
      </Box>

      <Divider />

      {/* Alert Backgrounds */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Alert Colors
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Info Background" value={modeColors.components.alert.infoBg} borderColor={border} />
          <ColorSwatch name="Info Text" value={modeColors.components.alert.infoText} borderColor={border} />
          <ColorSwatch name="Success Background" value={modeColors.components.alert.successBg} borderColor={border} />
          <ColorSwatch name="Success Text" value={modeColors.components.alert.successText} borderColor={border} />
          <ColorSwatch name="Warning Background" value={modeColors.components.alert.warningBg} borderColor={border} />
          <ColorSwatch name="Error Background" value={modeColors.components.alert.errorBg} borderColor={border} />
        </Box>
      </Box>
    </Box>
  );
}

export const Colors: Story = {
  render: () => <ColorsStory />,
};

// =============================================================================
// TYPOGRAPHY SCALE
// =============================================================================

export const TypographyScale: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="heading2" sx={{ mb: 3 }}>
        Typography Scale
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
          Font Families
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="body" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
              Public Sans - Primary font for headings and UI elements
            </Typography>
          </Box>
          <Box>
            <Typography variant="body" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
              Public Sans - Body text, forms, and general content
            </Typography>
          </Box>
          <Box>
            <Typography variant="body" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
              Public Sans - Display text for hero sections
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
        Display
      </Typography>
      <TypographySample
        name="Display 1 - Hero Headlines"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={700}
        fontSize="40px"
        lineHeight="48px"
        letterSpacing="-0.5px"
      />
      <TypographySample
        name="Display 2 - Large Headlines"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={700}
        fontSize="32px"
        lineHeight="40px"
        letterSpacing="-0.25px"
      />

      <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
        Headings
      </Typography>
      <TypographySample
        name="Heading 1 - Section Headings"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={600}
        fontSize="28px"
        lineHeight="36px"
      />
      <TypographySample
        name="Heading 2 - Subsection Headings"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={600}
        fontSize="24px"
        lineHeight="32px"
      />
      <TypographySample
        name="Heading 3 - Page Titles"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={600}
        fontSize="20px"
        lineHeight="32px"
        letterSpacing="0.15px"
      />

      <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
        Body Text
      </Typography>
      <TypographySample
        name="Body Large - Large paragraphs"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={400}
        fontSize="16px"
        lineHeight="24px"
        letterSpacing="0.15px"
      />
      <TypographySample
        name="Body - Default body text"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={400}
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="0.17px"
      />
      <TypographySample
        name="Body Small - Captions and help text"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={400}
        fontSize="12px"
        lineHeight="18px"
        letterSpacing="0.4px"
      />

      <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
        Labels
      </Typography>
      <TypographySample
        name="LABEL - UPPERCASE LABELS"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={400}
        fontSize="12px"
        lineHeight="15px"
        letterSpacing="1px"
      />
      <TypographySample
        name="Label Small"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={500}
        fontSize="10px"
        lineHeight="14px"
      />

      <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
        Card Elements
      </Typography>
      <TypographySample
        name="Card Title"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={600}
        fontSize="16px"
        lineHeight="24px"
        letterSpacing="0.15px"
      />
      <TypographySample
        name="Card Subtitle"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={600}
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="0.15px"
      />

      <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
        Button
      </Typography>
      <TypographySample
        name="BUTTON TEXT"
        fontFamily='"Public Sans", sans-serif'
        fontWeight={500}
        fontSize="15px"
        lineHeight="26px"
        letterSpacing="0.46px"
      />
    </Box>
  ),
};

// =============================================================================
// SPACING
// =============================================================================

const CodeBlock = ({ children }: { children: string }) => (
  <Box
    component="pre"
    sx={{
      backgroundColor: colors.background.code,
      color: colors.text.code,
      padding: 2,
      borderRadius: 1,
      fontSize: '13px',
      overflow: 'auto',
      fontFamily: fontFamilies.mono,
      m: 0,
    }}
  >
    <code>{children}</code>
  </Box>
);

export const Spacing: Story = {
  render: () => (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="heading2" sx={{ mb: 3 }}>
        Spacing Scale
      </Typography>

      <Typography variant="body" color="secondary" sx={{ mb: 3 }}>
        The spacing scale is based on an 8px grid system, with additional sizes for fine-tuning.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="label" color="tertiary" sx={{ mb: 2, display: 'block' }}>
          Base Unit: 8px
        </Typography>
        <SpacingDemo size={4} label="0.5x (4px)" />
        <SpacingDemo size={8} label="1x (8px)" />
        <SpacingDemo size={12} label="1.5x (12px)" />
        <SpacingDemo size={16} label="2x (16px)" />
        <SpacingDemo size={20} label="2.5x (20px)" />
        <SpacingDemo size={24} label="3x (24px)" />
        <SpacingDemo size={32} label="4x (32px)" />
        <SpacingDemo size={40} label="5x (40px)" />
        <SpacingDemo size={48} label="6x (48px)" />
        <SpacingDemo size={64} label="8x (64px)" />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="heading3" sx={{ mb: 2 }}>
        Semantic Spacing (from Figma)
      </Typography>

      {/* Card Spacing */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Card Spacing</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>padding:</strong> 10px 20px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>gap:</strong> 16px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>listGap:</strong> 12px</Typography>
          </Box>
        </Box>
        <CodeBlock>{`import { semanticSpacing } from '@/tokens';

// Using tokens in sx prop
<Card sx={{
  padding: semanticSpacing.card.padding,  // '10px 20px'
  gap: semanticSpacing.card.gap,          // '16px'
}} />

// Card list with gap
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: semanticSpacing.card.listGap,      // '12px'
}}>
  <Card>...</Card>
  <Card>...</Card>
</Box>

// Or use the padding prop directly
<Card padding="md" />  // 10px 20px (Figma default)`}</CodeBlock>
      </Box>

      {/* Box/Container Spacing */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Box/Container Spacing</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>padding:</strong> 32px 20px</Typography>
          </Box>
        </Box>
        <CodeBlock>{`// Container with Figma spacing
<Box sx={{
  padding: semanticSpacing.box.padding,   // '32px 20px'
  // Or individual values:
  paddingY: semanticSpacing.box.paddingY, // '32px'
  paddingX: semanticSpacing.box.paddingX, // '20px'
}} />`}</CodeBlock>
      </Box>

      {/* Input Spacing */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Input Spacing</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>padding:</strong> 16px 12px</Typography>
          </Box>
        </Box>
        <CodeBlock>{`// Input field padding
<TextField sx={{
  '& .MuiInputBase-input': {
    padding: semanticSpacing.input.padding, // '16px 12px'
  }
}} />`}</CodeBlock>
      </Box>

      {/* Button Spacing */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Button Spacing</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>padding:</strong> 8px 22px</Typography>
          </Box>
        </Box>
        <CodeBlock>{`// Button padding
<Button sx={{
  padding: semanticSpacing.button.padding, // '8px 22px'
}} />`}</CodeBlock>
      </Box>

      {/* Layout Gaps */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Layout Gaps</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>sectionGap:</strong> 32px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>formGap:</strong> 20px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: colors.background.elevated, borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>stackGap:</strong> 16px</Typography>
          </Box>
        </Box>
        <CodeBlock>{`// Section layout
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: semanticSpacing.sectionGap,  // '32px'
}}>
  <Section>...</Section>
  <Section>...</Section>
</Box>

// Form fields
<Box sx={{ gap: semanticSpacing.formGap }}>  {/* '20px' */}
  <TextField />
  <TextField />
</Box>`}</CodeBlock>
      </Box>
    </Box>
  ),
};

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const BorderRadius: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="heading2" sx={{ mb: 3 }}>
        Border Radius
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.sm,
            }}
          />
          <Box>
            <Typography variant="cardTitle">4px - Default</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Buttons, inputs, alerts, tooltips
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: colors.info.main,
              borderRadius: '6px',
            }}
          />
          <Box>
            <Typography variant="cardTitle">6px - Cards</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Card components, containers
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: colors.success.main,
              borderRadius: borderRadius.iconContainer,
            }}
          />
          <Box>
            <Typography variant="cardTitle">10px - Icons</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Icon containers, badges
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: colors.warning.main,
              borderRadius: borderRadius.lg,
            }}
          />
          <Box>
            <Typography variant="cardTitle">12px - Modals</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Dialog/modal containers
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: colors.error.main,
              borderRadius: borderRadius['2xl'],
            }}
          />
          <Box>
            <Typography variant="cardTitle">20px - Large Containers</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Content sections with rounded tops
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};

// =============================================================================
// SHADOWS
// =============================================================================

export const Shadows: Story = {
  render: () => (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="heading2" sx={{ mb: 3 }}>
        Shadows & Borders - From Figma
      </Typography>

      <Typography variant="body" color="secondary" sx={{ mb: 3 }}>
        In the Figma design, most components use borders instead of shadows.
        Only primary buttons use elevation shadows.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Card - No shadow, border only */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 120,
              height: 80,
              backgroundColor: colors.background.default,
              borderRadius: '6px',
              border: borders.card,
            }}
          />
          <Box>
            <Typography variant="cardTitle">Card (No Shadow)</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Bank selection cards - border only
            </Typography>
          </Box>
        </Box>

        {/* elevation/2 - Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 120,
              height: 80,
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.button,
              boxShadow: shadows.button,
            }}
          />
          <Box>
            <Typography variant="cardTitle">elevation/2</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Primary buttons (contained)
            </Typography>
          </Box>
        </Box>

        {/* Outlined Button - No shadow */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 120,
              height: 80,
              backgroundColor: colors.background.default,
              borderRadius: borderRadius.button,
              border: borders.buttonOutlinedInfo,
            }}
          />
          <Box>
            <Typography variant="cardTitle">Outlined Button</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Secondary/info buttons - border only
            </Typography>
          </Box>
        </Box>

        {/* Input border */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 120,
              height: 80,
              backgroundColor: colors.background.default,
              borderRadius: borderRadius.input,
              border: borders.inputOutlined,
            }}
          />
          <Box>
            <Typography variant="cardTitle">Input (Outlined)</Typography>
            <Typography variant="bodySmall" color="tertiary">
              Text fields - border only
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="heading3" sx={{ mb: 2 }}>
        Code Examples
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Using Shadow & Border Tokens</Typography>
        <CodeBlock>{`import { shadows, borders } from '@/tokens';

// Primary button with shadow
<Button sx={{
  boxShadow: shadows.button,
  // '0px 3px 1px -2px rgba(0,0,0,0.2), ...'
}} />

// Card with border (no shadow)
<Card sx={{
  border: borders.card,           // '1px solid rgba(0, 0, 0, 0.42)'
  boxShadow: shadows.card,        // 'none'
}} />

// Selected card
<Card sx={{
  border: borders.cardSelected,   // '2px solid #8347AD'
}} />

// Outlined button
<Button variant="outlined" sx={{
  border: borders.buttonOutlinedInfo,  // '1px solid rgba(2, 136, 209, 0.5)'
}} />

// Input field
<TextField sx={{
  '& .MuiOutlinedInput-notchedOutline': {
    border: borders.inputOutlined,     // '1px solid rgba(0, 0, 0, 0.23)'
  }
}} />`}</CodeBlock>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="cardTitle" sx={{ mb: 1 }}>Available Border Tokens</Typography>
        <CodeBlock>{`borders = {
  card: '1px solid rgba(0, 0, 0, 0.42)',
  cardSelected: '2px solid #8347AD',
  inputOutlined: '1px solid rgba(0, 0, 0, 0.23)',
  inputStandard: '1px solid rgba(0, 0, 0, 0.42)',
  buttonOutlinedPrimary: '1px solid rgba(131, 71, 173, 0.5)',
  buttonOutlinedInfo: '1px solid rgba(2, 136, 209, 0.5)',
  divider: '1px solid #e0e0e0',
  container: '1px solid rgba(58, 53, 65, 0.3)',
}`}</CodeBlock>
      </Box>
    </Box>
  ),
};

// =============================================================================
// ALL TOKENS OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="display2" sx={{ mb: 2 }}>
        Khipu Design System
      </Typography>
      <Typography variant="bodyLarge" color="secondary" sx={{ mb: 4 }}>
        Design tokens extracted from Figma: Pagos Automáticos - MUI v610
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
        {/* Colors */}
        <Box sx={{ p: 3, border: borders.divider, borderRadius: 2 }}>
          <Typography variant="heading3" sx={{ mb: 2 }}>
            Colors
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[colors.primary.main, colors.info.main, colors.success.main, colors.warning.main, colors.error.main, colors.text.strong].map((color) => (
              <Box
                key={color}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
          <Typography variant="bodySmall" color="tertiary" sx={{ mt: 2 }}>
            Primary, Info, Success, Warning, Error, Text
          </Typography>
        </Box>

        {/* Typography */}
        <Box sx={{ p: 3, border: borders.divider, borderRadius: 2 }}>
          <Typography variant="heading3" sx={{ mb: 2 }}>
            Typography
          </Typography>
          <Typography variant="bodySmall" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
            Public Sans (Headings)
          </Typography>
          <Typography variant="bodySmall" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
            Public Sans (Body)
          </Typography>
          <Typography variant="bodySmall" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
            Public Sans (Display)
          </Typography>
          <Typography variant="bodySmall" color="tertiary" sx={{ mt: 2 }}>
            14 custom variants defined
          </Typography>
        </Box>

        {/* Spacing */}
        <Box sx={{ p: 3, border: borders.divider, borderRadius: 2 }}>
          <Typography variant="heading3" sx={{ mb: 2 }}>
            Spacing
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
            {[4, 8, 12, 16, 20, 24, 32].map((size) => (
              <Box
                key={size}
                sx={{
                  width: 16,
                  height: size,
                  backgroundColor: colors.primary.main,
                  borderRadius: 0.5,
                }}
              />
            ))}
          </Box>
          <Typography variant="bodySmall" color="tertiary" sx={{ mt: 2 }}>
            8px base unit grid system
          </Typography>
        </Box>

        {/* Border Radius */}
        <Box sx={{ p: 3, border: borders.divider, borderRadius: 2 }}>
          <Typography variant="heading3" sx={{ mb: 2 }}>
            Border Radius
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[4, 6, 10, 12, 20].map((radius) => (
              <Box
                key={radius}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: colors.info.main,
                  borderRadius: `${radius}px`,
                }}
              />
            ))}
          </Box>
          <Typography variant="bodySmall" color="tertiary" sx={{ mt: 2 }}>
            4px, 6px, 10px, 12px, 20px
          </Typography>
        </Box>
      </Box>
    </Box>
  ),
};
