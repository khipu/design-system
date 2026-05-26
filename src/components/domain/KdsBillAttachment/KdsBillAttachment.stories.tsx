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
