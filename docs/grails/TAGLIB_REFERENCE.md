# Grails TagLib Reference - Khipu Design System

Referencia completa de los taglibs del Sistema de Diseño de Khipu para Grails/GSP.

**Versión:** 0.1.0-alpha.44
**Basado en:** BeerCSS + Material Design 3 + Khipu Custom Components

---

## 📚 Índice

- [Button](#button) - Botones con variantes Material Design
- [Alert](#alert) - Alertas y notificaciones
- [Card](#card) - Tarjetas y contenedores
- [Stepper](#stepper) - Indicador de progreso multi-paso

---

## Button

Renderiza botones siguiendo las especificaciones de BeerCSS Material Design 3.

### Clases CSS Generadas

```css
.kds-btn                 /* Base button */
.kds-btn-primary         /* Primary variant */
.kds-btn-secondary       /* Secondary variant */
.kds-btn-outlined        /* Outlined variant */
.kds-btn-outlined-white  /* White outlined variant */
.kds-btn-text            /* Text button variant */
.kds-icon                /* Icon container */
```

### Atributos

| Atributo | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `variant` | String | `primary` | Variante: `primary`, `secondary`, `outlined`, `outlined-white`, `text` |
| `type` | String | `button` | Tipo HTML: `button`, `submit`, `reset` |
| `disabled` | Boolean | `false` | Estado deshabilitado |
| `href` | String | - | Si se provee, renderiza como `<a>` en vez de `<button>` |
| `target` | String | - | Target del enlace (solo con `href`) |
| `icon` | String | - | Nombre del ícono Material Symbols |
| `iconAfter` | Boolean | `false` | Mostrar ícono después del texto |
| `onclick` | String | - | Handler JavaScript onclick |
| `class` | String | - | Clases CSS adicionales |
| `id` | String | - | ID del elemento |
| `title` | String | - | Atributo title HTML (tooltip) |
| `tabindex` | Number | - | Tab index para accesibilidad |

### Ejemplos

#### Botón Primary (Default)

```gsp
<kds:button>
    PAGAR AHORA
</kds:button>
```

Genera:
```html
<button class="kds-btn kds-btn-primary" type="button">
    PAGAR AHORA
</button>
```

#### Botón Outlined

```gsp
<kds:button variant="outlined" type="submit">
    Continuar
</kds:button>
```

#### Botón con Ícono

```gsp
<kds:button variant="primary" icon="arrow_forward" iconAfter="true">
    Siguiente
</kds:button>
```

Genera:
```html
<button class="kds-btn kds-btn-primary" type="button">
    Siguiente
    <span class="kds-icon">
        <i class="material-symbols-outlined">arrow_forward</i>
    </span>
</button>
```

#### Botón como Link

```gsp
<kds:button variant="text" href="/ayuda" target="_blank" icon="help">
    ¿Necesitas ayuda?
</kds:button>
```

Genera:
```html
<a class="kds-btn kds-btn-text" href="/ayuda" target="_blank">
    <span class="kds-icon">
        <i class="material-symbols-outlined">help</i>
    </span>
    ¿Necesitas ayuda?
</a>
```

---

## Alert

Renderiza alertas y notificaciones con íconos y estados semánticos.

### Clases CSS Generadas

```css
.kds-alert              /* Base alert */
.success                /* Success state */
.info                   /* Info state */
.warning                /* Warning state */
.error                  /* Error state */
.kds-alert-icon         /* Icon container */
.kds-alert-content      /* Content container */
.kds-alert-title        /* Alert title */
.kds-alert-description  /* Alert message */
.kds-alert-close        /* Close button */
```

### Atributos

| Atributo | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `type` | String | `info` | Tipo: `success`, `info`, `warning`, `error` |
| `title` | String | - | Título del alert (opcional) |
| `message` | String | - | Mensaje del alert (requerido si no hay body) |
| `dismissible` | Boolean | `false` | Mostrar botón cerrar |
| `icon` | String | auto | Nombre del ícono (auto-seleccionado según tipo) |
| `class` | String | - | Clases CSS adicionales |
| `id` | String | - | ID del elemento |

### Ejemplos

#### Alert Simple

```gsp
<kds:alert type="success" message="Pago procesado correctamente" />
```

Genera:
```html
<div class="kds-alert success">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">check_circle</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-description">Pago procesado correctamente</div>
    </div>
</div>
```

#### Alert con Título

```gsp
<kds:alert type="error" title="Error de validación" message="El RUT ingresado no es válido" />
```

#### Alert con Body HTML

```gsp
<kds:alert type="info" title="Información importante" dismissible="true">
    Tu cuenta será activada en <strong>24-48 horas hábiles</strong>.
    Recibirás un correo de confirmación.
</kds:alert>
```

#### Alert con Ícono Personalizado

```gsp
<kds:alert type="warning" icon="schedule" title="Proceso pendiente">
    Tu solicitud está siendo revisada por nuestro equipo.
</kds:alert>
```

---

## Card

Renderiza tarjetas y contenedores con múltiples variantes.

### Clases CSS Generadas

```css
.kds-card-main          /* Main card variant */
.kds-card-elevated      /* Elevated card */
.kds-card-selector      /* Selector card (clickable) */
.kds-card-plan          /* Pricing plan card */
.kds-card-status        /* Status card */
.kds-card-header        /* Card header */
.kds-card-body          /* Card body */
.kds-card-footer        /* Card footer */
.selected               /* Selected state (selector cards) */
```

### Tag: `<kds:card>`

#### Atributos

| Atributo | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `variant` | String | `main` | Variante: `main`, `elevated`, `selector`, `plan`, `status` |
| `selected` | Boolean | `false` | Estado seleccionado (solo `selector`) |
| `onclick` | String | - | Handler JavaScript onclick |
| `class` | String | - | Clases CSS adicionales |
| `id` | String | - | ID del elemento |

### Tag: `<kds:cardHeader>`

Renderiza el header de una card.

### Tag: `<kds:cardBody>`

Renderiza el body de una card.

### Tag: `<kds:cardFooter>`

Renderiza el footer de una card.

### Ejemplos

#### Card Simple

```gsp
<kds:card variant="main">
    <kds:cardHeader>
        <h3>Título de la Tarjeta</h3>
    </kds:cardHeader>
    <kds:cardBody>
        <p>Contenido de la tarjeta con información relevante.</p>
    </kds:cardBody>
    <kds:cardFooter>
        <kds:button variant="primary">Aceptar</kds:button>
        <kds:button variant="outlined">Cancelar</kds:button>
    </kds:cardFooter>
</kds:card>
```

#### Card Selector (Clickable)

```gsp
<kds:card variant="selector" selected="${personType == 'natural'}" onclick="selectPersonType('natural')">
    <div class="kds-card-selector-icon">
        <i class="material-symbols-outlined">person</i>
    </div>
    <div class="kds-card-selector-title">Persona Natural</div>
    <div class="kds-card-selector-description">
        Emprendedor individual o freelancer
    </div>
</kds:card>
```

#### Card Elevated (Sin Estructura Interna)

```gsp
<kds:card variant="elevated" class="custom-padding">
    <h4>Beneficios del Plan</h4>
    <ul>
        <li>✓ Comisión reducida</li>
        <li>✓ Soporte prioritario</li>
        <li>✓ API ilimitada</li>
    </ul>
</kds:card>
```

---

## Stepper

Renderiza indicadores de progreso para flujos multi-paso.

### Clases CSS Generadas

```css
.kds-stepper           /* Stepper container */
.kds-step              /* Individual step */
.kds-step-indicator    /* Step circle indicator */
.kds-step-label        /* Step label text */
.completed             /* Completed step state */
.current               /* Current step state */
```

### Tag: `<kds:stepper>`

Renderiza un stepper completo automáticamente.

#### Atributos

| Atributo | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `steps` | List | - | Lista de etiquetas de pasos (requerido) |
| `currentStep` | Number | `0` | Índice del paso actual (0-based) |
| `class` | String | - | Clases CSS adicionales |
| `id` | String | - | ID del elemento |

### Tag: `<kds:step>`

Renderiza un paso individual (para layouts custom).

#### Atributos

| Atributo | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `label` | String | - | Etiqueta del paso (requerido) |
| `status` | String | `pending` | Estado: `completed`, `current`, `pending` |
| `class` | String | - | Clases CSS adicionales |

### Ejemplos

#### Stepper Automático

```gsp
<kds:stepper
    steps="${['Selector', 'Perfil', 'Comercial', 'Documentos', 'Banco']}"
    currentStep="2" />
```

Genera:
```html
<div class="kds-stepper">
    <div class="kds-step completed">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Selector</div>
    </div>
    <div class="kds-step completed">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Perfil</div>
    </div>
    <div class="kds-step current">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Comercial</div>
    </div>
    <div class="kds-step">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Documentos</div>
    </div>
    <div class="kds-step">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Banco</div>
    </div>
</div>
```

#### Stepper con Variable de Sesión

```gsp
<g:set var="onboardingSteps" value="${['Inicio', 'Datos', 'Verificación', 'Confirmación']}" />
<kds:stepper steps="${onboardingSteps}" currentStep="${session.currentStep ?: 0}" />
```

#### Stepper Manual (Custom Layout)

```gsp
<div class="kds-stepper">
    <kds:step label="Inicio" status="completed" />
    <kds:step label="Datos Personales" status="current" />
    <kds:step label="Validación" status="pending" />
    <kds:step label="Fin" status="pending" />
</div>
```

---

## Integración con CSS/JS

### Incluir Assets en GSP

```gsp
<!DOCTYPE html>
<html>
<head>
    <!-- Material Symbols Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">

    <!-- Public Sans Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap">

    <!-- Khipu BeerCSS Bundle (desde CDN) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.44/dist/beercss/khipu-beercss.min.css">
</head>
<body class="light">

    <!-- Tu contenido con taglibs -->
    <kds:button variant="primary">PAGAR</kds:button>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.44/dist/beercss/khipu-beercss.min.js"></script>
</body>
</html>
```

---

## Ejemplo Completo: Página de Pago

```gsp
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Pago - Khipu</title>
</head>
<body>
    <div class="kds-container-center max-w-1200">
        <!-- Stepper -->
        <kds:stepper
            steps="${['Selección', 'Datos', 'Confirmación', 'Pago']}"
            currentStep="2" />

        <!-- Alert de información -->
        <kds:alert type="info" title="Verifica tus datos" class="kds-mt-6">
            Asegúrate de que la información sea correcta antes de continuar.
        </kds:alert>

        <!-- Card principal -->
        <kds:card variant="main" class="kds-mt-6">
            <kds:cardHeader>
                <h2>Resumen del Pago</h2>
            </kds:cardHeader>

            <kds:cardBody>
                <div class="kds-summary-card-row">
                    <span class="kds-summary-card-label">Monto:</span>
                    <span class="kds-summary-card-value">${formatCurrency(amount)}</span>
                </div>
                <div class="kds-summary-card-row">
                    <span class="kds-summary-card-label">Comisión:</span>
                    <span class="kds-summary-card-value">${formatCurrency(fee)}</span>
                </div>
                <div class="kds-summary-card-row">
                    <span class="kds-summary-card-label">Total:</span>
                    <span class="kds-summary-card-value"><strong>${formatCurrency(total)}</strong></span>
                </div>
            </kds:cardBody>

            <kds:cardFooter>
                <kds:button variant="outlined" href="${createLink(action: 'cancel')}">
                    Cancelar
                </kds:button>
                <kds:button variant="primary" type="submit" icon="arrow_forward" iconAfter="true">
                    Confirmar Pago
                </kds:button>
            </kds:cardFooter>
        </kds:card>
    </div>
</body>
</html>
```

---

## Recursos Adicionales

- **Storybook:** https://design.khipu.com
- **npm Package:** `@khipu/design-system@0.1.0-alpha.44`
- **GitHub:** https://github.com/khipu/design-system
- **Documentación Completa:** [docs/grails/](./README.md)

---

**Última actualización:** 2026-03-27
**Versión del Sistema de Diseño:** 0.1.0-alpha.44
