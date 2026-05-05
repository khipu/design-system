import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSegmentedTabs } from './KdsSegmentedTabs';
import { KdsTab } from '../KdsTabs/KdsTabs';

describe('KdsSegmentedTabs', () => {
  it('renders with kds-segmented-tabs class', () => {
    render(
      <KdsSegmentedTabs activeIndex={0} onChange={vi.fn()}>
        <KdsTab>Tab 1</KdsTab>
        <KdsTab>Tab 2</KdsTab>
      </KdsSegmentedTabs>
    );
    expect(screen.getByRole('tablist')).toHaveClass('kds-segmented-tabs');
  });

  it('renders as tablist', () => {
    render(
      <KdsSegmentedTabs activeIndex={0} onChange={vi.fn()}>
        <KdsTab>Tab 1</KdsTab>
      </KdsSegmentedTabs>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('sets --_tab-count and --_active-idx CSS custom properties', () => {
    render(
      <KdsSegmentedTabs activeIndex={1} onChange={vi.fn()}>
        <KdsTab>Tab 1</KdsTab>
        <KdsTab>Tab 2</KdsTab>
        <KdsTab>Tab 3</KdsTab>
      </KdsSegmentedTabs>
    );
    const tablist = screen.getByRole('tablist');
    expect(tablist.style.getPropertyValue('--_tab-count')).toBe('3');
    expect(tablist.style.getPropertyValue('--_active-idx')).toBe('1');
  });
});
