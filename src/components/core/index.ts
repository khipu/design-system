/**
 * Khipu Design System - Core Components
 *
 * Foundational UI primitives using native HTML + BeerCSS kds-* classes.
 * Radix UI used only for Modal, Select, and Tooltip.
 */

// Button
export { KdsButton, type KdsButtonProps, type KdsButtonVariant, type KdsButtonSize } from './KdsButton';

// TextField
export { KdsTextField, type KdsTextFieldProps } from './KdsTextField';

// Checkbox
export { KdsCheckbox, type KdsCheckboxProps } from './KdsCheckbox';

// Modal
export { KdsModal, type KdsModalProps, type KdsModalSize } from './KdsModal';

// Card
export {
  KdsCard,
  KdsCardHeader,
  KdsCardBody,
  KdsCardFooter,
  type KdsCardProps,
  type KdsCardVariant,
  type KdsCardSectionProps,
} from './KdsCard';

// Spinner
export { KdsSpinner, type KdsSpinnerProps, type KdsSpinnerSize } from './KdsSpinner';

// LinearProgress
export { KdsLinearProgress, type KdsLinearProgressProps } from './KdsLinearProgress';

// Alert
export { KdsAlert, type KdsAlertProps, type KdsAlertSeverity } from './KdsAlert';

// Typography
export { KdsTypography, type KdsTypographyProps, type KdsTypographyVariant } from './KdsTypography';

// Tabs
export {
  KdsTabs,
  KdsTab,
  KdsTabPanel,
  type KdsTabsProps,
  type KdsTabProps,
  type KdsTabPanelProps,
} from './KdsTabs';

// LogoHeader
export {
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
} from './KdsLogoHeader';

// RadioGroup
export {
  KdsRadioGroup,
  type KdsRadioGroupProps,
  type KdsRadioOption,
} from './KdsRadioGroup';

// Select
export {
  KdsSelect,
  type KdsSelectProps,
  type KdsSelectItemProps,
} from './KdsSelect';

// Chip
export {
  KdsChip,
  type KdsChipProps,
  type KdsChipColor,
} from './KdsChip';

// Snackbar
export {
  KdsSnackbar,
  type KdsSnackbarProps,
  type KdsSnackbarType,
} from './KdsSnackbar';

// Tooltip
export {
  KdsTooltip,
  type KdsTooltipProps,
  type KdsTooltipPlacement,
} from './KdsTooltip';

// Accordion
export {
  KdsAccordion,
  KdsAccordionSummary,
  KdsAccordionDetails,
  type KdsAccordionProps,
  type KdsAccordionSummaryProps,
  type KdsAccordionDetailsProps,
} from './KdsAccordion';

// Divider
export { KdsDivider, type KdsDividerProps } from './KdsDivider';

// SectionNote
export { KdsSectionNote, type KdsSectionNoteProps } from './KdsSectionNote';

// StatusBlock
export { KdsStatusBlock, type KdsStatusBlockProps, type KdsStatusType } from './KdsStatusBlock';

// Stepper
export { KdsStepper, type KdsStepperProps } from './KdsStepper';

// CopyRow
export { KdsCopyRow, type KdsCopyRowProps } from './KdsCopyRow';

// CopyableTable
export { KdsCopyableTable, type KdsCopyableTableProps, type KdsCopyableTableRow } from './KdsCopyableTable';

// ExpandPanel
export { KdsExpandPanel, type KdsExpandPanelProps } from './KdsExpandPanel';

// Countdown
export { KdsCountdown, type KdsCountdownProps } from './KdsCountdown';

// SegmentedTabs
export { KdsSegmentedTabs, type KdsSegmentedTabsProps } from './KdsSegmentedTabs';
