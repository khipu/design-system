import type { Meta, StoryObj } from '@storybook/react';
import { KdsNavbar } from './KdsNavbar';

/**
 * KdsNavbar — barra superior del panel sobre las clases existentes (mismo markup que
 * `_materialNavbar.gsp` de payment).
 *
 * - `variant="primary"`: barra en color de marca (panel logueado). `variant="surface"`:
 *   barra clara con borde inferior (páginas sin sesión).
 * - `onMenuClick` agrega la hamburguesa (`.kds-hamburger-btn`, visible solo ≤ 768px) con
 *   `aria-expanded` (`menuOpen`) y `aria-controls` (`menuControls`, el `id` de la sidebar).
 * - `children` van a la derecha, después del espaciador `.max`.
 *
 * Ver `KdsSidebar → Panel completo` para la composición con sidebar y footer.
 *
 * @css nav.primary, nav.surface.secondary-nav-border, .kds-container-center, .kds-hamburger-btn, .kds-navbar-brand, .max
 */
const meta: Meta<typeof KdsNavbar> = {
  title: 'Domain/Layout/KdsNavbar',
  component: KdsNavbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof KdsNavbar>;

/** Panel logueado: barra primary con hamburguesa (mobile) y una acción a la derecha. */
export const Primary: Story = {
  args: {
    brand: <strong>khipu</strong>,
    onMenuClick: () => undefined,
    menuOpen: false,
    menuControls: 'material-sidebar',
    children: (
      <a className="chip" href="#admin">
        <i className="material-symbols-outlined" aria-hidden="true">admin_panel_settings</i>
        <span>Administración</span>
      </a>
    ),
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<nav class="primary no-margin">
  <div class="kds-container-center">
    <button type="button" class="kds-hamburger-btn" aria-label="Menú"
            aria-expanded="false" aria-controls="material-sidebar">
      <i class="material-symbols-outlined" aria-hidden="true">menu</i>
    </button>
    <a href="/" class="kds-navbar-brand"><img src="logo-white.svg" width="80" alt="Khipu"/></a>
    <div class="max"></div>
    <a class="chip" href="/admin">…</a>
  </div>
</nav>

<!-- GSP (payment, layouts/_materialNavbar.gsp): mismo markup; sumar aria-expanded y
     aria-controls a la hamburguesa -->
<nav class="primary no-margin">
  <div class="kds-container-center">
    <g:if test="\${effectiveSideMenu}">
      <button class="kds-hamburger-btn" aria-label="\${g.message(code: 'menuEntry.menu.label')}"
              aria-expanded="false" aria-controls="material-sidebar">
        <i class="material-symbols-outlined" aria-hidden="true">menu</i>
      </button>
    </g:if>
    <a href="\${createLink(uri: '/')}" class="kds-navbar-brand">
      <asset:image src="logo/logo-white.svg" width="80" alt="Khipu"/>
    </a>
    <div class="max"></div>
  </div>
</nav>`,
      },
    },
  },
};

/** Sin sesión: barra clara, sin hamburguesa. */
export const Surface: Story = {
  args: { variant: 'surface', brand: <strong>khipu</strong> },
};
