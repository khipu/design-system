import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { KdsFooter, type KdsFooterColumn } from './KdsFooter';

const COLUMNS: KdsFooterColumn[] = [
  {
    title: 'Productos',
    links: [
      { label: 'Pagos Instantáneos', href: 'https://www.khipu.com/page/product/pagos-instantaneos', external: true },
      { label: 'Estado del servicio', href: 'https://status.khipu.com/', external: true },
    ],
  },
  { title: 'Desarrolladores', links: [{ label: 'APIs', href: '/docs' }] },
];

describe('KdsFooter', () => {
  it('renders payment\'s footer markup: footer.primary > container > grid of columns', () => {
    const { container } = render(<KdsFooter columns={COLUMNS} />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('primary');
    expect(footer?.firstElementChild).toHaveClass('kds-container-center');
    const cols = container.querySelectorAll('.kds-grid > div');
    expect(cols).toHaveLength(2);
    expect(cols[0]).toHaveClass('kds-col-sm-12', 'kds-col-md-6', 'kds-col-lg-2');
    expect(screen.getByRole('heading', { name: 'Productos' })).toHaveClass('kds-text-center');
  });

  it('each column is a nav.kds-footer-nav named by its title', () => {
    render(<KdsFooter columns={COLUMNS} />);
    const nav = screen.getByRole('navigation', { name: 'Productos' });
    expect(nav).toHaveClass('kds-footer-nav');
    expect(within(nav).getAllByRole('link')).toHaveLength(2);
  });

  it('external links open in a new tab safely', () => {
    render(<KdsFooter columns={COLUMNS} />);
    const ext = screen.getByRole('link', { name: 'Pagos Instantáneos' });
    expect(ext).toHaveAttribute('target', '_blank');
    expect(ext).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: 'APIs' })).not.toHaveAttribute('target');
  });

  it('renders children after the grid (social links, addresses, copyright)', () => {
    const { container } = render(
      <KdsFooter columns={COLUMNS}>
        <p className="small">© 2026 Khipu</p>
      </KdsFooter>,
    );
    expect(container.querySelector('.kds-grid')?.nextElementSibling).toHaveTextContent('© 2026 Khipu');
  });
});
