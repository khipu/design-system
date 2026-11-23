import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsDivider } from './KdsDivider';

describe('KdsDivider', () => {
  it('renders solid divider by default', () => {
    const { container } = render(<KdsDivider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('kds-hr');
  });

  it('renders dashed divider when dashed prop is true', () => {
    const { container } = render(<KdsDivider dashed />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveClass('kds-hr-dashed');
  });

  it('renders the centered text variant with a label', () => {
    const { container } = render(<KdsDivider label="o" className="extra" />);
    expect(container.querySelector('hr')).toBeNull();
    const wrapper = container.querySelector('.kds-divider-text');
    expect(wrapper).toHaveClass('extra');
    expect(screen.getByText('o').tagName).toBe('SPAN');
  });

  it('ignores dashed when there is a label', () => {
    const { container } = render(<KdsDivider label="o" dashed />);
    expect(container.querySelector('.kds-hr-dashed')).toBeNull();
    expect(container.querySelector('.kds-divider-text')).not.toBeNull();
  });

  it('falls back to the line with an empty label', () => {
    const { container } = render(<KdsDivider label="" />);
    expect(container.querySelector('hr')).toHaveClass('kds-hr');
  });

  it('points the ref to the wrapper <div> when there is a label', () => {
    const ref = { current: null as HTMLHRElement | null };
    render(<KdsDivider ref={ref} label="o" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('kds-divider-text');
  });
});
