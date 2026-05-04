import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsBottomSheet } from './KdsBottomSheet';

describe('KdsBottomSheet', () => {
  it('renders nothing when closed', () => {
    render(
      <KdsBottomSheet open={false} onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog with kds-bottom-sheet class when open', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('kds-bottom-sheet');
  });

  it('renders grabber bar', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('.kds-bottom-sheet-grabber')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()} title="Sheet Title">
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByText('Sheet Title')).toHaveClass('kds-bottom-sheet-title');
  });

  it('does not render title element when not provided', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('.kds-bottom-sheet-title')).toBeNull();
  });

  it('renders children in body', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        <p>Body content</p>
      </KdsBottomSheet>,
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()} actions={<button>Confirm</button>}>
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Confirm').parentElement).toHaveClass('kds-bottom-sheet-actions');
  });

  it('does not render actions section when not provided', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('.kds-bottom-sheet-actions')).toBeNull();
  });

  it('applies custom className', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()} className="custom">
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('kds-bottom-sheet', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <KdsBottomSheet ref={ref} open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
