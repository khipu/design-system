import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { KdsConsentCard, type KdsConsentSection } from './KdsConsentCard';

const SECTIONS: KdsConsentSection[] = [
  {
    title: 'Datos solicitados',
    items: [
      { icon: 'check_circle', text: 'Identidad del titular de la cuenta bancaria' },
      { icon: 'check_circle', text: 'Información de la cuenta bancaria' },
    ],
  },
  { title: 'Vigencia de la autorización', items: [{ icon: 'schedule', text: '12 meses (revocable)' }] },
  {
    title: 'Finalidad',
    items: [{ text: 'Validación de datos bancarios' }, { text: 'Evaluación de riesgo de tu negocio' }],
  },
];

const renderCard = (props: Partial<React.ComponentProps<typeof KdsConsentCard>> = {}) =>
  render(
    <KdsConsentCard
      requester="Khipu"
      resource="BCI"
      subtitle="Revisa la información solicitada para autorizar o rechazar su uso"
      sections={SECTIONS}
      onAccept={() => undefined}
      onReject={() => undefined}
      {...props}
    />,
  );

describe('KdsConsentCard', () => {
  it('renders an elevated card labelled by "<requester> solicita acceso a <resource>"', () => {
    renderCard();
    const card = screen.getByRole('region', { name: 'Khipu solicita acceso a BCI' });
    expect(card).toHaveClass('kds-card-elevated', 'kds-consent-card');
    expect(screen.getByRole('heading', { level: 2, name: 'Khipu solicita acceso a BCI' })).toBeInTheDocument();
  });

  it('renders each section as a labelled group with its items; icons are decorative', () => {
    const { container } = renderCard();
    const datos = screen.getByRole('group', { name: 'Datos solicitados' });
    expect(within(datos).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('heading', { level: 3, name: 'Finalidad' })).toBeInTheDocument();
    container
      .querySelectorAll('.kds-consent-card-item i')
      .forEach((i) => expect(i).toHaveAttribute('aria-hidden', 'true'));
    // items without icon render no <i>
    const finalidad = screen.getByRole('group', { name: 'Finalidad' });
    expect(finalidad.querySelector('i')).toBeNull();
  });

  it('calls onAccept / onReject from the actions (default Spanish labels)', () => {
    const onAccept = vi.fn();
    const onReject = vi.fn();
    renderCard({ onAccept, onReject });
    fireEvent.click(screen.getByRole('button', { name: 'Autorizar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rechazar' }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it('while loading, shows the loading label and blocks both actions (no double submit)', () => {
    const onAccept = vi.fn();
    renderCard({ loading: true, onAccept });
    const accept = screen.getByRole('button', { name: /Autorizando/ });
    expect(accept).toBeDisabled();
    expect(accept).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button', { name: 'Rechazar' })).toBeDisabled();
    fireEvent.click(accept);
    expect(onAccept).not.toHaveBeenCalled();
  });

  it('renders the logo slot and custom labels', () => {
    renderCard({
      logo: <img alt="" src="logo.png" />,
      acceptLabel: 'Authorize',
      rejectLabel: 'Decline',
    });
    expect(screen.getByRole('button', { name: 'Authorize' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
    expect(document.querySelector('.kds-consent-card-logo img')).not.toBeNull();
  });
});
