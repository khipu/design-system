import type { Meta, StoryObj } from '@storybook/react';
import { KdsFooter } from './KdsFooter';

/**
 * KdsFooter — footer del panel sobre las clases existentes (mismo markup que
 * `_materialFooter.gsp` de payment): `footer.primary`, `.kds-container-center` y una
 * `.kds-grid` de columnas (12 / 6 / 2 columnas según el ancho), cada una con un `h6` y un
 * `nav.kds-footer-nav` con nombre (su título).
 *
 * - Los links externos abren en otra pestaña con `rel="noopener noreferrer"`.
 * - `children` va debajo de la grilla: redes sociales, direcciones, copyright.
 *
 * @css footer.primary, .kds-container-center, .kds-grid, .kds-col-sm-12, .kds-col-md-6, .kds-col-lg-2, .kds-footer-nav
 */
const meta: Meta<typeof KdsFooter> = {
  title: 'Domain/Layout/KdsFooter',
  component: KdsFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof KdsFooter>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Productos',
        links: [
          { label: 'Pagos Instantáneos', href: 'https://www.khipu.com/page/product/pagos-instantaneos', external: true },
          { label: 'Pagos Automáticos', href: 'https://www.khipu.com/page/product/pagos-automaticos', external: true },
          { label: 'Estado del servicio', href: 'https://status.khipu.com/', external: true },
        ],
      },
      {
        title: 'Desarrolladores',
        links: [{ label: 'APIs', href: 'https://docs.khipu.com/', external: true }],
      },
      {
        title: 'Tarifas',
        links: [
          { label: 'Chile', href: 'https://www.khipu.com/page/tarifas-instantaneos-chile', external: true },
          { label: 'Argentina', href: 'https://www.khipu.com/page/tarifas-instantaneos-argentina', external: true },
        ],
      },
      { title: 'Seguridad', links: [{ label: 'Pagador', href: 'https://www.khipu.com/page/seguridad-pagador', external: true }] },
      { title: 'Empresa', links: [{ label: 'Quiénes somos', href: 'https://www.khipu.com/page/quienes-somos', external: true }] },
      { title: 'Legal', links: [{ label: 'Contrato cobrador', href: 'https://www.khipu.com/page/contrato-cobrador', external: true }] },
    ],
    children: <p className="small kds-text-center">© 2026 Khipu SpA. Todos los derechos reservados.</p>,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<footer class="primary">
  <div class="kds-container-center">
    <div class="kds-grid">
      <div class="kds-col-sm-12 kds-col-md-6 kds-col-lg-2">
        <h6 class="kds-text-center">Productos</h6>
        <nav class="kds-footer-nav" aria-label="Productos">
          <a href="https://www.khipu.com/page/product/pagos-instantaneos" target="_blank" rel="noopener noreferrer">Pagos Instantáneos</a>
        </nav>
      </div>
      <!-- …una columna por sección -->
    </div>
    <p class="small kds-text-center">© 2026 Khipu SpA. Todos los derechos reservados.</p>
  </div>
</footer>

<!-- GSP (payment, layouts/_materialFooter.gsp): mismo markup; sumar aria-label al nav de
     cada columna y rel="noopener noreferrer" a los links externos -->
<div class="kds-col-sm-12 kds-col-md-6 kds-col-lg-2">
  <h6 class="kds-text-center"><g:message code="footer.section.products"/></h6>
  <nav class="kds-footer-nav" aria-label="\${message(code: 'footer.section.products')}">
    <a href="https://www.khipu.com/page/product/pagos-instantaneos" target="_blank" rel="noopener noreferrer">
      <g:message code="footer.products.instant.payments"/>
    </a>
  </nav>
</div>`,
      },
    },
  },
};
