import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { KdsProgressChecklist, type KdsProgressChecklistItem } from './KdsProgressChecklist';

const ITEMS: KdsProgressChecklistItem[] = [
  { label: 'Datos de la empresa', status: 'done' },
  { label: 'Representante legal', status: 'active' },
  { label: 'Evaluación de riesgo', status: 'pending' },
];

describe('KdsProgressChecklist', () => {
  it('renders a polite live list with one item per entry and its status class', () => {
    render(<KdsProgressChecklist items={ITEMS} />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('kds-progress-checklist');
    expect(list).toHaveAttribute('aria-live', 'polite');
    const items = within(list).getAllByRole('listitem');
    expect(items.map((i) => i.className)).toEqual([
      'kds-progress-checklist-item kds-progress-checklist-item--done',
      'kds-progress-checklist-item kds-progress-checklist-item--active',
      'kds-progress-checklist-item kds-progress-checklist-item--pending',
    ]);
  });

  it('marks the active item with aria-current="step"', () => {
    render(<KdsProgressChecklist items={ITEMS} />);
    const [done, active, pending] = screen.getAllByRole('listitem');
    expect(active).toHaveAttribute('aria-current', 'step');
    expect(done).not.toHaveAttribute('aria-current');
    expect(pending).not.toHaveAttribute('aria-current');
  });

  it('renders a check for done, dots for active, an error icon for error and a dot for pending', () => {
    const { container } = render(
      <KdsProgressChecklist items={[...ITEMS, { label: 'Firma', status: 'error' }]} />,
    );
    const marks = container.querySelectorAll('.kds-progress-checklist-mark');
    expect(marks[0]).toHaveTextContent('check');
    expect(marks[1].querySelector('.kds-dots-loader')).not.toBeNull();
    expect(marks[2].querySelector('.kds-progress-checklist-dot')).not.toBeNull();
    expect(marks[3]).toHaveTextContent('error');
    marks.forEach((m) => expect(m).toHaveAttribute('aria-hidden', 'true'));
  });

  it('exposes each status as text for screen readers (Spanish defaults)', () => {
    render(<KdsProgressChecklist items={[...ITEMS, { label: 'Firma', status: 'error' }]} />);
    const items = screen.getAllByRole('listitem');
    const spoken = (li: HTMLElement) =>
      `${li.querySelector('.kds-progress-checklist-label')!.textContent}${
        li.querySelector('.kds-progress-checklist-status')!.textContent
      }`;
    expect(items.map(spoken)).toEqual([
      'Datos de la empresa: listo',
      'Representante legal: en curso',
      'Evaluación de riesgo: pendiente',
      'Firma: con error',
    ]);
  });

  it('accepts custom status labels for i18n', () => {
    render(
      <KdsProgressChecklist
        items={[{ label: 'Company data', status: 'done' }]}
        statusLabels={{ done: 'done' }}
      />,
    );
    expect(screen.getByText(': done')).toHaveClass('kds-progress-checklist-status');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLUListElement | null };
    render(<KdsProgressChecklist ref={ref} items={ITEMS} className="custom" />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
    expect(ref.current).toHaveClass('kds-progress-checklist', 'custom');
  });
});
