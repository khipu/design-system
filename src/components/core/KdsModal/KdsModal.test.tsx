import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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

  it('applies kds-bottom-sheet class', () => {
    render(<KdsModal open={true} onClose={vi.fn()} title="T">C</KdsModal>);
    expect(screen.getByRole('dialog')).toHaveClass('kds-bottom-sheet');
  });

  it('renders footer/actions when provided', () => {
    render(
      <KdsModal open={true} onClose={vi.fn()} title="T"
        footer={<button>Confirm</button>}>
        C
      </KdsModal>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});
