import type { Meta, StoryObj } from '@storybook/react';
import { BrandColorCards, SemanticColorCards } from './components/ColorCards';
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

export const Uso_de_colores: StoryObj = {
  name: 'Uso de colores',
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: `${spacing[5]} ${spacing[2.5]}` }}>
      <h1>Uso de colores</h1>

      <p>Los colores son uno de los elementos más reconocibles de la identidad Khipu. Nuestra paleta está diseñada para transmitir <strong>confianza, modernidad y profesionalismo</strong>, creando una experiencia visual consistente que refuerza nuestra marca en cada interacción.</p>

      <blockquote style={{
        borderLeft: `${borders.widthLg} solid ${colors.primary.main}`,
        paddingLeft: spacing[2],
        margin: `${spacing[3]} 0`,
        color: colors.text.footer,
        fontStyle: 'italic'
      }}>
        💡 <strong>Nota:</strong> Para valores específicos, tokens y especificaciones técnicas, consulta la sección <strong>Design Tokens</strong>.
      </blockquote>

      <h2>Colores de marca</h2>

      <BrandColorCards />

      <h2>🚦 Colores semánticos</h2>

      <p>Los colores semánticos comunican el estado del sistema de forma universal y consistente. <strong>Son iguales en modo claro y oscuro</strong> para mantener una comunicación visual consistente.</p>

      <SemanticColorCards />

      <h2>📖 Recursos adicionales</h2>

      <p>Para implementar estos colores en tu código:</p>
      <ul>
        <li>Consulta la sección <strong>Design Tokens</strong> para valores específicos y tokens</li>
        <li>Revisa la documentación de componentes para ver ejemplos de uso</li>
        <li>Usa el theme provider de MUI para acceso automático a todos los colores</li>
      </ul>
    </div>
  ),
};
