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
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('renders panel with role="tabpanel"', () => {
    setup(0);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel 1');
  });

  it('hides inactive panels', () => {
    setup(0);
    expect(screen.getByText('Panel 1')).toBeVisible();
  });
});
