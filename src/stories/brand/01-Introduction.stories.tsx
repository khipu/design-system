import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Brand/Introducción',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
};

export default meta;

export const Page: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Introducción</h1>

      <p>Bienvenido a la guía de marca digital de Khipu. Este documento establece los fundamentos visuales y comunicacionales que definen nuestra identidad como plataforma de pagos.</p>

      <h2>📚 Navegación de la guía</h2>

      <p>Esta guía está organizada en las siguientes secciones:</p>

      <ol>
        <li><strong>Uso de marca</strong>: Uso correcto del logotipo y variantes</li>
        <li><strong>Uso de colores</strong>: Paleta de colores y aplicación</li>
        <li><strong>Uso tipográfico</strong>: Fundamentos de la familia tipográfica</li>
        <li><strong>Voz y tono</strong>: Guías de comunicación y redacción</li>
      </ol>

      <h2>🤖 Uso con agentes de IA</h2>

      <p>Esta guía puede ser utilizada como contexto para agentes de IA que generen contenido para Khipu.</p>

      <p><strong>👉 Consulta la página <a href="/?path=/story/brand-cómo-funciona--page">Cómo funciona</a> para ver las opciones de integración disponibles.</strong></p>
    </div>
  ),
};
