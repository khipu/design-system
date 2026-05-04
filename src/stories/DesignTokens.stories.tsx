import type { Meta, StoryObj } from '@storybook/react';
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
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
    <div
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: value,
        borderRadius: '4px',
        border: `1px solid ${borderColor ?? '#e0e0e0'}`,
        flexShrink: 0,
      }}
    />
    <div>
      <Typography variant="body">{name}</Typography>
      <Typography
        variant="body-small"
        style={{
          color: colors.text.secondary,
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        {value}
      </Typography>
    </div>
  </div>
);

// Spacing Demo Component
const SpacingDemo = ({ size, label }: { size: number; label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
    <div
      style={{
        width: `${size}px`,
        height: '24px',
        backgroundColor: colors.primary.main,
        borderRadius: '4px',
      }}
    />
    <Typography variant="body">
      {label} - {size}px
    </Typography>
  </div>
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
  <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: borders.divider }}>
    <div
      style={{
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing: letterSpacing || 'normal',
        marginBottom: '8px',
      }}
    >
      {name}
    </div>
    <Typography variant="body-small" color="muted">
      {fontFamily} • {fontWeight} • {fontSize} • Line Height: {lineHeight}
      {letterSpacing && ` • Letter Spacing: ${letterSpacing}`}
    </Typography>
  </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Typography variant="body-small" style={{ color: colors.text.secondary, fontFamily: 'monospace' }}>
        Showing: {mode} mode tokens
      </Typography>

      {/* Primary */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Primary
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Main" value={modeColors.primary.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.primary.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.primary.dark} borderColor={border} />
          <ColorSwatch name="Contrast Text" value={modeColors.primary.contrastText} borderColor={border} />
        </div>
        <Typography variant="label" color="muted" style={{ marginTop: '16px', display: 'block' }}>
          States
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '8px' }}>
          <ColorSwatch name="Hover" value={modeColors.primary.states.hover} borderColor={border} />
          <ColorSwatch name="Selected" value={modeColors.primary.states.selected} borderColor={border} />
          <ColorSwatch name="Focus" value={modeColors.primary.states.focus} borderColor={border} />
          <ColorSwatch name="Focus Visible" value={modeColors.primary.states.focusVisible} borderColor={border} />
          <ColorSwatch name="Outlined Border" value={modeColors.primary.states.outlinedBorder} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Info */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Info (Blue)
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Main" value={modeColors.info.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.info.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.info.dark} borderColor={border} />
          <ColorSwatch name="Contrast Text" value={modeColors.info.contrastText} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Success */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Success (Green)
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Main" value={modeColors.success.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.success.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.success.dark} borderColor={border} />
          <ColorSwatch name="Background" value={modeColors.success.container} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Warning */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Warning (Orange)
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Main" value={modeColors.warning.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.warning.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.warning.dark} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Error */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Error (Red)
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Main" value={modeColors.error.main} borderColor={border} />
          <ColorSwatch name="Light" value={modeColors.error.light} borderColor={border} />
          <ColorSwatch name="Dark" value={modeColors.error.dark} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Text Colors */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Text Colors
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Strong" value={modeColors.text.strong} borderColor={border} />
          <ColorSwatch name="Primary" value={modeColors.text.primary} borderColor={border} />
          <ColorSwatch name="Secondary" value={modeColors.text.secondary} borderColor={border} />
          <ColorSwatch name="Muted" value={modeColors.text.muted} borderColor={border} />
          <ColorSwatch name="Disabled" value={modeColors.text.disabled} borderColor={border} />
          <ColorSwatch name="Hint" value={modeColors.text.hint} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Background */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Background Colors
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Default" value={modeColors.background.default} borderColor={border} />
          <ColorSwatch name="Paper" value={modeColors.background.paper} borderColor={border} />
          <ColorSwatch name="Elevated" value={modeColors.background.elevated} borderColor={border} />
          <ColorSwatch name="Muted" value={modeColors.background.muted} borderColor={border} />
          <ColorSwatch name="Brand Subtle" value={modeColors.background.brandSubtle} borderColor={border} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: 0 }} />

      {/* Alert Backgrounds */}
      <div>
        <Typography variant="heading2" style={{ marginBottom: '16px' }}>
          Alert Colors
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ColorSwatch name="Info Background" value={modeColors.components.alert.infoBg} borderColor={border} />
          <ColorSwatch name="Info Text" value={modeColors.components.alert.infoText} borderColor={border} />
          <ColorSwatch name="Success Background" value={modeColors.components.alert.successBg} borderColor={border} />
          <ColorSwatch name="Success Text" value={modeColors.components.alert.successText} borderColor={border} />
          <ColorSwatch name="Warning Background" value={modeColors.components.alert.warningBg} borderColor={border} />
          <ColorSwatch name="Error Background" value={modeColors.components.alert.errorBg} borderColor={border} />
        </div>
      </div>
    </div>
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
    <div style={{ maxWidth: '800px' }}>
      <Typography variant="heading2" style={{ marginBottom: '24px' }}>
        Typography Scale
      </Typography>

      <div style={{ marginBottom: '32px' }}>
        <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
          Font Families
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <Typography variant="body" style={{ fontFamily: '"Public Sans", sans-serif' }}>
              Public Sans - Primary font for headings and UI elements
            </Typography>
          </div>
          <div>
            <Typography variant="body" style={{ fontFamily: '"Public Sans", sans-serif' }}>
              Public Sans - Body text, forms, and general content
            </Typography>
          </div>
          <div>
            <Typography variant="body" style={{ fontFamily: '"Public Sans", sans-serif' }}>
              Public Sans - Display text for hero sections
            </Typography>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: '24px 0' }} />

      <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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

      <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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

      <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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

      <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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

      <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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

      <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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
    </div>
  ),
};

// =============================================================================
// SPACING
// =============================================================================

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      backgroundColor: colors.background.code,
      color: colors.text.code,
      padding: '16px',
      borderRadius: '4px',
      fontSize: '13px',
      overflow: 'auto',
      fontFamily: fontFamilies.mono,
      margin: 0,
    }}
  >
    <code>{children}</code>
  </pre>
);

export const Spacing: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <Typography variant="heading2" style={{ marginBottom: '24px' }}>
        Spacing Scale
      </Typography>

      <Typography variant="body" color="secondary" style={{ marginBottom: '24px' }}>
        The spacing scale is based on an 8px grid system, with additional sizes for fine-tuning.
      </Typography>

      <div style={{ marginBottom: '32px' }}>
        <Typography variant="label" color="muted" style={{ marginBottom: '16px', display: 'block' }}>
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
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: '24px 0' }} />

      <Typography variant="heading3" style={{ marginBottom: '16px' }}>
        Semantic Spacing (from Figma)
      </Typography>

      {/* Card Spacing */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Card Spacing</Typography>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>padding:</strong> 10px 20px</Typography>
          </div>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>gap:</strong> 16px</Typography>
          </div>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>listGap:</strong> 12px</Typography>
          </div>
        </div>
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
      </div>

      {/* Box/Container Spacing */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Box/Container Spacing</Typography>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>padding:</strong> 32px 20px</Typography>
          </div>
        </div>
        <CodeBlock>{`// Container with Figma spacing
<Box sx={{
  padding: semanticSpacing.box.padding,   // '32px 20px'
  // Or individual values:
  paddingY: semanticSpacing.box.paddingY, // '32px'
  paddingX: semanticSpacing.box.paddingX, // '20px'
}} />`}</CodeBlock>
      </div>

      {/* Input Spacing */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Input Spacing</Typography>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>padding:</strong> 16px 12px</Typography>
          </div>
        </div>
        <CodeBlock>{`// Input field padding
<TextField sx={{
  '& .MuiInputBase-input': {
    padding: semanticSpacing.input.padding, // '16px 12px'
  }
}} />`}</CodeBlock>
      </div>

      {/* Button Spacing */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Button Spacing</Typography>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>padding:</strong> 8px 22px</Typography>
          </div>
        </div>
        <CodeBlock>{`// Button padding
<Button sx={{
  padding: semanticSpacing.button.padding, // '8px 22px'
}} />`}</CodeBlock>
      </div>

      {/* Layout Gaps */}
      <div style={{ marginBottom: '32px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Layout Gaps</Typography>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>sectionGap:</strong> 32px</Typography>
          </div>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>formGap:</strong> 20px</Typography>
          </div>
          <div style={{ padding: '8px', backgroundColor: colors.background.elevated, borderRadius: '4px' }}>
            <Typography variant="body-small"><strong>stackGap:</strong> 16px</Typography>
          </div>
        </div>
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
      </div>
    </div>
  ),
};

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const BorderRadius: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Typography variant="heading2" style={{ marginBottom: '24px' }}>
        Border Radius
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.sm,
            }}
          />
          <div>
            <Typography variant="heading3">4px - Default</Typography>
            <Typography variant="body-small" color="muted">
              Buttons, inputs, alerts, tooltips
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: colors.info.main,
              borderRadius: '6px',
            }}
          />
          <div>
            <Typography variant="heading3">6px - Cards</Typography>
            <Typography variant="body-small" color="muted">
              Card components, containers
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: colors.success.main,
              borderRadius: borderRadius.iconContainer,
            }}
          />
          <div>
            <Typography variant="heading3">10px - Icons</Typography>
            <Typography variant="body-small" color="muted">
              Icon containers, badges
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: colors.warning.main,
              borderRadius: borderRadius.lg,
            }}
          />
          <div>
            <Typography variant="heading3">12px - Modals</Typography>
            <Typography variant="body-small" color="muted">
              Dialog/modal containers
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: colors.error.main,
              borderRadius: borderRadius['2xl'],
            }}
          />
          <div>
            <Typography variant="heading3">20px - Large Containers</Typography>
            <Typography variant="body-small" color="muted">
              Content sections with rounded tops
            </Typography>
          </div>
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// SHADOWS
// =============================================================================

export const Shadows: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <Typography variant="heading2" style={{ marginBottom: '24px' }}>
        Shadows & Borders - From Figma
      </Typography>

      <Typography variant="body" color="secondary" style={{ marginBottom: '24px' }}>
        In the Figma design, most components use borders instead of shadows.
        Only primary buttons use elevation shadows.
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Card - No shadow, border only */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '120px',
              height: '80px',
              backgroundColor: colors.background.default,
              borderRadius: '6px',
              border: borders.card,
            }}
          />
          <div>
            <Typography variant="heading3">Card (No Shadow)</Typography>
            <Typography variant="body-small" color="muted">
              Bank selection cards - border only
            </Typography>
          </div>
        </div>

        {/* elevation/2 - Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '120px',
              height: '80px',
              backgroundColor: colors.primary.main,
              borderRadius: borderRadius.button,
              boxShadow: shadows.button,
            }}
          />
          <div>
            <Typography variant="heading3">elevation/2</Typography>
            <Typography variant="body-small" color="muted">
              Primary buttons (contained)
            </Typography>
          </div>
        </div>

        {/* Outlined Button - No shadow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '120px',
              height: '80px',
              backgroundColor: colors.background.default,
              borderRadius: borderRadius.button,
              border: borders.buttonOutlinedInfo,
            }}
          />
          <div>
            <Typography variant="heading3">Outlined Button</Typography>
            <Typography variant="body-small" color="muted">
              Secondary/info buttons - border only
            </Typography>
          </div>
        </div>

        {/* Input border */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '120px',
              height: '80px',
              backgroundColor: colors.background.default,
              borderRadius: borderRadius.input,
              border: borders.inputOutlined,
            }}
          />
          <div>
            <Typography variant="heading3">Input (Outlined)</Typography>
            <Typography variant="body-small" color="muted">
              Text fields - border only
            </Typography>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: borders.divider, margin: '32px 0' }} />

      <Typography variant="heading3" style={{ marginBottom: '16px' }}>
        Code Examples
      </Typography>

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Using Shadow & Border Tokens</Typography>
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
      </div>

      <div style={{ marginBottom: '24px' }}>
        <Typography variant="heading3" style={{ marginBottom: '8px' }}>Available Border Tokens</Typography>
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
      </div>
    </div>
  ),
};

// =============================================================================
// ALL TOKENS OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Typography variant="display2" style={{ marginBottom: '16px' }}>
        Khipu Design System
      </Typography>
      <Typography variant="body-large" color="secondary" style={{ marginBottom: '32px' }}>
        Design tokens extracted from Figma: Pagos Automáticos - MUI v610
      </Typography>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
        {/* Colors */}
        <div style={{ padding: '24px', border: borders.divider, borderRadius: '8px' }}>
          <Typography variant="heading3" style={{ marginBottom: '16px' }}>
            Colors
          </Typography>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[colors.primary.main, colors.info.main, colors.success.main, colors.warning.main, colors.error.main, colors.text.strong].map((color) => (
              <div
                key={color}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: color,
                  borderRadius: '4px',
                }}
              />
            ))}
          </div>
          <Typography variant="body-small" color="muted" style={{ marginTop: '16px' }}>
            Primary, Info, Success, Warning, Error, Text
          </Typography>
        </div>

        {/* Typography */}
        <div style={{ padding: '24px', border: borders.divider, borderRadius: '8px' }}>
          <Typography variant="heading3" style={{ marginBottom: '16px' }}>
            Typography
          </Typography>
          <Typography variant="body-small" style={{ fontFamily: '"Public Sans", sans-serif' }}>
            Public Sans (Headings)
          </Typography>
          <Typography variant="body-small" style={{ fontFamily: '"Public Sans", sans-serif' }}>
            Public Sans (Body)
          </Typography>
          <Typography variant="body-small" style={{ fontFamily: '"Public Sans", sans-serif' }}>
            Public Sans (Display)
          </Typography>
          <Typography variant="body-small" color="muted" style={{ marginTop: '16px' }}>
            14 custom variants defined
          </Typography>
        </div>

        {/* Spacing */}
        <div style={{ padding: '24px', border: borders.divider, borderRadius: '8px' }}>
          <Typography variant="heading3" style={{ marginBottom: '16px' }}>
            Spacing
          </Typography>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
            {[4, 8, 12, 16, 20, 24, 32].map((size) => (
              <div
                key={size}
                style={{
                  width: '16px',
                  height: `${size}px`,
                  backgroundColor: colors.primary.main,
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>
          <Typography variant="body-small" color="muted" style={{ marginTop: '16px' }}>
            8px base unit grid system
          </Typography>
        </div>

        {/* Border Radius */}
        <div style={{ padding: '24px', border: borders.divider, borderRadius: '8px' }}>
          <Typography variant="heading3" style={{ marginBottom: '16px' }}>
            Border Radius
          </Typography>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[4, 6, 10, 12, 20].map((radius) => (
              <div
                key={radius}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: colors.info.main,
                  borderRadius: `${radius}px`,
                }}
              />
            ))}
          </div>
          <Typography variant="body-small" color="muted" style={{ marginTop: '16px' }}>
            4px, 6px, 10px, 12px, 20px
          </Typography>
        </div>
      </div>
    </div>
  ),
};
