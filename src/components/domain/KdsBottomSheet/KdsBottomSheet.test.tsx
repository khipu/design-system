import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('variant="dialog" marks the sheet and the scrim', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()} variant="dialog">
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('kds-bottom-sheet', 'kds-bottom-sheet--dialog');
    expect(dialog.parentElement).toHaveClass('kds-bottom-sheet-scrim', 'open', 'kds-bottom-sheet-scrim--dialog');
  });

  it('align="center" centers the dialog variant only', () => {
    const { rerender } = render(
      <KdsBottomSheet open onClose={vi.fn()} variant="dialog" align="center">
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('kds-bottom-sheet--center');
    rerender(
      <KdsBottomSheet open onClose={vi.fn()} align="center">
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByRole('dialog')).not.toHaveClass('kds-bottom-sheet--center');
  });

  it('renders the icon above the title and the hint above the actions', () => {
    render(
      <KdsBottomSheet
        open
        onClose={vi.fn()}
        title="Validando"
        icon={<span data-testid="loader" />}
        hint="No cierres esta ventana."
        actions={<button type="button">Validando…</button>}
      >
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    const icon = dialog.querySelector('.kds-bottom-sheet-icon');
    expect(icon).toContainElement(screen.getByTestId('loader'));
    expect(icon?.nextElementSibling).toHaveClass('kds-bottom-sheet-title');
    const hint = screen.getByText('No cierres esta ventana.');
    expect(hint).toHaveClass('kds-bottom-sheet-hint');
    expect(hint.nextElementSibling).toHaveClass('kds-bottom-sheet-actions');
  });

  it('renders no icon or hint slot by default', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('.kds-bottom-sheet-icon')).toBeNull();
    expect(dialog.querySelector('.kds-bottom-sheet-hint')).toBeNull();
  });

  it('is a plain sheet by default', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveClass('kds-bottom-sheet--dialog');
    expect(dialog.parentElement).not.toHaveClass('kds-bottom-sheet-scrim--dialog');
  });

  it('keeps the auto height by default', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()}>
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByRole('dialog')).not.toHaveClass('kds-bottom-sheet-full');
  });

  it('applies the full height variant with size="full"', () => {
    render(
      <KdsBottomSheet open onClose={vi.fn()} size="full" className="custom">
        Content
      </KdsBottomSheet>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('kds-bottom-sheet', 'kds-bottom-sheet-full', 'custom');
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

  describe('dismissible', () => {
    it('closes with Escape by default', () => {
      const onClose = vi.fn();
      render(
        <KdsBottomSheet open onClose={onClose} title="Continúa en tu banco">
          Content
        </KdsBottomSheet>,
      );
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('dismissible={false} ignores Escape and outside clicks', () => {
      const onClose = vi.fn();
      render(
        <KdsBottomSheet open onClose={onClose} dismissible={false} title="Validando información">
          Content
        </KdsBottomSheet>,
      );
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      fireEvent.pointerDown(document.body);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('dismissible={false} hides the grabber and the close button', () => {
      render(
        <KdsBottomSheet open onClose={vi.fn()} dismissible={false} showCloseButton>
          Content
        </KdsBottomSheet>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.querySelector('.kds-bottom-sheet-grabber')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull();
    });
  });
});
