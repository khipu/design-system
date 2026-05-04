/**
 * Khipu Design System
 *
 * A comprehensive design system for the Khipu payment platform.
 * Built with TypeScript, React, and Material UI.
 *
 * Based on Figma design: Pagos Automáticos - MUI v610
 *
 * @packageDocumentation
 */

// =============================================================================
// THEME
// =============================================================================

export { khipuTheme, type KhipuTheme } from './theme';
export { KhipuThemeProvider, type KhipuThemeProviderProps } from './theme/ThemeProvider';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export {
  // Token collections
  tokens,
  tokensByMode,
  colorsByMode,

  // Individual token categories
  colors,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  typography,
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
  zIndex,
  transitions,
  breakpoints,

  // Types
  type Tokens,
  type TokensByMode,
  type Colors,
  type Typography as TypographyTokens,
  type ThemeMode,
} from './tokens';

// =============================================================================
// CORE COMPONENTS
// =============================================================================

export {
  // Button
  KdsButton,
  type KdsButtonProps,
  type KdsButtonVariant,
  type KdsButtonSize,

  // TextField
  KdsTextField,
  type KdsTextFieldProps,
  type KdsTextFieldVariant,
  type KdsTextFieldSize,

  // Checkbox
  KdsCheckbox,
  type KdsCheckboxProps,
  type KdsCheckboxColor,
  type KdsCheckboxSize,

  // Modal
  KdsModal,
  type KdsModalProps,
  type KdsModalSize,

  // Card
  KdsCard,
  KdsCardHeader,
  KdsCardContent,
  KdsCardActions,
  type KdsCardProps,
  type KdsCardHeaderProps,
  type KdsCardContentProps,
  type KdsCardActionsProps,
  type KdsCardVariant,
  type KdsCardElevation,

  // Spinner
  KdsSpinner,
  type KdsSpinnerProps,
  type KdsSpinnerSize,
  type KdsSpinnerColor,

  // LinearProgress
  KdsLinearProgress,
  type KdsLinearProgressProps,
  type KdsLinearProgressColor,
  type KdsLinearProgressVariant,

  // Alert
  KdsAlert,
  type KdsAlertProps,
  type KdsAlertSeverity,
  type KdsAlertVariant,

  // Typography
  KdsTypography,
  type KdsTypographyProps,
  type KdsTypographyVariant,

  // Tabs
  KdsTabs,
  KdsTab,
  KdsTabPanel,
  type KdsTabsProps,
  type KdsTabProps,
  type KdsTabPanelProps,
  type KdsTabsColor,
  type KdsTabsVariant,

  // LogoHeader
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
  type KdsLogoHeaderProps,
  type KdsLogoHeaderLogoProps,
  type KdsLogoHeaderSeparatorProps,
  type KdsLogoHeaderCodeProps,
  type KdsLogoHeaderCloseButtonProps,

  // RadioGroup
  KdsRadioGroup,
  KdsRadio,
  type KdsRadioGroupProps,
  type KdsRadioProps,
  type KdsRadioOption,
  type KdsRadioColor,
  type KdsRadioSize,

  // Select
  KdsSelect,
  KdsMenuItem,
  type KdsSelectProps,
  type KdsMenuItemProps,
  type KdsSelectOption,
  type KdsSelectVariant,
  type KdsSelectSize,

  // Chip
  KdsChip,
  type KdsChipProps,
  type KdsChipVariant,
  type KdsChipColor,
  type KdsChipSize,

  // Snackbar
  KdsSnackbar,
  type KdsSnackbarProps,
  type KdsSnackbarAnchorVertical,
  type KdsSnackbarAnchorHorizontal,

  // Tooltip
  KdsTooltip,
  type KdsTooltipProps,
  type KdsTooltipPlacement,

  // Accordion
  KdsAccordion,
  KdsAccordionSummary,
  KdsAccordionDetails,
  type KdsAccordionProps,
  type KdsAccordionSummaryProps,
  type KdsAccordionDetailsProps,
  type KdsAccordionVariant,
} from './components/core';

// =============================================================================
// MUI COMPONENT RE-EXPORTS
// =============================================================================
// These are commonly used MUI components re-exported for convenience.
// Users can import everything from '@khipu/design-system' without needing
// to import directly from '@mui/material'.

export { default as Box } from '@mui/material/Box';
export type { BoxProps } from '@mui/material/Box';

export { default as InputAdornment } from '@mui/material/InputAdornment';
export type { InputAdornmentProps } from '@mui/material/InputAdornment';

export { default as Divider } from '@mui/material/Divider';
export type { DividerProps } from '@mui/material/Divider';

export { default as Link } from '@mui/material/Link';
export type { LinkProps } from '@mui/material/Link';

export { default as IconButton } from '@mui/material/IconButton';
export type { IconButtonProps } from '@mui/material/IconButton';

export { default as Stack } from '@mui/material/Stack';
export type { StackProps } from '@mui/material/Stack';

export { default as Grid } from '@mui/material/Grid';
export type { GridProps } from '@mui/material/Grid';

export { default as Container } from '@mui/material/Container';
export type { ContainerProps } from '@mui/material/Container';

// =============================================================================
// ICON RE-EXPORTS
// =============================================================================
// Commonly used icons from Material Icons, re-exported for convenience.

export { default as SearchIcon } from '@mui/icons-material/Search';
export { default as ChevronRightIcon } from '@mui/icons-material/ChevronRight';
export { default as ChevronLeftIcon } from '@mui/icons-material/ChevronLeft';
export { default as CloseIcon } from '@mui/icons-material/Close';
export { default as CheckIcon } from '@mui/icons-material/Check';
export { default as CheckCircleIcon } from '@mui/icons-material/CheckCircle';
export { default as PersonIcon } from '@mui/icons-material/Person';
export { default as LockIcon } from '@mui/icons-material/Lock';
export { default as LockOutlinedIcon } from '@mui/icons-material/LockOutlined';
export { default as MailOutlineIcon } from '@mui/icons-material/MailOutline';
export { default as ExpandMoreIcon } from '@mui/icons-material/ExpandMore';
export { default as ExpandLessIcon } from '@mui/icons-material/ExpandLess';
export { default as InfoIcon } from '@mui/icons-material/Info';
export { default as WarningIcon } from '@mui/icons-material/Warning';
export { default as ErrorIcon } from '@mui/icons-material/Error';
export { default as VisibilityIcon } from '@mui/icons-material/Visibility';
export { default as VisibilityOffIcon } from '@mui/icons-material/VisibilityOff';
export { default as ContentCopyIcon } from '@mui/icons-material/ContentCopy';
export { default as KeyboardArrowUpIcon } from '@mui/icons-material/KeyboardArrowUp';
export { default as KeyboardArrowDownIcon } from '@mui/icons-material/KeyboardArrowDown';
