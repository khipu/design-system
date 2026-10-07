import { renderHook, act, render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import css from '../../../beercss/customizations/khipu-components.css?raw';
import { useExpandToggle } from './useExpandToggle';

function Probe() {
  const detail = useExpandToggle();
  return (
    <div>
      <button data-testid="tgl" {...detail.getToggleProps()}>
        toggle
      </button>
      <div data-testid="pnl" {...detail.getPanelProps()}>
        <a href="#attachment">attachment</a>
      </div>
    </div>
  );
}

describe('useExpandToggle', () => {
  it('starts closed and links toggle/panel via aria-controls/id', () => {
    const { result } = renderHook(() => useExpandToggle());
    const toggle = result.current.getToggleProps();
    const panel = result.current.getPanelProps();

    expect(result.current.open).toBe(false);
    expect(toggle.type).toBe('button');
    expect(toggle['aria-expanded']).toBe(false);
    expect(toggle['aria-controls']).toBe(panel.id);
    expect(panel.className).toBe('kds-expand-panel');
  });

  it('toggles open state and reflects it in the prop-getters', () => {
    const { result } = renderHook(() => useExpandToggle());

    act(() => result.current.toggle());

    expect(result.current.open).toBe(true);
    expect(result.current.getToggleProps()['aria-expanded']).toBe(true);
    expect(result.current.getPanelProps().className).toBe('kds-expand-panel open');
  });

  it('respects a custom base className and defaultOpen', () => {
    const { result } = renderHook(() => useExpandToggle({ defaultOpen: true }));
    expect(result.current.getPanelProps('my-panel').className).toBe('my-panel open');
  });

  it('is controlled when open is provided', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useExpandToggle({ open: false, onOpenChange }));

    act(() => result.current.toggle());

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(result.current.open).toBe(false);
  });

  it('closes imperatively through setOpen (sticky header collapse)', () => {
    const { result } = renderHook(() => useExpandToggle({ defaultOpen: true }));

    act(() => result.current.setOpen(false));

    expect(result.current.open).toBe(false);
    expect(result.current.getPanelProps().className).toBe('kds-expand-panel');
  });

  it('never sets the hidden attribute, so the global [hidden] rule cannot cut the transition', () => {
    const { getByTestId } = render(<Probe />);
    const panel = getByTestId('pnl');

    expect(panel.hasAttribute('hidden')).toBe(false);
    fireEvent.click(getByTestId('tgl'));
    expect(panel.hasAttribute('hidden')).toBe(false);
    fireEvent.click(getByTestId('tgl'));
    expect(panel.hasAttribute('hidden')).toBe(false);
  });

  it('sizes the panel max-height from scrollHeight on open and clears it on close', () => {
    const { getByTestId } = render(<Probe />);
    const panel = getByTestId('pnl');
    Object.defineProperty(panel, 'scrollHeight', { configurable: true, value: 120 });

    // Closed: no inline cap — the CSS `max-height: 0` rule owns the state.
    expect(panel.style.maxHeight).toBe('');

    fireEvent.click(getByTestId('tgl'));
    expect(panel.className).toBe('kds-expand-panel open');
    expect(panel.style.maxHeight).toBe('120px');

    fireEvent.click(getByTestId('tgl'));
    // Closed again: inline cleared so the collapse animates via CSS.
    expect(panel.className).toBe('kds-expand-panel');
    expect(panel.style.maxHeight).toBe('');
  });
});

describe('.kds-expand-panel CSS contract', () => {
  const rule = (selector: string) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = css.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`));
    return match?.[1] ?? '';
  };

  it('hides the collapsed panel with a delayed visibility instead of display', () => {
    const base = rule('.kds-expand-panel');
    expect(base).toMatch(/max-height:\s*0/);
    expect(base).toMatch(/visibility:\s*hidden/);
    expect(base).toMatch(/visibility 0s linear 0\.28s/);
    expect(base).not.toMatch(/display:\s*none/);
  });

  it('shows the open panel immediately', () => {
    const open = rule('.kds-expand-panel.open');
    expect(open).toMatch(/visibility:\s*visible/);
    expect(open).toMatch(/transition-delay:\s*0s/);
  });

  it('keeps the global [hidden] rule (buttons with hidden take no space)', () => {
    expect(rule('[hidden]')).toMatch(/display:\s*none\s*!important/);
  });
});
