import type { Meta, StoryObj } from '@storybook/react';

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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Uso de marca</h1>

      <p>El logotipo de Khipu es el elemento más importante de nuestra identidad visual. Su uso correcto garantiza el reconocimiento y la consistencia de la marca.</p>

      <div style={{
        padding: '48px',
        background: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        textAlign: 'center',
        marginBottom: '24px'
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

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '16px', marginTop: 0 }}>Medios digitales</h4>
        <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <li>Pantallas de escritorio: 120px de ancho mínimo</li>
          <li>Dispositivos móviles: 100px de ancho mínimo</li>
          <li>Favicon e íconos: 32x32px mínimo</li>
        </ul>
      </div>

      <h2>🎯 Guía de uso</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Columna Izquierda - Usos Correctos */}
        <div style={{ padding: '20px', background: '#E8F5E9', borderRadius: '8px', border: '1px solid #4CAF50' }}>
          <h3 style={{ fontSize: '18px', color: '#2E7D32', marginTop: 0 }}>✅ Usos correctos</h3>

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
        <div style={{ padding: '20px', background: '#FFEBEE', borderRadius: '8px', border: '1px solid #F44336' }}>
          <h3 style={{ fontSize: '18px', color: '#C62828', marginTop: 0 }}>❌ Usos incorrectos</h3>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#4CAF50' }}>
            Color
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#FAFAFA', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo200x75Color}
              alt="Logo Khipu Color"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>Uso:</strong> Espacio positivo (modo claro), impresos.
          </div>
        </div>

        <div style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#8347AD' }}>
            Púrpura completo
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#FAFAFA', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo200x75Purple}
              alt="Logo Khipu Púrpura"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>Uso:</strong> Espacio negativo (modo oscuro color), impresos.
          </div>
        </div>

        <div style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Negro
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#FAFAFA', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo200x75Black}
              alt="Logo Khipu Negro"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>Uso:</strong> Espacio negativo (modo oscuro), impresos.
          </div>
        </div>
      </div>

      <h3>Logos cuadrados</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#FAFAFA', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo140Simple}
              alt="K Color"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>K Color</strong><br/>
            <span style={{ fontSize: '13px', color: '#666' }}>UI minimalista</span>
          </div>
        </div>

        <div style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#FAFAFA', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo140Purple}
              alt="K Púrpura"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>K Púrpura</strong><br/>
            <span style={{ fontSize: '13px', color: '#666' }}>Íconos de app, favicons</span>
          </div>
        </div>

        <div style={{ padding: '20px', background: '#2E2E2E', borderRadius: '8px', border: '1px solid #444', color: '#fff' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo140White}
              alt="K Blanco"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>K Blanco</strong><br/>
            <span style={{ fontSize: '13px', color: '#ccc' }}>Fondos oscuros</span>
          </div>
        </div>

        <div style={{ padding: '20px', background: '#2E2E2E', borderRadius: '8px', border: '1px solid #444', color: '#fff' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '12px' }}>
            <img
              src={Logo140WhiteNeg}
              alt="K Blanco Negativo"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong>K Blanco Negativo</strong><br/>
            <span style={{ fontSize: '13px', color: '#ccc' }}>Alto contraste</span>
          </div>
        </div>
      </div>

      <h2>Valores de marca</h2>

      <p>La identidad de marca de Khipu se fundamenta en tres valores esenciales que guían todas nuestras acciones y comunicaciones:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#8347AD' }}>
            Buenos Competidores
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            Nos gusta entender y afrontar nuestros desafíos. Nos mantenemos al tanto de la industria y nuestros competidores, entendiendo la competitividad como una acción de mejora continua.
          </p>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>En la práctica:</div>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li>Mejora continua de productos y servicios</li>
            <li>Enfoque competente cuidando las formas</li>
            <li>Lenguaje directo, neutro y simple</li>
          </ul>
        </div>

        <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#8347AD' }}>
            Honestos
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            La honestidad ante todo. La transparencia es uno de nuestros valores fundamentales y un principio rector en nuestra comunicación corporativa y de equipo.
          </p>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>En la práctica:</div>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li>Contamos lo que está pasando siempre</li>
            <li>Comunicamos éxitos y fallos con claridad</li>
            <li>No escondemos información relevante</li>
          </ul>
        </div>

        <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#8347AD' }}>
            Colaborativos
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            Buscamos influir positivamente en la industria, porque entendemos el aporte a la sociedad como un valor. También extendemos el sentido de colaboración hacia nuestro equipo.
          </p>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>En la práctica:</div>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li>Tecnológicos que tratan con personas</li>
            <li>De igual a igual con nuestros clientes</li>
            <li>Comunicación cercana y respetuosa</li>
          </ul>
        </div>
      </div>

      <h2>Personalidad de marca</h2>

      <p>Nuestra marca se caracteriza por tres pilares de comunicación que reflejan nuestros valores:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', background: '#E8F5E9', borderRadius: '12px', borderLeft: '4px solid #4CAF50' }}>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#2E7D32' }}>
            Eficiente
          </div>
          <p style={{ fontSize: '14px', fontStyle: 'italic', marginTop: 0, marginBottom: '16px' }}>
            Somos competentes, cuidando las formas.
          </p>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li><strong>Vocabulario:</strong> Directo, neutro, simple</li>
            <li><strong>Verbosidad:</strong> Evitamos expresiones de género o cargo</li>
            <li><strong>Gramática:</strong> Oraciones o frases simples</li>
          </ul>
        </div>

        <div style={{ padding: '24px', background: '#E3F2FD', borderRadius: '12px', borderLeft: '4px solid #2196F3' }}>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#1565C0' }}>
            Transparente
          </div>
          <p style={{ fontSize: '14px', fontStyle: 'italic', marginTop: 0, marginBottom: '16px' }}>
            Diseñamos procesos de pago confiables.
          </p>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li><strong>Vocabulario:</strong> Transparente, explícito</li>
            <li><strong>Verbosidad:</strong> Palabras suficientes con información precisa</li>
            <li><strong>Gramática:</strong> Oraciones completas sin obviar datos</li>
          </ul>
        </div>

        <div style={{ padding: '24px', background: '#FFF3E0', borderRadius: '12px', borderLeft: '4px solid #FF9800' }}>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#E65100' }}>
            Cercana
          </div>
          <p style={{ fontSize: '14px', fontStyle: 'italic', marginTop: 0, marginBottom: '16px' }}>
            Somos facilitadores de procesos.
          </p>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li><strong>Vocabulario:</strong> Confiable, neutro, amistoso</li>
            <li><strong>Verbosidad:</strong> Palabras que entreguen información de ayuda</li>
            <li><strong>Gramática:</strong> Oraciones o frases simples</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
