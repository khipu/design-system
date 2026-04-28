import type { Meta, StoryObj } from '@storybook/react';
import { colors, colorsByMode, spacing, fontSizes, fontWeights, borderRadius, borders } from '../../tokens';

// Logos Horizontales
import Logo200x75Purple from './assets/logos/khipu-200x75-purple.svg';
import Logo200x75Color from './assets/logos/khipu-200x75-color.svg';
import Logo200x75Black from './assets/logos/khipu-200x75-black.svg';

// Logos Cuadrados
import Logo140Purple from './assets/logos/khipu-140x140-purple.svg';
import Logo140Simple from './assets/logos/khipu-140x140-simple.svg';
import Logo140White from './assets/logos/khipu-140x140-white.svg';
import Logo140WhiteNeg from './assets/logos/khipu-140x140-white-negative.svg';

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

export const Uso_de_marca: StoryObj = {
  name: 'Uso de marca',
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: `${spacing[5]} ${spacing[2.5]}` }}>
      <h1>Uso de marca</h1>

      <p>El logotipo de Khipu es el elemento más importante de nuestra identidad visual. Su uso correcto garantiza el reconocimiento y la consistencia de la marca.</p>

      <div style={{
        padding: spacing[6],
        background: colors.background.paper,
        borderRadius: borderRadius.md,
        border: borders.divider,
        textAlign: 'center',
        marginBottom: spacing[3]
      }}>
        <img
          src={Logo200x75Color}
          alt="Khipu Logo Color"
          style={{ maxWidth: '300px', width: '100%' }}
        />
      </div>

      <h2>Especificaciones técnicas</h2>

      <h3>Espacios de protección</h3>

      <p>El logo debe mantener un área de protección mínima equivalente a la altura de la letra "K" del logotipo. Este espacio debe estar libre de cualquier elemento gráfico, texto o contenido.</p>

      <p><strong>Regla general</strong>: Mantén al menos 24px de espacio libre alrededor del logo en todas las direcciones para aplicaciones digitales.</p>

      <h3>Tamaños mínimos</h3>

      <p>El logotipo nunca debe usarse por debajo de los siguientes tamaños:</p>

      <div style={{ marginBottom: spacing[3] }}>
        <h4 style={{ fontSize: fontSizes.base, marginTop: 0 }}>Medios digitales</h4>
        <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.8' }}>
          <li>Pantallas de escritorio: 120px de ancho mínimo</li>
          <li>Dispositivos móviles: 100px de ancho mínimo</li>
          <li>Favicon e íconos: 32x32px mínimo</li>
        </ul>
      </div>

      <h2>🎯 Guía de uso</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3], marginBottom: spacing[4] }}>
        {/* Columna Izquierda - Usos Correctos */}
        <div style={{ padding: spacing[2.5], background: colors.success.container, borderRadius: borderRadius.md, border: `${borders.widthSm} solid ${colors.success.light}` }}>
          <h3 style={{ fontSize: fontSizes.lg, color: colors.success.main, marginTop: 0 }}>Usos correctos</h3>

          <p><strong>Fondos apropiados</strong></p>
          <ul>
            <li>Fondos blancos o gris claro</li>
            <li>Fondos con alto contraste</li>
            <li>Superficies limpias sin elementos competidores</li>
          </ul>

          <p><strong>Proporciones</strong></p>
          <ul>
            <li>Mantén siempre las proporciones originales</li>
            <li>Escala proporcionalmente usando corner handles</li>
            <li>Nunca estires o comprimas el logo</li>
          </ul>

          <p><strong>Alineación</strong></p>
          <ul>
            <li>Centra el logo cuando sea el único elemento</li>
            <li>Alinea a la izquierda en headers y navegación</li>
            <li>Respeta los grids del layout</li>
          </ul>
        </div>

        {/* Columna Derecha - Usos Incorrectos */}
        <div style={{ padding: spacing[2.5], background: colors.error.container, borderRadius: borderRadius.md, border: `${borders.widthSm} solid ${colors.error.light}` }}>
          <h3 style={{ fontSize: fontSizes.lg, color: colors.error.dark, marginTop: 0 }}>Usos incorrectos</h3>

          <p><strong>No hacer</strong></p>
          <ul>
            <li>No rotar el logotipo</li>
            <li>No deformar las proporciones</li>
            <li>No cambiar los colores</li>
            <li>No agregar efectos (sombras, brillos, degradados)</li>
            <li>No colocar sobre fondos con baja legibilidad</li>
            <li>No usar con bajo contraste</li>
            <li>No agregar contornos o bordes</li>
          </ul>
        </div>
      </div>

      <h2>📦 Variantes de logos</h2>

      <h3>Logos horizontales</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing[2], marginBottom: spacing[4] }}>
        <div style={{ padding: spacing[2.5], background: colors.background.paper, borderRadius: borderRadius.md, border: borders.divider }}>
          <div style={{ fontSize: fontSizes.base, fontWeight: fontWeights.semiBold, marginBottom: spacing[1.5], color: colors.success.light }}>
            Color
          </div>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colors.background.elevated, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo200x75Color}
              alt="Logo Khipu Color"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>Uso:</strong> Espacio positivo (modo claro), impresos.
          </div>
        </div>

        <div style={{ padding: spacing[2.5], background: colors.background.paper, borderRadius: borderRadius.md, border: borders.divider }}>
          <div style={{ fontSize: fontSizes.base, fontWeight: fontWeights.semiBold, marginBottom: spacing[1.5], color: colors.primary.main }}>
            Púrpura completo
          </div>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colors.background.elevated, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo200x75Purple}
              alt="Logo Khipu Púrpura"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>Uso:</strong> Espacio negativo (modo oscuro color), impresos.
          </div>
        </div>

        <div style={{ padding: spacing[2.5], background: colors.background.paper, borderRadius: borderRadius.md, border: borders.divider }}>
          <div style={{ fontSize: fontSizes.base, fontWeight: fontWeights.semiBold, marginBottom: spacing[1.5] }}>
            Negro
          </div>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colors.background.elevated, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo200x75Black}
              alt="Logo Khipu Negro"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>Uso:</strong> Espacio negativo (modo oscuro), impresos.
          </div>
        </div>
      </div>

      <h3>Logos cuadrados</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing[2], marginBottom: spacing[4] }}>
        <div style={{ padding: spacing[2.5], background: colors.background.paper, borderRadius: borderRadius.md, border: borders.divider }}>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colors.background.elevated, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo140Simple}
              alt="K Color"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>K Color</strong><br/>
            <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>UI minimalista</span>
          </div>
        </div>

        <div style={{ padding: spacing[2.5], background: colors.background.paper, borderRadius: borderRadius.md, border: borders.divider }}>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colors.background.elevated, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo140Purple}
              alt="K Púrpura"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>K Púrpura</strong><br/>
            <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>Íconos de app, favicons</span>
          </div>
        </div>

        <div style={{ padding: spacing[2.5], background: colorsByMode.dark.background.elevated, borderRadius: borderRadius.md, border: `${borders.widthSm} solid ${colorsByMode.dark.divider}`, color: colors.primary.contrastText }}>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colorsByMode.dark.action.hover, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo140White}
              alt="K Blanco"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>K Blanco</strong><br/>
            <span style={{ fontSize: fontSizes.xs, color: colorsByMode.dark.text.secondary }}>Fondos oscuros</span>
          </div>
        </div>

        <div style={{ padding: spacing[2.5], background: colorsByMode.dark.background.elevated, borderRadius: borderRadius.md, border: `${borders.widthSm} solid ${colorsByMode.dark.divider}`, color: colors.primary.contrastText }}>
          <div style={{ textAlign: 'center', padding: spacing[2.5], background: colorsByMode.dark.action.hover, borderRadius: borderRadius.sm, marginBottom: spacing[1.5] }}>
            <img
              src={Logo140WhiteNeg}
              alt="K Blanco Negativo"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: fontSizes.sm }}>
            <strong>K Blanco Negativo</strong><br/>
            <span style={{ fontSize: fontSizes.xs, color: colorsByMode.dark.text.secondary }}>Alto contraste</span>
          </div>
        </div>
      </div>

      <h2>Valores de marca</h2>

      <p>La identidad de marca de Khipu se fundamenta en tres valores esenciales que guían todas nuestras acciones y comunicaciones:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing[2.5], marginBottom: spacing[4] }}>
        <div style={{ padding: spacing[3], background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
          <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.semiBold, marginBottom: spacing[1.5], color: colors.primary.main }}>
            Buenos Competidores
          </div>
          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[1.5] }}>
            Nos gusta entender y afrontar nuestros desafíos. Nos mantenemos al tanto de la industria y nuestros competidores, entendiendo la competitividad como una acción de mejora continua.
          </p>
          <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>En la práctica:</div>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], margin: 0 }}>
            <li>Mejora continua de productos y servicios</li>
            <li>Enfoque competente cuidando las formas</li>
            <li>Lenguaje directo, neutro y simple</li>
          </ul>
        </div>

        <div style={{ padding: spacing[3], background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
          <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.semiBold, marginBottom: spacing[1.5], color: colors.primary.main }}>
            Honestos
          </div>
          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[1.5] }}>
            La honestidad ante todo. La transparencia es uno de nuestros valores fundamentales y un principio rector en nuestra comunicación corporativa y de equipo.
          </p>
          <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>En la práctica:</div>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], margin: 0 }}>
            <li>Contamos lo que está pasando siempre</li>
            <li>Comunicamos éxitos y fallos con claridad</li>
            <li>No escondemos información relevante</li>
          </ul>
        </div>

        <div style={{ padding: spacing[3], background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
          <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.semiBold, marginBottom: spacing[1.5], color: colors.primary.main }}>
            Colaborativos
          </div>
          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[1.5] }}>
            Buscamos influir positivamente en la industria, porque entendemos el aporte a la sociedad como un valor. También extendemos el sentido de colaboración hacia nuestro equipo.
          </p>
          <div style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>En la práctica:</div>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], margin: 0 }}>
            <li>Tecnológicos que tratan con personas</li>
            <li>De igual a igual con nuestros clientes</li>
            <li>Comunicación cercana y respetuosa</li>
          </ul>
        </div>
      </div>

      <h2>Personalidad de marca</h2>

      <p>Nuestra marca se caracteriza por tres pilares de comunicación que reflejan nuestros valores:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing[2.5], marginBottom: spacing[4] }}>
        <div style={{ padding: spacing[3], background: colors.success.container, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.success.light}` }}>
          <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.semiBold, marginBottom: spacing[1], color: colors.success.main }}>
            Eficiente
          </div>
          <p style={{ fontSize: fontSizes.sm, fontStyle: 'italic', marginTop: 0, marginBottom: spacing[2] }}>
            Somos competentes, cuidando las formas.
          </p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], margin: 0 }}>
            <li><strong>Vocabulario:</strong> Directo, neutro, simple</li>
            <li><strong>Verbosidad:</strong> Evitamos expresiones de género o cargo</li>
            <li><strong>Gramática:</strong> Oraciones o frases simples</li>
          </ul>
        </div>

        <div style={{ padding: spacing[3], background: colors.info.container, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.info.light}` }}>
          <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.semiBold, marginBottom: spacing[1], color: colors.info.dark }}>
            Transparente
          </div>
          <p style={{ fontSize: fontSizes.sm, fontStyle: 'italic', marginTop: 0, marginBottom: spacing[2] }}>
            Diseñamos procesos de pago confiables.
          </p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], margin: 0 }}>
            <li><strong>Vocabulario:</strong> Transparente, explícito</li>
            <li><strong>Verbosidad:</strong> Palabras suficientes con información precisa</li>
            <li><strong>Gramática:</strong> Oraciones completas sin obviar datos</li>
          </ul>
        </div>

        <div style={{ padding: spacing[3], background: colors.warning.container, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.warning.light}` }}>
          <div style={{ fontSize: fontSizes.xl, fontWeight: fontWeights.semiBold, marginBottom: spacing[1], color: colors.warning.dark }}>
            Cercana
          </div>
          <p style={{ fontSize: fontSizes.sm, fontStyle: 'italic', marginTop: 0, marginBottom: spacing[2] }}>
            Somos facilitadores de procesos.
          </p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], margin: 0 }}>
            <li><strong>Vocabulario:</strong> Confiable, neutro, amistoso</li>
            <li><strong>Verbosidad:</strong> Palabras que entreguen información de ayuda</li>
            <li><strong>Gramática:</strong> Oraciones o frases simples</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
