import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsBankModal } from './KdsBankModal';

describe('KdsBankModal', () => {
  it('renders title when open', () => {
    render(
      <KdsBankModal open onClose={() => {}}>
        <div>Bank list</div>
      </KdsBankModal>,
    );
    expect(screen.getByText('Selecciona tu banco')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(
      <KdsBankModal open onClose={() => {}} title="Elige un banco">
        <div>Content</div>
      </KdsBankModal>,
    );
    expect(screen.getByText('Elige un banco')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(
      <KdsBankModal open onClose={() => {}}>
        <div>Content</div>
      </KdsBankModal>,
    );
    expect(screen.getByPlaceholderText('Buscar banco...')).toBeInTheDocument();
  });

  it('renders custom search placeholder', () => {
    render(
      <KdsBankModal open onClose={() => {}} searchPlaceholder="Buscar...">
        <div>Content</div>
      </KdsBankModal>,
    );
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('renders children in modal body', () => {
    render(
      <KdsBankModal open onClose={() => {}}>
        <div>Bank A</div>
        <div>Bank B</div>
      </KdsBankModal>,
    );
    expect(screen.getByText('Bank A')).toBeInTheDocument();
    expect(screen.getByText('Bank B')).toBeInTheDocument();
  });

  it('calls onSearch when typing in search input', async () => {
    const onSearch = vi.fn();
    render(
      <KdsBankModal open onClose={() => {}} onSearch={onSearch}>
        <div>Content</div>
      </KdsBankModal>,
    );
    const input = screen.getByPlaceholderText('Buscar banco...');
    await userEvent.type(input, 'Ban');
    expect(onSearch).toHaveBeenCalledWith('B');
    expect(onSearch).toHaveBeenCalledWith('Ba');
    expect(onSearch).toHaveBeenCalledWith('Ban');
  });

  it('renders close button with aria-label', () => {
    render(
      <KdsBankModal open onClose={() => {}}>
        <div>Content</div>
      </KdsBankModal>,
    );
    expect(screen.getByLabelText('Cerrar')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <KdsBankModal open onClose={onClose}>
        <div>Content</div>
      </KdsBankModal>,
    );
    await userEvent.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has kds-bank-modal class', () => {
    render(
      <KdsBankModal open onClose={() => {}}>
        <div>Content</div>
      </KdsBankModal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('kds-bank-modal');
  });

  it('applies custom className', () => {
    render(
      <KdsBankModal open onClose={() => {}} className="custom-class">
        <div>Content</div>
      </KdsBankModal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('kds-bank-modal', 'custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <KdsBankModal ref={ref} open onClose={() => {}}>
        <div>Content</div>
      </KdsBankModal>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
