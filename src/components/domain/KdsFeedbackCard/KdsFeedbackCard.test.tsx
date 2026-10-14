import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { KdsFeedbackCard } from './KdsFeedbackCard';

const base = {
  title: 'Cuéntanos cómo nos conociste',
  description: 'Nos ayuda a mejorar cómo llegamos a nuevos clientes.',
};

describe('KdsFeedbackCard', () => {
  it('renders an optional, labelled card with icon, title, description, control and submit', () => {
    const { container } = render(
      <KdsFeedbackCard {...base} canSubmit={false} onSubmit={() => undefined}>
        <select aria-label="¿Cómo nos conociste?" />
      </KdsFeedbackCard>,
    );
    const card = screen.getByRole('region', { name: base.title });
    expect(card).toHaveClass('kds-feedback-card');
    expect(card).toHaveAttribute('aria-live', 'polite');
    expect(container.querySelector('.kds-feedback-card-icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText(base.description)).toHaveClass('kds-feedback-card-description');
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('disables submit until canSubmit, then calls onSubmit', () => {
    const onSubmit = vi.fn();
    const { rerender } = render(
      <KdsFeedbackCard {...base} canSubmit={false} onSubmit={onSubmit} />,
    );
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
    rerender(<KdsFeedbackCard {...base} canSubmit onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('switches to the thank-you state when submitted, in the same live region', () => {
    const { rerender, container } = render(
      <KdsFeedbackCard {...base} canSubmit onSubmit={() => undefined}>
        <select aria-label="Opción" />
      </KdsFeedbackCard>,
    );
    const card = container.firstElementChild;
    rerender(
      <KdsFeedbackCard {...base} canSubmit onSubmit={() => undefined} submitted>
        <select aria-label="Opción" />
      </KdsFeedbackCard>,
    );
    expect(container.firstElementChild).toBe(card);
    expect(card).toHaveClass('kds-feedback-card--submitted');
    expect(screen.getByText('¡Gracias por contarnos!')).toHaveClass('kds-feedback-card-title');
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('moves focus to the thank-you title on submit (the focused button unmounts)', () => {
    const { rerender } = render(<KdsFeedbackCard {...base} canSubmit onSubmit={() => undefined} />);
    screen.getByRole('button', { name: 'Enviar' }).focus();
    rerender(<KdsFeedbackCard {...base} canSubmit onSubmit={() => undefined} submitted />);
    expect(screen.getByText('¡Gracias por contarnos!')).toHaveFocus();
  });

  it('does not steal focus when it is rendered already submitted', () => {
    render(<KdsFeedbackCard {...base} canSubmit onSubmit={() => undefined} submitted />);
    expect(screen.getByText('¡Gracias por contarnos!')).not.toHaveFocus();
  });

  it('accepts custom submit and thank-you texts and icon', () => {
    render(
      <KdsFeedbackCard
        {...base}
        icon="campaign"
        submitLabel="Send"
        thanksTitle="Thanks!"
        thanksDescription="It helps."
        canSubmit
        onSubmit={() => undefined}
      />,
    );
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    expect(screen.getByText('campaign')).toBeInTheDocument();
  });
});
