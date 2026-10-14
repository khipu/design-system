import { describe, expect, it, vi } from 'vitest';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { KdsSidebar, type KdsSidebarItem } from './KdsSidebar';

const ITEMS: KdsSidebarItem[] = [
  { label: 'Perfil de usuario', href: '/perfil', icon: 'account_circle' },
  { label: 'Cuentas de cobro', href: '/cuentas', icon: 'list', active: true },
  { label: 'Contactos', href: '/contactos', icon: 'favorite' },
];

describe('KdsSidebar', () => {
  it('renders the aside with the header and a labelled nav of items', () => {
    const { container } = render(
      <KdsSidebar
        id="sidebar"
        header={{ title: 'Configurar', subtitle: 'ana.perez@correo.cl', icon: 'settings' }}
        items={ITEMS}
      />,
    );
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('kds-sidebar');
    expect(aside).toHaveAttribute('id', 'sidebar');
    expect(screen.getByText('Configurar')).toHaveClass('kds-sidebar-title');
    expect(screen.getByText('ana.perez@correo.cl')).toHaveClass('kds-sidebar-subtitle');
    const nav = screen.getByRole('navigation', { name: 'Menú de la cuenta' });
    expect(nav).toHaveClass('kds-sidebar-nav');
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach((a) => expect(a).toHaveClass('kds-sidebar-nav-item'));
  });

  it('marks the active item with .active and aria-current="page"', () => {
    render(<KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} />);
    const active = screen.getByRole('link', { name: /Cuentas de cobro/ });
    expect(active).toHaveClass('active');
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Contactos/ })).not.toHaveAttribute('aria-current');
  });

  it('shows an avatar initial when no icon is given; icons are decorative', () => {
    const { container } = render(
      <KdsSidebar header={{ title: 'Cobrar', subtitle: 'Comercial SpA', avatar: 'C' }} items={ITEMS} />,
    );
    expect(container.querySelector('.kds-sidebar-avatar')).toHaveTextContent('C');
    container
      .querySelectorAll('.kds-sidebar-nav-item i')
      .forEach((i) => expect(i).toHaveAttribute('aria-hidden', 'true'));
  });

  it('header menu: a real button toggle controls the dropdown, which is its sibling', () => {
    render(
      <KdsSidebar
        header={{ title: 'Configurar', menu: <a href="/salir">Cerrar sesión</a> }}
        items={ITEMS}
      />,
    );
    const toggle = screen.getByRole('button', { name: 'Configurar' });
    expect(toggle.tagName).toBe('BUTTON');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const dropdown = document.querySelector('.kds-sidebar-header-dropdown')!;
    expect(toggle).toHaveAttribute('aria-controls', dropdown.id);
    expect(toggle.contains(dropdown)).toBe(false);
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(dropdown).toHaveClass('kds-dropdown-open');
  });

  it('Enter on a menu link is not swallowed and Escape closes only the menu', () => {
    const onClose = vi.fn();
    render(
      <KdsSidebar
        header={{ title: 'Configurar', menu: <a href="#salir">Cerrar sesión</a> }}
        items={ITEMS}
        open
        onClose={onClose}
      />,
    );
    const toggle = screen.getByRole('button', { name: 'Configurar' });
    fireEvent.click(toggle);
    const link = screen.getByRole('link', { name: 'Cerrar sesión' });
    const enter = createEvent.keyDown(link, { key: 'Enter' });
    fireEvent(link, enter);
    expect(enter.defaultPrevented).toBe(false);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(link, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('header without menu is not a button', () => {
    render(<KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} />);
    expect(screen.queryByRole('button', { name: /Configurar/ })).toBeNull();
  });

  it('mobile drawer: open adds kds-sidebar-open, focuses close; close button and Escape call onClose', () => {
    const onClose = vi.fn();
    const { container, rerender } = render(
      <KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open={false} onClose={onClose} />,
    );
    expect(container.querySelector('aside')).not.toHaveClass('kds-sidebar-open');
    rerender(<KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open onClose={onClose} />);
    expect(container.querySelector('aside')).toHaveClass('kds-sidebar-open');
    const close = screen.getByRole('button', { name: 'Cerrar menú' });
    expect(close).toHaveFocus();
    fireEvent.click(close);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('returns focus to the opener when the drawer closes', () => {
    const { rerender } = render(
      <>
        <button type="button">Abrir menú</button>
        <KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open={false} />
      </>,
    );
    const opener = screen.getByRole('button', { name: 'Abrir menú' });
    opener.focus();
    rerender(
      <>
        <button type="button">Abrir menú</button>
        <KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveFocus();
    rerender(
      <>
        <button type="button">Abrir menú</button>
        <KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open={false} />
      </>,
    );
    expect(opener).toHaveFocus();
  });

  it('is inert while closed on mobile and not inert on desktop', () => {
    const listeners: Array<() => void> = [];
    let matches = true;
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: (_: string, cb: () => void) => listeners.push(cb),
      removeEventListener: () => undefined,
    })) as unknown as typeof window.matchMedia;
    try {
      const { container, rerender } = render(
        <KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open={false} />,
      );
      const aside = container.querySelector('aside')!;
      expect(aside).toHaveAttribute('inert');
      rerender(<KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open />);
      expect(aside).not.toHaveAttribute('inert');
      rerender(<KdsSidebar header={{ title: 'Configurar' }} items={ITEMS} open={false} />);
      matches = false;
      listeners.forEach((cb) => cb());
      expect(aside).not.toHaveAttribute('inert');
    } finally {
      window.matchMedia = original;
    }
  });
});
