import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { KdsTypography as Typography } from '../components/core/KdsTypography';
import { colors } from '../tokens';

/**
 * Design Tokens - Colors, Typography, and Spacing
 *
 * This documents the Khipu Design System tokens extracted from the Figma design:
 * "Pagos Automáticos - MUI v610"
 */

// Color Swatch Component
const ColorSwatch = ({
  name,
  value
}: {
  name: string;
  value: string;
  textColor?: string;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        backgroundColor: value,
        borderRadius: 1,
        border: '1px solid rgba(0,0,0,0.1)',
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
  <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #eee' }}>
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
// COLORS
// =============================================================================

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Primary */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Primary
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value={colors.primary.main} />
          <ColorSwatch name="Light" value={colors.primary.light} />
          <ColorSwatch name="Dark" value={colors.primary.dark} />
          <ColorSwatch name="Contrast Text" value={colors.primary.contrastText} textColor="#272930" />
        </Box>
        <Typography variant="label" color="tertiary" sx={{ mt: 2 }}>
          States
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
          <ColorSwatch name="Hover" value={colors.primary.states.hover} textColor="#272930" />
          <ColorSwatch name="Selected" value={colors.primary.states.selected} textColor="#272930" />
          <ColorSwatch name="Focus" value={colors.primary.states.focus} textColor="#272930" />
          <ColorSwatch name="Focus Visible" value={colors.primary.states.focusVisible} textColor="#272930" />
          <ColorSwatch name="Outlined Border" value={colors.primary.states.outlinedBorder} />
        </Box>
      </Box>

      <Divider />

      {/* Info */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Info (Blue)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value="#0288D1" />
          <ColorSwatch name="Light" value="#03A9F4" />
          <ColorSwatch name="Dark" value="#01579B" />
          <ColorSwatch name="Contrast Text" value="#FFFFFF" textColor="#272930" />
        </Box>
      </Box>

      <Divider />

      {/* Success */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Success (Green)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value="#2E7D32" />
          <ColorSwatch name="Light" value="#4CAF50" />
          <ColorSwatch name="Dark" value="#1B5E20" />
          <ColorSwatch name="Background" value="#EDF7ED" textColor="#272930" />
        </Box>
      </Box>

      <Divider />

      {/* Warning */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Warning (Orange)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value="#ED6C02" />
          <ColorSwatch name="Light" value="#FF9800" />
          <ColorSwatch name="Dark" value="#E65100" />
        </Box>
      </Box>

      <Divider />

      {/* Error */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Error (Red)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Main" value="#D32F2F" />
          <ColorSwatch name="Light" value="#EF5350" />
          <ColorSwatch name="Dark" value="#C62828" />
        </Box>
      </Box>

      <Divider />

      {/* Text Colors */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Text Colors
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Primary (On Surface)" value="#272930" />
          <ColorSwatch name="Primary (87%)" value="rgba(0, 0, 0, 0.87)" />
          <ColorSwatch name="Secondary (60%)" value="rgba(0, 0, 0, 0.60)" textColor="#fff" />
          <ColorSwatch name="Tertiary" value="#81848F" />
          <ColorSwatch name="Disabled" value="#9797A5" textColor="#272930" />
          <ColorSwatch name="Disabled (38%)" value="rgba(0, 0, 0, 0.38)" textColor="#fff" />
        </Box>
      </Box>

      <Divider />

      {/* Background */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Background Colors
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Default" value="#FFFFFF" textColor="#272930" />
          <ColorSwatch name="Paper" value="#FFFFFF" textColor="#272930" />
          <ColorSwatch name="App Bar" value="#F5F5F5" textColor="#272930" />
        </Box>
      </Box>

      <Divider />

      {/* Alert Backgrounds */}
      <Box>
        <Typography variant="heading2" sx={{ mb: 2 }}>
          Alert Backgrounds
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <ColorSwatch name="Info Background" value="#E5F6FD" textColor="#014361" />
          <ColorSwatch name="Info Text" value="#014361" />
          <ColorSwatch name="Success Background" value="#EDF7ED" textColor="#1E4620" />
          <ColorSwatch name="Success Text" value="#1E4620" />
          <ColorSwatch name="Warning Background" value="#FFF4E5" textColor="#663C00" />
          <ColorSwatch name="Error Background" value="#FDEDED" textColor="#5F2120" />
        </Box>
      </Box>
    </Box>
  ),
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
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: 2,
      borderRadius: 1,
      fontSize: '13px',
      overflow: 'auto',
      fontFamily: '"Open Sans Mono", monospace',
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
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>padding:</strong> 10px 20px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>gap:</strong> 16px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
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
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
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
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
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
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
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
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>sectionGap:</strong> 32px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="bodySmall"><strong>formGap:</strong> 20px</Typography>
          </Box>
          <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
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
              backgroundColor: '#8347AD',
              borderRadius: '4px',
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
              backgroundColor: '#0288D1',
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
              backgroundColor: '#2E7D32',
              borderRadius: '10px',
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
              backgroundColor: '#ED6C02',
              borderRadius: '12px',
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
              backgroundColor: '#D32F2F',
              borderRadius: '20px',
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
              backgroundColor: '#fff',
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.42)',
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
              backgroundColor: '#8347AD',
              borderRadius: '4px',
              boxShadow:
                '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
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
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid rgba(2, 136, 209, 0.5)',
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
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
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
        <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
          <Typography variant="heading3" sx={{ mb: 2 }}>
            Colors
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['#8347AD', '#0288D1', '#2E7D32', '#ED6C02', '#D32F2F', '#272930'].map((color) => (
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
        <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
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
        <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
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
                  backgroundColor: '#8347AD',
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
        <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
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
                  backgroundColor: '#0288D1',
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
