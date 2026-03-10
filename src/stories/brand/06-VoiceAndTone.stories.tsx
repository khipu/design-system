import type { Meta, StoryObj } from '@storybook/react';
import {
  BrandVoiceCards,
  WritingPrincipleCallout,
  PunctuationContextCallout,
  WritingGuidelinesTable,
  SpecificExamplesTable,
  MicrocopyTable,
  PunctuationRulesTable
} from './components/VoiceAndToneComponents';

const meta: Meta = {
  title: 'Brand/Voz y Tono',
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Voz y Tono</h1>

      <p>La forma en que comunicamos es tan importante como lo que comunicamos. La voz de Khipu es consistente, mientras que el tono se adapta al contexto.</p>

      <h2>🎤 Voz de marca</h2>

      <p>La <strong>voz</strong> de Khipu es constante en todos los puntos de contacto:</p>

      <h3>Características</h3>

      <BrandVoiceCards />

      <h2>✍️ Guías de redacción</h2>

      <WritingPrincipleCallout />

      <WritingGuidelinesTable />

      <h3>Ejemplos específicos</h3>

      <SpecificExamplesTable />

      <h2>📝 Microcopy: elementos de UI</h2>

      <MicrocopyTable />

      <h2>📌 Uso de puntuación</h2>

      <PunctuationContextCallout />

      <PunctuationRulesTable />
    </div>
  ),
};
