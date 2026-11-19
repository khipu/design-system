# Payment Layout — spec del shell agnóstico de tecnología

**Fecha:** 2026-11-19
**Ticket:** a crear (ver «Siguientes pasos») — historia nueva en KTUF
**Rama de implementación:** se abrirá con la clave del ticket una vez creado

## Resumen

El layout de las pantallas de pago (`.kds-payment-stage > .kds-payment-flow > .kds-screen > ...`)
ya existe como CSS puro en `khipu-components.css` y hoy se consume desde al menos tres lugares:
un demo HTML estático (`src/beercss/demo/payment-flow.html`), stories de React
(`PaymentFlowReact`, `PaymentSummary`) y, en producción, GSP en `payment`. Pero nunca se escribió
como **contrato explícito**: qué cajas existen, quién puede ser hijo de quién, qué espaciado y
color le corresponde a cada una, y qué variantes/estados soporta. Esta falta de spec es lo que
esta historia resuelve.

El resultado de esta iniciativa son dos entregables (detallados en «Siguientes pasos»):
1. Esta spec, como documento y como contenido de una nueva story de Storybook
   (`Patterns/Payment Layout`) con ejemplos de código en GSP y en React.
2. Una historia de Jira en KTUF para trackear el trabajo.

## Alcance y no-objetivos

**En alcance:** las cajas estructurales del layout — jerarquía, composición, espaciado, color de
superficie, breakpoints y variables CSS que el shell expone — y dos implementaciones concretas
del mismo contrato (GSP, React).

**Fuera de alcance — tienen spec propia en otro lado:** el contenido que va *dentro* de cada caja.
`KdsInvoiceSticky`, `KdsSecureFooter`, `KdsPaymentTotal`, `KdsBankRow`/`KdsBankList`,
`KdsMerchantTile`, botones, forms, etc. son componentes que actúan por separado y ya tienen sus
propias stories/specs. Esta spec los referencia por nombre y por su rol en el layout, pero no
redocumenta su contenido interno, props ni variantes visuales.

También fuera de alcance: una implementación nativa (Android/iOS) del shell. El shell es hoy CSS
sobre DOM; para nativo habría que traducir cada regla a un modelo de layout nativo (constraints,
paddings, stacks) pieza por pieza, y es un trabajo aparte.

## Modelo de cajas

```
.kds-payment-stage                        ← página completa (viewport)
 └─ .kds-payment-flow                     ← columna angosta (el "widget")
     └─ .kds-screen.active                ← pantalla visible (una de N, transición fade)
         ├─ .kds-invoice-sticky-wrap      ← opcional — región superior (header de la operación)
         │   └─ .kds-card-elevated.kds-invoice-sticky
         ├─ .kds-card-elevated            ← obligatoria — card de cuerpo (form, resultado, etc.)
         └─ .kds-secure-footer            ← opcional — footer "Pago seguro", HIJO DIRECTO de .kds-screen
```

Regla de composición más importante: **todo lo que cuelga directamente de `.kds-screen` es
significativo para el layout** (invoice-sticky-wrap, card body, secure-footer). Anidar una de
estas piezas dentro de otra (p. ej. meter el `.kds-secure-footer` dentro del `.kds-card-elevated`)
no es solo una desviación visual: el CSS lo neutraliza activamente —
`.kds-card-elevated > .kds-secure-footer { display: none; }` — porque la variante "inside" quedó
descartada a favor de la externa. Ver la pieza 6.

## Spec por pieza

### 1. `.kds-payment-stage` — Stage

| | |
|---|---|
| **Propósito** | Envolver toda la pantalla: centra el flujo y le da fondo a la página. |
| **Composición** | Raíz del layout. Un único hijo directo: `.kds-payment-flow`. |
| **Espaciado** | Desktop: `padding: var(--kds-spacing-2-5) var(--kds-spacing-2) var(--kds-spacing-8)` (≈10px arriba, 8px a los lados, 32px abajo). Mobile (`max-width: 767px`): `padding-top/left/right: 0` — el flow va al borde; se conserva el padding inferior. |
| **Tamaño** | `min-height: 100vh`, `display: flex`, `justify-content: center`. |
| **Color** | `background: var(--kds-color-background-body, var(--kds-color-background-muted))`. Es la única superficie que un comercio puede recolorear (vía `backgroundColor`); por eso se resuelve acá y no como alias en `:root` — un alias quedaría fijo al valor de `:root` y nunca vería el override que el widget setea en `body`. |
| **Breakpoint** | 768px (constante fija, no token: `@media (max-width: 767px)` / `(min-width: 768px)`). Es el breakpoint que usa **todo** el shell, no solo el stage. |

### 2. `.kds-payment-flow` — Flow

| | |
|---|---|
| **Propósito** | La columna donde viven las pantallas — el "widget" propiamente dicho. |
| **Composición** | Hijo directo del stage. Contiene uno o más `.kds-screen` (solo el `.active` se muestra). |
| **Espaciado** | Desktop: `max-width: var(--kds-stage-narrow-max-width)`, resuelto hoy a **420px** (token en `khipu-tokens.css`; el `448px` que aparece en el CSS es solo el *fallback* del `var()` por si la custom property no estuviera definida en runtime — no es el valor real). `gap: var(--kds-spacing-3)` (12px) entre pantallas/cards. |
| **Mobile** | `max-width: none`, `padding: 0` — ocupa el ancho completo del viewport/iframe. |
| **Layout interno** | `display: flex; flex-direction: column`. |

### 3. `.kds-screen` — Screen

| | |
|---|---|
| **Propósito** | Una pantalla del flujo (paso de un wizard, pantalla de resultado, etc.). Solo una está activa a la vez. |
| **Composición** | Hijo directo del flow. Hijos válidos (orden libre, los tres son opcionales salvo la card): `.kds-invoice-sticky-wrap`, `.kds-card-elevated` (obligatoria, una por screen), `.kds-secure-footer`. |
| **Estado** | Por defecto `display: none`. Al agregarle `.active`: `display: flex; flex-direction: column; gap: var(--kds-spacing-3)` + animación `kds-fadein` (opacity 0→1, 0.22s ease). El mecanismo de "cuál screen está activo" (routing/estado de wizard) es responsabilidad de quien integra — el DS solo anima la transición. |
| **Variables que trae (mobile only, < 768px)** | `--collapse-progress: 0` y `--collapse-collapsible-h: 0px` por defecto, **sobreescritas por JS** (ver pieza 5) según el scroll. Se setean acá — no en el wrapper sticky — para que tanto el sticky como sus hermanos (vía `translateY`) puedan heredarlas. |
| **Nota** | `.kds-screen > form { margin-block-start: 0 !important }` — reset defensivo para que un `<form>` como hijo directo no herede el margen por defecto de BeerCSS. |

### 4. `.kds-card-elevated` (hijo directo de `.kds-screen`) — Card de cuerpo

| | |
|---|---|
| **Propósito** | El contenido principal de la pantalla: formulario, selector, resultado, loader. |
| **Composición** | Hijo directo de `.kds-screen`. Es la única pieza obligatoria. Puede tener la clase adicional `.kds-invoice-sticky` cuando ADEMÁS actúa como header (ver pieza 5 — en ese caso vive dentro del wrapper, no es la card de cuerpo). |
| **Layout interno** | `display: flex; flex-direction: column`. `border-radius: var(--kds-radius-card)` (14px) — mismo radio que el header, no el `--kds-radius-md` (8px) de un card genérico. |
| **Convención React** | `KdsCard` (variant `elevated`, el default) renderiza exactamente `<article className="kds-card-elevated">` — es la forma habitual de escribir esta caja en React, pero no es obligatoria: cualquier elemento con la clase sirve. Los modificadores `--action`/`--flush-top` no son props tipadas de `KdsCard`; se agregan a mano vía `className`. |
| **Espaciado** | Dentro del flow: `padding-top/bottom: var(--kds-spacing-3)` (12px) desktop. Mobile: ancho completo, sin margen lateral, mismo `border-radius-card`. **Sin alto mínimo por defecto** — crece con su contenido; ver por qué en el modificador `--action`. |
| **Modificador `--action` (opt-in)** | Fija un alto mínimo común para que la card no "salte" entre pasos (loader, progreso, forms, resultados) y ancla el submit al fondo con `margin-top: auto`. Base: `min-height: calc(36rem + 2 * var(--kds-spacing-3))` (~624px, el alto del form de login de banco más alto del flujo). En pantallas bajas baja por escalones — ver «Combinaciones de composición» más abajo. |
| **Modificador `--flush-top`** | Quita el radio superior **solo en mobile** (pantallas de resultado sin header: la card queda pegada al borde superior en vez de con esquinas sueltas). En desktop, o en mobile con `hover: hover` y `pointer: fine` (caso del widget embebido en iframe: los media-query de ancho ven el viewport del iframe y siempre parecen "mobile", pero el dispositivo de entrada es mouse), se restaura el radio completo. |

### 5. `.kds-invoice-sticky-wrap` + `.kds-card-elevated.kds-invoice-sticky` — Región de invoice/header

| | |
|---|---|
| **Propósito** | Header de la operación (comercio + monto + detalle) que se puede colapsar al hacer scroll en mobile. |
| **Composición** | `.kds-invoice-sticky-wrap` es hijo directo (opcional) de `.kds-screen`, antes de la card de cuerpo. Dentro va exactamente un `.kds-card-elevated.kds-invoice-sticky` (el componente `KdsInvoiceSticky`). |
| **Desktop (≥768px)** | `position: relative` — sin sticky, sin colapso. Se comporta como una card fija. |
| **Mobile (<768px)** | El wrapper es `position: sticky; top: 0; z-index: 10`. El colapso es progresivo y está manejado por el hook `useStickyInvoiceCollapse` (fuera de esta spec — vive en `components/core/hooks`), que escribe `--collapse-progress` (0→1) y `--collapse-collapsible-h` inline sobre `.kds-screen`. El CSS solo reacciona a esas variables: tamaño de fuente del monto, tamaño del logo del comercio, padding, y un `clip-path` que recorta visualmente la card (sin afectar el layout — evita feedback loop de scroll). |
| **Efecto sobre hermanos** | `.kds-invoice-sticky-wrap ~ *` recibe un `translateY` negativo proporcional al colapso, para que la card de cuerpo "suba" y ocupe el espacio que el header liberó. Es un efecto puramente visual (transform), el layout real no cambia. |
| **Radio** | Solo las esquinas inferiores (`0 0 var(--kds-radius-card) var(--kds-radius-card)`) mientras está colapsando — el tope queda plano para que el logo del comercio en la esquina no se recorte. Con mouse (`hover: hover` + `pointer: fine`) se restaura el radio completo en las 4 esquinas. |
| **Branding** | El logo de marca externo (`.kds-brand-row`, fuera de las cards) se muestra en desktop; en mobile se oculta y aparece el logo interno (`.kds-brand-inner`, dentro de la card sticky), que además encoge con el colapso. Es un swap por breakpoint, no una decisión de la pantalla. |

### 6. `.kds-secure-footer` (hijo directo de `.kds-screen`) — Footer seguro

| | |
|---|---|
| **Propósito** | Footer "Pago seguro con Khipu" (candado + texto + logo). |
| **Composición** | **Debe ser hijo directo de `.kds-screen`.** La variante "inside" (como hijo de `.kds-card-elevated`) existe en el componente pero el CSS la fuerza a `display: none` en todos los breakpoints — es intencional, no un bug: el footer externo es el único soportado hoy. **No envolver `.kds-secure-footer` en otro contenedor**: las reglas de la pieza 6 y las de la tabla de combinaciones (pieza 7) seleccionan por `.kds-screen > .kds-secure-footer` / `:has(> .kds-secure-footer)`, hijo directo exacto. Envolverlo rompe ambas. |
| **Espaciado** | `margin-top: calc(-1 * var(--kds-spacing-3))` — cancela el `gap` que `.kds-screen.active` ya puso entre sus hijos, para que el footer quede pegado a la card en vez de flotando separado por el gap estándar. |
| **Contenido** | Fuera de alcance de esta spec — ver spec propia de `KdsSecureFooter` (logo, texto, slot de PSP). |

## Combinaciones de composición (estados del shell)

La presencia/ausencia de `.kds-invoice-sticky-wrap` y de `.kds-secure-footer` como hijo directo
define 4 configuraciones de pantalla, detectadas con `:has()` sobre `.kds-screen`. Son relevantes
para cualquier pantalla que use el modificador `.kds-card-elevated--action`: cada combinación
tiene su propia tabla de escalones de `min-height` según el alto disponible (clave para widgets
embebidos en iframes de alto fijo — KTUF-476):

| Config | Selector | Overhead medido | Escalones de `min-height` (624→528→400→0, por alto total de pantalla) |
|---|---|---|---|
| Header + footer | `:has(.kds-invoice-sticky-wrap):has(> .kds-secure-footer)` | 347px (tel) / 375px (desktop) | corta en 971/875/747 (tel), 999/903/775 (desktop) |
| Sin header, con footer (resultados) | `:not(:has(...)):has(> .kds-secure-footer)` | 146px (tel) / 174px (desktop) | corta en 770/674/546 (tel), 798/702/574 (desktop) |
| Con header, sin footer | `:has(...):not(:has(> ...))` | 267px (tel) / 295px (desktop) | corta en 891/795/667 (tel), 919/823/695 (desktop) |
| Sin header ni footer (loader inicial) | `:not(:has(...)):not(:has(> ...))` | 66px (tel) / 94px (desktop) | corta en 690/594/466 (tel), 718/622/494 (desktop) |

Regla general: un escalón de `min-height` del card (`36rem`→`30rem`→`22rem`→`0`, todos
`+ 2 * var(--kds-spacing-3)` de padding) aplica solo si la pantalla completa (header + card con
ese mínimo + footer + márgenes del stage) todavía entra en el alto disponible; si no entra, baja
al siguiente escalón. Son valores fijos en px, nunca `vh`/`dvh` — un mínimo relativo al viewport
se realimentaría con el alto automático que reportan los iframes (mensaje `RESIZE`, KTUF-239).

## Variables CSS que expone el shell (contrato runtime)

| Variable | Dónde se setea | Quién la lee | Rol |
|---|---|---|---|
| `--collapse-progress` | JS (`useStickyInvoiceCollapse`) sobre `.kds-screen`, default `0` en el CSS (mobile) | El invoice sticky y sus hermanos (pieza 5) | 0 = expandido, 1 = colapsado. Progresivo. |
| `--collapse-collapsible-h` | Idem, default `0px` | Idem | Alto en px del contenido que se oculta al colapsar. |
| `--kds-stage-narrow-max-width` | Token (`khipu-tokens.css`, 420px) | `.kds-payment-flow` | Ancho máximo del widget en desktop. |
| `--kds-color-background-body` | Lo setea el **integrador** (comercio) en `body`/stage; si no, cae a `--kds-color-background-muted` | `.kds-payment-stage` | Ejemplo canónico del patrón "token que sigue a otro como fallback, no como alias": si fuera un alias en `:root` quedaría fijo al valor de `:root` y nunca vería el override. |
| `--kds-radius-card` | Token (14px) | Card de cuerpo, invoice sticky | Radio compartido entre header y body — por eso no usan `--kds-radius-md` (8px, el de un card genérico). |
| `--kds-shadow-card` | Token | Card de cuerpo (vía `.kds-card-elevated`) | Sombra sutil consistente. |

## Reglas duras (romperlas rompe el contrato, no solo el estilo)

1. El `.kds-secure-footer` va como hijo directo de `.kds-screen`, nunca envuelto — ver pieza 6.
2. Ningún alto se expresa en `vh`/`dvh` dentro del shell — rompe en iframes con `RESIZE` dinámico.
3. El breakpoint del shell es 768px fijo, no un token — cualquier implementación en otra
   tecnología debe usar ese mismo corte para que header/footer/card coincidan visualmente con el
   resto del DS.
4. El sticky/colapso del invoice (pieza 5) es mobile-only por diseño; en desktop esa misma pieza
   es una card estática — no replicar el comportamiento sticky en desktop.
5. Un alias de token en `:root` no sirve para algo que un integrador debe poder sobreescribir más
   abajo en el DOM (ver `--kds-color-background-body` arriba) — tiene que ir como fallback en el
   punto de uso.

## Ejemplo — GSP

Mismo contrato que el resto del shell: markup plano con las clases `kds-*`, sin pasar por taglibs
(igual que `OnboardingFlow.example.gsp`, que usa `<div class="kds-stepper">` en vez de su taglib
equivalente). `KdsInvoiceSticky`/`KdsSecureFooter` tampoco tienen taglib propio en GSP — van como
markup directo también. Los nombres de modelo (`amountFormatted`, `merchantName`, claves i18n) son
una propuesta ilustrativa, no una API existente en `payment` — igual que en `OnboardingFlow.example.gsp`.

```gsp
<div class="kds-payment-stage">
  <div class="kds-payment-flow">

    <div class="kds-screen active">

      <div class="kds-invoice-sticky-wrap">
        <div class="kds-card-elevated kds-invoice-sticky">
          <img class="kds-brand-inner" src="${merchantLogoUrl}" alt="" />
          <div class="kds-invoice-amount">${amountFormatted}</div>
          <div class="kds-invoice-merchant">${merchantName}</div>
          <div class="kds-invoice-code">${operationCode}</div>
        </div>
      </div>

      <div class="kds-card-elevated kds-card-elevated--action">
        <g:form action="pay" method="post">
          <h1 class="kds-m-0"><g:message code="payment.confirm.title"/></h1>
          <p><g:message code="payment.confirm.lead"/></p>
          <%-- resto del form: componentes del DS, fuera de alcance de esta spec --%>
        </g:form>
      </div>

      <div class="kds-secure-footer">
        <svg class="kds-secure-footer-lock">...</svg>
        <g:message code="payment.secureFooter.label"/>
        <img class="khipu-mark" src="${assetPath(src: 'khipu-logo-gray.png')}" alt="Khipu" />
      </div>

    </div>

  </div>
</div>
```

## Ejemplo — React

Mismas clases, mismo DOM. `KdsInvoiceSticky` y `KdsSecureFooter` son componentes de dominio ya
existentes, pero ninguno de los dos trae props de contenido tipadas (monto, comercio, etc.): se
les pasa el contenido como `children` — igual que en GSP, el contenido interno de cada pieza es
responsabilidad de quien arma la pantalla, no de esta spec. Importante: `KdsInvoiceSticky` NO
renderiza el `.kds-invoice-sticky-wrap` — ese div hay que ponerlo a mano alrededor, como en
`PaymentFlowReact.stories.tsx`.

```tsx
import { KdsCard } from '../../components/core';
import { KdsInvoiceSticky, KdsSecureFooter } from '../../components/domain';

function PaymentScreen() {
  return (
    <div className="kds-payment-stage">
      <div className="kds-payment-flow">
        <div className="kds-screen active">

          <div className="kds-invoice-sticky-wrap">
            <KdsInvoiceSticky>
              <div className="kds-invoice-amount">{amountFormatted}</div>
              <div className="kds-invoice-merchant">{merchantName}</div>
              <div className="kds-invoice-code">{operationCode}</div>
            </KdsInvoiceSticky>
          </div>

          <KdsCard className="kds-card-elevated--action">
            <h1 className="kds-m-0">{t('payment.confirm.title')}</h1>
            <p>{t('payment.confirm.lead')}</p>
            {/* resto del form: componentes del DS, fuera de alcance de esta spec */}
          </KdsCard>

          <KdsSecureFooter />

        </div>
      </div>
    </div>
  );
}
```

## Implementación en cualquier otra tecnología web

Para reproducir el shell en un framework que no sea GSP ni React (Vue, Svelte, HTML+JS plano,
etc.), el contrato es siempre el mismo porque vive en las clases CSS, no en el template engine:

1. Cargar `khipu-beercss.min.css` (o el bundle BeerCSS del DS) — el shell no funciona sin él.
2. Emitir exactamente la jerarquía de la sección «Modelo de cajas», respetando qué es hijo
   directo de qué (especialmente `.kds-secure-footer` y la card de cuerpo bajo `.kds-screen`).
3. Si hay más de una pantalla, alternar `.active` en el `.kds-screen` correspondiente — el motor
   de routing/wizard es responsabilidad del integrador, no del DS.
4. Si se usa el invoice sticky, cablear `useStickyInvoiceCollapse` (o un equivalente que escriba
   `--collapse-progress`/`--collapse-collapsible-h` sobre `.kds-screen` al scrollear) solo en
   mobile; en desktop no hace falta nada.
5. No fijar alturas en `vh`/`dvh`; si se necesita un alto mínimo estable, usar el modificador
   `--action` con valores fijos en px/rem, igual que la tabla de «Combinaciones de composición».

## Fuera de alcance — specs propias de cada componente

- `KdsInvoiceSticky` — contenido y props del header (monto, comercio, detalle colapsable).
- `KdsSecureFooter` — logo, texto, slot de PSP (spec: `2026-06-23-ktuf-175-logo-secure-footer-design.md`).
- `KdsPaymentTotal`, `KdsBankRow`/`KdsBankList`, `KdsMerchantTile`, `KdsRecapList`, botones,
  forms y demás contenido de la card de cuerpo.

## Checklist de aceptación

- [ ] La story de Storybook muestra el shell navegable con controles para togglear invoice
      sticky y secure footer (las 4 combinaciones de «Combinaciones de composición»).
- [ ] La pestaña Docs incluye esta spec (jerarquía, espaciado, color, variables, reglas duras).
- [ ] El ejemplo GSP (`PaymentLayout.example.gsp`) y el ejemplo React emiten el mismo DOM/clases.
- [ ] Ningún valor de alto usa `vh`/`dvh`.
- [ ] El `.kds-secure-footer` del ejemplo es hijo directo de `.kds-screen` en ambos ejemplos.
- [ ] Se linkea a los specs de `KdsInvoiceSticky` y `KdsSecureFooter` en vez de redocumentarlos.

## Siguientes pasos

1. Crear la historia en Jira (KTUF), hija de KTUF-479 ("Khipu Design System: consolidar tokens y
   gobernanza") salvo indicación contraria.
2. Abrir rama con la clave de esa historia.
3. Invocar `writing-plans` para el plan de implementación de:
   - `src/stories/patterns/PaymentLayout.stories.tsx` (título `Patterns/Payment Layout`)
   - `src/stories/patterns/PaymentLayout.example.gsp`
4. Ejecutar el plan, revisar en Storybook (ambas combinaciones de breakpoint y las 4 del
   `:has()`), y pasar a revisión de código.
