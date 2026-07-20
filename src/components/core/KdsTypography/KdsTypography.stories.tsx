import type { Meta, StoryObj } from '@storybook/react';
import { KdsTypography } from './KdsTypography';

const meta: Meta<typeof KdsTypography> = {
  title: 'Design System/Foundations/Typography',
  component: KdsTypography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display1', 'display2',
        'heading1', 'heading2', 'heading3',
        'body-large', 'body', 'body-small',
        'label', 'label-small',
        'muted', 'link', 'strong',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'error', 'success', 'inherit'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTypography>;

export const Default: Story = {
  args: {
    children: 'KdsTypography component text',
    variant: 'body',
    color: 'primary',
  },
};

export const DisplayVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <KdsTypography variant="display1">Display 1 - Hero Headline (40px Bold)</KdsTypography>
      <KdsTypography variant="display2">Display 2 - Large Headline (32px Bold)</KdsTypography>
    </div>
  ),
};

export const HeadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <KdsTypography variant="heading1">Heading 1 - Section Heading (28px SemiBold)</KdsTypography>
      <KdsTypography variant="heading2">Heading 2 - Subsection Heading (24px SemiBold)</KdsTypography>
      <KdsTypography variant="heading3">Heading 3 - Page Title (20px SemiBold)</KdsTypography>
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <KdsTypography variant="body-large">
        Body Large - 16px Regular. Used for large paragraphs and main content areas.
      </KdsTypography>
      <KdsTypography variant="body">
        Body - 14px Regular. Default body text for most content throughout the application.
      </KdsTypography>
      <KdsTypography variant="body-small">
        Body Small - 12px Regular. Used for captions, help text, and secondary information.
      </KdsTypography>
    </div>
  ),
};

export const LabelVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <KdsTypography variant="label">Label - 12px Uppercase</KdsTypography>
      <KdsTypography variant="label-small">Label Small - 10px Medium</KdsTypography>
    </div>
  ),
};

export const CardVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', backgroundColor: 'var(--kds-color-background-elevated)', borderRadius: '4px' }}>
      <KdsTypography variant="heading3">Card Title - 20px SemiBold</KdsTypography>
      <KdsTypography variant="body" color="muted">Card Subtitle - 14px Regular</KdsTypography>
      <KdsTypography variant="body">Product Name - 14px Regular</KdsTypography>
    </div>
  ),
};

export const SemanticVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <KdsTypography variant="muted">Muted text - For secondary/less important information</KdsTypography>
      <KdsTypography variant="link">Link text - Clickable link style</KdsTypography>
    </div>
  ),
};

/**
 * `strong` is an inline-emphasis variant: bold weight only, inheriting font-size and
 * color from its surrounding text. Use it (as a `span`) to highlight a fragment inside
 * another variant — e.g. a value inside a body sentence or a dialog heading.
 */
export const Emphasis: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 480 }}>
      <KdsTypography variant="body">
        Transfiere{' '}
        <KdsTypography as="span" variant="strong">
          $3.300
        </KdsTypography>{' '}
        a{' '}
        <KdsTypography as="span" variant="strong">
          Banco Security
        </KdsTypography>
        .
      </KdsTypography>
      <KdsTypography variant="heading3">
        Espera{' '}
        <KdsTypography as="span" variant="strong">
          un momento
        </KdsTypography>
      </KdsTypography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <KdsTypography variant="body" color="primary">Primary color</KdsTypography>
      <KdsTypography variant="body" color="secondary">Secondary color</KdsTypography>
      <KdsTypography variant="body" color="muted">Muted color</KdsTypography>
      <KdsTypography variant="body" color="error">Error color</KdsTypography>
      <KdsTypography variant="body" color="success">Success color</KdsTypography>
    </div>
  ),
};


export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Display</KdsTypography>
        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', marginBottom: '16px' }} />
        <KdsTypography variant="display1">Display 1</KdsTypography>
        <KdsTypography variant="display2">Display 2</KdsTypography>
      </div>

      <div>
        <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Headings</KdsTypography>
        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', marginBottom: '16px' }} />
        <KdsTypography variant="heading1">Heading 1</KdsTypography>
        <KdsTypography variant="heading2">Heading 2</KdsTypography>
        <KdsTypography variant="heading3">Heading 3</KdsTypography>
      </div>

      <div>
        <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Body</KdsTypography>
        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', marginBottom: '16px' }} />
        <KdsTypography variant="body-large">Body Large</KdsTypography>
        <KdsTypography variant="body">Body</KdsTypography>
        <KdsTypography variant="body-small">Body Small</KdsTypography>
      </div>

      <div>
        <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Labels</KdsTypography>
        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', marginBottom: '16px' }} />
        <KdsTypography variant="label">Label</KdsTypography>
        <KdsTypography variant="label-small">Label Small</KdsTypography>
      </div>

      <div>
        <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Semantic</KdsTypography>
        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', marginBottom: '16px' }} />
        <KdsTypography variant="muted">Muted</KdsTypography>
        <KdsTypography variant="link">Link</KdsTypography>
        <KdsTypography variant="body">
          Énfasis inline:{' '}
          <KdsTypography as="span" variant="strong">
            texto en negrita
          </KdsTypography>
        </KdsTypography>
      </div>
    </div>
  ),
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-text-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML — cada variante mapea a su elemento semántico + clase:
 * ```html
 * <h1 class="kds-text-display1">Display 1</h1>
 * <h3 class="kds-text-heading3">Heading 3</h3>
 * <p class="kds-text-body">Body</p>
 * <span class="kds-text-label">Label</span>
 * <a class="kds-text-link" href="#">Link</a>
 * ```
 *
 * Variantes: `kds-text-display1/2`, `kds-text-heading1/2/3`,
 * `kds-text-body-large/body/body-small`, `kds-text-label/label-small`,
 * `kds-text-muted`, `kds-text-link`.
 *
 * Color (modificador adicional): `kds-text-primary`, `kds-text-secondary`,
 * `kds-text-muted`, `kds-text-error`, `kds-text-success`.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Display -->
<h1 class="kds-text-display1">Display 1</h1>
<h2 class="kds-text-display2">Display 2</h2>

<!-- Headings -->
<h1 class="kds-text-heading1">Heading 1</h1>
<h2 class="kds-text-heading2">Heading 2</h2>
<h3 class="kds-text-heading3">Heading 3</h3>

<!-- Body -->
<p class="kds-text-body-large">Body Large</p>
<p class="kds-text-body">Body</p>
<p class="kds-text-body-small">Body Small</p>

<!-- Labels -->
<span class="kds-text-label">Label</span>
<span class="kds-text-label-small">Label Small</span>

<!-- Semantic -->
<p class="kds-text-muted">Muted</p>
<a class="kds-text-link" href="#">Link</a>

<!-- Inline emphasis (hereda tamaño/color) -->
<p class="kds-text-body">Transfiere <span class="kds-text-strong">$3.300</span></p>

<!-- Color (modificador) -->
<p class="kds-text-body kds-text-error">Body en color error</p>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 480 }}>
      <h1 className="kds-text-display1">Display 1</h1>
      <h2 className="kds-text-display2">Display 2</h2>
      <h1 className="kds-text-heading1">Heading 1</h1>
      <h2 className="kds-text-heading2">Heading 2</h2>
      <h3 className="kds-text-heading3">Heading 3</h3>
      <p className="kds-text-body-large">Body Large</p>
      <p className="kds-text-body">Body</p>
      <p className="kds-text-body-small">Body Small</p>
      <span className="kds-text-label">Label</span>
      <span className="kds-text-label-small">Label Small</span>
      <p className="kds-text-muted">Muted</p>
      <a className="kds-text-link" href="#">Link</a>
      <p className="kds-text-body">Transfiere <span className="kds-text-strong">$3.300</span></p>
      <p className="kds-text-body kds-text-error">Body en color error</p>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div style={{ maxWidth: 390, backgroundColor: 'var(--kds-color-background-paper)', padding: '24px', borderRadius: '8px' }}>
      <KdsTypography variant="heading3" style={{ marginBottom: '1rem', display: 'block' }}>
        Detalle de suscripcion
      </KdsTypography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block' }}>Tipo de pago</KdsTypography>
          <KdsTypography variant="body">Monto variable</KdsTypography>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', margin: 0 }} />

        <div>
          <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block' }}>Tope por cargo</KdsTypography>
          <KdsTypography variant="body">$50.000</KdsTypography>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--kds-color-divider)', margin: 0 }} />

        <div>
          <KdsTypography as="span" variant="label" color="muted" style={{ display: 'block' }}>Tope mensual</KdsTypography>
          <KdsTypography variant="body">$150.000</KdsTypography>
        </div>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--kds-alert-info-bg)', borderRadius: '4px' }}>
        <KdsTypography variant="body-small" color="muted">
          El tope mensual corresponde al monto maximo posible a cobrar mensualmente.
        </KdsTypography>
      </div>

      <KdsTypography as="span" variant="label-small" color="muted" style={{ marginTop: '1.5rem', textAlign: 'center', display: 'block' }}>
        CODIGO * HUSK-P7ZZ-XGYG
      </KdsTypography>
    </div>
  ),
};
