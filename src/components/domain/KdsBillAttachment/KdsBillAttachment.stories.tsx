import type { Meta, StoryObj } from '@storybook/react';
import { KdsBillAttachment, KdsBillAttachments } from './KdsBillAttachment';

/**
 * KdsBillAttachment — link de descarga de adjunto + contenedor `KdsBillAttachments`.
 *
 * Patrón canónico: dentro de un `kds-detail-group`:
 * ```html
 * <div class="kds-detail-group">
 *   <dt>Adjuntos</dt>
 *   <dd>
 *     <div class="kds-bill-attachments">
 *       <a class="kds-bill-attachment" href="..." target="_blank" rel="noopener">
 *         <i class="material-symbols-outlined">attach_file</i>
 *         <span>archivo.pdf</span>
 *       </a>
 *     </div>
 *   </dd>
 * </div>
 * ```
 *
 * @gsp `mat:billAttachments` taglib en `MaterialTagLib.groovy`
 */
const meta: Meta<typeof KdsBillAttachment> = {
  title: 'Domain/KdsBillAttachment',
  component: KdsBillAttachment,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Link de descarga de adjunto del bill. `inline-flex`, `width: fit-content`, color `info-main`, font sm/500, icon lg `attach_file`. Hover subraya solo el `<span>`. Renderiza `<a target="_blank" rel="noopener">`. Para múltiples adjuntos usar `KdsBillAttachments` (flex column, gap 6px).',
      },
    },
  },
  argTypes: {
    filename: { control: 'text', description: 'Nombre del archivo mostrado al usuario.' },
    href: { control: 'text', description: 'URL del archivo (absoluta o relativa).' },
    icon: { control: 'text', description: 'Material Symbol. Default `attach_file`.' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsBillAttachment>;

/** Un adjunto. */
export const Default: Story = {
  args: {
    filename: 'comprobante-cuenta-enero.pdf',
    href: 'https://example.com/file.pdf',
  },
};

/** Adjunto con icon custom (imagen en vez de doc genérico). */
export const ImageAttachment: Story = {
  args: {
    filename: 'foto-cuenta.jpg',
    href: 'https://example.com/photo.jpg',
    icon: 'image',
  },
};

/** Múltiples adjuntos dentro de `KdsBillAttachments`. */
export const Multiple: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <KdsBillAttachments>
        <KdsBillAttachment
          filename="cuenta-enero-2026.pdf"
          href="https://example.com/cuenta-enero.pdf"
        />
        <KdsBillAttachment
          filename="cuenta-febrero-2026.pdf"
          href="https://example.com/cuenta-febrero.pdf"
        />
        <KdsBillAttachment
          filename="foto-respaldo.jpg"
          href="https://example.com/foto.jpg"
          icon="image"
        />
      </KdsBillAttachments>
    </div>
  ),
};

/** Patrón de producción: dentro de `kds-detail-group`. */
export const InsideDetailGroup: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <dl className="kds-detail-list">
        <div className="kds-detail-group">
          <dt>Adjuntos</dt>
          <dd>
            <KdsBillAttachments>
              <KdsBillAttachment
                filename="cuenta-enero-2026.pdf"
                href="https://example.com/cuenta-enero.pdf"
              />
              <KdsBillAttachment
                filename="cuenta-febrero-2026.pdf"
                href="https://example.com/cuenta-febrero.pdf"
              />
            </KdsBillAttachments>
          </dd>
        </div>
      </dl>
    </div>
  ),
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-bill-attachments">
 *   <a class="kds-bill-attachment" href="/files/factura-enero.pdf" target="_blank" rel="noopener noreferrer">
 *     <i class="material-symbols-outlined">attach_file</i>
 *     <span>Factura Enero 2026.pdf</span>
 *   </a>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → BillAttachment` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-bill-attachments">
  <a class="kds-bill-attachment" href="/files/factura-enero.pdf" target="_blank" rel="noopener noreferrer">
    <i class="material-symbols-outlined">attach_file</i>
    <span>Factura Enero 2026.pdf</span>
  </a>
  <a class="kds-bill-attachment" href="/files/orden-compra.pdf" target="_blank" rel="noopener noreferrer">
    <i class="material-symbols-outlined">attach_file</i>
    <span>Orden de compra OC-001.pdf</span>
  </a>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-bill-attachments">
        <a
          className="kds-bill-attachment"
          href="#factura-enero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-symbols-outlined">attach_file</i>
          <span>Factura Enero 2026.pdf</span>
        </a>
        <a
          className="kds-bill-attachment"
          href="#orden-compra"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-symbols-outlined">attach_file</i>
          <span>Orden de compra OC-001.pdf</span>
        </a>
      </div>
    </div>
  ),
};
