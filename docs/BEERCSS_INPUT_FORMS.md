# BeerCSS - Documentación Completa de Inputs y Formularios

> **Guía Definitiva** - Material Design 3 con Branding Khipu

## 📋 Tabla de Contenidos

### Parte I: Inputs y Floating Labels
1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Elementos y Estructura HTML](#elementos-y-estructura-html)
3. [Estados Completos](#estados-completos)
4. [Variables CSS](#variables-css)
5. [Clases y Selectores](#clases-y-selectores)
6. [Código CSS Final](#código-css-final)
7. [Principios de Diseño](#principios-de-diseño)
8. [Ejemplos de Uso](#ejemplos-de-uso)
9. [Troubleshooting](#troubleshooting)

### Parte II: Formularios Completos
10. [Estructura de Formularios](#estructura-de-formularios)
11. [Tipos de Inputs](#tipos-de-inputs)
12. [Agrupación y Layout](#agrupación-y-layout)
13. [Validación de Formularios](#validación-de-formularios)
14. [Formularios Multi-paso](#formularios-multi-paso)
15. [Patrones de Submit](#patrones-de-submit)
16. [Integración Grails/GSP](#integración-grailsgsp)
17. [Accesibilidad](#accesibilidad)
18. [Ejemplos Completos](#ejemplos-completos)

---

# PARTE I: INPUTS Y FLOATING LABELS

---

## Arquitectura del Sistema

### Cómo Funciona BeerCSS con Floating Labels

```
┌─────────────────────────────────────────┐
│  .field.label.border                     │  ← Contenedor
│  ┌───────────────────────────────────┐  │
│  │ <input placeholder=" " />         │  │  ← Input (border transparent)
│  │ <label>Campo</label>              │  │  ← Label (posición absolute)
│  │   └─ ::after (pseudo-elemento)    │  │  ← Notch + Border visible
│  │ <span class="helper">Ayuda</span> │  │  ← Helper text
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Elementos Clave y Sus Roles

| Elemento | Rol | Visible |
|----------|-----|---------|
| `.field` | Contenedor principal | No |
| `input` | Campo de entrada | Sí (contenido) |
| `input[border]` | Border del input | ⚠️ Transparente en BeerCSS |
| `label` | Texto flotante | Sí |
| `label::after` | **Notch + Border visible** | Sí (cuando label flota) |
| `.helper` | Mensaje de ayuda | Sí |

**⚡ Concepto Clave:** En BeerCSS, el border visible NO viene del `input`, sino del pseudo-elemento `label::after`. El input tiene `border: transparent`.

---

## Elementos y Estructura HTML

### HTML Básico

```html
<div class="field label border">
  <input type="text" id="nombre" placeholder=" " required>
  <label for="nombre">Nombre completo</label>
  <span class="helper">Ingresa tu nombre</span>
</div>
```

### Clases del Contenedor `.field`

| Clase | Efecto |
|-------|--------|
| `.field` | Contenedor base (obligatorio) |
| `.label` | Activa floating labels |
| `.border` | Activa notch + border outline |
| `.fill` | Variante con background (no usado en Khipu) |
| `.invalid` | Estado de error (rojo) |

### Atributos Importantes

```html
<input
  type="text"
  id="campo"
  placeholder=" "           ← DEBE ser un espacio (no vacío)
  required                  ← Opcional
/>
<label for="campo">        ← DEBE coincidir con id del input
```

**⚠️ Crítico:** `placeholder=" "` (un espacio) es necesario para que `:placeholder-shown` detecte si el input está vacío.

---

## Estados Completos

### Matriz de Estados (12 combinaciones)

| # | Value | Focus | Hover | Error | Label Color | Border Color | Notch Visible |
|---|-------|-------|-------|-------|-------------|--------------|---------------|
| 1 | ❌ | ❌ | ❌ | ❌ | Secondary (60%) | Outline (gris) | ❌ |
| 2 | ❌ | ❌ | ✅ | ❌ | Darker (70%) | **Outline hover** (gris oscuro) | ❌ |
| 3 | ❌ | ✅ | ❌ | ❌ | Primary (purple) | Primary (purple, 2px) | ✅ |
| 4 | ❌ | ✅ | ✅ | ❌ | Primary (purple) | Primary (purple, 2px) | ✅ |
| 5 | ✅ | ❌ | ❌ | ❌ | Secondary (60%) | Outline (gris) | ✅ |
| 6 | ✅ | ❌ | ✅ | ❌ | Secondary (60%) | **Outline hover** (gris oscuro) | ✅ |
| 7 | ✅ | ✅ | ❌ | ❌ | Primary (purple) | Primary (purple, 2px) | ✅ |
| 8 | ✅ | ✅ | ✅ | ❌ | Primary (purple) | Primary (purple, 2px) | ✅ |
| 9 | ❌ | ❌ | ❌ | ✅ | **Error (rojo)** | **Error (rojo)** | ❌ |
| 10 | ❌ | ❌ | ✅ | ✅ | **Error (rojo)** | **Error (rojo)** | ❌ |
| 11 | ✅ | ✅ | ❌ | ✅ | **Error (rojo)** | **Error (rojo, 2px)** | ✅ |
| 12 | ✅ | ✅ | ✅ | ✅ | **Error (rojo)** | **Error (rojo, 2px)** | ✅ |

### Jerarquía de Prioridad

```
1. ERROR     (.invalid)        → SIEMPRE GANA (rojo)
2. FOCUS     (:focus-within)   → Gana sobre hover (purple)
3. HOVER     (:hover)          → Solo si no hay error ni focus (gris oscuro)
4. NORMAL    (default)         → Estado base (gris)
```

### Transiciones Animadas

Todas las propiedades tienen `transition: 0.2s`:
- ✅ `border-color` - Color del border
- ✅ `opacity` - Visibilidad del notch
- ✅ `outline-color` - Outline del input (hover)
- ✅ Label movement (BeerCSS nativo)

---

## Variables CSS

### Variables Globales (BeerCSS)

```css
:root {
  /* Colores de estado */
  --primary: var(--kds-color-primary-main);     /* #8347AD - Purple Khipu */
  --outline: var(--kds-color-input-border);     /* rgba(0,0,0,0.23) - Gris normal */
  --error: var(--kds-color-error-main);         /* #D32F2F - Rojo error */

  /* Dimensiones */
  --_input: 3.625rem;    /* 58px altura del input (custom Khipu) */
  --_start: 1.4rem;      /* Posición del label flotante */
}
```

### Variables de Tokens Khipu

| Variable | Valor | Uso |
|----------|-------|-----|
| `--kds-color-primary-main` | `#8347AD` | Border en focus |
| `--kds-color-input-border` | `rgba(0,0,0,0.23)` | Border normal |
| `--kds-input-border-hover` | `rgba(0,0,0,0.42)` | Border en hover |
| `--kds-color-error-main` | `#D32F2F` | Border/label en error |
| `--kds-color-text-secondary` | `rgba(0,0,0,0.6)` | Label normal |
| `--kds-font-family-primary` | `"Public Sans", Arial, sans-serif` | Fuente principal |
| `--kds-font-size-xs` | `0.75rem` (12px) | Helper text |
| `--kds-font-weight-regular` | `400` | Helper text |
| `--kds-line-height-relaxed` | `1.66` | Helper text |
| `--kds-spacing-2` | `16px` | Padding helper text |

---

## Clases y Selectores

### Qué Clase Cambia Qué

#### **Visibilidad del Notch** (opacity)

```css
/* Ocultar por defecto */
.field.label.border:not(.fill) > label::after {
  opacity: 0;
}

/* Mostrar cuando label flota */
.field.label.border:not(.fill) > :is(
  :focus + label,
  input:not(:placeholder-shown) + label,
  textarea:not(:placeholder-shown) + label,
  select + label
)::after {
  opacity: 1;
}
```

**Detecta:** Notch visible cuando input tiene `:focus` O no está vacío (`:not(:placeholder-shown)`).

---

#### **Color del Label**

```css
/* Normal: secondary (60% opacity) */
.field.label > label {
  color: var(--kds-color-text-secondary);
}

/* Hover sin focus: más oscuro (70%) */
.field.label:hover:not(:focus-within) > label {
  color: rgba(0, 0, 0, 0.7);
}

/* Focus: primary purple */
.field.label:focus-within > label {
  color: var(--primary);
}

/* Error: rojo (gana sobre todo) */
.field.label.invalid > label {
  color: var(--error);
}
```

**Pseudo-clase clave:** `:focus-within` detecta si `.field` contiene un elemento hijo con focus.

---

#### **Color del Border (notch + input)**

**Notch (label::after):**
```css
/* Hover sin focus */
.field.label.border:not(.fill):hover:not(:focus-within) > label::after {
  border-block-start-color: var(--kds-input-border-hover);
}

/* Focus */
.field.label.border:not(.fill):focus-within > label::after {
  border-block-start-color: var(--primary);
}

/* Error (gana siempre) */
.field.label.border:not(.fill).invalid > label::after {
  border-block-start-color: var(--error);
}
```

**Border del input:**
```css
/* Hover sin focus */
.field.label.border:not(.fill):hover:not(:focus-within) > :is(input, textarea, select) {
  border-color: var(--kds-input-border-hover);
}

/* Focus */
.field.label.border:not(.fill):focus-within > :is(input, textarea, select) {
  border-color: var(--primary);
}

/* Error (gana siempre) */
.field.label.border:not(.fill).invalid > :is(input, textarea, select) {
  border-color: var(--error);
}
```

**⚡ Por qué dos elementos:** El `label::after` crea la línea superior (notch), el `input[border-color]` crea los lados y el fondo.

---

#### **Helper Text**

```css
/* Estilos base usando tokens */
.field > :is(output, .helper, span.helper) {
  font-family: var(--kds-font-family-primary);
  font-weight: var(--kds-font-weight-regular);
  font-size: var(--kds-font-size-xs);
  line-height: var(--kds-line-height-relaxed);
  color: var(--kds-color-text-secondary);
  padding-top: 0.25rem;
  padding-left: var(--kds-spacing-2);
}

/* Error: rojo */
.field.invalid > :is(output, .helper, span.helper) {
  color: var(--error);
}
```

---

## Código CSS Final

### Solución Completa (khipu-components.css)

```css
/* ==============================================
   MATERIAL DESIGN 3 FLOATING LABELS (BeerCSS)
   Solución limpia con principios claros
   ============================================== */

/* === VARIABLES GLOBALES === */
:root,
body.light,
body.dark {
  --primary: var(--kds-color-primary-main);
  --outline: var(--kds-color-input-border);
  --error: var(--kds-color-error-main);
}

/* === ALTURA PERSONALIZADA === */
.field {
  --_input: 3.625rem;  /* 58px (vs 48px default) */
  --_start: 1.4rem;
}

/* === TRANSICIONES SUAVES === */
.field > :is(input, textarea, select) {
  transition: border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
}

.field.label.border:not(.fill) > label::after {
  transition: border-color 0.2s, opacity 0.2s;
}

/* ==========================================
   NOTCH VISIBILITY
   ========================================== */

.field.label.border:not(.fill) > label::after {
  opacity: 0;
}

.field.label.border:not(.fill) > :is(
  :focus + label,
  input:not(:placeholder-shown) + label,
  textarea:not(:placeholder-shown) + label,
  select + label
)::after {
  opacity: 1;
}

/* ==========================================
   BORDER COLOR
   ========================================== */

/* Hover sin focus: notch + input */
.field.label.border:not(.fill):hover:not(:focus-within) > label::after {
  border-block-start-color: var(--kds-input-border-hover);
}

.field.label.border:not(.fill):hover:not(:focus-within) > :is(input, textarea, select) {
  border-color: var(--kds-input-border-hover);
}

/* Focus: notch + input */
.field.label.border:not(.fill):focus-within > label::after {
  border-block-start-color: var(--primary);
}

.field.label.border:not(.fill):focus-within > :is(input, textarea, select) {
  border-color: var(--primary);
}

/* ==========================================
   LABEL COLOR
   ========================================== */

.field.label > label {
  color: var(--kds-color-text-secondary);
}

.field.label:hover:not(:focus-within) > label {
  color: rgba(0, 0, 0, 0.7);
}

.field.label:focus-within > label {
  color: var(--primary);
}

/* ==========================================
   INVALID STATE (ERROR)
   ========================================== */

/* Label rojo */
.field.label.invalid > label {
  color: var(--error);
}

/* Notch rojo */
.field.label.border:not(.fill).invalid > label::after,
.field.label.border:not(.fill).invalid:hover > label::after,
.field.label.border:not(.fill).invalid:focus-within > label::after {
  border-block-start-color: var(--error);
}

/* Border del input rojo */
.field.label.border:not(.fill).invalid > :is(input, textarea, select),
.field.label.border:not(.fill).invalid:hover > :is(input, textarea, select),
.field.label.border:not(.fill).invalid:focus-within > :is(input, textarea, select) {
  border-color: var(--error);
}

/* ==========================================
   HELPER TEXT
   ========================================== */

.field > :is(output, .helper, span.helper) {
  display: block;
  font-family: var(--kds-font-family-primary);
  font-weight: var(--kds-font-weight-regular);
  font-size: var(--kds-font-size-xs);
  line-height: var(--kds-line-height-relaxed);
  color: var(--kds-color-text-secondary);
  padding-top: 0.25rem;
  padding-left: var(--kds-spacing-2);
  margin: 0;
}

.field.invalid > :is(output, .helper, span.helper) {
  color: var(--error);
}
```

---

## Principios de Diseño

### 1. **Usar `:focus-within` en lugar de `:focus + label`

**Por qué:**
- Más simple y legible
- Detecta focus en cualquier hijo del `.field`
- Especificidad consistente

```css
/* ✅ Bueno */
.field:focus-within { }

/* ❌ Evitar (más complejo) */
.field > :focus + label { }
```

### 2. **Error siempre gana (mayor especificidad)**

```css
/* Especificidad: 40 puntos */
.field.invalid { }

/* Especificidad: 30 puntos */
.field:hover { }

/* Especificidad: 30 puntos */
.field:focus-within { }
```

Al agregar `.invalid`, la especificidad aumenta y gana sobre hover y focus.

### 3. **Notch y Border del input deben cambiar juntos**

Siempre cambiar AMBOS elementos en cada estado:
- `label::after` (notch)
- `input[border-color]` (lados + abajo)

**Evita:** Notch con un color diferente al resto del border.

### 4. **Transiciones en elementos, no en pseudo-clases**

```css
/* ✅ Bueno - transición en el elemento */
.field > input {
  transition: border-color 0.2s;
}

/* ❌ Evitar - transición en el estado */
.field:hover > input {
  transition: border-color 0.2s;
}
```

### 5. **NUNCA cambiar `--outline` en hover**

```css
/* ❌ MAL - afecta a TODO lo que use var(--outline) */
.field:hover {
  --outline: var(--kds-input-border-hover);
}

/* ✅ BIEN - cambiar propiedad específica */
.field:hover > input {
  border-color: var(--kds-input-border-hover);
}
```

### 6. **Placeholder espacial obligatorio**

```html
<!-- ✅ Correcto -->
<input placeholder=" " />

<!-- ❌ Incorrecto -->
<input placeholder="" />
<input />
```

Sin el espacio, `:placeholder-shown` no funciona correctamente.

---

## Ejemplos de Uso

### Campo Básico

```html
<div class="field label border">
  <input type="text" id="nombre" placeholder=" " required>
  <label for="nombre">Nombre completo</label>
</div>
```

### Con Helper Text

```html
<div class="field label border">
  <input type="email" id="email" placeholder=" " required>
  <label for="email">Email</label>
  <span class="helper">Usaremos tu email para contactarte</span>
</div>
```

### Con Error

```html
<div class="field label border invalid">
  <input type="email" id="email" placeholder=" " value="email-invalido">
  <label for="email">Email</label>
  <span class="helper">Por favor ingresa un email válido</span>
</div>
```

### Con Valor Pre-llenado

```html
<div class="field label border">
  <input type="text" id="ciudad" placeholder=" " value="Santiago">
  <label for="ciudad">Ciudad</label>
</div>
```

### Select con Floating Label

```html
<div class="field label border">
  <select id="region" required>
    <option value="">Selecciona una opción</option>
    <option value="rm">Región Metropolitana</option>
    <option value="val">Valparaíso</option>
  </select>
  <label for="region">Región</label>
</div>
```

### Grails/GSP Integration

```gsp
<div class="field label border ${hasErrors(bean: command, field: 'email', 'invalid')}">
  <g:textField name="email" id="email" placeholder=" "
               value="${command?.email}" required="required"/>
  <label for="email">Email</label>
  <g:hasErrors bean="${command}" field="email">
    <span class="helper">
      <g:message error="${it}"/>
    </span>
  </g:hasErrors>
</div>
```

---

## Troubleshooting

### Problema: Label no flota cuando tiene valor

**Síntomas:**
- Input tiene valor pero label se mantiene sobre el texto

**Causa:**
- Falta `placeholder=" "` (con espacio)

**Solución:**
```html
<!-- ✅ Correcto -->
<input placeholder=" " value="Texto" />
```

---

### Problema: Notch no es visible

**Síntomas:**
- Label flota pero no se ve el espacio del notch

**Causa:**
- `opacity: 0` no se está cambiando a `opacity: 1`

**Solución:**
Verificar que el input tenga la pseudo-clase correcta:
```css
input:not(:placeholder-shown)  /* ← Detecta si tiene valor */
```

---

### Problema: Border no cambia en hover

**Síntomas:**
- Solo label cambia, border se mantiene igual

**Causa:**
- Falta cambiar `border-color` del input
- Solo estás cambiando `label::after`

**Solución:**
Cambiar AMBOS elementos:
```css
.field:hover > label::after { ... }      /* Notch */
.field:hover > input { ... }             /* Border del input */
```

---

### Problema: Error no se ve (sigue morado/gris)

**Síntomas:**
- Campo con clase `.invalid` pero border es purple o gris

**Causa:**
- Especificidad: focus/hover ganan sobre error
- Falta `.invalid` en los selectores

**Solución:**
```css
/* Mayor especificidad con .invalid */
.field.invalid:focus-within > input {
  border-color: var(--error);
}
```

---

### Problema: Colores inconsistentes (notch ≠ border)

**Síntomas:**
- Notch con un color, resto del border con otro

**Causa:**
- Solo cambiaste `label::after` o solo `input[border-color]`

**Solución:**
SIEMPRE cambiar ambos juntos:
```css
.field:hover > label::after {
  border-block-start-color: var(--color);
}
.field:hover > input {
  border-color: var(--color);
}
```

---

### Problema: Transiciones no son suaves

**Síntomas:**
- Cambios de color son abruptos

**Causa:**
- Falta definir `transition` en los elementos

**Solución:**
```css
.field > input {
  transition: border-color 0.2s;
}
.field > label::after {
  transition: border-color 0.2s, opacity 0.2s;
}
```

---

## Especificidad CSS (Debugging)

### Cómo calcular especificidad

```
(IDs) × 100 + (Classes/Pseudo-classes) × 10 + (Elements) × 1
```

### Ejemplos

```css
/* 20 puntos */
.field:hover

/* 30 puntos */
.field.invalid

/* 40 puntos */
.field.invalid:hover

/* 52 puntos */
.field.label.border:not(.fill):hover > label::after
```

**Regla:** A mayor especificidad, gana la regla.

---

## Checklist de Validación

Antes de dar por terminado un campo, verificar:

- [ ] ✅ **HTML correcto:** `.field.label.border` + `placeholder=" "`
- [ ] ✅ **Estado normal:** Label secondary, border gris
- [ ] ✅ **Hover sin focus:** Label + border más oscuros, transición suave
- [ ] ✅ **Focus:** Label + border purple, notch visible
- [ ] ✅ **Con valor:** Notch visible, label flotando arriba
- [ ] ✅ **Con valor + hover:** Border más oscuro, notch sincronizado
- [ ] ✅ **Error:** Label + border + helper text rojos
- [ ] ✅ **Error + hover:** Mantiene rojo (no cambia a gris)
- [ ] ✅ **Error + focus:** Mantiene rojo (no cambia a purple)
- [ ] ✅ **Helper text:** Public Sans, 12px, 1.66 line-height
- [ ] ✅ **Transiciones:** Todos los cambios animados (0.2s)

---

## Métricas de la Solución

| Métrica | Valor |
|---------|-------|
| **Líneas de CSS** | ~90 líneas |
| **Variables usadas** | 10 tokens |
| **Estados soportados** | 12 combinaciones |
| **Selectores complejos** | 0 (simplicidad) |
| **Uso de `!important`** | 0 (limpio) |
| **Compatibilidad** | BeerCSS v4.0.1 |

---

## Referencias

- **BeerCSS Docs:** https://www.beercss.com/
- **Material Design 3:** https://m3.material.io/
- **Khipu Design Tokens:** `src/tokens/index.ts`
- **Código fuente:** `src/beercss/customizations/khipu-components.css`

---

---

# PARTE II: FORMULARIOS COMPLETOS

## Estructura de Formularios

### Anatomía de un Formulario

```html
<form class="kds-form" method="post" action="/submit">

  <!-- Header del formulario -->
  <div class="form-header">
    <h2>Título del formulario</h2>
    <p class="form-description">Descripción opcional</p>
  </div>

  <!-- Secciones de campos -->
  <section class="form-section">
    <h3 class="section-title">Datos personales</h3>

    <!-- Campos individuales -->
    <div class="field label border">
      <input type="text" id="nombre" placeholder=" " required>
      <label for="nombre">Nombre completo</label>
    </div>
  </section>

  <!-- Acciones del formulario -->
  <div class="form-actions">
    <button type="button" class="border">Cancelar</button>
    <button type="submit">Guardar</button>
  </div>

</form>
```

### Clases de Contenedor

| Clase | Uso | Descripción |
|-------|-----|-------------|
| `.kds-form` | `<form>` | Contenedor principal con espaciado |
| `.form-header` | `<div>` | Header con título y descripción |
| `.form-section` | `<section>` | Agrupa campos relacionados |
| `.section-title` | `<h3>` | Título de sección |
| `.form-actions` | `<div>` | Botones de acción (submit/cancel) |
| `.form-grid` | `<div>` | Layout de 2 columnas |
| `.form-row` | `<div>` | Fila con múltiples campos inline |

### CSS para Formularios

```css
/* Contenedor principal */
.kds-form {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--kds-spacing-6);
}

/* Header */
.form-header {
  margin-bottom: var(--kds-spacing-6);
}

.form-header h2 {
  font-family: var(--kds-font-family-primary);
  font-weight: var(--kds-font-weight-semibold);
  font-size: var(--kds-font-size-2xl);
  color: var(--kds-color-text-primary);
  margin: 0 0 var(--kds-spacing-2) 0;
}

.form-description {
  font-family: var(--kds-font-family-primary);
  font-size: var(--kds-font-size-base);
  color: var(--kds-color-text-secondary);
  margin: 0;
}

/* Secciones */
.form-section {
  margin-bottom: var(--kds-spacing-8);
}

.section-title {
  font-family: var(--kds-font-family-primary);
  font-weight: var(--kds-font-weight-semibold);
  font-size: var(--kds-font-size-lg);
  color: var(--kds-color-text-primary);
  margin: 0 0 var(--kds-spacing-4) 0;
  padding-bottom: var(--kds-spacing-2);
  border-bottom: 1px solid var(--kds-color-divider);
}

/* Campos con espaciado vertical */
.form-section .field {
  margin-bottom: var(--kds-spacing-4);
}

/* Acciones */
.form-actions {
  display: flex;
  gap: var(--kds-spacing-3);
  justify-content: flex-end;
  padding-top: var(--kds-spacing-6);
  border-top: 1px solid var(--kds-color-divider);
}

/* Responsive */
@media (max-width: 640px) {
  .kds-form {
    padding: var(--kds-spacing-4);
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
```

---

## Tipos de Inputs

### Text Input (básico)

```html
<div class="field label border">
  <input type="text" id="nombre" placeholder=" " required>
  <label for="nombre">Nombre completo</label>
  <span class="helper">Ingresa tu nombre completo</span>
</div>
```

### Email Input

```html
<div class="field label border">
  <input type="email" id="email" placeholder=" " required>
  <label for="email">Email</label>
  <span class="helper">Ej: usuario@ejemplo.com</span>
</div>
```

### Password Input

```html
<div class="field label border">
  <input type="password" id="password" placeholder=" " required minlength="8">
  <label for="password">Contraseña</label>
  <span class="helper">Mínimo 8 caracteres</span>
</div>
```

### Number Input

```html
<div class="field label border">
  <input type="number" id="edad" placeholder=" " min="18" max="120">
  <label for="edad">Edad</label>
</div>
```

### Textarea

```html
<div class="field label border">
  <textarea id="mensaje" placeholder=" " rows="4"></textarea>
  <label for="mensaje">Mensaje</label>
  <span class="helper">Máximo 500 caracteres</span>
</div>
```

### Select

```html
<div class="field label border">
  <select id="pais" required>
    <option value="">Selecciona</option>
    <option value="cl">Chile</option>
    <option value="ar">Argentina</option>
    <option value="pe">Perú</option>
  </select>
  <label for="pais">País</label>
</div>
```

### Date Input

```html
<div class="field label border">
  <input type="date" id="fecha" placeholder=" " required>
  <label for="fecha">Fecha de nacimiento</label>
</div>
```

### Tel Input (con patrón)

```html
<div class="field label border">
  <input type="tel" id="telefono" placeholder=" "
         pattern="[0-9]{9}" required>
  <label for="telefono">Teléfono</label>
  <span class="helper">9 dígitos sin +56</span>
</div>
```

### Checkbox (Material Design 3)

```html
<label class="checkbox">
  <input type="checkbox" id="terminos" required>
  <span>
    Acepto los <a href="/terminos">términos y condiciones</a>
  </span>
</label>
```

### Radio Buttons

```html
<fieldset>
  <legend>Método de pago</legend>

  <label class="radio">
    <input type="radio" name="metodo" value="tarjeta" checked>
    <span>Tarjeta de crédito/débito</span>
  </label>

  <label class="radio">
    <input type="radio" name="metodo" value="transferencia">
    <span>Transferencia bancaria</span>
  </label>
</fieldset>
```

---

## Agrupación y Layout

### Grid de 2 Columnas

```html
<div class="form-grid">
  <div class="field label border">
    <input type="text" id="nombre" placeholder=" " required>
    <label for="nombre">Nombre</label>
  </div>

  <div class="field label border">
    <input type="text" id="apellido" placeholder=" " required>
    <label for="apellido">Apellido</label>
  </div>
</div>
```

**CSS:**
```css
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--kds-spacing-4);
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
```

### Fila con Campos Inline

```html
<div class="form-row">
  <div class="field label border" style="flex: 2;">
    <input type="text" id="calle" placeholder=" " required>
    <label for="calle">Calle</label>
  </div>

  <div class="field label border" style="flex: 1;">
    <input type="text" id="numero" placeholder=" " required>
    <label for="numero">Número</label>
  </div>
</div>
```

**CSS:**
```css
.form-row {
  display: flex;
  gap: var(--kds-spacing-4);
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }
}
```

### Fieldset con Agrupación Semántica

```html
<fieldset class="form-fieldset">
  <legend>Dirección de envío</legend>

  <div class="field label border">
    <input type="text" id="direccion" placeholder=" " required>
    <label for="direccion">Dirección</label>
  </div>

  <div class="form-grid">
    <div class="field label border">
      <input type="text" id="ciudad" placeholder=" " required>
      <label for="ciudad">Ciudad</label>
    </div>

    <div class="field label border">
      <input type="text" id="region" placeholder=" " required>
      <label for="region">Región</label>
    </div>
  </div>
</fieldset>
```

**CSS:**
```css
.form-fieldset {
  border: 1px solid var(--kds-color-divider);
  border-radius: var(--kds-radius-md);
  padding: var(--kds-spacing-4);
  margin-bottom: var(--kds-spacing-6);
}

.form-fieldset legend {
  font-family: var(--kds-font-family-primary);
  font-weight: var(--kds-font-weight-semibold);
  font-size: var(--kds-font-size-base);
  color: var(--kds-color-text-primary);
  padding: 0 var(--kds-spacing-2);
}
```

---

## Validación de Formularios

### Estados de Validación

#### 1. **Sin validar** (estado inicial)
```html
<div class="field label border">
  <input type="email" id="email" placeholder=" " required>
  <label for="email">Email</label>
</div>
```

#### 2. **Válido** (opcional, para feedback positivo)
```html
<div class="field label border valid">
  <input type="email" id="email" placeholder=" " value="usuario@ejemplo.com">
  <label for="email">Email</label>
  <span class="helper">Email válido</span>
</div>
```

#### 3. **Inválido** (con error)
```html
<div class="field label border invalid">
  <input type="email" id="email" placeholder=" " value="email-invalido">
  <label for="email">Email</label>
  <span class="helper">Por favor ingresa un email válido</span>
</div>
```

### CSS para Estado Válido

```css
/* Label verde */
.field.label.valid > label {
  color: var(--kds-color-success-main);
}

/* Notch verde */
.field.label.border:not(.fill).valid > label::after,
.field.label.border:not(.fill).valid:hover > label::after,
.field.label.border:not(.fill).valid:focus-within > label::after {
  border-block-start-color: var(--kds-color-success-main);
}

/* Border del input verde */
.field.label.border:not(.fill).valid > :is(input, textarea, select),
.field.label.border:not(.fill).valid:hover > :is(input, textarea, select),
.field.label.border:not(.fill).valid:focus-within > :is(input, textarea, select) {
  border-color: var(--kds-color-success-main);
}

/* Helper text verde */
.field.valid > :is(output, .helper, span.helper) {
  color: var(--kds-color-success-main);
}
```

### Validación en Tiempo Real (JavaScript)

```javascript
// Validar email en tiempo real
const emailInput = document.getElementById('email');
const emailField = emailInput.closest('.field');

emailInput.addEventListener('input', (e) => {
  const value = e.target.value;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Remover clases previas
  emailField.classList.remove('valid', 'invalid');

  // Agregar clase según validación
  if (value.length > 0) {
    emailField.classList.add(isValid ? 'valid' : 'invalid');
  }

  // Actualizar helper text
  const helper = emailField.querySelector('.helper');
  if (helper) {
    helper.textContent = isValid
      ? 'Email válido'
      : 'Por favor ingresa un email válido';
  }
});
```

### Validación HTML5 Nativa

```html
<!-- Email con validación nativa -->
<input type="email" required>

<!-- Número con rango -->
<input type="number" min="18" max="120" required>

<!-- Texto con longitud mínima -->
<input type="text" minlength="3" maxlength="50" required>

<!-- Tel con patrón -->
<input type="tel" pattern="[0-9]{9}" required>

<!-- URL -->
<input type="url" placeholder="https://" required>
```

### Validación con Constraint Validation API

```javascript
const form = document.querySelector('.kds-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;

  inputs.forEach(input => {
    const field = input.closest('.field');

    if (!input.checkValidity()) {
      isValid = false;
      field.classList.add('invalid');

      const helper = field.querySelector('.helper');
      if (helper) {
        helper.textContent = input.validationMessage;
      }
    } else {
      field.classList.remove('invalid');
    }
  });

  if (isValid) {
    form.submit();
  }
});
```

---

## Formularios Multi-paso

### Estructura de Stepper

```html
<form class="kds-form multi-step">

  <!-- Indicador de pasos -->
  <div class="stepper">
    <div class="step active">
      <div class="step-number">1</div>
      <span class="step-label">Datos personales</span>
    </div>
    <div class="step-divider"></div>
    <div class="step">
      <div class="step-number">2</div>
      <span class="step-label">Dirección</span>
    </div>
    <div class="step-divider"></div>
    <div class="step">
      <div class="step-number">3</div>
      <span class="step-label">Confirmación</span>
    </div>
  </div>

  <!-- Paso 1 -->
  <div class="form-step active" data-step="1">
    <h3>Datos personales</h3>
    <!-- campos del paso 1 -->
  </div>

  <!-- Paso 2 (oculto) -->
  <div class="form-step" data-step="2" style="display: none;">
    <h3>Dirección</h3>
    <!-- campos del paso 2 -->
  </div>

  <!-- Navegación -->
  <div class="form-actions">
    <button type="button" class="btn-prev border" style="display: none;">
      Anterior
    </button>
    <button type="button" class="btn-next">
      Siguiente
    </button>
    <button type="submit" class="btn-submit" style="display: none;">
      Enviar
    </button>
  </div>

</form>
```

### CSS para Stepper

```css
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--kds-spacing-8);
  padding: var(--kds-spacing-6) 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--kds-spacing-2);
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--kds-color-background-elevated);
  border: 2px solid var(--kds-color-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--kds-font-weight-semibold);
  color: var(--kds-color-text-secondary);
  transition: all 0.2s;
}

.step.active .step-number {
  background: var(--kds-color-primary-main);
  border-color: var(--kds-color-primary-main);
  color: white;
}

.step.completed .step-number {
  background: var(--kds-color-success-main);
  border-color: var(--kds-color-success-main);
  color: white;
}

.step-label {
  font-size: var(--kds-font-size-sm);
  color: var(--kds-color-text-secondary);
  font-weight: var(--kds-font-weight-medium);
}

.step.active .step-label {
  color: var(--kds-color-primary-main);
}

.step-divider {
  width: 60px;
  height: 2px;
  background: var(--kds-color-divider);
  margin: 0 var(--kds-spacing-2);
}

.step.completed + .step-divider {
  background: var(--kds-color-success-main);
}
```

### JavaScript para Navegación

```javascript
class MultiStepForm {
  constructor(formElement) {
    this.form = formElement;
    this.currentStep = 1;
    this.totalSteps = this.form.querySelectorAll('.form-step').length;

    this.init();
  }

  init() {
    this.form.querySelector('.btn-next').addEventListener('click', () => {
      if (this.validateCurrentStep()) {
        this.goToStep(this.currentStep + 1);
      }
    });

    this.form.querySelector('.btn-prev').addEventListener('click', () => {
      this.goToStep(this.currentStep - 1);
    });
  }

  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;

    // Ocultar paso actual
    const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    currentStepEl.style.display = 'none';

    // Mostrar nuevo paso
    const newStepEl = this.form.querySelector(`.form-step[data-step="${stepNumber}"]`);
    newStepEl.style.display = 'block';

    // Actualizar stepper
    this.updateStepper(stepNumber);

    // Actualizar botones
    this.updateButtons(stepNumber);

    this.currentStep = stepNumber;
  }

  updateStepper(stepNumber) {
    const steps = this.form.querySelectorAll('.step');
    steps.forEach((step, index) => {
      const num = index + 1;
      step.classList.remove('active', 'completed');

      if (num === stepNumber) {
        step.classList.add('active');
      } else if (num < stepNumber) {
        step.classList.add('completed');
      }
    });
  }

  updateButtons(stepNumber) {
    const btnPrev = this.form.querySelector('.btn-prev');
    const btnNext = this.form.querySelector('.btn-next');
    const btnSubmit = this.form.querySelector('.btn-submit');

    btnPrev.style.display = stepNumber === 1 ? 'none' : 'block';
    btnNext.style.display = stepNumber === this.totalSteps ? 'none' : 'block';
    btnSubmit.style.display = stepNumber === this.totalSteps ? 'block' : 'none';
  }

  validateCurrentStep() {
    const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');

    let isValid = true;
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        const field = input.closest('.field');
        field.classList.add('invalid');
      }
    });

    return isValid;
  }
}

// Inicializar
const form = document.querySelector('.multi-step');
new MultiStepForm(form);
```

---

## Patrones de Submit

### Submit Básico

```html
<form class="kds-form" method="post" action="/guardar">
  <!-- campos -->

  <div class="form-actions">
    <button type="submit">Guardar</button>
  </div>
</form>
```

### Submit con Loading State

```html
<button type="submit" id="submit-btn">
  <span class="btn-text">Guardar</span>
  <progress class="circle small" style="display: none;"></progress>
</button>
```

```javascript
const form = document.querySelector('.kds-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Mostrar loading
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Guardando...';
  submitBtn.querySelector('progress').style.display = 'inline-block';

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Éxito
      alert('Guardado correctamente');
    } else {
      // Error
      alert('Error al guardar');
    }
  } finally {
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Guardar';
    submitBtn.querySelector('progress').style.display = 'none';
  }
});
```

### Submit con Confirmación

```html
<form class="kds-form" id="delete-form">
  <!-- campos -->

  <div class="form-actions">
    <button type="submit" class="error">Eliminar cuenta</button>
  </div>
</form>
```

```javascript
const form = document.getElementById('delete-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const confirmed = confirm('¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.');

  if (confirmed) {
    form.submit();
  }
});
```

### Submit con Modal de Confirmación (BeerCSS)

```html
<!-- Modal -->
<dialog class="modal" id="confirm-modal">
  <h5>Confirmar eliminación</h5>
  <p>¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.</p>
  <nav class="right-align">
    <button class="border" onclick="ui('#confirm-modal')">Cancelar</button>
    <button class="error" id="confirm-delete">Eliminar</button>
  </nav>
</dialog>

<!-- Formulario -->
<form class="kds-form" id="delete-form">
  <div class="form-actions">
    <button type="button" onclick="ui('#confirm-modal')" class="error">
      Eliminar cuenta
    </button>
  </div>
</form>
```

```javascript
document.getElementById('confirm-delete').addEventListener('click', () => {
  document.getElementById('delete-form').submit();
});
```

---

## Integración Grails/GSP

### Formulario Grails Básico

```gsp
<g:form name="userForm" controller="user" action="save" class="kds-form">

  <div class="form-header">
    <h2>Crear usuario</h2>
  </div>

  <section class="form-section">
    <h3 class="section-title">Datos personales</h3>

    <!-- Text field con validación -->
    <div class="field label border ${hasErrors(bean: user, field: 'nombre', 'invalid')}">
      <g:textField name="nombre" id="nombre" placeholder=" "
                   value="${user?.nombre}" required="required"/>
      <label for="nombre">Nombre completo</label>
      <g:hasErrors bean="${user}" field="nombre">
        <span class="helper">
          <g:message error="${it}"/>
        </span>
      </g:hasErrors>
    </div>

    <!-- Email field -->
    <div class="field label border ${hasErrors(bean: user, field: 'email', 'invalid')}">
      <g:field type="email" name="email" id="email" placeholder=" "
               value="${user?.email}" required="required"/>
      <label for="email">Email</label>
      <g:hasErrors bean="${user}" field="email">
        <span class="helper">
          <g:message error="${it}"/>
        </span>
      </g:hasErrors>
    </div>
  </section>

  <div class="form-actions">
    <g:link controller="user" action="index" class="button border">
      Cancelar
    </g:link>
    <button type="submit">Guardar</button>
  </div>

</g:form>
```

### Select con Opciones Dinámicas

```gsp
<div class="field label border ${hasErrors(bean: user, field: 'pais', 'invalid')}">
  <g:select name="pais" id="pais"
            from="${paisList}"
            optionKey="id"
            optionValue="nombre"
            noSelection="['': 'Selecciona un país']"
            value="${user?.pais?.id}"
            required="required"/>
  <label for="pais">País</label>
  <g:hasErrors bean="${user}" field="pais">
    <span class="helper">
      <g:message error="${it}"/>
    </span>
  </g:hasErrors>
</div>
```

### Date Picker con Grails

```gsp
<div class="field label border ${hasErrors(bean: user, field: 'fechaNacimiento', 'invalid')}">
  <g:datePicker name="fechaNacimiento"
                id="fechaNacimiento"
                value="${user?.fechaNacimiento}"
                precision="day"
                years="${1900..Calendar.getInstance().get(Calendar.YEAR)}"
                required="required"/>
  <label for="fechaNacimiento">Fecha de nacimiento</label>
  <g:hasErrors bean="${user}" field="fechaNacimiento">
    <span class="helper">
      <g:message error="${it}"/>
    </span>
  </g:hasErrors>
</div>
```

### Checkbox con Grails

```gsp
<label class="checkbox">
  <g:checkBox name="aceptaTerminos"
              id="aceptaTerminos"
              value="${user?.aceptaTerminos}"
              required="required"/>
  <span>
    Acepto los <g:link controller="legal" action="terminos">términos y condiciones</g:link>
  </span>
</label>

<g:hasErrors bean="${user}" field="aceptaTerminos">
  <div class="error-message">
    <g:message error="${it}"/>
  </div>
</g:hasErrors>
```

### Formulario con Validación Remota (Ajax)

```gsp
<g:form name="userForm" class="kds-form">

  <div class="field label border" id="username-field">
    <g:textField name="username" id="username" placeholder=" " required="required"/>
    <label for="username">Username</label>
    <span class="helper">Elige un username único</span>
  </div>

  <g:javascript>
    const usernameInput = document.getElementById('username');
    const usernameField = document.getElementById('username-field');

    let timeout;
    usernameInput.addEventListener('input', (e) => {
      clearTimeout(timeout);

      const value = e.target.value;
      if (value.length < 3) return;

      timeout = setTimeout(async () => {
        const response = await fetch('${createLink(controller: 'user', action: 'checkUsername')}?username=' + encodeURIComponent(value));
        const data = await response.json();

        usernameField.classList.remove('valid', 'invalid');
        const helper = usernameField.querySelector('.helper');

        if (data.available) {
          usernameField.classList.add('valid');
          helper.textContent = 'Username disponible';
        } else {
          usernameField.classList.add('invalid');
          helper.textContent = 'Username no disponible';
        }
      }, 500);
    });
  </g:javascript>

</g:form>
```

---

## Accesibilidad

### Principios WCAG 2.1

#### 1. **Labels Explícitos**
```html
<!-- ✅ Correcto -->
<label for="email">Email</label>
<input type="email" id="email">

<!-- ❌ Incorrecto -->
<span>Email</span>
<input type="email">
```

#### 2. **Describir con aria-describedby**
```html
<div class="field label border">
  <input type="password"
         id="password"
         placeholder=" "
         aria-describedby="password-help"
         required>
  <label for="password">Contraseña</label>
  <span class="helper" id="password-help">
    Mínimo 8 caracteres, incluye mayúsculas y números
  </span>
</div>
```

#### 3. **Errores con aria-invalid**
```html
<div class="field label border invalid">
  <input type="email"
         id="email"
         placeholder=" "
         aria-invalid="true"
         aria-describedby="email-error">
  <label for="email">Email</label>
  <span class="helper" id="email-error" role="alert">
    Por favor ingresa un email válido
  </span>
</div>
```

#### 4. **Campos Requeridos**
```html
<!-- Opción 1: atributo required (preferido) -->
<input type="text" id="nombre" required>

<!-- Opción 2: aria-required -->
<input type="text" id="nombre" aria-required="true">

<!-- Opción 3: Indicador visual + required -->
<label for="nombre">
  Nombre <span class="required" aria-label="requerido">*</span>
</label>
<input type="text" id="nombre" required>
```

#### 5. **Fieldsets para Grupos**
```html
<fieldset>
  <legend>Método de pago</legend>

  <label class="radio">
    <input type="radio" name="pago" value="tarjeta">
    <span>Tarjeta de crédito</span>
  </label>

  <label class="radio">
    <input type="radio" name="pago" value="transferencia">
    <span>Transferencia</span>
  </label>
</fieldset>
```

#### 6. **Focus Visible**
```css
/* Asegurar outline visible en focus (nunca usar outline: none sin alternativa) */
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--kds-color-primary-main);
  outline-offset: 2px;
}
```

#### 7. **Contraste de Color**
```css
/* Asegurar contraste mínimo 4.5:1 para texto normal */
.field.label > label {
  color: rgba(0, 0, 0, 0.6);  /* Contraste: 7.23:1 ✅ */
}

.helper {
  color: rgba(0, 0, 0, 0.6);  /* Contraste: 7.23:1 ✅ */
}
```

### Testing de Accesibilidad

**Herramientas recomendadas:**
- axe DevTools (extensión Chrome/Firefox)
- WAVE (extensión o web)
- Lighthouse (Chrome DevTools)
- NVDA o JAWS (lectores de pantalla)

**Checklist:**
- [ ] Todos los inputs tienen `<label>` asociado
- [ ] Mensajes de error con `role="alert"` o `aria-live="polite"`
- [ ] Campos requeridos marcados con `required` o `aria-required`
- [ ] Grupos de radio/checkbox dentro de `<fieldset>` con `<legend>`
- [ ] Contraste de color >= 4.5:1
- [ ] Focus visible en todos los elementos interactivos
- [ ] Navegación por teclado funciona correctamente (Tab, Shift+Tab, Enter, Space)
- [ ] Lector de pantalla lee todos los labels, helpers y errores

---

## Ejemplos Completos

### Formulario de Registro

```html
<form class="kds-form" method="post" action="/register">

  <div class="form-header">
    <h2>Crear cuenta</h2>
    <p class="form-description">
      Completa tus datos para crear una cuenta en Khipu
    </p>
  </div>

  <section class="form-section">
    <h3 class="section-title">Datos personales</h3>

    <div class="form-grid">
      <div class="field label border">
        <input type="text" id="nombre" placeholder=" " required>
        <label for="nombre">Nombre</label>
      </div>

      <div class="field label border">
        <input type="text" id="apellido" placeholder=" " required>
        <label for="apellido">Apellido</label>
      </div>
    </div>

    <div class="field label border">
      <input type="email" id="email" placeholder=" " required>
      <label for="email">Email</label>
      <span class="helper">Usaremos tu email para contactarte</span>
    </div>

    <div class="field label border">
      <input type="password" id="password" placeholder=" "
             minlength="8" required>
      <label for="password">Contraseña</label>
      <span class="helper">Mínimo 8 caracteres</span>
    </div>
  </section>

  <section class="form-section">
    <h3 class="section-title">Información adicional</h3>

    <div class="field label border">
      <input type="tel" id="telefono" placeholder=" "
             pattern="[0-9]{9}" required>
      <label for="telefono">Teléfono</label>
      <span class="helper">9 dígitos sin +56</span>
    </div>

    <div class="field label border">
      <input type="date" id="fecha" placeholder=" " required>
      <label for="fecha">Fecha de nacimiento</label>
    </div>
  </section>

  <section class="form-section">
    <label class="checkbox">
      <input type="checkbox" id="terminos" required>
      <span>
        Acepto los <a href="/terminos">términos y condiciones</a>
      </span>
    </label>

    <label class="checkbox">
      <input type="checkbox" id="newsletter">
      <span>Quiero recibir novedades por email</span>
    </label>
  </section>

  <div class="form-actions">
    <button type="button" class="border" onclick="window.history.back()">
      Cancelar
    </button>
    <button type="submit">Crear cuenta</button>
  </div>

</form>
```

### Formulario de Contacto

```html
<form class="kds-form" method="post" action="/contacto">

  <div class="form-header">
    <h2>Contáctanos</h2>
    <p class="form-description">
      Completa el formulario y te responderemos a la brevedad
    </p>
  </div>

  <section class="form-section">
    <div class="field label border">
      <input type="text" id="nombre" placeholder=" " required>
      <label for="nombre">Nombre completo</label>
    </div>

    <div class="field label border">
      <input type="email" id="email" placeholder=" " required>
      <label for="email">Email</label>
    </div>

    <div class="field label border">
      <select id="asunto" required>
        <option value="">Selecciona</option>
        <option value="soporte">Soporte técnico</option>
        <option value="ventas">Consulta de ventas</option>
        <option value="otro">Otro</option>
      </select>
      <label for="asunto">Asunto</label>
    </div>

    <div class="field label border">
      <textarea id="mensaje" placeholder=" " rows="6" required></textarea>
      <label for="mensaje">Mensaje</label>
      <span class="helper">Máximo 500 caracteres</span>
    </div>
  </section>

  <div class="form-actions">
    <button type="submit">Enviar mensaje</button>
  </div>

</form>
```

### Formulario de Pago

```html
<form class="kds-form" method="post" action="/pagar">

  <div class="form-header">
    <h2>Información de pago</h2>
  </div>

  <section class="form-section">
    <h3 class="section-title">Datos de la tarjeta</h3>

    <div class="field label border">
      <input type="text" id="numero-tarjeta" placeholder=" "
             pattern="[0-9]{16}" maxlength="16" required>
      <label for="numero-tarjeta">Número de tarjeta</label>
    </div>

    <div class="form-row">
      <div class="field label border">
        <input type="text" id="vencimiento" placeholder=" "
               pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
               placeholder="MM/YY" required>
        <label for="vencimiento">Vencimiento</label>
      </div>

      <div class="field label border">
        <input type="text" id="cvv" placeholder=" "
               pattern="[0-9]{3,4}" maxlength="4" required>
        <label for="cvv">CVV</label>
      </div>
    </div>

    <div class="field label border">
      <input type="text" id="titular" placeholder=" " required>
      <label for="titular">Nombre del titular</label>
    </div>
  </section>

  <section class="form-section">
    <h3 class="section-title">Dirección de facturación</h3>

    <div class="field label border">
      <input type="text" id="direccion" placeholder=" " required>
      <label for="direccion">Dirección</label>
    </div>

    <div class="form-grid">
      <div class="field label border">
        <input type="text" id="ciudad" placeholder=" " required>
        <label for="ciudad">Ciudad</label>
      </div>

      <div class="field label border">
        <input type="text" id="codigo-postal" placeholder=" " required>
        <label for="codigo-postal">Código postal</label>
      </div>
    </div>
  </section>

  <div class="form-actions">
    <button type="button" class="border">Cancelar</button>
    <button type="submit">Pagar $99.990</button>
  </div>

</form>
```

---

## Mejores Prácticas

### 1. **Diseño Responsive**
- Formularios con `max-width: 600px` para legibilidad
- Grid de 2 columnas colapsa a 1 columna en móvil
- Botones en columna en móvil, fila en desktop
- Touch targets mínimos de 44x44px

### 2. **Performance**
- Validar en `blur` en lugar de `input` para reducir overhead
- Debounce en validaciones asíncronas (500ms)
- Lazy load de opciones de select cuando hay muchas

### 3. **UX**
- Mensajes de error claros y accionables
- Helper text con ejemplos: "Ej: usuario@ejemplo.com"
- Autocompletar habilitado: `autocomplete="name"`, `autocomplete="email"`, etc.
- Preservar valores en error (no limpiar el formulario)

### 4. **Seguridad**
- CSRF tokens en formularios
- Validar en servidor (nunca confiar solo en cliente)
- Sanitizar inputs contra XSS
- Rate limiting en endpoints de validación

### 5. **Internacionalización**
- Usar `<g:message>` para todos los textos
- Formatear fechas según locale
- Soportar diferentes formatos de teléfono/RUT por país

---

**Última actualización:** 2024-01-XX
**Versión:** 2.0 (Documentación Completa de Inputs y Formularios)
**Estado:** ✅ Producción Ready
