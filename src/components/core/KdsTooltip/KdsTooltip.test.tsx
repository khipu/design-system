import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsTooltip } from './KdsTooltip';

describe('KdsTooltip', () => {
  it('renders trigger children', () => {
    render(
      <KdsTooltip content="Tooltip text">
        <button>Hover me</button>
      </KdsTooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip content when open', () => {
    render(
      <KdsTooltip content="Tooltip text" open={true}>
        <button>Hover me</button>
      </KdsTooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    // Radix renders the text in both the visible content and a hidden aria span
    expect(screen.getAllByText('Tooltip text').length).toBeGreaterThanOrEqual(1);
  });

  it('applies kds-tooltip class to content', () => {
    render(
      <KdsTooltip content="Tip" open={true}>
        <button>Btn</button>
      </KdsTooltip>
    );
    // The kds-tooltip class is on the Radix Content wrapper, not the role="tooltip" span.
    // Query the content element by its class directly.
    const contentEl = document.querySelector('.kds-tooltip');
    expect(contentEl).toBeInTheDocument();
  });
});
