import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsSidebar, type KdsSidebarItem } from './KdsSidebar';
import { KdsNavbar } from '../KdsNavbar';
import { KdsFooter } from '../KdsFooter';

/**
 * KdsSidebar — navegación lateral del panel logueado, sobre las clases `.kds-sidebar*` que ya
 * existían solo en CSS (mismo markup que `_materialSidebar.gsp` + `mat:sidebarHeader` /
 * `mat:sidebarNav` de payment; los ítems van dentro de `nav.kds-sidebar-nav`, como en el demo
 * del DS).
 *
 * - Desktop: card flotante sticky. Mobile (≤ 768px): drawer a pantalla completa controlado
 *   por `open`/`onClose`; al abrir, el foco va al botón cerrar y Escape lo cierra.
 * - `header.menu` convierte el encabezado en un toggle accesible (`role="button"`,
 *   `aria-expanded`, Enter/Espacio/Escape) del selector de contexto flotante.
 * - El ítem activo lleva `.active` y `aria-current="page"`. Íconos decorativos.
 * - En GSP, `khipu-beercss.js` incluye `KhipuSidebar` (dropdown del header, ítem activo y
 *   hamburguesa) para el markup vanilla.
 *
 * @css .kds-sidebar, .kds-sidebar-open, .kds-sidebar-mobile-header, .kds-sidebar-close-btn, .kds-sidebar-header, .kds-sidebar-avatar, .kds-sidebar-header-text, .kds-sidebar-title, .kds-sidebar-subtitle, .kds-sidebar-dropdown-icon, .kds-sidebar-header-dropdown, .kds-sidebar-nav, .kds-sidebar-nav-item
 */
const meta: Meta<typeof KdsSidebar> = {
  title: 'Domain/Layout/KdsSidebar',
  component: KdsSidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof KdsSidebar>;

const ITEMS: KdsSidebarItem[] = [
  { label: 'Perfil de usuario', href: '#perfil', icon: 'account_circle' },
  { label: 'Cuentas de cobro', href: '#cuentas', icon: 'list', active: true },
  { label: 'Contactos', href: '#contactos', icon: 'favorite' },
];

const MENU = (
  <>
    <a href="#pagar" className="kds-sidebar-nav-item">
      <i className="material-symbols-outlined" aria-hidden="true">account_circle</i>
      <span>
        Pagar como <strong>Ana Pérez Ficticia</strong>
      </span>
    </a>
    <div className="divider" />
    <a href="#salir" className="kds-sidebar-nav-item">
      <i className="material-symbols-outlined" aria-hidden="true">logout</i>
      <span>Cerrar sesión</span>
    </a>
  </>
);

/** Sidebar sola, con selector de contexto en el encabezado. */
export const Default: Story = {
  args: {
    header: { title: 'Configurar', subtitle: 'ana.perez@correo.cl', icon: 'settings', menu: MENU },
    items: ITEMS,
  },
  decorators: [
    (Story) => (
      <div className="kds-page-layout">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<aside class="kds-sidebar" id="material-sidebar">
  <div class="kds-sidebar-mobile-header">
    <span>Menú</span>
    <button type="button" class="kds-sidebar-close-btn" aria-label="Cerrar menú">
      <i class="material-symbols-outlined" aria-hidden="true">close</i>
    </button>
  </div>
  <div class="kds-sidebar-header">
    <i class="material-symbols-outlined kds-sidebar-icon" aria-hidden="true">settings</i>
    <div class="kds-sidebar-header-text">
      <div class="kds-sidebar-title">Configurar</div>
      <div class="kds-sidebar-subtitle">ana.perez@correo.cl</div>
    </div>
    <i class="material-symbols-outlined kds-sidebar-dropdown-icon" aria-hidden="true">expand_more</i>
    <div class="kds-sidebar-header-dropdown surface elevate border small-round">
      <a href="/logout" class="kds-sidebar-nav-item">…</a>
    </div>
  </div>
  <nav class="kds-sidebar-nav" aria-label="Menú de la cuenta">
    <a href="/perfil" class="kds-sidebar-nav-item">
      <i class="material-symbols-outlined" aria-hidden="true">account_circle</i>
      <span>Perfil de usuario</span>
    </a>
    <a href="/cuentas" class="kds-sidebar-nav-item active" aria-current="page">
      <i class="material-symbols-outlined" aria-hidden="true">list</i>
      <span>Cuentas de cobro</span>
    </a>
  </nav>
</aside>

<!-- GSP (payment, layouts/_materialSidebar.gsp): ya genera este markup con
     mat:sidebarHeader + mat:sidebarNav; KhipuSidebar (en khipu-beercss.js) maneja el
     dropdown, el ítem activo y la hamburguesa -->
<aside class="kds-sidebar" id="material-sidebar">
  <div class="kds-sidebar-mobile-header">…</div>
  <mat:sidebarHeader sideMenu="\${effectiveSideMenu}"/>
  <nav class="kds-sidebar-nav" aria-label="\${message(code: 'menu.label')}">
    <mat:sidebarNav menu="\${effectiveSideMenu}"/>
  </nav>
</aside>`,
      },
    },
  },
};

/**
 * Panel completo: `KdsNavbar` + `.kds-page-layout` (sidebar + `.kds-main-content`) +
 * `KdsFooter`. Achicá el viewport a ≤ 768px para ver la hamburguesa y el drawer.
 */
export const PanelLayout: Story = {
  name: 'Panel completo (navbar + sidebar + footer)',
  render: function PanelLayoutStory() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <KdsNavbar
          brand={<strong>khipu</strong>}
          onMenuClick={() => setOpen(true)}
          menuOpen={open}
          menuControls="panel-sidebar"
        />
        <div className="kds-page-layout">
          <KdsSidebar
            id="panel-sidebar"
            header={{ title: 'Configurar', subtitle: 'ana.perez@correo.cl', icon: 'settings', menu: MENU }}
            items={ITEMS}
            open={open}
            onClose={() => setOpen(false)}
          />
          <main className="kds-main-content">
            <div className="kds-card-elevated">Contenido de la pantalla (por ejemplo, el onboarding).</div>
          </main>
        </div>
        <KdsFooter
          columns={[
            {
              title: 'Productos',
              links: [
                { label: 'Pagos Instantáneos', href: 'https://www.khipu.com/page/product/pagos-instantaneos', external: true },
                { label: 'Pagos Automáticos', href: 'https://www.khipu.com/page/product/pagos-automaticos', external: true },
              ],
            },
            { title: 'Desarrolladores', links: [{ label: 'APIs', href: 'https://docs.khipu.com/', external: true }] },
            { title: 'Tarifas', links: [{ label: 'Chile', href: 'https://www.khipu.com/page/tarifas-instantaneos-chile', external: true }] },
          ]}
        >
          <p className="small kds-text-center">© 2026 Khipu SpA. Todos los derechos reservados.</p>
        </KdsFooter>
      </div>
    );
  },
};
