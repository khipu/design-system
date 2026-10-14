import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { KdsNavbar } from './KdsNavbar';

describe('KdsNavbar', () => {
  it('renders payment\'s primary navbar markup with the brand link', () => {
    const { container } = render(
      <KdsNavbar brand={<img alt="Khipu" src="logo-white.svg" />} brandHref="/" />,
    );
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('primary', 'no-margin');
    expect(nav?.firstElementChild).toHaveClass('kds-container-center');
    const brand = screen.getByRole('link', { name: 'Khipu' });
    expect(brand).toHaveClass('kds-navbar-brand');
    expect(brand).toHaveAttribute('href', '/');
    expect(container.querySelector('.max')).not.toBeNull();
  });

  it('surface variant matches the logged-out navbar', () => {
    const { container } = render(<KdsNavbar variant="surface" brand="Khipu" />);
    expect(container.querySelector('nav')).toHaveClass('no-margin', 'surface', 'secondary-nav-border');
  });

  it('renders the hamburger only with onMenuClick, wired to the sidebar', () => {
    const onMenuClick = vi.fn();
    const { rerender } = render(<KdsNavbar brand="Khipu" />);
    expect(screen.queryByRole('button')).toBeNull();
    rerender(
      <KdsNavbar brand="Khipu" onMenuClick={onMenuClick} menuOpen={false} menuControls="sidebar" />,
    );
    const btn = screen.getByRole('button', { name: 'Menú' });
    expect(btn).toHaveClass('kds-hamburger-btn');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(btn).toHaveAttribute('aria-controls', 'sidebar');
    fireEvent.click(btn);
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders actions after the spacer', () => {
    render(<KdsNavbar brand="Khipu">{<a href="/admin">Admin</a>}</KdsNavbar>);
    const link = screen.getByRole('link', { name: 'Admin' });
    expect(link.previousElementSibling).toHaveClass('max');
  });
});
