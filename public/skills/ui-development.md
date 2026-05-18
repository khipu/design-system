# Skill: Desarrollo UI con Khipu Design System

## Proposito

Guia exhaustiva para agentes IA que generan prototipos, pantallas y componentes con el Design System Khipu. Este skill cubre la referencia completa de componentes, tokens, patrones de layout, clases CSS utilitarias, anti-patrones y checklist de validacion.

**Contexto tecnico:** Los componentes React usan BeerCSS como capa visual con clases `kds-*`. Todos los componentes tienen prefijo `Kds` y estan construidos con HTML nativo + CSS del bundle BeerCSS. Radix UI se usa para componentes con logica compleja (Modal, Select, Tooltip, BottomSheet).

## Instalacion y configuracion

```bash
npm install @khipu/design-system
```

**Importar componentes:**
```tsx
import { KdsButton, KdsTextField, KdsCard } from '@khipu/design-system';
```

**Importar tokens:**
```tsx
// Desde una app externa
import { colors, spacing, semanticSpacing, borderRadius } from '@khipu/design-system/tokens';

// Desde codigo interno del Design System
import { colors, spacing, semanticSpacing, borderRadius } from '../../tokens';
```

**Configurar tema:**
```tsx
import { KhipuThemeProvider } from '@khipu/design-system';

function App() {
  return (
    <KhipuThemeProvider>
      {/* Tu aplicacion */}
    </KhipuThemeProvider>
  );
}
```

---

## Referencia completa de componentes

### Componentes core

#### KdsButton
Boton de accion principal. CSS: `kds-btn kds-btn-{variant}`.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'outlined-white' \| 'text' \| 'success'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md'` | - | Tamano del boton |
| `fullWidth` | `boolean` | `false` | Ocupa ancho completo. CSS: `kds-btn-block` |
| `loading` | `boolean` | `false` | Muestra spinner y desactiva el boton |
| `startIcon` | `string` | - | Nombre de icono Material Symbols antes del label |
| `endIcon` | `string` | - | Nombre de icono Material Symbols despues del label |

```tsx
<KdsButton variant="primary" fullWidth>Confirmar pago</KdsButton>
<KdsButton variant="outlined" startIcon="arrow_back">Volver</KdsButton>
<KdsButton variant="success" loading>Procesando...</KdsButton>
<KdsButton variant="text" endIcon="arrow_forward">Siguiente</KdsButton>
```

#### KdsTextField
Campo de texto con label flotante. CSS: `field label border`.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `label` | `string` (requerido) | - | Texto del label |
| `helperText` | `string` | - | Texto de ayuda bajo el campo |
| `error` | `boolean` | `false` | Estado de error (aplica clase `invalid`) |
| `fullWidth` | `boolean` | `true` | Ocupa ancho completo |
| `startIcon` | `string` | - | Icono Material Symbols al inicio |
| `endIcon` | `string` | - | Icono Material Symbols al final |
| `readOnly` | `boolean` | `false` | Campo de solo lectura (muestra icono de candado) |

```tsx
<KdsTextField label="RUT Suscriptor" placeholder="12.345.678-9" />
<KdsTextField label="Buscar" startIcon="search" />
<KdsTextField label="Contrasena" type="password" error helperText="Contrasena incorrecta" />
<KdsTextField label="Monto" value="$1.000" readOnly />
```

#### KdsCard + KdsCardBody + KdsCardHeader + KdsCardFooter
Contenedor de contenido agrupado. CSS: `kds-card-elevated` o `kds-card-outlined`.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined'` | `'elevated'` | Estilo de la tarjeta |
| `dimmed` | `boolean` | `false` | Apariencia atenuada. CSS: `kds-card-dimmed` |

```tsx
<KdsCard>
  <KdsCardHeader>Titulo</KdsCardHeader>
  <KdsCardBody>Contenido principal</KdsCardBody>
  <KdsCardFooter>Acciones</KdsCardFooter>
</KdsCard>

<KdsCard variant="outlined">
  <KdsCardBody>Tarjeta con borde</KdsCardBody>
</KdsCard>
```

#### KdsModal
Dialogo modal. Construido sobre Radix Dialog.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `open` | `boolean` (requerido) | - | Controla visibilidad |
| `onClose` | `() => void` (requerido) | - | Callback al cerrar |
| `title` | `string` | - | Titulo del modal |
| `description` | `string` | - | Descripcion adicional |
| `footer` | `ReactNode` | - | Contenido del footer (botones de accion) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Ancho maximo |
| `showCloseButton` | `boolean` | `true` | Muestra boton de cerrar |

```tsx
<KdsModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar pago"
  size="sm"
  footer={
    <>
      <KdsButton variant="text" onClick={handleCancel}>Cancelar</KdsButton>
      <KdsButton variant="primary" onClick={handleConfirm}>Confirmar</KdsButton>
    </>
  }
>
  <p>Estas seguro de que deseas realizar este pago?</p>
</KdsModal>
```

**Guia de tamanos:** `xs` para confirmaciones simples, `sm` para formularios cortos, `md` para contenido complejo, `lg/xl` para tablas o contenido extenso.

#### KdsCheckbox
Casilla de verificacion.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Estado de la casilla |
| `onChange` | `(e) => void` | - | Callback al cambiar |
| `label` | `string` | - | Texto del label |
| `disabled` | `boolean` | `false` | Desactivada |

```tsx
<KdsCheckbox label="Acepto los terminos y condiciones" checked={accepted} onChange={handleChange} />
```

#### KdsSpinner
Indicador de carga. CSS: `kds-spinner`.

```tsx
<KdsSpinner />
```

#### KdsTabs + KdsTabPanel
Navegacion por pestanas. Usa patron de tabs BeerCSS.

```tsx
<KdsTabs value={activeTab} onChange={setActiveTab}>
  <KdsTabPanel label="Transferencia">Contenido transferencia</KdsTabPanel>
  <KdsTabPanel label="Tarjeta">Contenido tarjeta</KdsTabPanel>
</KdsTabs>
```

#### KdsTypography
Textos con estilos consistentes. CSS: `kds-text-{variant}`.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `variant` | Ver variantes abajo | `'body'` | Estilo tipografico |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'error' \| 'success' \| 'inherit'` | - | Color del texto |
| `as` | `ElementTag` | - | Override del elemento HTML |

**Variantes disponibles:**
- `display1` (40px Bold) - Headlines hero
- `display2` (32px Bold) - Headlines grandes
- `heading1` (28px SemiBold) - Encabezados de seccion
- `heading2` (24px SemiBold) - Sub-encabezados
- `heading3` (20px SemiBold) - Titulos de pagina/dialogo
- `body-large` (16px Regular) - Texto cuerpo grande
- `body` (14px Regular) - Texto cuerpo default
- `body-small` (12px Regular) - Texto cuerpo pequeno
- `label` (12px SemiBold UPPERCASE) - Labels de seccion, overlines
- `label-small` (10px Medium) - Labels pequenos, codigos
- `muted` (14px Regular) - Texto secundario/muted
- `link` (14px Regular) - Estilo de enlace

```tsx
<KdsTypography variant="heading2">Titulo de seccion</KdsTypography>
<KdsTypography variant="body">Texto regular del cuerpo</KdsTypography>
<KdsTypography variant="body" color="muted">Texto secundario</KdsTypography>
<KdsTypography variant="label">ETIQUETA</KdsTypography>
```

#### KdsAlert
Mensajes de alerta. CSS: `kds-alert kds-{severity}`.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `severity` | `'success' \| 'info' \| 'warning' \| 'error'` (requerido) | - | Tipo de alerta |
| `title` | `string` | - | Titulo de la alerta |
| `icon` | `string` | - | Nombre de icono Material Symbols |
| `inline` | `boolean` | `false` | Variante compacta. CSS: `kds-alert-inline` |
| `onClose` | `() => void` | - | Muestra boton de cerrar |

```tsx
<KdsAlert severity="info">El tope mensual es el monto maximo posible a cobrar.</KdsAlert>
<KdsAlert severity="success" title="Todo listo!">Espera la confirmacion de tu banco.</KdsAlert>
<KdsAlert severity="error" onClose={() => setOpen(false)}>Error al procesar el pago.</KdsAlert>
<KdsAlert severity="warning" inline>Tu sesion expirara pronto.</KdsAlert>
```

#### KdsLinearProgress
Barra de progreso.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `value` | `number` (0-100) | - | Porcentaje. Si no se pasa, es indeterminada |

```tsx
<KdsLinearProgress value={65} />
<KdsLinearProgress /> {/* Indeterminada */}
```

#### KdsLogoHeader + subcomponentes
Fila de marca con logo Khipu. CSS: `kds-brand-row`.

Subcomponentes: `KdsLogoHeaderLogo`, `KdsLogoHeaderSeparator`, `KdsLogoHeaderCode`, `KdsLogoHeaderCloseButton`.

```tsx
<KdsLogoHeader>
  <KdsLogoHeaderLogo />
  <KdsLogoHeaderSeparator />
  <KdsLogoHeaderCode>fdap-sr2x-q3pf</KdsLogoHeaderCode>
</KdsLogoHeader>
```

#### KdsRadioGroup
Grupo de radio buttons.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `options` | `Array<{value, label}>` | - | Opciones disponibles |
| `value` | `string` | - | Valor seleccionado |
| `onChange` | `(value) => void` | - | Callback al cambiar |

```tsx
<KdsRadioGroup
  options={[
    { value: 'transfer', label: 'Transferencia' },
    { value: 'card', label: 'Tarjeta de credito' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

#### KdsSelect
Selector/dropdown. Construido sobre Radix.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `label` | `string` | - | Label del campo |
| `options` | `Array<{value, label}>` | - | Opciones |
| `placeholder` | `string` | - | Texto placeholder |
| `helperText` | `string` | - | Texto de ayuda |
| `error` | `boolean` | - | Estado de error |

```tsx
<KdsSelect
  label="Banco"
  placeholder="Selecciona tu banco"
  options={[
    { value: 'security', label: 'Banco Security' },
    { value: 'chile', label: 'Banco de Chile' },
  ]}
/>
```

#### KdsChip
Etiquetas y badges.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `label` | `string` | - | Texto del chip |
| `color` | `string` | - | Color del chip |
| `icon` | `string` | - | Icono Material Symbols |
| `onDelete` | `() => void` | - | Muestra boton de eliminar |

```tsx
<KdsChip label="Activo" color="success" />
<KdsChip label="Filtro" icon="filter_alt" onDelete={handleDelete} />
```

#### KdsSnackbar
Notificacion toast temporal.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `open` | `boolean` | - | Visibilidad |
| `message` | `string` | - | Texto del mensaje |
| `severity` | `'success' \| 'info' \| 'warning' \| 'error'` | - | Tipo |
| `autoHideDuration` | `number` | - | Milisegundos antes de ocultar |

```tsx
<KdsSnackbar open={showMsg} message="Pago realizado con exito" severity="success" autoHideDuration={5000} />
```

#### KdsTooltip
Tooltip informativo. Construido sobre Radix.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `content` | `string` | - | Texto del tooltip |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | - | Posicion |

```tsx
<KdsTooltip content="Copiar al portapapeles" side="top">
  <button>Copiar</button>
</KdsTooltip>
```

#### KdsAccordion
Panel expandible.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `title` | `string` | - | Titulo visible siempre |
| `defaultOpen` | `boolean` | `false` | Abierto por defecto |

```tsx
<KdsAccordion title="Ver detalle del cobro" defaultOpen>
  <p>Detalle del cobro aqui...</p>
</KdsAccordion>
```

### Componentes core adicionales

#### KdsCopyRow
Fila con label, valor y boton de copiar.

```tsx
<KdsCopyRow label="Codigo de pago" value="fdap-sr2x-q3pf" />
```

#### KdsCopyableTable
Tabla completa con filas copiables.

```tsx
<KdsCopyableTable rows={[
  { label: 'RUT', value: '76.187.287-7' },
  { label: 'Banco', value: 'Banco Security' },
  { label: 'Cuenta', value: 'Cuenta Corriente' },
]} />
```

#### KdsCountdown
Cuenta regresiva con callback al expirar.

```tsx
<KdsCountdown targetDate={new Date('2025-12-31')} onExpire={handleExpire} label="Tiempo restante" />
```

#### KdsDivider
Linea divisoria.

```tsx
<KdsDivider />
<KdsDivider variant="dashed" />
```

#### KdsExpandPanel
Panel expandible (similar a KdsAccordion pero mas simple).

```tsx
<KdsExpandPanel title="Mas informacion" defaultExpanded={false}>
  <p>Contenido expandible</p>
</KdsExpandPanel>
```

#### KdsSectionNote
Nota de seccion con icono.

```tsx
<KdsSectionNote icon="info">
  Este proceso puede demorar hasta 24 horas habiles.
</KdsSectionNote>
```

#### KdsStatusBlock
Bloque de estado visual.

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `status` | `'success' \| 'pending' \| 'warning' \| 'error'` | - | Estado visual |
| `title` | `string` | - | Titulo |
| `message` | `string` | - | Mensaje descriptivo |
| `inline` | `boolean` | `false` | Variante compacta |

```tsx
<KdsStatusBlock status="success" title="Pago exitoso" message="Tu pago fue procesado correctamente." />
<KdsStatusBlock status="pending" title="En proceso" message="Estamos verificando tu transferencia." />
```

#### KdsStepper
Indicador de pasos.

```tsx
<KdsStepper steps={['Datos', 'Banco', 'Confirmacion']} activeStep={1} />
```

#### KdsSegmentedTabs
Tabs segmentados (selector de opciones).

```tsx
<KdsSegmentedTabs
  tabs={[{ label: 'Mensual' }, { label: 'Anual' }]}
  value={0}
  onChange={setTabIndex}
/>
```

### Componentes de dominio (domain)

#### KdsBankRow
Fila de banco individual. CSS: `kds-bank-row`.

```tsx
<KdsBankRow name="Banco Security" logoUrl="/logos/security.svg" selected={true} onClick={handleClick} />
```

#### KdsBankList
Grilla de bancos con seleccion.

```tsx
<KdsBankList
  banks={[
    { id: '1', name: 'Banco Security', logoUrl: '/logos/security.svg' },
    { id: '2', name: 'Banco de Chile', logoUrl: '/logos/chile.svg' },
  ]}
  selectedId="1"
  onSelect={handleSelect}
  qrRow={<KdsQrRow title="Pagar con QR" description="Escanea desde tu app" />}
/>
```

#### KdsBankModal
Modal de seleccion de banco. Usa Radix Dialog.

```tsx
<KdsBankModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  banks={bankList}
  onSelect={handleBankSelect}
  title="Selecciona tu banco"
/>
```

#### KdsQrRow
Fila de opcion QR. CSS: `kds-qr-row`.

```tsx
<KdsQrRow title="Pagar con QR" description="Escanea el codigo con tu app" icon="qr_code" badge="Nuevo" />
```

#### KdsBottomSheet
Panel inferior deslizante. Usa Radix Dialog.

```tsx
<KdsBottomSheet
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Opciones"
  actions={<KdsButton fullWidth>Aceptar</KdsButton>}
>
  <p>Contenido del bottom sheet</p>
</KdsBottomSheet>
```

#### KdsInvoiceSticky
Display sticky de monto/codigo de pago. CSS: `kds-invoice-sticky`.

```tsx
<KdsInvoiceSticky>
  <div className="kds-invoice-header">
    <p className="kds-invoice-amount">$3.300</p>
    <p className="kds-invoice-code">fdap-sr2x-q3pf</p>
  </div>
</KdsInvoiceSticky>
```

#### KdsSecureFooter
Footer de seguridad para flujos de pago. CSS: `kds-secure-footer`.

```tsx
<KdsSecureFooter />
<KdsSecureFooter variant="inside" />
```

#### KdsRecapList
Lista de resumen con pares label/valor.

```tsx
<KdsRecapList items={[
  { label: 'Monto', value: '$3.300' },
  { label: 'Banco', value: 'Banco Security' },
  { label: 'RUT', value: '76.187.287-7' },
]} />
```

#### KdsCardPlan
Tarjeta de plan con seleccion.

```tsx
<KdsCardPlan
  title="Plan Pro"
  price="$9.990/mes"
  features={['100 transacciones', 'Soporte prioritario', 'API access']}
  recommended={true}
  onSelect={handleSelect}
/>
```

#### KdsCardSelector
Tarjeta seleccionable con icono.

```tsx
<KdsCardSelector
  title="Transferencia"
  description="Paga directamente desde tu banco"
  icon="account_balance"
  selected={isSelected}
  onClick={handleClick}
/>
```

---

## Sistema de tokens

### Espaciado (base grid de 8px)

```tsx
import { spacing } from '@khipu/design-system/tokens';

spacing[0]     // '0px'
spacing[0.5]   // '4px'
spacing[1]     // '8px'       (base)
spacing[1.5]   // '12px'
spacing[2]     // '16px'
spacing[2.5]   // '20px'
spacing[3]     // '24px'
spacing[4]     // '32px'
spacing[5]     // '40px'
spacing[6]     // '48px'
spacing[8]     // '64px'
spacing[10]    // '80px'
spacing[12]    // '96px'
```

### Espaciado semantico

```tsx
import { semanticSpacing } from '@khipu/design-system/tokens';

// Gaps de layout
semanticSpacing.formGap       // '20px'  - Entre campos de formulario
semanticSpacing.sectionGap    // '32px'  - Entre secciones principales
semanticSpacing.stackGap      // '16px'  - Entre elementos apilados
semanticSpacing.inlineGap     // '8px'   - Entre elementos en linea

// Card
semanticSpacing.card.padding  // '10px 20px'
semanticSpacing.card.gap      // '16px'  - Gap interno entre elementos del card
semanticSpacing.card.listGap  // '12px'  - Gap entre cards en una lista

// Modal
semanticSpacing.modalPadding  // '24px'

// Button
semanticSpacing.button.padding   // '8px 22px'
semanticSpacing.button.minHeight // '50px'

// Input
semanticSpacing.input.padding    // '16px 12px'

// Box/Container
semanticSpacing.box.padding      // '32px 20px'
```

### Espaciado responsive

```tsx
import { responsiveSpacing } from '@khipu/design-system/tokens';

// Container padding
responsiveSpacing.container.mobile   // '16px'
responsiveSpacing.container.tablet   // '24px'
responsiveSpacing.container.desktop  // '32px'

// Section gaps
responsiveSpacing.sectionGap.mobile  // '24px'
responsiveSpacing.sectionGap.tablet  // '32px'
responsiveSpacing.sectionGap.desktop // '48px'

// Element gaps
responsiveSpacing.elementGap.mobile  // '12px'
responsiveSpacing.elementGap.tablet  // '16px'
responsiveSpacing.elementGap.desktop // '24px'
```

### Border radius

```tsx
import { borderRadius } from '@khipu/design-system/tokens';

borderRadius.sm      // '4px'   - Buttons, inputs
borderRadius.md      // '8px'
borderRadius.lg      // '12px'
borderRadius.xl      // '16px'
borderRadius.card    // '14px'  - KdsCard
borderRadius.modal   // '20px'  - KdsModal
borderRadius.chip    // '16px'  - KdsChip
borderRadius.button  // '4px'   - KdsButton
borderRadius.input   // '4px'   - KdsTextField
borderRadius.full    // '9999px' - Avatares, pills
```

### Colores

```tsx
import { colors } from '@khipu/design-system/tokens';

// Primarios (purpura Khipu)
colors.primary.main          // '#8347AD'
colors.primary.light         // '#9B6BBD'
colors.primary.dark          // '#5B3179'
colors.primary.container     // '#F3E5FF'
colors.primary.contrastText  // '#FFFFFF'

// Secundarios (cyan)
colors.secondary.main        // '#3CB4E5'
colors.secondary.light       // '#6AC6EB'
colors.secondary.dark        // '#198EBE'

// Semanticos
colors.success.main          // '#2E7D32'
colors.error.main            // '#D32F2F'
colors.warning.main          // '#EF6C00'
colors.info.main             // '#0288D1'

// Texto
colors.text.primary          // '#333333'
colors.text.secondary        // 'rgba(0, 0, 0, 0.60)'
colors.text.disabled         // '#9E9E9E'
colors.text.muted            // '#81848F'
colors.text.strong           // '#272930'

// Fondos
colors.background.default    // '#FFFFFF'
colors.background.paper      // '#FFFFFF'
colors.background.elevated   // '#FAFAFA'
colors.background.muted      // '#F4F4F7'

// Grises
colors.gray[50]              // '#F9FAFB'
colors.gray[100]             // '#F3F4F6'
colors.gray[200]             // '#E5E7EB'
colors.gray[300]             // '#D1D5DB'
colors.gray[500]             // '#6B7280'
colors.gray[900]             // '#111827'

// Links
colors.link.main             // '#096BDE'

// Bordes
colors.divider               // 'rgba(0, 0, 0, 0.12)'
```

### Tipografia

```tsx
import { fontFamilies, fontSizes, fontWeights, typography } from '@khipu/design-system/tokens';

fontFamilies.primary  // '"Public Sans", -apple-system, ..., sans-serif'
fontFamilies.mono     // '"Roboto Mono", "SF Mono", monospace'

fontSizes.xs    // '0.75rem'   (12px)
fontSizes.sm    // '0.875rem'  (14px)
fontSizes.base  // '1rem'      (16px)
fontSizes.lg    // '1.125rem'  (18px)
fontSizes.xl    // '1.25rem'   (20px)

fontWeights.regular   // 400
fontWeights.medium    // 500
fontWeights.semiBold  // 600
fontWeights.bold      // 700

// Presets completos
typography.h1    // { fontFamily, fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 }
typography.h6    // { fontFamily, fontWeight: 600, fontSize: '1.25rem', lineHeight: '32px' }
typography.body1 // { fontFamily, fontWeight: 400, fontSize: '1rem', lineHeight: 1.5 }
typography.body2 // { fontFamily, fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.43 }
```

### Sombras

```tsx
import { shadows } from '@khipu/design-system/tokens';

shadows.card      // elevation 1 - Para KdsCard elevated
shadows.button    // elevation 2 - Para KdsButton primary
shadows.dropdown  // elevation 8 - Para dropdowns
shadows.modal     // elevation 24 - Para KdsModal
shadows.none      // 'none'
```

### Breakpoints

```tsx
import { breakpoints } from '@khipu/design-system/tokens';

breakpoints.mobile   // '600px'  - < 600px = mobile
breakpoints.tablet   // '840px'  - 600px-840px = tablet
breakpoints.desktop  // '1280px' - > 840px = desktop
```

---

## Patrones de layout

### 1. FormStack - Formulario vertical en card

```tsx
import { KdsCard, KdsCardBody } from '@khipu/design-system';
import { KdsButton } from '@khipu/design-system';
import { KdsTextField } from '@khipu/design-system';
import { semanticSpacing } from '@khipu/design-system/tokens';

<KdsCard>
  <KdsCardBody>
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: semanticSpacing.formGap,  // 20px entre campos
    }}>
      <KdsTextField label="Nombre completo" fullWidth />
      <KdsTextField label="RUT" placeholder="12.345.678-9" fullWidth />
      <KdsTextField label="Correo electronico" type="email" fullWidth />
      <KdsButton variant="primary" fullWidth>
        Confirmar pago
      </KdsButton>
    </form>
  </KdsCardBody>
</KdsCard>
```

### 2. CardGrid - Grilla responsive de cards

```tsx
import { semanticSpacing } from '@khipu/design-system/tokens';

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: semanticSpacing.card.listGap,  // 12px entre cards
}}>
  <KdsCard variant="outlined">
    <KdsCardBody>
      <KdsTypography variant="heading3">Transferencia</KdsTypography>
      <KdsTypography variant="body" color="muted">Paga desde tu banco</KdsTypography>
    </KdsCardBody>
  </KdsCard>
  {/* Mas cards... */}
</div>
```

### 3. PaymentScreenLayout - Pantalla completa de pago

```tsx
import { semanticSpacing } from '@khipu/design-system/tokens';

<div style={{
  maxWidth: '440px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: semanticSpacing.stackGap,  // 16px entre secciones
  minHeight: '100vh',
}}>
  {/* 1. Brand row */}
  <KdsLogoHeader>
    <KdsLogoHeaderLogo />
    <KdsLogoHeaderSeparator />
    <KdsLogoHeaderCode>fdap-sr2x-q3pf</KdsLogoHeaderCode>
  </KdsLogoHeader>

  {/* 2. Invoice sticky */}
  <KdsInvoiceSticky>
    <div className="kds-invoice-header">
      <p className="kds-invoice-amount">$3.300</p>
      <p className="kds-invoice-code">fdap-sr2x-q3pf</p>
    </div>
  </KdsInvoiceSticky>

  {/* 3. Main content card */}
  <KdsCard>
    <KdsCardBody>{/* Contenido principal */}</KdsCardBody>
  </KdsCard>

  {/* 4. Button stack */}
  <div className="kds-btn-stack">
    <KdsButton variant="primary" fullWidth>Ya hice la transferencia</KdsButton>
    <KdsButton variant="text" fullWidth>Cancelar pago</KdsButton>
  </div>

  {/* 5. Secure footer */}
  <KdsSecureFooter />
</div>
```

### 4. ButtonStack - Botones apilados verticalmente

```tsx
<div className="kds-btn-stack">
  <KdsButton variant="primary" fullWidth>Confirmar transferencia</KdsButton>
  <KdsButton variant="outlined" fullWidth>Cambiar banco</KdsButton>
  <KdsButton variant="text" fullWidth>Cancelar pago</KdsButton>
</div>
```

La clase `kds-btn-stack` aplica `display: flex; flex-direction: column;` con gap apropiado.

### 5. SectionStack - Secciones separadas

```tsx
import { semanticSpacing } from '@khipu/design-system/tokens';

<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: semanticSpacing.sectionGap,  // 32px entre secciones
}}>
  <KdsCard>
    <KdsCardBody>
      <KdsTypography variant="heading3">Datos personales</KdsTypography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formGap }}>
        <KdsTextField label="Nombre" fullWidth />
        <KdsTextField label="Email" type="email" fullWidth />
      </div>
    </KdsCardBody>
  </KdsCard>

  <KdsCard>
    <KdsCardBody>
      <KdsTypography variant="heading3">Datos de pago</KdsTypography>
      {/* Campos de pago */}
    </KdsCardBody>
  </KdsCard>
</div>
```

**Referencia:** Estos patrones tienen stories en Storybook en la seccion `Patterns/Layout`.

---

## Clases CSS utilitarias

### Layout (Flexbox)

| Clase | Descripcion |
|-------|-------------|
| `kds-flex` | `display: flex` |
| `kds-flex-col` | `display: flex; flex-direction: column` |
| `kds-flex-row` | `display: flex; flex-direction: row` |
| `kds-flex-wrap` | `flex-wrap: wrap` |
| `kds-flex-1` | `flex: 1` |
| `kds-flex-shrink-0` | `flex-shrink: 0` |

### Grid

| Clase | Descripcion |
|-------|-------------|
| `kds-grid-2col` | Grid de 2 columnas responsive |
| `kds-grid-3col` | Grid de 3 columnas responsive |
| `kds-grid-4col` | Grid de 4 columnas responsive |
| `kds-grid-cell-stretch` | Hijo ocupa todo el ancho de la celda |

### Botones

| Clase | Descripcion |
|-------|-------------|
| `kds-btn-stack` | Grupo vertical de botones full-width |

### Ancho

| Clase | Descripcion |
|-------|-------------|
| `kds-w-full` | `width: 100%` |

### Ejemplo combinado

```tsx
<div className="kds-flex-col" style={{ gap: semanticSpacing.formGap }}>
  <div className="kds-grid-2col">
    <KdsTextField label="Nombre" fullWidth />
    <KdsTextField label="Apellido" fullWidth />
  </div>
  <KdsTextField label="Email" type="email" fullWidth />
  <div className="kds-btn-stack">
    <KdsButton variant="primary" fullWidth>Enviar</KdsButton>
  </div>
</div>
```

---

## Anti-patrones (seccion critica)

Errores comunes que los agentes IA deben evitar. Cada anti-patron incluye la correccion.

### 1. Valores de espaciado hardcodeados

```tsx
// MAL
<div style={{ padding: '16px', gap: '20px' }}>

// BIEN
import { spacing, semanticSpacing } from '@khipu/design-system/tokens';
<div style={{ padding: spacing[2], gap: semanticSpacing.formGap }}>
```

### 2. Colores hardcodeados

```tsx
// MAL
<p style={{ color: '#8347AD' }}>Texto purpura</p>
<div style={{ background: '#F4F4F7' }}>Fondo gris</div>

// BIEN
import { colors } from '@khipu/design-system/tokens';
<p style={{ color: colors.primary.main }}>Texto purpura</p>
<div style={{ background: colors.background.muted }}>Fondo gris</div>
```

### 3. Componentes custom en lugar de Kds*

```tsx
// MAL
<div className="custom-card" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
  <h3>Titulo</h3>
</div>

// BIEN
<KdsCard>
  <KdsCardBody>
    <KdsTypography variant="heading3">Titulo</KdsTypography>
  </KdsCardBody>
</KdsCard>
```

### 4. Gap incorrecto entre campos de formulario

```tsx
// MAL - spacing[1] es 8px, muy poco para formularios
<form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

// BIEN - formGap es 20px, el valor correcto
<form style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formGap }}>
```

### 5. Botones sin fullWidth en mobile

```tsx
// MAL - botones pequenos que no se ven bien en mobile
<div>
  <KdsButton variant="primary">Confirmar</KdsButton>
  <KdsButton variant="text">Cancelar</KdsButton>
</div>

// BIEN - usa kds-btn-stack o fullWidth
<div className="kds-btn-stack">
  <KdsButton variant="primary" fullWidth>Confirmar</KdsButton>
  <KdsButton variant="text" fullWidth>Cancelar</KdsButton>
</div>
```

### 6. Spacing de seccion incorrecto

```tsx
// MAL - spacing[2] = 16px es muy poco entre secciones
<div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
  <KdsCard>...</KdsCard>
  <KdsCard>...</KdsCard>
</div>

// BIEN - sectionGap = 32px entre secciones principales
<div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.sectionGap }}>
  <KdsCard>...</KdsCard>
  <KdsCard>...</KdsCard>
</div>
```

### 7. Falta KdsSecureFooter en flujos de pago

```tsx
// MAL - sin footer de seguridad
<div>
  <KdsCard>...</KdsCard>
  <KdsButton fullWidth>Pagar</KdsButton>
</div>

// BIEN - siempre incluir en flujos de pago
<div>
  <KdsCard>...</KdsCard>
  <KdsButton fullWidth>Pagar</KdsButton>
  <KdsSecureFooter />
</div>
```

### 8. Falta KdsLogoHeader en pantallas de pago

```tsx
// MAL - sin brand row
<div>
  <KdsCard>Contenido de pago</KdsCard>
</div>

// BIEN - siempre incluir brand row en pantallas de pago
<div>
  <KdsLogoHeader>
    <KdsLogoHeaderLogo />
    <KdsLogoHeaderSeparator />
    <KdsLogoHeaderCode>codigo-pago</KdsLogoHeaderCode>
  </KdsLogoHeader>
  <KdsCard>Contenido de pago</KdsCard>
</div>
```

### 9. Usar px directamente en lugar de tokens

```tsx
// MAL
<div style={{ borderRadius: '14px', padding: '10px 20px' }}>

// BIEN
import { borderRadius, semanticSpacing } from '@khipu/design-system/tokens';
<div style={{ borderRadius: borderRadius.card, padding: semanticSpacing.card.padding }}>
```

### 10. Ignorar soporte de dark mode

```tsx
// MAL - colores hardcodeados que no se adaptan
<div style={{ background: '#FFFFFF', color: '#333333' }}>

// BIEN - usar variables CSS que se adaptan al tema, o tokens
<div style={{ background: colors.background.default, color: colors.text.primary }}>
```

### 11. Falta padding responsive en contenedores

```tsx
// MAL - padding fijo que no se adapta
<main style={{ padding: '32px' }}>

// BIEN - usar responsiveSpacing
import { responsiveSpacing } from '@khipu/design-system/tokens';
// Aplicar con media queries o CSS custom properties
// Mobile: 16px, Tablet: 24px, Desktop: 32px
```

### 12. Anidar cards dentro de cards

```tsx
// MAL - cards anidados crean confusion visual
<KdsCard>
  <KdsCardBody>
    <KdsCard>
      <KdsCardBody>Contenido interno</KdsCardBody>
    </KdsCard>
  </KdsCardBody>
</KdsCard>

// BIEN - estructura plana, usar KdsDivider para separar
<KdsCard>
  <KdsCardBody>
    <div>Seccion 1</div>
    <KdsDivider />
    <div>Seccion 2</div>
  </KdsCardBody>
</KdsCard>
```

---

## Checklist de validacion

Antes de entregar codigo, los agentes IA deben verificar cada punto:

- [ ] Todo el espaciado usa tokens (`spacing[N]` o `semanticSpacing.*`) - nunca valores px hardcodeados
- [ ] Todos los colores usan imports de tokens (`colors.*`) - nunca hex hardcodeados
- [ ] Todos los elementos interactivos usan componentes `Kds*` - nunca HTML custom
- [ ] Los campos de formulario usan `semanticSpacing.formGap` (20px) como gap
- [ ] Las secciones principales usan `semanticSpacing.sectionGap` (32px) como gap
- [ ] Las pantallas de pago incluyen `KdsLogoHeader` + `KdsSecureFooter`
- [ ] Los botones en contexto mobile usan `fullWidth` o `kds-btn-stack`
- [ ] Las variantes de KdsCard coinciden con el contexto (`elevated` para contenido principal, `outlined` para seleccion)
- [ ] Los tamanos de KdsModal coinciden con el contenido (`xs` para confirmaciones, `sm` para formularios, `md` para contenido complejo)
- [ ] Los textos siguen la voz y tono de Khipu (cercana, clara, confiable, directa)
- [ ] La tipografia usa `KdsTypography` con la variante correcta
- [ ] Los iconos usan la fuente Material Symbols Outlined (e.g. `<i className="material-symbols-outlined">icon_name</i>`)
- [ ] Todos los componentes se importan desde `@khipu/design-system`
- [ ] Los `KdsTextField` siempre tienen prop `label` (es requerido)
- [ ] Los border radius usan `borderRadius.*` tokens, no valores numericos
- [ ] Los `KdsAlert` tienen `severity` definido

---

## Integracion MCP con Storybook

Cuando Storybook esta corriendo en `localhost:6006`, los agentes IA pueden usar herramientas MCP para verificacion visual y documentacion:

### Herramientas disponibles

**`mcp__storybook__preview-stories`**
Obtiene URLs de preview para cualquier componente. Util para verificar visualmente que el codigo generado coincide con el diseno esperado.

```
// Ejemplo: obtener preview de KdsButton
mcp__storybook__preview-stories({ stories: ['core-kdsbutton--primary'] })
```

**`mcp__storybook__get-storybook-story-instructions`**
Obtiene guias para escribir stories siguiendo las convenciones del proyecto.

### Flujo recomendado para agentes

1. **Antes de implementar:** Usar `preview-stories` para ver como luce el componente en Storybook
2. **Durante implementacion:** Consultar props y variantes disponibles en esta guia
3. **Despues de implementar:** Verificar visualmente contra las stories existentes

### Cobertura de componentes

Con el 100% de cobertura de stories, cada componente del Design System puede ser previewed via MCP. Esto incluye:
- Los 17 componentes core originales
- Los componentes core adicionales (KdsCopyRow, KdsStatusBlock, KdsStepper, etc.)
- Los 10 componentes de dominio (KdsBankRow, KdsBankList, KdsBottomSheet, etc.)
- Los 5 patrones de layout (FormStack, CardGrid, PaymentScreenLayout, etc.)

### Activar MCP

```bash
npm run storybook  # Inicia Storybook en puerto 6006, MCP disponible en /mcp
```

---

## Como usar este skill

### Paso 1: Integra este archivo en tu agente de IA
- **Claude (Projects):** Sube este archivo en "Project knowledge"
- **Cursor/Claude Code:** Anade como contexto en tu workspace
- **ChatGPT:** Sube al inicio de la conversacion

### Paso 2: Haz tu solicitud

**Para generar una pantalla:**
```
Crea una pantalla de pago con header, formulario de datos, botones de accion y footer seguro.
Usa los componentes y tokens del Design System Khipu.
```

**Para generar un componente:**
```
Crea un formulario de suscripcion con email, monto, banco y boton de confirmacion.
```

**Para revisar codigo:**
```
Revisa este codigo y reemplaza valores hardcodeados por tokens de Khipu:
[tu codigo aqui]
```

**Para migrar codigo legacy:**
```
Migra este componente custom para usar KdsCard, KdsButton y KdsTextField del Design System:
[codigo a migrar]
```

---

## Recursos adicionales

- **Storybook (documentacion visual):** https://design.khipu.com
- **Guia de voz y tono:** `BRAND_GUIDE_FOR_AI.md` en el repositorio
- **Tokens completos:** Seccion "Design Tokens" en Storybook
- **Componentes core:** Seccion "Core" en Storybook
- **Componentes domain:** Seccion "Domain" en Storybook
- **Patrones de layout:** Seccion "Patterns/Layout" en Storybook

---

**Version:** 1.0.0
**Ultima actualizacion:** 2026-05-12
**Mas informacion:** https://design.khipu.com
