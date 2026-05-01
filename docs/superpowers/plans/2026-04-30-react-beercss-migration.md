# React → BeerCSS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 17 MUI-wrapped React components with lightweight HTML + BeerCSS `kds-*` class components, add ~20 new components from BeerCSS, and eliminate the MUI/Emotion dependency (~300KB).

**Architecture:** Components render native HTML with `kds-*` CSS classes composed via `clsx`. Radix UI provides accessible behavior for 3 complex components (Modal, Select, Tooltip). The CSS bundle (`khipu-beercss.min.css`) becomes mandatory for React consumers. A lightweight `KdsThemeProvider` replaces MUI's `createTheme()` using CSS custom properties.

**Tech Stack:** React 18, TypeScript 5, clsx, Radix UI (dialog + select + tooltip), Vitest + Testing Library, Storybook 10, BeerCSS 4.

**Spec:** `docs/superpowers/specs/2026-04-30-react-beercss-migration-design.md`

---

## File Map

### New files to create

```
src/components/core/utils.ts                          ← Rewrite (add color helpers)
src/components/core/hooks/useCopyToClipboard.ts       ← New hook
src/components/core/hooks/useCountdown.ts             ← New hook
src/components/core/hooks/useTabsKeyboard.ts          ← New hook
src/components/core/hooks/useAutoHide.ts              ← New hook
src/components/core/hooks/index.ts                    ← Barrel export
src/theme/KdsThemeProvider.tsx                        ← New (replaces ThemeProvider.tsx)

Per-component (each existing component dir gets rewritten):
src/components/core/KdsButton/KdsButton.tsx           ← Rewrite
src/components/core/KdsButton/KdsButton.test.tsx      ← New test
src/components/core/KdsButton/KdsButton.stories.tsx   ← Rewrite
src/components/core/KdsButton/index.ts                ← Rewrite
... (same pattern for all 17 existing + ~20 new components)

New domain components:
src/components/domain/KdsBankRow/...
src/components/domain/KdsBankList/...
src/components/domain/KdsBankModal/...
src/components/domain/KdsQrRow/...
src/components/domain/KdsCardSelector/...
src/components/domain/KdsCardPlan/...
src/components/domain/KdsInvoiceSticky/...
src/components/domain/KdsBottomSheet/...
src/components/domain/KdsSecureFooter/...
src/components/domain/KdsRecapList/...
```

### Files to modify

```
src/beercss/customizations/khipu-components.css       ← Add missing typography classes
src/components/core/index.ts                          ← Update exports
src/components/domain/index.ts                        ← Create barrel
src/index.ts                                          ← Rewrite exports
.storybook/preview.tsx                                ← Replace MUI with CSS bundle
package.json                                          ← Swap dependencies
```

### Files to delete (Phase 5)

```
src/theme/index.ts                                    ← MUI theme
src/theme/ThemeProvider.tsx                            ← MUI ThemeProvider
```

---

## Phase 0: Setup

### Task 1: Add Missing Typography CSS Classes

The BeerCSS bundle lacks `kds-text-*` typography variant classes. React's `KdsTypography` needs them.

**Files:**
- Modify: `src/beercss/customizations/khipu-components.css`

- [ ] **Step 1: Add typography variant classes to the CSS bundle**

Add after the existing `.kds-text-muted` block (around line 3277) in `khipu-components.css`:

```css
/* ── Typography variants ── */
.kds-text-display1 {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-4xl, 36px);
  font-weight: var(--kds-font-weight-bold, 700);
  line-height: var(--kds-line-height-tight, 1.2);
  letter-spacing: var(--kds-letter-spacing-tight, -0.5px);
}

.kds-text-display2 {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-3xl, 32px);
  font-weight: var(--kds-font-weight-bold, 700);
  line-height: var(--kds-line-height-tight, 1.2);
  letter-spacing: var(--kds-letter-spacing-tight, -0.5px);
}

.kds-text-heading1 {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-2xl, 28px);
  font-weight: var(--kds-font-weight-semiBold, 600);
  line-height: var(--kds-line-height-snug, 1.3);
}

.kds-text-heading2 {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-xl, 24px);
  font-weight: var(--kds-font-weight-semiBold, 600);
  line-height: var(--kds-line-height-snug, 1.3);
}

.kds-text-heading3 {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-lg, 20px);
  font-weight: var(--kds-font-weight-semiBold, 600);
  line-height: var(--kds-line-height-normal, 1.5);
}

.kds-text-body-large {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-md, 16px);
  font-weight: var(--kds-font-weight-regular, 400);
  line-height: var(--kds-line-height-relaxed, 1.6);
}

.kds-text-body {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-base, 14px);
  font-weight: var(--kds-font-weight-regular, 400);
  line-height: var(--kds-line-height-normal, 1.5);
}

.kds-text-body-small {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-sm, 12px);
  font-weight: var(--kds-font-weight-regular, 400);
  line-height: var(--kds-line-height-normal, 1.5);
}

.kds-text-label {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-sm, 12px);
  font-weight: var(--kds-font-weight-semiBold, 600);
  line-height: var(--kds-line-height-normal, 1.5);
  letter-spacing: var(--kds-letter-spacing-uppercase, 1px);
  text-transform: uppercase;
}

.kds-text-label-small {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: var(--kds-font-size-xs, 10px);
  font-weight: var(--kds-font-weight-semiBold, 600);
  line-height: var(--kds-line-height-normal, 1.5);
  letter-spacing: var(--kds-letter-spacing-uppercase, 1px);
  text-transform: uppercase;
}

.kds-text-link {
  font-family: var(--kds-font-family-primary, 'Public Sans', sans-serif);
  font-size: inherit;
  font-weight: var(--kds-font-weight-medium, 500);
  color: var(--kds-color-primary-main, #8347AD);
  text-decoration: underline;
  cursor: pointer;
}

.kds-text-link:hover {
  color: var(--kds-color-primary-dark, #5B3179);
}
```

- [ ] **Step 2: Rebuild BeerCSS bundle**

Run: `npm run beercss:build`
Expected: Build completes, `dist/beercss/khipu-beercss.min.css` updated

- [ ] **Step 3: Commit**

```bash
git add src/beercss/customizations/khipu-components.css
git commit -m "feat(css): add kds-text-* typography variant classes"
```

---

### Task 2: Install Radix UI Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Radix packages**

Run: `npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip`

- [ ] **Step 2: Verify installation**

Run: `npm ls @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip`
Expected: All three packages listed without errors

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add Radix UI dependencies (dialog, select, tooltip)"
```

---

### Task 3: Create Core Utilities (Color Helpers)

**Files:**
- Modify: `src/components/core/utils.ts`
- Create: `src/components/core/utils.test.ts`

- [ ] **Step 1: Write failing tests for color utilities**

Create `src/components/core/utils.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { clsx, getContrastColor, lighten } from './utils';

describe('clsx', () => {
  it('re-exports clsx from package', () => {
    expect(clsx('a', 'b')).toBe('a b');
    expect(clsx('a', false && 'b', 'c')).toBe('a c');
  });
});

describe('getContrastColor', () => {
  it('returns white for dark colors', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff');
    expect(getContrastColor('#8347AD')).toBe('#ffffff');
    expect(getContrastColor('#333333')).toBe('#ffffff');
  });

  it('returns dark for light colors', () => {
    expect(getContrastColor('#ffffff')).toBe('#1a1a1a');
    expect(getContrastColor('#F3E5FF')).toBe('#1a1a1a');
    expect(getContrastColor('#FFFF00')).toBe('#1a1a1a');
  });
});

describe('lighten', () => {
  it('lightens a hex color by the given amount', () => {
    const result = lighten('#8347AD', 0.85);
    // Should produce a very light purple
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    // The lightened color should be lighter (higher RGB values)
    const r = parseInt(result.slice(1, 3), 16);
    expect(r).toBeGreaterThan(200);
  });

  it('handles already light colors without exceeding #ffffff', () => {
    const result = lighten('#EEEEEE', 0.5);
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/core/utils.test.ts`
Expected: FAIL — `getContrastColor` and `lighten` are not exported

- [ ] **Step 3: Implement color utilities**

Rewrite `src/components/core/utils.ts`:

```typescript
/**
 * Khipu Design System - Core Utilities
 *
 * Shared helpers for CSS-based React components.
 */

export { clsx } from 'clsx';

/**
 * Parse a hex color string into [r, g, b] values (0-255).
 */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/**
 * Convert [r, g, b] (0-255) back to a hex string.
 */
function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Calculate relative luminance per WCAG 2.0.
 * Returns a value between 0 (black) and 1 (white).
 */
function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Return a contrast text color (white or near-black) for the given background hex.
 * Uses WCAG luminance threshold.
 */
export function getContrastColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return relativeLuminance(r, g, b) > 0.179 ? '#1a1a1a' : '#ffffff';
}

/**
 * Lighten a hex color by mixing it toward white.
 * @param hex - Source color, e.g. "#8347AD"
 * @param amount - 0 = original, 1 = white. Typical: 0.85 for container colors.
 */
export function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/core/utils.test.ts`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/core/utils.ts src/components/core/utils.test.ts
git commit -m "feat: add getContrastColor and lighten color utilities"
```

---

### Task 4: Create Custom Hooks

**Files:**
- Create: `src/components/core/hooks/useCopyToClipboard.ts`
- Create: `src/components/core/hooks/useAutoHide.ts`
- Create: `src/components/core/hooks/useCountdown.ts`
- Create: `src/components/core/hooks/useTabsKeyboard.ts`
- Create: `src/components/core/hooks/index.ts`
- Create: `src/components/core/hooks/hooks.test.ts`

- [ ] **Step 1: Write failing tests for all hooks**

Create `src/components/core/hooks/hooks.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard';
import { useAutoHide } from './useAutoHide';
import { useCountdown } from './useCountdown';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('starts with copied = false', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copied).toBe(false);
  });

  it('sets copied to true after copy, then resets', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('hello');
    });
    expect(result.current.copied).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');

    act(() => { vi.advanceTimersByTime(1200); });
    expect(result.current.copied).toBe(false);
    vi.useRealTimers();
  });
});

describe('useAutoHide', () => {
  it('starts visible and hides after duration', () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    const { result } = renderHook(() => useAutoHide(3000, onHide));

    expect(result.current.visible).toBe(true);

    act(() => { vi.advanceTimersByTime(3000); });
    expect(result.current.visible).toBe(false);
    expect(onHide).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not hide when duration is 0', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAutoHide(0));
    act(() => { vi.advanceTimersByTime(10000); });
    expect(result.current.visible).toBe(true);
    vi.useRealTimers();
  });
});

describe('useCountdown', () => {
  it('computes remaining time from deadline', () => {
    const deadline = new Date(Date.now() + 3661000).toISOString(); // 1h 1m 1s
    const { result } = renderHook(() => useCountdown(deadline));

    expect(result.current.hours).toBe(1);
    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBeGreaterThanOrEqual(0);
    expect(result.current.expired).toBe(false);
    expect(result.current.urgent).toBe(false);
  });

  it('marks urgent when less than 5 minutes remain', () => {
    const deadline = new Date(Date.now() + 120000).toISOString(); // 2 min
    const { result } = renderHook(() => useCountdown(deadline));

    expect(result.current.urgent).toBe(true);
  });

  it('marks expired when deadline is in the past', () => {
    const deadline = new Date(Date.now() - 1000).toISOString();
    const { result } = renderHook(() => useCountdown(deadline));

    expect(result.current.expired).toBe(true);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/core/hooks/hooks.test.ts`
Expected: FAIL — modules don't exist yet

- [ ] **Step 3: Implement useCopyToClipboard**

Create `src/components/core/hooks/useCopyToClipboard.ts`:

```typescript
import { useState, useCallback } from 'react';

export function useCopyToClipboard(resetMs = 1200) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    },
    [resetMs],
  );

  return { copied, copy };
}
```

- [ ] **Step 4: Implement useAutoHide**

Create `src/components/core/hooks/useAutoHide.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useAutoHide(durationMs: number, onHide?: () => void) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (durationMs <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onHide?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onHide]);

  return { visible, setVisible };
}
```

- [ ] **Step 5: Implement useCountdown**

Create `src/components/core/hooks/useCountdown.ts`:

```typescript
import { useState, useEffect } from 'react';

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  urgent: boolean;
}

function calcRemaining(deadline: string): CountdownResult {
  const diff = Math.max(0, new Date(deadline).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: diff === 0,
    urgent: diff > 0 && diff < 5 * 60 * 1000,
  };
}

export function useCountdown(deadline: string): CountdownResult {
  const [state, setState] = useState(() => calcRemaining(deadline));

  useEffect(() => {
    const tick = () => setState(calcRemaining(deadline));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return state;
}
```

- [ ] **Step 6: Implement useTabsKeyboard**

Create `src/components/core/hooks/useTabsKeyboard.ts`:

```typescript
import { useCallback } from 'react';

/**
 * Provides an onKeyDown handler for tab lists.
 * Handles ArrowLeft/ArrowRight navigation per WAI-ARIA Tabs pattern.
 */
export function useTabsKeyboard(
  tabCount: number,
  activeIndex: number,
  onChange: (index: number) => void,
) {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next = activeIndex;
      if (e.key === 'ArrowRight') next = (activeIndex + 1) % tabCount;
      else if (e.key === 'ArrowLeft') next = (activeIndex - 1 + tabCount) % tabCount;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabCount - 1;
      else return;

      e.preventDefault();
      onChange(next);

      // Focus the new tab button
      const tablist = (e.currentTarget as HTMLElement);
      const buttons = tablist.querySelectorAll<HTMLElement>('[role="tab"]');
      buttons[next]?.focus();
    },
    [tabCount, activeIndex, onChange],
  );

  return { onKeyDown };
}
```

- [ ] **Step 7: Create barrel export**

Create `src/components/core/hooks/index.ts`:

```typescript
export { useCopyToClipboard } from './useCopyToClipboard';
export { useAutoHide } from './useAutoHide';
export { useCountdown } from './useCountdown';
export { useTabsKeyboard } from './useTabsKeyboard';
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npx vitest run src/components/core/hooks/hooks.test.ts`
Expected: ALL PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/core/hooks/
git commit -m "feat: add custom hooks (clipboard, auto-hide, countdown, tabs keyboard)"
```

---

### Task 5: Create KdsThemeProvider and Update Storybook Preview

**Files:**
- Create: `src/theme/KdsThemeProvider.tsx`
- Modify: `.storybook/preview.tsx`

- [ ] **Step 1: Create the lightweight KdsThemeProvider**

Create `src/theme/KdsThemeProvider.tsx`:

```tsx
import React from 'react';
import { getContrastColor, lighten } from '../components/core/utils';

export interface KdsThemeProviderProps {
  /** Override primary color for merchant branding */
  primaryColor?: string;
  /** Light or dark mode */
  mode?: 'light' | 'dark';
  children: React.ReactNode;
}

/**
 * Lightweight theme provider using CSS custom properties.
 * Replaces MUI's KhipuThemeProvider.
 *
 * @example
 * ```tsx
 * <KdsThemeProvider primaryColor="#FF0000">
 *   <App />
 * </KdsThemeProvider>
 * ```
 */
export function KdsThemeProvider({ primaryColor, mode = 'light', children }: KdsThemeProviderProps) {
  const style: React.CSSProperties | undefined = primaryColor
    ? ({
        '--primary': primaryColor,
        '--on-primary': getContrastColor(primaryColor),
        '--primary-container': lighten(primaryColor, 0.85),
        '--on-primary-container': primaryColor,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={`kds-theme-root ${mode}`} style={style}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Update Storybook preview to use CSS bundle**

Rewrite `.storybook/preview.tsx`:

```tsx
import type { Preview } from '@storybook/react';
import React from 'react';
import { create } from 'storybook/theming';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import { colorsByMode, fontFamilies } from '../src/tokens';
import '../src/tokens/css-variables.css';

// Load the BeerCSS bundle for component styling
import '../dist/beercss/khipu-beercss.min.css';

const light = colorsByMode.light;
const dark = colorsByMode.dark;

const khipuLightTheme = create({
  base: 'light',
  brandTitle: 'Khipu Design System',
  brandUrl: 'https://design.khipu.com',
  brandImage: '/khipu-200x75-color.svg',
  brandTarget: '_self',
  colorPrimary: light.primary.main,
  colorSecondary: light.primary.main,
  appBg: light.background.default,
  appContentBg: light.background.default,
  appBorderColor: light.gray[200],
  appBorderRadius: 8,
  textColor: light.text.primary,
  textInverseColor: light.primary.contrastText,
  barTextColor: light.text.footer,
  barSelectedColor: light.primary.main,
  barBg: light.background.default,
  fontBase: fontFamilies.primary,
  fontCode: fontFamilies.mono,
});

const khipuDarkTheme = create({
  base: 'dark',
  brandTitle: 'Khipu Design System',
  brandUrl: 'https://design.khipu.com',
  brandImage: '/khipu-200x75-color.svg',
  brandTarget: '_self',
  colorPrimary: dark.primary.main,
  colorSecondary: dark.primary.main,
  appBg: dark.background.default,
  appContentBg: dark.background.paper,
  appBorderColor: dark.divider,
  appBorderRadius: 8,
  textColor: dark.text.primary,
  textInverseColor: dark.background.default,
  barTextColor: dark.text.secondary,
  barSelectedColor: dark.primary.main,
  barBg: dark.background.default,
  fontBase: fontFamilies.primary,
  fontCode: fontFamilies.mono,
});

function StoryDecorator({ Story }: { Story: React.ComponentType }) {
  const isDark = useDarkMode();
  const modeColors = colorsByMode[isDark ? 'dark' : 'light'];

  return (
    <div className={`kds-theme-root ${isDark ? 'dark' : ''}`}
         style={{ backgroundColor: modeColors.background.default, minHeight: '100%' }}>
      <Story />
    </div>
  );
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ['Brand', 'Core', 'Domain', 'Hooks', 'Examples'],
      },
    },
    docs: { theme: khipuLightTheme },
    darkMode: {
      dark: khipuDarkTheme,
      light: khipuLightTheme,
      current: 'light',
    },
  },
  decorators: [
    (Story) => <StoryDecorator Story={Story} />,
  ],
};

export default preview;
```

- [ ] **Step 3: Build the BeerCSS bundle (needed for Storybook import)**

Run: `npm run beercss:build`

- [ ] **Step 4: Verify Storybook starts**

Run: `npm run storybook` (manual check — verify it opens without errors, then Ctrl+C)

- [ ] **Step 5: Commit**

```bash
git add src/theme/KdsThemeProvider.tsx .storybook/preview.tsx
git commit -m "feat: add KdsThemeProvider, update Storybook to use BeerCSS bundle"
```

---

## Phase 1: Pure HTML Components (Category A)

### Task 6: KdsButton

**Files:**
- Rewrite: `src/components/core/KdsButton/KdsButton.tsx`
- Rewrite: `src/components/core/KdsButton/index.ts`
- Create: `src/components/core/KdsButton/KdsButton.test.tsx`
- Rewrite: `src/components/core/KdsButton/KdsButton.stories.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsButton/KdsButton.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsButton } from './KdsButton';

describe('KdsButton', () => {
  it('renders with default primary variant', () => {
    render(<KdsButton>Click</KdsButton>);
    const btn = screen.getByRole('button', { name: 'Click' });
    expect(btn).toHaveClass('kds-btn', 'kds-btn-primary');
  });

  it('applies variant class', () => {
    render(<KdsButton variant="outlined">Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn-outlined');
  });

  it('applies size class', () => {
    render(<KdsButton size="sm">Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn-sm');
  });

  it('applies fullWidth class', () => {
    render(<KdsButton fullWidth>Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn-block');
  });

  it('renders start icon as Material Symbols', () => {
    render(<KdsButton startIcon="download">Download</KdsButton>);
    const icon = screen.getByText('download');
    expect(icon).toHaveClass('material-symbols-outlined');
  });

  it('shows loader when loading', () => {
    render(<KdsButton loading>Submit</KdsButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.querySelector('.loader')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    render(<KdsButton disabled>Click</KdsButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsButton onClick={onClick}>Click</KdsButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsButton className="custom">Click</KdsButton>);
    expect(screen.getByRole('button')).toHaveClass('kds-btn', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsButton ref={ref}>Click</KdsButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/core/KdsButton/KdsButton.test.tsx`
Expected: FAIL — current KdsButton renders MUI, not kds-* classes

- [ ] **Step 3: Rewrite KdsButton implementation**

Rewrite `src/components/core/KdsButton/KdsButton.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsButtonVariant = 'primary' | 'secondary' | 'outlined' | 'outlined-white' | 'text' | 'success';
export type KdsButtonSize = 'sm' | 'md';

export interface KdsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: KdsButtonVariant;
  /** Button size */
  size?: KdsButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Material Symbols icon name before label, e.g. "download" */
  startIcon?: string;
  /** Material Symbols icon name after label, e.g. "arrow_forward" */
  endIcon?: string;
}

export const KdsButton = forwardRef<HTMLButtonElement, KdsButtonProps>(
  (
    {
      variant = 'primary',
      size,
      fullWidth = false,
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      children,
      className,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={clsx(
        'kds-btn',
        `kds-btn-${variant}`,
        size && `kds-btn-${size}`,
        fullWidth && 'kds-btn-block',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {!loading && startIcon && (
        <span className="kds-icon">
          <i className="material-symbols-outlined">{startIcon}</i>
        </span>
      )}
      {loading ? (
        <>
          <span className="loader small" />
          <span>{children}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon && (
        <span className="kds-icon">
          <i className="material-symbols-outlined">{endIcon}</i>
        </span>
      )}
    </button>
  ),
);

KdsButton.displayName = 'KdsButton';
```

- [ ] **Step 4: Update barrel export**

Rewrite `src/components/core/KdsButton/index.ts`:

```typescript
export { KdsButton, type KdsButtonProps, type KdsButtonVariant, type KdsButtonSize } from './KdsButton';
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/components/core/KdsButton/KdsButton.test.tsx`
Expected: ALL PASS

- [ ] **Step 6: Write Storybook story**

Rewrite `src/components/core/KdsButton/KdsButton.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { KdsButton } from './KdsButton';

const meta: Meta<typeof KdsButton> = {
  title: 'Core/KdsButton',
  component: KdsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'outlined-white', 'text', 'success'],
    },
    size: { control: 'select', options: [undefined, 'sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof KdsButton>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Continuar' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secundario' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Cancelar' },
};

export const Text: Story = {
  args: { variant: 'text', children: 'Ver más' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Finalizar' },
};

export const WithStartIcon: Story = {
  args: { variant: 'outlined', startIcon: 'download', children: 'Descargar comprobante' },
};

export const FullWidth: Story = {
  args: { variant: 'primary', fullWidth: true, children: 'Continuar' },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Procesando' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Pequeño' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="kds-flex kds-flex-col kds-gap-4" style={{ maxWidth: 300 }}>
      <KdsButton variant="primary">Primary</KdsButton>
      <KdsButton variant="secondary">Secondary</KdsButton>
      <KdsButton variant="outlined">Outlined</KdsButton>
      <KdsButton variant="text">Text</KdsButton>
      <KdsButton variant="success">Success</KdsButton>
      <KdsButton variant="primary" startIcon="download">With Icon</KdsButton>
      <KdsButton variant="primary" loading>Loading</KdsButton>
      <KdsButton variant="primary" disabled>Disabled</KdsButton>
    </div>
  ),
};
```

- [ ] **Step 7: Commit**

```bash
git add src/components/core/KdsButton/
git commit -m "feat: migrate KdsButton from MUI to native HTML + kds-* classes"
```

---

### Task 7: KdsAlert

**Files:**
- Rewrite: `src/components/core/KdsAlert/KdsAlert.tsx`
- Rewrite: `src/components/core/KdsAlert/index.ts`
- Create: `src/components/core/KdsAlert/KdsAlert.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsAlert/KdsAlert.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsAlert } from './KdsAlert';

describe('KdsAlert', () => {
  it('renders with role="alert"', () => {
    render(<KdsAlert severity="info">Message</KdsAlert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies severity class', () => {
    render(<KdsAlert severity="error">Error</KdsAlert>);
    expect(screen.getByRole('alert')).toHaveClass('kds-alert', 'kds-error');
  });

  it('renders title when provided', () => {
    render(<KdsAlert severity="info" title="Title">Body</KdsAlert>);
    expect(screen.getByText('Title')).toHaveClass('kds-alert-title');
  });

  it('renders icon when provided', () => {
    render(<KdsAlert severity="info" icon="info">Body</KdsAlert>);
    expect(screen.getByText('info')).toHaveClass('material-symbols-outlined');
  });

  it('renders close button and fires onClose', async () => {
    const onClose = vi.fn();
    render(<KdsAlert severity="info" onClose={onClose}>Body</KdsAlert>);
    await userEvent.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies inline variant', () => {
    render(<KdsAlert severity="success" inline>OK</KdsAlert>);
    expect(screen.getByRole('alert')).toHaveClass('kds-alert-inline');
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/components/core/KdsAlert/KdsAlert.test.tsx`

- [ ] **Step 3: Implement KdsAlert**

Rewrite `src/components/core/KdsAlert/KdsAlert.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsAlertSeverity = 'success' | 'info' | 'warning' | 'error';

export interface KdsAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity: KdsAlertSeverity;
  title?: string;
  icon?: string;
  inline?: boolean;
  onClose?: () => void;
}

export const KdsAlert = forwardRef<HTMLDivElement, KdsAlertProps>(
  ({ severity, title, icon, inline, onClose, children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={clsx('kds-alert', `kds-${severity}`, inline && 'kds-alert-inline', className)}
      {...props}
    >
      {icon && (
        <div className="kds-alert-icon">
          <i className="material-symbols-outlined">{icon}</i>
        </div>
      )}
      <div className="kds-alert-content">
        {title && <p className="kds-alert-title">{title}</p>}
        <p className="kds-alert-description">{children}</p>
      </div>
      {onClose && (
        <button className="kds-btn kds-btn-text kds-btn-sm" onClick={onClose} aria-label="Cerrar">
          <i className="material-symbols-outlined">close</i>
        </button>
      )}
    </div>
  ),
);

KdsAlert.displayName = 'KdsAlert';
```

- [ ] **Step 4: Update barrel export**

Rewrite `src/components/core/KdsAlert/index.ts`:

```typescript
export { KdsAlert, type KdsAlertProps, type KdsAlertSeverity } from './KdsAlert';
```

- [ ] **Step 5: Run tests, verify pass**

Run: `npx vitest run src/components/core/KdsAlert/KdsAlert.test.tsx`
Expected: ALL PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/core/KdsAlert/
git commit -m "feat: migrate KdsAlert from MUI to native HTML + kds-* classes"
```

---

### Task 8: KdsTypography

**Files:**
- Rewrite: `src/components/core/KdsTypography/KdsTypography.tsx`
- Rewrite: `src/components/core/KdsTypography/index.ts`
- Create: `src/components/core/KdsTypography/KdsTypography.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsTypography/KdsTypography.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsTypography } from './KdsTypography';

describe('KdsTypography', () => {
  it('renders body variant by default as <p>', () => {
    render(<KdsTypography>Text</KdsTypography>);
    const el = screen.getByText('Text');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('kds-text-body');
  });

  it('renders display1 as <h1>', () => {
    render(<KdsTypography variant="display1">Title</KdsTypography>);
    const el = screen.getByText('Title');
    expect(el.tagName).toBe('H1');
    expect(el).toHaveClass('kds-text-display1');
  });

  it('renders heading2 as <h2>', () => {
    render(<KdsTypography variant="heading2">Sub</KdsTypography>);
    expect(screen.getByText('Sub').tagName).toBe('H2');
  });

  it('renders label as <span>', () => {
    render(<KdsTypography variant="label">Label</KdsTypography>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('allows overriding the HTML element via as prop', () => {
    render(<KdsTypography variant="heading1" as="div">Div</KdsTypography>);
    expect(screen.getByText('Div').tagName).toBe('DIV');
  });

  it('applies muted color', () => {
    render(<KdsTypography color="muted">Gray</KdsTypography>);
    expect(screen.getByText('Gray')).toHaveClass('kds-text-muted');
  });

  it('merges custom className', () => {
    render(<KdsTypography className="custom">T</KdsTypography>);
    expect(screen.getByText('T')).toHaveClass('kds-text-body', 'custom');
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/components/core/KdsTypography/KdsTypography.test.tsx`

- [ ] **Step 3: Implement KdsTypography**

Rewrite `src/components/core/KdsTypography/KdsTypography.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsTypographyVariant =
  | 'display1' | 'display2'
  | 'heading1' | 'heading2' | 'heading3'
  | 'body-large' | 'body' | 'body-small'
  | 'label' | 'label-small'
  | 'muted' | 'link';

type ElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

const variantTag: Record<KdsTypographyVariant, ElementTag> = {
  display1: 'h1',
  display2: 'h2',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  'body-large': 'p',
  body: 'p',
  'body-small': 'p',
  label: 'span',
  'label-small': 'span',
  muted: 'p',
  link: 'span',
};

export interface KdsTypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: KdsTypographyVariant;
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'inherit';
  as?: ElementTag;
}

export const KdsTypography = forwardRef<HTMLElement, KdsTypographyProps>(
  ({ variant = 'body', color, as, children, className, ...props }, ref) => {
    const Tag = as || variantTag[variant];
    return (
      <Tag
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={clsx(
          `kds-text-${variant}`,
          color && color !== 'inherit' && `kds-text-${color}`,
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

KdsTypography.displayName = 'KdsTypography';
```

- [ ] **Step 4: Update barrel**

Rewrite `src/components/core/KdsTypography/index.ts`:

```typescript
export { KdsTypography, type KdsTypographyProps, type KdsTypographyVariant } from './KdsTypography';
```

- [ ] **Step 5: Run tests, verify pass**

Run: `npx vitest run src/components/core/KdsTypography/KdsTypography.test.tsx`

- [ ] **Step 6: Commit**

```bash
git add src/components/core/KdsTypography/
git commit -m "feat: migrate KdsTypography from MUI to native HTML + kds-* classes"
```

---

### Task 9: KdsCard (with sub-components)

**Files:**
- Rewrite: `src/components/core/KdsCard/KdsCard.tsx`
- Rewrite: `src/components/core/KdsCard/index.ts`
- Create: `src/components/core/KdsCard/KdsCard.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsCard/KdsCard.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsCard, KdsCardHeader, KdsCardBody, KdsCardFooter } from './KdsCard';

describe('KdsCard', () => {
  it('renders as article with kds-card-elevated', () => {
    render(<KdsCard>Content</KdsCard>);
    const card = screen.getByText('Content').closest('article');
    expect(card).toHaveClass('kds-card-elevated');
  });

  it('applies outlined variant', () => {
    render(<KdsCard variant="outlined">Content</KdsCard>);
    expect(screen.getByText('Content').closest('article')).toHaveClass('kds-card-outlined');
  });

  it('applies dimmed class', () => {
    render(<KdsCard dimmed>Content</KdsCard>);
    expect(screen.getByText('Content').closest('article')).toHaveClass('kds-card-dimmed');
  });

  it('renders clickable card as button', async () => {
    const onClick = vi.fn();
    render(<KdsCard onClick={onClick}>Click me</KdsCard>);
    await userEvent.click(screen.getByText('Click me').closest('article')!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('KdsCardHeader', () => {
  it('renders with kds-card-header class', () => {
    render(<KdsCardHeader>Header</KdsCardHeader>);
    expect(screen.getByText('Header')).toHaveClass('kds-card-header');
  });
});

describe('KdsCardBody', () => {
  it('renders with kds-card-body class', () => {
    render(<KdsCardBody>Body</KdsCardBody>);
    expect(screen.getByText('Body')).toHaveClass('kds-card-body');
  });
});

describe('KdsCardFooter', () => {
  it('renders with kds-card-footer class', () => {
    render(<KdsCardFooter>Footer</KdsCardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('kds-card-footer');
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/components/core/KdsCard/KdsCard.test.tsx`

- [ ] **Step 3: Implement KdsCard and sub-components**

Rewrite `src/components/core/KdsCard/KdsCard.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsCardVariant = 'elevated' | 'outlined';

export interface KdsCardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: KdsCardVariant;
  dimmed?: boolean;
}

export const KdsCard = forwardRef<HTMLElement, KdsCardProps>(
  ({ variant = 'elevated', dimmed, children, className, ...props }, ref) => (
    <article
      ref={ref}
      className={clsx(
        variant === 'elevated' ? 'kds-card-elevated' : 'kds-card-outlined',
        dimmed && 'kds-card-dimmed',
        className,
      )}
      {...props}
    >
      {children}
    </article>
  ),
);
KdsCard.displayName = 'KdsCard';

export interface KdsCardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const KdsCardHeader = forwardRef<HTMLDivElement, KdsCardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-header', className)} {...props}>
      {children}
    </div>
  ),
);
KdsCardHeader.displayName = 'KdsCardHeader';

export const KdsCardBody = forwardRef<HTMLDivElement, KdsCardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-body', className)} {...props}>
      {children}
    </div>
  ),
);
KdsCardBody.displayName = 'KdsCardBody';

export const KdsCardFooter = forwardRef<HTMLDivElement, KdsCardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-footer', className)} {...props}>
      {children}
    </div>
  ),
);
KdsCardFooter.displayName = 'KdsCardFooter';
```

- [ ] **Step 4: Update barrel export**

Rewrite `src/components/core/KdsCard/index.ts`:

```typescript
export {
  KdsCard, KdsCardHeader, KdsCardBody, KdsCardFooter,
  type KdsCardProps, type KdsCardVariant, type KdsCardSectionProps,
} from './KdsCard';
```

- [ ] **Step 5: Run tests, verify pass**

Run: `npx vitest run src/components/core/KdsCard/KdsCard.test.tsx`

- [ ] **Step 6: Commit**

```bash
git add src/components/core/KdsCard/
git commit -m "feat: migrate KdsCard from MUI to native HTML + kds-* classes"
```

---

### Task 10: KdsTextField

**Files:**
- Rewrite: `src/components/core/KdsTextField/KdsTextField.tsx`
- Rewrite: `src/components/core/KdsTextField/index.ts`
- Create: `src/components/core/KdsTextField/KdsTextField.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsTextField/KdsTextField.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsTextField } from './KdsTextField';

describe('KdsTextField', () => {
  it('renders with BeerCSS field classes', () => {
    const { container } = render(<KdsTextField label="Name" />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('field', 'label', 'border');
  });

  it('renders label after input (BeerCSS requirement)', () => {
    const { container } = render(<KdsTextField label="Email" />);
    const input = container.querySelector('input');
    const label = container.querySelector('label');
    expect(input).toBeTruthy();
    expect(label).toBeTruthy();
    // Label must come AFTER input for BeerCSS floating label to work
    expect(input!.compareDocumentPosition(label!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('adds placeholder=" " for floating label CSS', () => {
    render(<KdsTextField label="Test" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', ' ');
  });

  it('renders error state with invalid class', () => {
    const { container } = render(<KdsTextField label="RUT" error helperText="Inválido" />);
    expect(container.firstElementChild).toHaveClass('invalid');
    expect(screen.getByText('Inválido')).toBeInTheDocument();
  });

  it('renders readonly state with lock icon', () => {
    const { container } = render(<KdsTextField label="Amount" readOnly value="$1.000" />);
    expect(container.firstElementChild).toHaveClass('locked');
    expect(container.querySelector('.material-symbols-outlined')).toHaveTextContent('lock');
  });

  it('renders start icon', () => {
    render(<KdsTextField label="Search" startIcon="search" />);
    expect(screen.getByText('search')).toHaveClass('material-symbols-outlined');
  });

  it('forwards ref to input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<KdsTextField label="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/components/core/KdsTextField/KdsTextField.test.tsx`

- [ ] **Step 3: Implement KdsTextField**

Rewrite `src/components/core/KdsTextField/KdsTextField.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  startIcon?: string;
  endIcon?: string;
}

export const KdsTextField = forwardRef<HTMLInputElement, KdsTextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      readOnly,
      startIcon,
      endIcon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id || `kds-field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div
        className={clsx(
          'field', 'label', 'border',
          error && 'invalid',
          readOnly && 'locked',
          fullWidth && 'kds-w-full',
          className,
        )}
      >
        {startIcon && <i className="material-symbols-outlined">{startIcon}</i>}
        <input
          ref={ref}
          id={fieldId}
          placeholder=" "
          readOnly={readOnly}
          {...props}
        />
        <label htmlFor={fieldId}>{label}</label>
        {readOnly && <i className="material-symbols-outlined">lock</i>}
        {endIcon && !readOnly && <i className="material-symbols-outlined">{endIcon}</i>}
        {helperText && <span className="helper">{helperText}</span>}
      </div>
    );
  },
);

KdsTextField.displayName = 'KdsTextField';
```

- [ ] **Step 4: Update barrel export**

Rewrite `src/components/core/KdsTextField/index.ts`:

```typescript
export { KdsTextField, type KdsTextFieldProps } from './KdsTextField';
```

- [ ] **Step 5: Run tests, verify pass**

Run: `npx vitest run src/components/core/KdsTextField/KdsTextField.test.tsx`

- [ ] **Step 6: Commit**

```bash
git add src/components/core/KdsTextField/
git commit -m "feat: migrate KdsTextField from MUI to native HTML + BeerCSS floating labels"
```

---

### Task 11: Remaining Cat. A Components (Batch)

Migrate remaining simple components. Each follows the same pattern as Tasks 6-10: test → implement → barrel → commit.

**Components in this batch:**
- KdsCheckbox
- KdsRadioGroup (+ KdsRadio)
- KdsChip
- KdsLinearProgress
- KdsSpinner
- KdsDivider (new)
- KdsBadge (new)
- KdsSectionNote (new)
- KdsStatusBlock (new)
- KdsStepper (new)
- KdsLogoHeader

Each sub-task below is one component.

---

- [ ] **Step 1: KdsCheckbox — test, implement, commit**

Rewrite `src/components/core/KdsCheckbox/KdsCheckbox.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const KdsCheckbox = forwardRef<HTMLInputElement, KdsCheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const fieldId = id || `kds-cb-${label?.toLowerCase().replace(/\s+/g, '-') || 'check'}`;
    return (
      <label className={clsx('field', className)} htmlFor={fieldId}>
        <input ref={ref} type="checkbox" id={fieldId} {...props} />
        <span>{label}</span>
      </label>
    );
  },
);
KdsCheckbox.displayName = 'KdsCheckbox';
```

Barrel `src/components/core/KdsCheckbox/index.ts`:
```typescript
export { KdsCheckbox, type KdsCheckboxProps } from './KdsCheckbox';
```

Test `src/components/core/KdsCheckbox/KdsCheckbox.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsCheckbox } from './KdsCheckbox';

describe('KdsCheckbox', () => {
  it('renders checkbox with label', () => {
    render(<KdsCheckbox label="Agree" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Agree')).toBeInTheDocument();
  });

  it('forwards checked state', () => {
    render(<KdsCheckbox label="Check" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
```

Run: `npx vitest run src/components/core/KdsCheckbox/KdsCheckbox.test.tsx`
Commit: `git add src/components/core/KdsCheckbox/ && git commit -m "feat: migrate KdsCheckbox to native HTML"`

---

- [ ] **Step 2: KdsRadioGroup — test, implement, commit**

Rewrite `src/components/core/KdsRadioGroup/KdsRadioGroup.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface KdsRadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  label?: string;
  name: string;
  options: KdsRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export const KdsRadioGroup = forwardRef<HTMLFieldSetElement, KdsRadioGroupProps>(
  ({ label, name, options, value, onChange, className, ...props }, ref) => (
    <fieldset ref={ref} className={clsx('kds-radio-group', className)} {...props}>
      {label && <legend>{label}</legend>}
      {options.map((opt) => (
        <label key={opt.value} className="field">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            disabled={opt.disabled}
            onChange={() => onChange?.(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </fieldset>
  ),
);
KdsRadioGroup.displayName = 'KdsRadioGroup';
```

Barrel `src/components/core/KdsRadioGroup/index.ts`:
```typescript
export { KdsRadioGroup, type KdsRadioGroupProps, type KdsRadioOption } from './KdsRadioGroup';
```

Test, run, commit: `git commit -m "feat: migrate KdsRadioGroup to native HTML"`

---

- [ ] **Step 3: KdsChip — test, implement, commit**

Rewrite `src/components/core/KdsChip/KdsChip.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsChipColor = 'primary' | 'success' | 'error' | 'warning' | 'info';

export interface KdsChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: KdsChipColor;
  icon?: string;
  onDelete?: () => void;
}

export const KdsChip = forwardRef<HTMLSpanElement, KdsChipProps>(
  ({ color, icon, onDelete, children, className, ...props }, ref) => (
    <span ref={ref} className={clsx('kds-badge', color, className)} {...props}>
      {icon && <i className="material-symbols-outlined">{icon}</i>}
      {children}
      {onDelete && (
        <button className="kds-btn kds-btn-text kds-btn-sm" onClick={onDelete} aria-label="Eliminar">
          <i className="material-symbols-outlined">close</i>
        </button>
      )}
    </span>
  ),
);
KdsChip.displayName = 'KdsChip';
```

Barrel, test, commit: `git commit -m "feat: migrate KdsChip to native HTML + kds-badge"`

---

- [ ] **Step 4: KdsLinearProgress — test, implement, commit**

Rewrite `src/components/core/KdsLinearProgress/KdsLinearProgress.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsLinearProgressProps extends React.HTMLAttributes<HTMLProgressElement> {
  value?: number;
  max?: number;
}

export const KdsLinearProgress = forwardRef<HTMLProgressElement, KdsLinearProgressProps>(
  ({ value, max = 100, className, ...props }, ref) => (
    <progress ref={ref} className={clsx('kds-progress', className)} value={value} max={max} {...props} />
  ),
);
KdsLinearProgress.displayName = 'KdsLinearProgress';
```

Barrel, test, commit: `git commit -m "feat: migrate KdsLinearProgress to native HTML"`

---

- [ ] **Step 5: KdsSpinner — test, implement, commit**

Rewrite `src/components/core/KdsSpinner/KdsSpinner.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsSpinnerSize = 'small' | 'medium' | 'large';

export interface KdsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: KdsSpinnerSize;
  label?: string;
}

export const KdsSpinner = forwardRef<HTMLDivElement, KdsSpinnerProps>(
  ({ size = 'medium', label, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-flex kds-flex-col kds-items-center kds-gap-2', className)} role="status" {...props}>
      <span className={clsx('loader', size)} />
      {label && <span className="kds-text-body-small kds-text-muted">{label}</span>}
      {!label && <span className="kds-hidden">Cargando</span>}
    </div>
  ),
);
KdsSpinner.displayName = 'KdsSpinner';
```

Barrel, test, commit: `git commit -m "feat: migrate KdsSpinner to native HTML"`

---

- [ ] **Step 6: Create new simple components (KdsDivider, KdsBadge, KdsSectionNote, KdsStatusBlock, KdsStepper)**

Create each in its own directory under `src/components/core/`. Each is a simple HTML wrapper around its `kds-*` class.

**KdsDivider** (`src/components/core/KdsDivider/KdsDivider.tsx`):
```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  dashed?: boolean;
}

export const KdsDivider = forwardRef<HTMLHRElement, KdsDividerProps>(
  ({ dashed, className, ...props }, ref) => (
    <hr ref={ref} className={clsx(dashed ? 'kds-hr-dashed' : 'kds-hr', className)} {...props} />
  ),
);
KdsDivider.displayName = 'KdsDivider';
```

**KdsSectionNote** (`src/components/core/KdsSectionNote/KdsSectionNote.tsx`):
```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsSectionNoteProps extends React.HTMLAttributes<HTMLParagraphElement> {
  icon?: string;
}

export const KdsSectionNote = forwardRef<HTMLParagraphElement, KdsSectionNoteProps>(
  ({ icon = 'info', children, className, ...props }, ref) => (
    <p ref={ref} className={clsx('kds-section-note', className)} {...props}>
      <i className="material-symbols-outlined">{icon}</i>
      <span>{children}</span>
    </p>
  ),
);
KdsSectionNote.displayName = 'KdsSectionNote';
```

**KdsStatusBlock** (`src/components/core/KdsStatusBlock/KdsStatusBlock.tsx`):
```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsStatusType = 'success' | 'pending' | 'warn' | 'error';

export interface KdsStatusBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  status: KdsStatusType;
  icon?: string;
  title: string;
  description?: string;
  inline?: boolean;
}

export const KdsStatusBlock = forwardRef<HTMLDivElement, KdsStatusBlockProps>(
  ({ status, icon, title, description, inline, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-status-block', inline && 'inline', className)} data-status={status} {...props}>
      <div className="kds-status-block-icon">
        {icon && <i className="material-symbols-outlined">{icon}</i>}
      </div>
      <div>
        <h2 className="kds-status-block-title">{title}</h2>
        {description && <p className="kds-status-block-description">{description}</p>}
      </div>
    </div>
  ),
);
KdsStatusBlock.displayName = 'KdsStatusBlock';
```

**KdsStepper** (`src/components/core/KdsStepper/KdsStepper.tsx`):
```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  current: number;
}

export const KdsStepper = forwardRef<HTMLDivElement, KdsStepperProps>(
  ({ steps, current, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-stepper', className)} data-steps={steps} data-current={current} {...props}>
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className={clsx('kds-step', i < current && 'completed', i === current && 'current')}>
          <div className="kds-step-indicator">{i < current ? '✓' : i + 1}</div>
          {i < steps - 1 && <div className="kds-step-line" />}
        </div>
      ))}
    </div>
  ),
);
KdsStepper.displayName = 'KdsStepper';
```

Create index.ts barrel for each, write basic tests, commit all:

```bash
git add src/components/core/KdsDivider/ src/components/core/KdsSectionNote/ src/components/core/KdsStatusBlock/ src/components/core/KdsStepper/
git commit -m "feat: add new Cat. A components (Divider, SectionNote, StatusBlock, Stepper)"
```

---

- [ ] **Step 7: Migrate KdsLogoHeader — test, implement, commit**

Rewrite to use native HTML with `kds-brand-row` classes. Maintain the composable sub-component pattern (KdsLogoHeaderLogo, etc.) but render `<div>` elements with appropriate classes.

Commit: `git commit -m "feat: migrate KdsLogoHeader to native HTML"`

---

- [ ] **Step 8: Phase 1 Checkpoint — run all tests**

Run: `npx vitest run src/components/core/`
Expected: ALL PASS — every Cat. A component test passes

---

## Phase 2: Components with Hooks (Category B)

### Task 12: KdsTabs (+ KdsTab, KdsTabPanel)

**Files:**
- Rewrite: `src/components/core/KdsTabs/KdsTabs.tsx`
- Rewrite: `src/components/core/KdsTabs/index.ts`
- Create: `src/components/core/KdsTabs/KdsTabs.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsTabs/KdsTabs.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsTabs, KdsTab, KdsTabPanel } from './KdsTabs';

describe('KdsTabs', () => {
  const setup = (activeIndex = 0) => {
    const onChange = vi.fn();
    render(
      <div>
        <KdsTabs activeIndex={activeIndex} onChange={onChange}>
          <KdsTab>Tab 1</KdsTab>
          <KdsTab>Tab 2</KdsTab>
        </KdsTabs>
        <KdsTabPanel active={activeIndex === 0}>Panel 1</KdsTabPanel>
        <KdsTabPanel active={activeIndex === 1}>Panel 2</KdsTabPanel>
      </div>
    );
    return { onChange };
  };

  it('renders tablist with role="tablist"', () => {
    setup();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('marks active tab with aria-selected', () => {
    setup(0);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange when tab is clicked', async () => {
    const { onChange } = setup(0);
    await userEvent.click(screen.getAllByRole('tab')[1]);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('navigates with arrow keys', async () => {
    const { onChange } = setup(0);
    const tablist = screen.getByRole('tablist');
    tablist.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('renders panel with role="tabpanel"', () => {
    setup(0);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel 1');
  });

  it('hides inactive panels', () => {
    setup(0);
    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    // Only active panel should be visible
    expect(screen.getByText('Panel 1')).toBeVisible();
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/components/core/KdsTabs/KdsTabs.test.tsx`

- [ ] **Step 3: Implement KdsTabs, KdsTab, KdsTabPanel**

Rewrite `src/components/core/KdsTabs/KdsTabs.tsx`:

```tsx
import React, { forwardRef, Children } from 'react';
import { clsx } from '../utils';
import { useTabsKeyboard } from '../hooks/useTabsKeyboard';

export interface KdsTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex: number;
  onChange: (index: number) => void;
  variant?: 'standard' | 'segmented';
}

export const KdsTabs = forwardRef<HTMLDivElement, KdsTabsProps>(
  ({ activeIndex, onChange, variant = 'standard', children, className, ...props }, ref) => {
    const tabCount = Children.count(children);
    const { onKeyDown } = useTabsKeyboard(tabCount, activeIndex, onChange);

    return (
      <div
        ref={ref}
        role="tablist"
        className={clsx(variant === 'segmented' ? 'kds-segmented-tabs' : 'kds-tabs', className)}
        onKeyDown={onKeyDown}
        {...props}
      >
        {Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<KdsTabInternalProps>, {
            _active: i === activeIndex,
            _onClick: () => onChange(i),
          });
        })}
      </div>
    );
  },
);
KdsTabs.displayName = 'KdsTabs';

interface KdsTabInternalProps {
  _active?: boolean;
  _onClick?: () => void;
}

export interface KdsTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const KdsTab = forwardRef<HTMLButtonElement, KdsTabProps & KdsTabInternalProps>(
  ({ _active, _onClick, children, className, ...props }, ref) => (
    <button
      ref={ref}
      role="tab"
      aria-selected={_active}
      tabIndex={_active ? 0 : -1}
      className={clsx(_active && 'active', className)}
      onClick={_onClick}
      {...props}
    >
      {children}
    </button>
  ),
);
KdsTab.displayName = 'KdsTab';

export interface KdsTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

export const KdsTabPanel = forwardRef<HTMLDivElement, KdsTabPanelProps>(
  ({ active, children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="tabpanel"
      hidden={!active}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
);
KdsTabPanel.displayName = 'KdsTabPanel';
```

- [ ] **Step 4: Update barrel and run tests**

Rewrite `src/components/core/KdsTabs/index.ts`:
```typescript
export { KdsTabs, KdsTab, KdsTabPanel, type KdsTabsProps, type KdsTabProps, type KdsTabPanelProps } from './KdsTabs';
```

Run: `npx vitest run src/components/core/KdsTabs/KdsTabs.test.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/components/core/KdsTabs/
git commit -m "feat: migrate KdsTabs to native HTML + useTabsKeyboard hook"
```

---

### Task 13: Remaining Cat. B Components (Batch)

Each follows the same pattern: hook + HTML + `kds-*` classes.

- [ ] **Step 1: KdsAccordion — rewrite with native `<details>`/`<summary>`**

Rewrite `src/components/core/KdsAccordion/KdsAccordion.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsAccordionProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {}

export const KdsAccordion = forwardRef<HTMLDetailsElement, KdsAccordionProps>(
  ({ children, className, ...props }, ref) => (
    <details ref={ref} className={clsx('kds-accordion', className)} {...props}>
      {children}
    </details>
  ),
);
KdsAccordion.displayName = 'KdsAccordion';

export interface KdsAccordionSummaryProps extends React.HTMLAttributes<HTMLElement> {}

export const KdsAccordionSummary = forwardRef<HTMLElement, KdsAccordionSummaryProps>(
  ({ children, className, ...props }, ref) => (
    <summary ref={ref} className={clsx('kds-accordion-summary', className)} {...props}>
      {children}
      <i className="material-symbols-outlined">expand_more</i>
    </summary>
  ),
);
KdsAccordionSummary.displayName = 'KdsAccordionSummary';

export interface KdsAccordionDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const KdsAccordionDetails = forwardRef<HTMLDivElement, KdsAccordionDetailsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-accordion-details', className)} {...props}>
      {children}
    </div>
  ),
);
KdsAccordionDetails.displayName = 'KdsAccordionDetails';
```

Write test, update barrel, commit: `git commit -m "feat: migrate KdsAccordion to native details/summary"`

---

- [ ] **Step 2: KdsSnackbar — rewrite with useAutoHide**

Rewrite `src/components/core/KdsSnackbar/KdsSnackbar.tsx`:

```tsx
import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useAutoHide } from '../hooks/useAutoHide';

export type KdsSnackbarType = 'success' | 'error' | 'info';

export interface KdsSnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type?: KdsSnackbarType;
  duration?: number;
  onClose?: () => void;
  open?: boolean;
}

export const KdsSnackbar = forwardRef<HTMLDivElement, KdsSnackbarProps>(
  ({ message, type, duration = 5000, onClose, open = true, className, ...props }, ref) => {
    const { visible } = useAutoHide(duration, onClose);
    if (!open || !visible) return null;

    return (
      <div ref={ref} className={clsx('snackbar', 'active', type, className)} {...props}>
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} aria-label="Cerrar">
            <i className="material-symbols-outlined">close</i>
          </button>
        )}
      </div>
    );
  },
);
KdsSnackbar.displayName = 'KdsSnackbar';
```

Write test, update barrel, commit: `git commit -m "feat: migrate KdsSnackbar to native HTML + useAutoHide"`

---

- [ ] **Step 3: Create new Cat. B components (KdsCopyRow, KdsCopyableTable, KdsExpandPanel, KdsCountdown, KdsSegmentedTabs)**

Each uses its respective hook and renders `kds-*` classes. Follow the patterns from the spec's Category B examples.

Create each in `src/components/core/`:
- `KdsCopyRow/` — uses `useCopyToClipboard`
- `KdsCopyableTable/` — uses `useCopyToClipboard` with multiple rows
- `KdsExpandPanel/` — `aria-expanded` toggle with `kds-expand-toggle` + `kds-expand-panel`
- `KdsCountdown/` — uses `useCountdown`, renders `kds-countdown`
- `KdsSegmentedTabs/` — uses `useTabsKeyboard`, renders `kds-segmented-tabs`

Write tests for each, commit all:

```bash
git add src/components/core/KdsCopyRow/ src/components/core/KdsCopyableTable/ src/components/core/KdsExpandPanel/ src/components/core/KdsCountdown/ src/components/core/KdsSegmentedTabs/
git commit -m "feat: add new Cat. B components (CopyRow, CopyableTable, ExpandPanel, Countdown, SegmentedTabs)"
```

---

- [ ] **Step 4: Phase 2 Checkpoint — run all tests**

Run: `npx vitest run src/components/core/`
Expected: ALL PASS

---

## Phase 3: Radix Components (Category C)

### Task 14: KdsModal / KdsBottomSheet

**Files:**
- Rewrite: `src/components/core/KdsModal/KdsModal.tsx`
- Rewrite: `src/components/core/KdsModal/index.ts`
- Create: `src/components/core/KdsModal/KdsModal.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/core/KdsModal/KdsModal.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsModal } from './KdsModal';

describe('KdsModal', () => {
  it('renders nothing when closed', () => {
    render(<KdsModal open={false} onClose={vi.fn()} title="Test">Content</KdsModal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(<KdsModal open={true} onClose={vi.fn()} title="Test">Content</KdsModal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies BeerCSS bottom-sheet classes', () => {
    render(<KdsModal open={true} onClose={vi.fn()} title="T">C</KdsModal>);
    expect(screen.getByRole('dialog')).toHaveClass('kds-bottom-sheet');
  });

  it('renders actions when provided', () => {
    render(
      <KdsModal open={true} onClose={vi.fn()} title="T"
        actions={<button>Confirm</button>}>
        C
      </KdsModal>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn();
    render(<KdsModal open={true} onClose={onClose} title="T">C</KdsModal>);
    // Radix Dialog overlay click triggers onClose
    const overlay = document.querySelector('.kds-bottom-sheet-scrim');
    if (overlay) await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/components/core/KdsModal/KdsModal.test.tsx`

- [ ] **Step 3: Implement KdsModal with Radix Dialog**

Rewrite `src/components/core/KdsModal/KdsModal.tsx`:

```tsx
import React, { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from '../utils';

export interface KdsModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const KdsModal = forwardRef<HTMLDivElement, KdsModalProps>(
  ({ open, onClose, title, description, actions, children, className }, ref) => (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="kds-bottom-sheet-scrim" />
        <Dialog.Content ref={ref} className={clsx('kds-bottom-sheet', className)}>
          <div className="kds-bottom-sheet-grabber" />
          {title && <Dialog.Title className="kds-bottom-sheet-title">{title}</Dialog.Title>}
          {description && <Dialog.Description className="kds-bottom-sheet-description">{description}</Dialog.Description>}
          {children}
          {actions && <div className="kds-bottom-sheet-actions">{actions}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
KdsModal.displayName = 'KdsModal';
```

- [ ] **Step 4: Update barrel, run tests, commit**

Rewrite `src/components/core/KdsModal/index.ts`:
```typescript
export { KdsModal, type KdsModalProps } from './KdsModal';
```

Run: `npx vitest run src/components/core/KdsModal/KdsModal.test.tsx`

Commit: `git commit -m "feat: migrate KdsModal to Radix Dialog + kds-bottom-sheet classes"`

---

### Task 15: KdsSelect

- [ ] **Step 1: Write failing tests, implement with Radix Select, commit**

Rewrite `src/components/core/KdsSelect/KdsSelect.tsx` using `@radix-ui/react-select` with BeerCSS field classes. The component renders a `field label border` wrapper with Radix trigger/content inside.

Commit: `git commit -m "feat: migrate KdsSelect to Radix Select + BeerCSS field classes"`

---

### Task 16: KdsTooltip

- [ ] **Step 1: Write failing tests, implement with Radix Tooltip, commit**

Rewrite `src/components/core/KdsTooltip/KdsTooltip.tsx` using `@radix-ui/react-tooltip`. The tooltip content gets `kds-tooltip` class (add to CSS if missing).

Commit: `git commit -m "feat: migrate KdsTooltip to Radix Tooltip"`

---

- [ ] **Step 2: Phase 3 Checkpoint — run all tests**

Run: `npx vitest run src/components/core/`
Expected: ALL PASS

---

## Phase 4: Domain Components (Category D)

### Task 17: Create Domain Component Directory and Initial Components

**Files:**
- Create: `src/components/domain/` directory and all domain components

- [ ] **Step 1: Create KdsBankRow, KdsBankList, KdsQrRow**

Each follows the HTML + `kds-*` pattern. Example KdsBankRow shown in spec (Task 9 of design).

Create under `src/components/domain/`:
- `KdsBankRow/KdsBankRow.tsx` — uses `kds-bank-row` class pattern
- `KdsBankList/KdsBankList.tsx` — container with `kds-bank-list` class
- `KdsQrRow/KdsQrRow.tsx` — uses `kds-qr-row` class pattern

Write tests for each. Commit: `git commit -m "feat: add domain components (BankRow, BankList, QrRow)"`

---

- [ ] **Step 2: Create KdsBankModal (reuses Radix Dialog)**

`src/components/domain/KdsBankModal/KdsBankModal.tsx` — builds on `@radix-ui/react-dialog` with `kds-bank-modal` classes, search input, bank list inside.

Test, commit: `git commit -m "feat: add KdsBankModal with search and Radix Dialog"`

---

- [ ] **Step 3: Create KdsCardSelector, KdsCardPlan**

Each renders its respective BeerCSS class pattern. `KdsCardSelector` uses `kds-card-selector` with `selected` state. `KdsCardPlan` uses `kds-card-plan` with `recommended` badge.

Test, commit: `git commit -m "feat: add KdsCardSelector and KdsCardPlan components"`

---

- [ ] **Step 4: Create remaining domain components**

Create:
- `KdsInvoiceSticky/` — `kds-invoice-sticky` wrapper
- `KdsBottomSheet/` — Radix Dialog variant with `kds-bottom-sheet` classes (shares Modal logic)
- `KdsSecureFooter/` — `kds-secure-footer` wrapper
- `KdsRecapList/` — `kds-recap-list` with key/value items

Test, commit: `git commit -m "feat: add remaining domain components (InvoiceSticky, BottomSheet, SecureFooter, RecapList)"`

---

- [ ] **Step 5: Create domain barrel export**

Create `src/components/domain/index.ts`:

```typescript
export { KdsBankRow, type KdsBankRowProps } from './KdsBankRow';
export { KdsBankList, type KdsBankListProps } from './KdsBankList';
export { KdsBankModal, type KdsBankModalProps } from './KdsBankModal';
export { KdsQrRow, type KdsQrRowProps } from './KdsQrRow';
export { KdsCardSelector, type KdsCardSelectorProps } from './KdsCardSelector';
export { KdsCardPlan, type KdsCardPlanProps } from './KdsCardPlan';
export { KdsInvoiceSticky, type KdsInvoiceStickyProps } from './KdsInvoiceSticky';
export { KdsBottomSheet, type KdsBottomSheetProps } from './KdsBottomSheet';
export { KdsSecureFooter } from './KdsSecureFooter';
export { KdsRecapList, type KdsRecapListProps } from './KdsRecapList';
```

Commit: `git commit -m "feat: add domain component barrel export"`

---

- [ ] **Step 6: Phase 4 Checkpoint — run all tests**

Run: `npx vitest run src/components/`
Expected: ALL PASS

---

## Phase 5: Cleanup and Final Integration

### Task 18: Update Main Exports

**Files:**
- Rewrite: `src/index.ts`
- Rewrite: `src/components/core/index.ts`

- [ ] **Step 1: Rewrite core barrel export**

Rewrite `src/components/core/index.ts` to export all migrated components (remove old MUI-specific types like `KdsButtonColor`, add new components like `KdsDivider`, `KdsStepper`, etc.).

- [ ] **Step 2: Rewrite main index.ts**

Rewrite `src/index.ts`:

```typescript
/**
 * Khipu Design System
 *
 * A comprehensive design system for the Khipu payment platform.
 * Built with TypeScript, React, and BeerCSS.
 *
 * IMPORTANT: Consumers must load the CSS bundle:
 *   import '@khipu/design-system/beercss/css';
 */

// Theme
export { KdsThemeProvider, type KdsThemeProviderProps } from './theme/KdsThemeProvider';

// Design Tokens (unchanged)
export {
  tokens, tokensByMode, colorsByMode,
  colors, fontFamilies, fontWeights, fontSizes, lineHeights,
  letterSpacings, typography, spacing, semanticSpacing,
  borderRadius, shadows, zIndex, transitions, breakpoints,
  type Tokens, type TokensByMode, type Colors,
  type Typography as TypographyTokens, type ThemeMode,
} from './tokens';

// Core Components
export * from './components/core';

// Domain Components
export * from './components/domain';

// Hooks
export {
  useCopyToClipboard,
  useAutoHide,
  useCountdown,
  useTabsKeyboard,
} from './components/core/hooks';

// Utilities
export { clsx, getContrastColor, lighten } from './components/core/utils';
```

- [ ] **Step 3: Commit**

```bash
git add src/index.ts src/components/core/index.ts
git commit -m "feat: rewrite exports for BeerCSS-based components"
```

---

### Task 19: Remove MUI Dependencies

**Files:**
- Modify: `package.json`
- Delete: `src/theme/index.ts`
- Delete: `src/theme/ThemeProvider.tsx`

- [ ] **Step 1: Remove MUI packages**

Run: `npm uninstall @mui/material @mui/icons-material @emotion/react @emotion/styled`

- [ ] **Step 2: Delete old MUI theme files**

```bash
rm src/theme/index.ts src/theme/ThemeProvider.tsx
```

- [ ] **Step 3: Verify build works**

Run: `npm run build`
Expected: Build succeeds without MUI imports

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove MUI/Emotion dependencies, delete old theme files"
```

---

### Task 20: Version Bump and Final Verification

- [ ] **Step 1: Update version in package.json**

Change `"version"` to `"0.2.0-alpha.1"` in `package.json`.

- [ ] **Step 2: Full build verification**

Run: `npm run build && npm run beercss:build`
Expected: Both builds succeed

- [ ] **Step 3: Full test suite**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 4: Type check**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: No errors (or only pre-existing ones)

- [ ] **Step 6: Commit**

```bash
git add package.json
git commit -m "chore: bump version to 0.2.0-alpha.1 (breaking: MUI removed)"
```

---

## Summary

| Phase | Tasks | Components | Commits |
|-------|-------|------------|---------|
| 0: Setup | 1-5 | 0 (infra) | 5 |
| 1: Cat. A | 6-11 | ~16 | ~12 |
| 2: Cat. B | 12-13 | ~8 | ~5 |
| 3: Cat. C | 14-16 | 3 | 3 |
| 4: Cat. D | 17 | ~10 | 5 |
| 5: Cleanup | 18-20 | 0 (infra) | 3 |
| **Total** | **20 tasks** | **~37 components** | **~33 commits** |
