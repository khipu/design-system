/**
 * Khipu Design System - Tabs Component
 *
 * A tabs component for switching between different views or content sections.
 * Matches the Figma design: Pagos Instantaneos - MUI v610
 *
 * Built with composable sub-components for flexibility.
 */

import React, { forwardRef, createContext } from 'react';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import MuiTab, { TabProps as MuiTabProps } from '@mui/material/Tab';
import Box, { BoxProps } from '@mui/material/Box';
import { colors, fontFamilies, fontWeights } from '../../../tokens';

// =============================================================================
// CONTEXT
// =============================================================================

interface TabsContextValue {
  value: string | number;
  onChange: (event: React.SyntheticEvent, newValue: string | number) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

// =============================================================================
// TYPES
// =============================================================================

export type KdsTabsColor = 'primary' | 'secondary' | 'info';
export type KdsTabsVariant = 'standard' | 'fullWidth' | 'scrollable';

export interface KdsTabsProps extends Omit<MuiTabsProps, 'onChange' | 'textColor' | 'indicatorColor'> {
  /** The value of the currently selected Tab */
  value: string | number;
  /** Callback fired when a Tab is selected */
  onChange: (event: React.SyntheticEvent, newValue: string | number) => void;
  /** The color of the tabs */
  color?: KdsTabsColor;
  /** The variant of the tabs layout */
  variant?: KdsTabsVariant;
  /** Tab content - should be Tab components */
  children: React.ReactNode;
}

export interface KdsTabProps extends Omit<MuiTabProps, 'wrapped'> {
  /** The label displayed on the tab */
  label: string;
  /** The value of the tab, used for selection */
  value: string | number;
  /** Icon element placed before the label */
  icon?: React.ReactElement;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export interface KdsTabPanelProps extends BoxProps {
  /** The value that corresponds to this panel */
  value: string | number;
  /** The currently selected value from Tabs */
  selectedValue: string | number;
  /** Content of the tab panel */
  children: React.ReactNode;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Individual Tab component.
 *
 * @example
 * ```tsx
 * <KdsTab label="PERSONAS" value="personas" />
 * ```
 */
export const KdsTab = forwardRef<HTMLDivElement, KdsTabProps>(
  ({ label, value, icon, disabled = false, sx, ...props }, ref) => {
    return (
      <MuiTab
        ref={ref}
        label={label}
        value={value}
        icon={icon}
        disabled={disabled}
        sx={{
          fontFamily: fontFamilies.secondary,
          fontWeight: fontWeights.medium,
          fontSize: '14px',
          lineHeight: '24px',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          minHeight: '42px',
          padding: '9px 16px',
          flex: 1,
          maxWidth: 'none',
          '&.Mui-selected': {
            color: colors.info.main,
          },
          '&:not(.Mui-selected)': {
            color: colors.text.secondary,
          },
          ...sx,
        }}
        {...props}
      />
    );
  }
);

KdsTab.displayName = 'KdsTab';

/**
 * Tab Panel component for displaying content associated with a tab.
 *
 * @example
 * ```tsx
 * <KdsTabPanel value="personas" selectedValue={currentTab}>
 *   Content for personas tab
 * </KdsTabPanel>
 * ```
 */
export const KdsTabPanel = forwardRef<HTMLDivElement, KdsTabPanelProps>(
  ({ value, selectedValue, children, sx, ...props }, ref) => {
    const isSelected = value === selectedValue;

    if (!isSelected) {
      return null;
    }

    return (
      <Box
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        sx={{
          width: '100%',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

KdsTabPanel.displayName = 'KdsTabPanel';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Tabs container component.
 *
 * A composable tabs component for navigation between different views.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('personas');
 *
 * <KdsTabs value={value} onChange={(e, v) => setValue(v)} variant="fullWidth">
 *   <KdsTab label="PERSONAS" value="personas" />
 *   <KdsTab label="EMPRESAS" value="empresas" />
 * </KdsTabs>
 *
 * <KdsTabPanel value="personas" selectedValue={value}>
 *   Personas content
 * </KdsTabPanel>
 * <KdsTabPanel value="empresas" selectedValue={value}>
 *   Empresas content
 * </KdsTabPanel>
 * ```
 */
export const KdsTabs = forwardRef<HTMLDivElement, KdsTabsProps>(
  (
    {
      value,
      onChange,
      color = 'info',
      variant = 'fullWidth',
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const indicatorColor = color === 'info' ? colors.info.main :
                          color === 'primary' ? colors.primary.main :
                          colors.secondary.main;

    return (
      <TabsContext.Provider value={{ value, onChange }}>
        <MuiTabs
          ref={ref}
          value={value}
          onChange={onChange}
          variant={variant}
          textColor="inherit"
          TabIndicatorProps={{
            sx: {
              backgroundColor: indicatorColor,
              height: '2px',
            },
          }}
          sx={{
            width: '100%',
            minHeight: '42px',
            '& .MuiTabs-flexContainer': {
              width: '100%',
            },
            ...sx,
          }}
          {...props}
        >
          {children}
        </MuiTabs>
      </TabsContext.Provider>
    );
  }
);

KdsTabs.displayName = 'KdsTabs';

export default KdsTabs;
