import type { Meta, StoryObj } from '@storybook/react';
import { colorsByMode, fontFamilies, fontSizes, fontWeights, spacing, borderRadius } from '../tokens';

const dark = colorsByMode.dark;

/**
 * Dark Mode Colors - Token Reference
 *
 * Displays all dark mode color tokens from the design system.
 * Use `colorsByMode.dark` to access these values in code.
 */

const meta: Meta = {
  title: 'Design Tokens/Dark Mode Colors',
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: dark.background.default }],
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const SwatchRow = ({
  name,
  value,
  tokenPath,
}: {
  name: string;
  value: string;
  tokenPath: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      marginBottom: spacing[1.5],
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        backgroundColor: value,
        borderRadius: borderRadius.sm,
        border: `1px solid ${dark.divider}`,
        flexShrink: 0,
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[0.25] }}>
      <span
        style={{
          color: dark.text.primary,
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.medium,
          fontFamily: fontFamilies.primary,
        }}
      >
        {name}
      </span>
      <code
        style={{
          color: dark.text.secondary,
          fontSize: fontSizes.xs,
          fontFamily: fontFamilies.mono,
        }}
      >
        {tokenPath}
      </code>
      <code
        style={{
          color: dark.text.muted,
          fontSize: fontSizes.xs,
          fontFamily: fontFamilies.mono,
        }}
      >
        {value}
      </code>
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: string }) => (
  <h3
    style={{
      color: dark.text.primary,
      fontFamily: fontFamilies.primary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.lg,
      marginTop: 0,
      marginBottom: spacing[2],
      paddingBottom: spacing[1],
      borderBottom: `1px solid ${dark.divider}`,
    }}
  >
    {children}
  </h3>
);

// =============================================================================
// ALL DARK MODE COLORS
// =============================================================================

export const AllColors: Story = {
  name: 'All Dark Mode Colors',
  render: () => (
    <div
      style={{
        maxWidth: 900,
        fontFamily: fontFamilies.primary,
        backgroundColor: dark.background.default,
        padding: spacing[4],
        borderRadius: borderRadius.lg,
      }}
    >
      <h2
        style={{
          color: dark.text.primary,
          fontWeight: fontWeights.bold,
          fontSize: fontSizes['2xl'],
          marginTop: 0,
          marginBottom: spacing[1],
        }}
      >
        Dark Mode Color Tokens
      </h2>
      <p
        style={{
          color: dark.text.secondary,
          fontSize: fontSizes.sm,
          marginTop: 0,
          marginBottom: spacing[4],
          lineHeight: 1.6,
        }}
      >
        Todos los tokens de color disponibles en <code style={{ color: dark.text.accent, fontFamily: fontFamilies.mono }}>colorsByMode.dark</code>.
        Estos colores estan preparados para el modo oscuro del design system.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: spacing[4] }}>
        {/* Primary */}
        <div>
          <SectionTitle>Primary</SectionTitle>
          <SwatchRow name="Main" value={dark.primary.main} tokenPath="dark.primary.main" />
          <SwatchRow name="Light" value={dark.primary.light} tokenPath="dark.primary.light" />
          <SwatchRow name="Dark" value={dark.primary.dark} tokenPath="dark.primary.dark" />
          <SwatchRow name="Contrast Text" value={dark.primary.contrastText} tokenPath="dark.primary.contrastText" />
        </div>

        {/* Secondary */}
        <div>
          <SectionTitle>Secondary</SectionTitle>
          <SwatchRow name="Main" value={dark.secondary.main} tokenPath="dark.secondary.main" />
          <SwatchRow name="Light" value={dark.secondary.light} tokenPath="dark.secondary.light" />
          <SwatchRow name="Dark" value={dark.secondary.dark} tokenPath="dark.secondary.dark" />
          <SwatchRow name="Contrast Text" value={dark.secondary.contrastText} tokenPath="dark.secondary.contrastText" />
        </div>

        {/* Text */}
        <div>
          <SectionTitle>Text</SectionTitle>
          <SwatchRow name="Primary" value={dark.text.primary} tokenPath="dark.text.primary" />
          <SwatchRow name="Secondary" value={dark.text.secondary} tokenPath="dark.text.secondary" />
          <SwatchRow name="Strong" value={dark.text.strong} tokenPath="dark.text.strong" />
          <SwatchRow name="Muted" value={dark.text.muted} tokenPath="dark.text.muted" />
          <SwatchRow name="Tertiary" value={dark.text.tertiary} tokenPath="dark.text.tertiary" />
          <SwatchRow name="Accent" value={dark.text.accent} tokenPath="dark.text.accent" />
          <SwatchRow name="Footer" value={dark.text.footer} tokenPath="dark.text.footer" />
          <SwatchRow name="Disabled" value={dark.text.disabled} tokenPath="dark.text.disabled" />
          <SwatchRow name="Hint" value={dark.text.hint} tokenPath="dark.text.hint" />
          <SwatchRow name="Code" value={dark.text.code} tokenPath="dark.text.code" />
        </div>

        {/* Background */}
        <div>
          <SectionTitle>Background</SectionTitle>
          <SwatchRow name="Default" value={dark.background.default} tokenPath="dark.background.default" />
          <SwatchRow name="Paper" value={dark.background.paper} tokenPath="dark.background.paper" />
          <SwatchRow name="Elevated" value={dark.background.elevated} tokenPath="dark.background.elevated" />
          <SwatchRow name="Brand Subtle" value={dark.background.brandSubtle} tokenPath="dark.background.brandSubtle" />
          <SwatchRow name="Muted" value={dark.background.muted} tokenPath="dark.background.muted" />
          <SwatchRow name="Code" value={dark.background.code} tokenPath="dark.background.code" />
        </div>

        {/* Action */}
        <div>
          <SectionTitle>Action</SectionTitle>
          <SwatchRow name="Active" value={dark.action.active} tokenPath="dark.action.active" />
          <SwatchRow name="Hover" value={dark.action.hover} tokenPath="dark.action.hover" />
          <SwatchRow name="Selected" value={dark.action.selected} tokenPath="dark.action.selected" />
          <SwatchRow name="Disabled" value={dark.action.disabled} tokenPath="dark.action.disabled" />
          <SwatchRow name="Disabled Background" value={dark.action.disabledBackground} tokenPath="dark.action.disabledBackground" />
          <SwatchRow name="Focus" value={dark.action.focus} tokenPath="dark.action.focus" />
        </div>

        {/* Divider */}
        <div>
          <SectionTitle>Divider</SectionTitle>
          <SwatchRow name="Divider" value={dark.divider} tokenPath="dark.divider" />
        </div>

        {/* Primary States */}
        <div>
          <SectionTitle>Primary States</SectionTitle>
          <SwatchRow name="Hover" value={dark.primary.states.hover} tokenPath="dark.primary.states.hover" />
          <SwatchRow name="Selected" value={dark.primary.states.selected} tokenPath="dark.primary.states.selected" />
          <SwatchRow name="Focus" value={dark.primary.states.focus} tokenPath="dark.primary.states.focus" />
          <SwatchRow name="Focus Visible" value={dark.primary.states.focusVisible} tokenPath="dark.primary.states.focusVisible" />
          <SwatchRow name="Outlined Border" value={dark.primary.states.outlinedBorder} tokenPath="dark.primary.states.outlinedBorder" />
        </div>

        {/* Gray Palette */}
        <div>
          <SectionTitle>Gray Palette</SectionTitle>
          <SwatchRow name="50" value={dark.gray[50]} tokenPath="dark.gray[50]" />
          <SwatchRow name="100" value={dark.gray[100]} tokenPath="dark.gray[100]" />
          <SwatchRow name="200" value={dark.gray[200]} tokenPath="dark.gray[200]" />
          <SwatchRow name="300" value={dark.gray[300]} tokenPath="dark.gray[300]" />
          <SwatchRow name="400" value={dark.gray[400]} tokenPath="dark.gray[400]" />
          <SwatchRow name="500" value={dark.gray[500]} tokenPath="dark.gray[500]" />
          <SwatchRow name="600" value={dark.gray[600]} tokenPath="dark.gray[600]" />
          <SwatchRow name="700" value={dark.gray[700]} tokenPath="dark.gray[700]" />
          <SwatchRow name="800" value={dark.gray[800]} tokenPath="dark.gray[800]" />
          <SwatchRow name="900" value={dark.gray[900]} tokenPath="dark.gray[900]" />
        </div>

        {/* Alert */}
        <div>
          <SectionTitle>Alert Components</SectionTitle>
          <SwatchRow name="Success Background" value={dark.components.alert.successBg} tokenPath="dark.components.alert.successBg" />
          <SwatchRow name="Success Text" value={dark.components.alert.successText} tokenPath="dark.components.alert.successText" />
          <SwatchRow name="Success Border" value={dark.components.alert.successBorder} tokenPath="dark.components.alert.successBorder" />
          <SwatchRow name="Warning Background" value={dark.components.alert.warningBg} tokenPath="dark.components.alert.warningBg" />
          <SwatchRow name="Warning Text" value={dark.components.alert.warningText} tokenPath="dark.components.alert.warningText" />
          <SwatchRow name="Warning Border" value={dark.components.alert.warningBorder} tokenPath="dark.components.alert.warningBorder" />
          <SwatchRow name="Error Background" value={dark.components.alert.errorBg} tokenPath="dark.components.alert.errorBg" />
          <SwatchRow name="Error Text" value={dark.components.alert.errorText} tokenPath="dark.components.alert.errorText" />
          <SwatchRow name="Error Border" value={dark.components.alert.errorBorder} tokenPath="dark.components.alert.errorBorder" />
          <SwatchRow name="Info Background" value={dark.components.alert.infoBg} tokenPath="dark.components.alert.infoBg" />
          <SwatchRow name="Info Text" value={dark.components.alert.infoText} tokenPath="dark.components.alert.infoText" />
          <SwatchRow name="Info Border" value={dark.components.alert.infoBorder} tokenPath="dark.components.alert.infoBorder" />
        </div>

        {/* Snackbar */}
        <div>
          <SectionTitle>Snackbar Components</SectionTitle>
          <SwatchRow name="Success Background" value={dark.components.snackbar.successBg} tokenPath="dark.components.snackbar.successBg" />
          <SwatchRow name="Warning Background" value={dark.components.snackbar.warningBg} tokenPath="dark.components.snackbar.warningBg" />
          <SwatchRow name="Error Background" value={dark.components.snackbar.errorBg} tokenPath="dark.components.snackbar.errorBg" />
          <SwatchRow name="Info Background" value={dark.components.snackbar.infoBg} tokenPath="dark.components.snackbar.infoBg" />
        </div>

        {/* Input */}
        <div>
          <SectionTitle>Input Components</SectionTitle>
          <SwatchRow name="Enabled Border" value={dark.components.input.outlined.enabledBorder} tokenPath="dark.components.input.outlined.enabledBorder" />
          <SwatchRow name="Hover Border" value={dark.components.input.outlined.hoverBorder} tokenPath="dark.components.input.outlined.hoverBorder" />
        </div>
      </div>
    </div>
  ),
};
