import type { Meta, StoryObj } from '@storybook/react';
import { PublicSansReasons, FontWeightSamples } from './components/TypographyComponents';
import { colors, spacing, borders } from '../../tokens';

const meta: Meta = {
  title: 'Brand',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
  tags: ['!autodocs'],
};

export default meta;

export const Uso_tipográfico: StoryObj = {
  name: 'Uso tipográfico',
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: `${spacing[5]} ${spacing[2.5]}` }}>
      <h1>Uso tipográfico</h1>

      <p>La tipografía es la voz visual de Khipu. Nuestra tipografía comunica <strong>profesionalismo, claridad y modernidad</strong> en cada interacción con nuestros usuarios.</p>

      <blockquote style={{
        borderLeft: `${borders.widthLg} solid ${colors.primary.main}`,
        paddingLeft: spacing[2],
        margin: `${spacing[3]} 0`,
        color: colors.text.footer,
        fontStyle: 'italic'
      }}>
        💡 <strong>Nota:</strong> Para escalas completas, tamaños específicos y tokens técnicos, consulta la sección <strong>Design Tokens</strong>.
      </blockquote>

      <h2>🔤 Public Sans — Nuestra voz tipográfica</h2>

      <p>Public Sans es una tipografía geométrica y humanista creada por el equipo de diseño de USWDS (U.S. Web Design System). Es la <strong>única fuente</strong> que usamos en todo el sistema de diseño Khipu.</p>

      <h3>¿Por qué Public Sans?</h3>

      <PublicSansReasons />

      <h2>🎨 Pesos tipográficos</h2>

      <p>Public Sans utiliza cuatro pesos que comunican jerarquía y énfasis:</p>

      <FontWeightSamples />

      <p><strong>Principio de uso:</strong> Limita a 3 pesos diferentes en una misma vista para mantener coherencia visual.</p>

      <h2>📖 Recursos adicionales</h2>

      <p>Para implementar tipografía en tu código:</p>
      <ul>
        <li><strong>Design Tokens / Typography</strong>: Escalas completas, tamaños, pesos y tokens</li>
        <li><strong>Core / Typography</strong>: Componente interactivo con todas las variantes</li>
        <li><strong>Ejemplos</strong>: Ver implementaciones reales en las páginas de ejemplo</li>
      </ul>
    </div>
  ),
};
