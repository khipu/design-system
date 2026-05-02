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
