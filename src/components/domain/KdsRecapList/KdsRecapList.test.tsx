import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsRecapList } from './KdsRecapList';

describe('KdsRecapList', () => {
  const items = [
    { label: 'Monto', value: '$10.000' },
    { label: 'Banco', value: 'Banco Estado' },
  ];

  it('renders all items with kds-recap-list class', () => {
    const { container } = render(<KdsRecapList items={items} />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('kds-recap-list');
    const lis = container.querySelectorAll('li');
    expect(lis).toHaveLength(2);
  });

  it('renders label with k class and value with v class', () => {
    render(<KdsRecapList items={items} />);
    expect(screen.getByText('Monto')).toHaveClass('k');
    expect(screen.getByText('$10.000')).toHaveClass('v');
  });

  it('renders placeholder with placeholder class when value is missing', () => {
    render(
      <KdsRecapList items={[{ label: 'Email', placeholder: 'Sin email' }]} />,
    );
    const placeholderEl = screen.getByText('Sin email');
    expect(placeholderEl).toHaveClass('v', 'placeholder');
  });

  it('renders dash when both value and placeholder are missing', () => {
    render(<KdsRecapList items={[{ label: 'Dato' }]} />);
    expect(screen.getByText('-')).toHaveClass('v');
  });

  it('does not apply placeholder class when value is present', () => {
    render(
      <KdsRecapList items={[{ label: 'Dato', value: 'Algo', placeholder: 'N/A' }]} />,
    );
    const valueEl = screen.getByText('Algo');
    expect(valueEl).toHaveClass('v');
    expect(valueEl).not.toHaveClass('placeholder');
  });

  it('renders empty list when items is empty', () => {
    const { container } = render(<KdsRecapList items={[]} />);
    expect(container.querySelector('ul')).toHaveClass('kds-recap-list');
    expect(container.querySelectorAll('li')).toHaveLength(0);
  });

  it('merges custom className', () => {
    const { container } = render(<KdsRecapList items={[]} className="custom" />);
    expect(container.querySelector('ul')).toHaveClass('kds-recap-list', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLUListElement | null };
    render(<KdsRecapList ref={ref} items={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });
});
