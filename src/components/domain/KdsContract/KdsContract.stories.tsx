import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsContract } from './KdsContract';
import initScript from '../../../beercss/customizations/khipu-init.js?raw';

/**
 * `initContract` exactly as shipped in the BeerCSS bundle (khipu-init.js), cut out of the
 * source so the docs example can never drift from the real implementation. Matches braces
 * from the declaration to its closing brace and removes the IIFE indentation.
 */
function extractInitContract(source: string): string {
  const start = source.indexOf('    /**\n     * Initialize read-to-accept contracts');
  const fnStart = source.indexOf('function initContract(', start);
  if (start === -1 || fnStart === -1) {
    // Fail loudly instead of showing garbage in the docs if khipu-init.js changes shape.
    throw new Error('KdsContract docs: initContract not found in khipu-init.js');
  }
  let depth = 0;
  let end = source.indexOf('{', fnStart);
  for (; end < source.length; end++) {
    if (source[end] === '{') depth++;
    else if (source[end] === '}' && --depth === 0) break;
  }
  return source
    .slice(start, end + 1)
    .split('\n')
    .map((line) => line.replace(/^ {4}/, ''))
    .join('\n');
}

const INIT_CONTRACT_JS = extractInitContract(initScript);

/**
 * KdsContract — contrato que hay que leer hasta el final antes de aceptarlo. El checkbox
 * "Declaro que leí y acepto el contrato" queda deshabilitado (con la ayuda "Desplázate hasta
 * el final…" como descripción) hasta que el contenido llega al final; si el texto cabe sin
 * scroll, se habilita de inmediato.
 *
 * - El contenido es una región enfocable (`role="region"`, `tabIndex=0`): se desplaza con el
 *   teclado y tiene anillo de foco.
 * - `onReadComplete` se llama una vez al llegar al final; `onAcceptedChange` con el nuevo
 *   estado del checkbox; `name` para enviarlo en un form.
 * - Textos configurables para i18n (`contentLabel`, `acceptLabel`, `hint`).
 *
 * En HTML/GSP no hace falta JS propio: el bundle `khipu-beercss.js` (que payment ya carga)
 * inicializa todo `[data-kds-contract]` con `Khipu.initContract` y dispara
 * `kds:contract-read` en el contenedor. Para contenido inyectado después de cargar la
 * página, llamar `Khipu.initContract(root)`.
 *
 * El checkbox va en el markup **sin** `disabled`: lo deshabilita el JS al inicializar. Así,
 * si el script no carga, el usuario igual puede firmar (degradación elegante) en vez de
 * quedar bloqueado. Un contrato oculto al cargar (paso o tab cerrado) no cuenta como leído
 * hasta que se muestra y tiene alto.
 *
 * @css .kds-contract, .kds-contract--read, .kds-contract-content, .kds-contract-accept, .kds-contract-hint
 */
const meta: Meta<typeof KdsContract> = {
  title: 'Domain/Forms/KdsContract',
  component: KdsContract,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KdsContract>;

const MANDATE = (
  <>
    <p>
      <strong>MANDATO PARA PERCIBIR EL PAGO</strong>
    </p>
    <p>
      En Santiago, entre Khipu SpA, en adelante “Khipu”, y Comercial Ficticia SpA, RUT
      76.543.210-3, representada por Ana Pérez Ficticia, en adelante “el Cobrador”, se acuerda
      el siguiente mandato.
    </p>
    <p>
      Primero: el Cobrador encarga a Khipu recibir, en su nombre, los pagos que sus clientes
      realicen mediante los medios de pago habilitados en su cuenta de cobro.
    </p>
    <p>
      Segundo: los fondos recibidos se transferirán a la cuenta corriente registrada por el
      Cobrador, según el plan elegido en este proceso.
    </p>
    <p>
      Tercero: el Cobrador declara que la información entregada durante la activación es
      verídica y se compromete a mantenerla actualizada.
    </p>
    <p>
      Cuarto: este mandato es indefinido y cualquiera de las partes puede ponerle término
      avisando a la otra con treinta días de anticipación.
    </p>
    <p>
      <em>[Texto referencial. El contrato vigente se carga desde el sistema.]</em>
    </p>
  </>
);

/** Contrato largo: hay que desplazarse hasta el final para poder aceptarlo. */
export const Default: Story = {
  render: function DefaultContract() {
    const [accepted, setAccepted] = useState(false);
    return (
      <KdsContract name="acepta" accepted={accepted} onAcceptedChange={setAccepted}>
        {MANDATE}
      </KdsContract>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-contract" data-kds-contract>
  <div class="kds-contract-content" role="region" aria-label="Contrato" tabindex="0">
    <p><strong>MANDATO PARA PERCIBIR EL PAGO</strong></p>
    <p>…</p>
  </div>
  <label class="checkbox kds-contract-accept">
    <input type="checkbox" name="acepta" aria-describedby="contract-hint"/>
    <span>Declaro que leí y acepto el contrato</span>
  </label>
  <div class="kds-contract-hint" id="contract-hint">
    Desplázate hasta el final del contrato para poder aceptarlo.
  </div>
</div>

<!-- GSP (payment, merchantUploadContract/showBillingPlanTerms.gsp): sin JS propio,
     khipu-beercss.js habilita el checkbox al llegar al final -->
<div class="kds-contract" data-kds-contract>
  <div class="kds-contract-content" role="region" tabindex="0"
       aria-label="\${message(code: 'merchant.signContract.title')}">
    \${raw(contractContent)}
  </div>
  <label class="checkbox kds-contract-accept">
    <input type="checkbox" id="agreeContract" name="agreeContract"
           aria-describedby="contract-hint"/>
    <span><g:message code="merchant.signContract.check.label"/></span>
  </label>
  <div class="kds-contract-hint" id="contract-hint">
    <g:message code="merchant.signContract.scroll.hint"/>
  </div>
</div>
<button type="submit" id="sign-button" class="kds-btn kds-btn-primary kds-btn-block" disabled>
  <span class="kds-btn-label">Aceptar y firmar</span>
</button>

<!-- JS -->
<!-- Opción A (payment): la página ya carga khipu-beercss.js, que ejecuta
     Khipu.initContract() al cargar. No hace falta copiar la función; para contenido
     inyectado después de la carga: Khipu.initContract(contenedor). -->

<!-- Opción B: página SIN el bundle. Esta es la función completa, la misma del bundle
     (khipu-init.js): -->
<script>
${INIT_CONTRACT_JS}

document.addEventListener('DOMContentLoaded', function () {
  initContract();
});
</script>

<!-- Uso del evento y del checkbox (A o B): habilitar "Aceptar y firmar" solo con el
     contrato aceptado, y reaccionar cuando se terminó de leer. -->
<script>
document.addEventListener('DOMContentLoaded', function () {
  var contract = document.querySelector('[data-kds-contract]');
  var accept = contract.querySelector('.kds-contract-accept input[type="checkbox"]');
  var signButton = document.getElementById('sign-button');

  contract.addEventListener('kds:contract-read', function () {
    // Se dispara una sola vez: el usuario llegó al final (o el texto cabía sin scroll).
    // Ej.: registrar el evento o mover el foco al checkbox.
    accept.focus();
  });

  accept.addEventListener('change', function () {
    signButton.disabled = !accept.checked;
  });
});
</script>`,
      },
    },
  },
};

/** Contrato corto: cabe sin scroll, así que el checkbox llega habilitado. */
export const ShortContent: Story = {
  name: 'Contenido corto (sin scroll)',
  render: () => (
    <KdsContract>
      <p>Primero: el Cobrador encarga a Khipu recibir los pagos en su nombre.</p>
    </KdsContract>
  ),
};
