import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsRecapList } from './KdsRecapList';

describe('KdsRecapList', () => {
  const items = [
    { label: 'Monto', value: '$10.000' },
    { label: 'Banco', value: 'Banco Estado' },
  ];

  it('renders dt/dd pairs with kds-recap-list class', () => {
    const { container } = render(<KdsRecapList items={items} />);
    const dl = container.querySelector('dl');
    expect(dl).toHaveClass('kds-recap-list');

    const terms = container.querySelectorAll('dt');
    const descriptions = container.querySelectorAll('dd');
    expect(terms).toHaveLength(2);
    expect(descriptions).toHaveLength(2);
    expect(terms[0]).toHaveTextContent('Monto');
    expect(descriptions[0]).toHaveTextContent('$10.000');
    expect(terms[1]).toHaveTextContent('Banco');
    expect(descriptions[1]).toHaveTextContent('Banco Estado');
  });

  it('wraps each pair in a kds-recap-item div', () => {
    const { container } = render(<KdsRecapList items={items} />);
    const wrappers = container.querySelectorAll('.kds-recap-item');
    expect(wrappers).toHaveLength(2);
  });

  it('renders empty list when items is empty', () => {
    const { container } = render(<KdsRecapList items={[]} />);
    expect(container.querySelector('dl')).toHaveClass('kds-recap-list');
    expect(container.querySelectorAll('dt')).toHaveLength(0);
  });

  it('supports ReactNode values', () => {
    render(
      <KdsRecapList
        items={[{ label: 'Estado', value: <strong>Aprobado</strong> }]}
      />,
    );
    expect(screen.getByText('Aprobado').tagName).toBe('STRONG');
  });

  it('merges custom className', () => {
    const { container } = render(<KdsRecapList items={[]} className="custom" />);
    expect(container.querySelector('dl')).toHaveClass('kds-recap-list', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDListElement | null };
    render(<KdsRecapList ref={ref} items={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLDListElement);
  });
});
