# Guía de Uso: BeerCSS Onboarding en Payment App (Grails)

Esta guía explica cómo integrar los componentes de onboarding del Design System Khipu (BeerCSS) en la aplicación Payment (Grails).

## 📋 Tabla de Contenidos

1. [Integración Básica](#integración-básica)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Uso con MaterialTagLib](#uso-con-materialtaglib)
4. [Componentes Disponibles](#componentes-disponibles)
5. [Patrones Comunes](#patrones-comunes)
6. [Ejemplos Completos](#ejemplos-completos)

---

## Integración Básica

### 1. Incluir CDN en Layout Principal

Agrega los recursos CDN en tu layout principal de Grails (ej: `grails-app/views/layouts/main.gsp`):

```gsp
<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Khipu Payment"/></title>

    <!-- Material Symbols Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">

    <!-- Public Sans Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap">

    <!-- Khipu BeerCSS Bundle -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.25/dist/beercss/khipu-beercss.min.css">

    <g:layoutHead/>
</head>
<body>
    <g:layoutBody/>

    <!-- Khipu BeerCSS JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/@khipu/design-system@0.1.0-alpha.25/dist/beercss/khipu-beercss.min.js"></script>
</body>
</html>
```

**Nota:** Reemplaza `0.1.0-alpha.25` con la versión actual del paquete.

### 2. Inicializar Onboarding (Opcional)

Si usas el flujo de onboarding completo, agrega la inicialización:

```gsp
<script>
    // Configuración global de onboarding
    window.KHIPU_ONBOARDING_CONFIG = {
        totalStages: 8,
        personType: null, // 'natural' | 'juridica'
        locale: 'es-CL',
        apiEndpoint: '${createLink(controller: 'onboarding', action: 'save')}'
    };

    // Inicializar onboarding
    const onboarding = new KhipuOnboarding(window.KHIPU_ONBOARDING_CONFIG);
</script>
```

---

## Estructura de Archivos

```
grails-app/
├── controllers/
│   └── com/khipu/payment/
│       └── OnboardingController.groovy
├── views/
│   ├── layouts/
│   │   └── onboarding.gsp            # Layout específico para onboarding
│   └── onboarding/
│       ├── welcome.gsp                # Pantalla de bienvenida
│       ├── selector.gsp               # Selector país + tipo persona
│       ├── profile.gsp                # Perfil de usuario
│       ├── commercialData.gsp         # Datos comerciales
│       ├── documents.gsp              # Subida de documentos
│       ├── bankConnection.gsp         # Conexión bancaria
│       ├── pricing.gsp                # Selección de plan
│       ├── contract.gsp               # Firma de contrato
│       ├── validation.gsp             # Validación OTP
│       └── activation.gsp             # Activación exitosa
└── taglib/
    └── com/khipu/ui/
        └── MaterialTagLib.groovy      # Ya existe - reutilizar
```

---

## Uso con MaterialTagLib

El MaterialTagLib existente (`mat:*`) es **100% compatible** con los componentes de onboarding. Puedes mezclarlos sin problemas.

### Ejemplo: Formulario con MaterialTagLib + BeerCSS

```gsp
<!-- Profile Stage -->
<div class="kds-stage" data-stage="1">
    <div class="kds-stage-header">
        <h1 class="kds-stage-title">Perfil de Usuario</h1>
        <p class="kds-stage-subtitle">Completa tu información personal</p>
    </div>

    <div class="kds-stage-content">
        <g:form controller="onboarding" action="saveProfile" name="profileForm">
            <!-- Usar MaterialTagLib para inputs -->
            <mat:textField
                name="firstName"
                bean="${command}"
                value="${command?.firstName}"
                label="Nombre"
                prefixIcon="person"
                required="true" />

            <mat:textField
                name="lastName"
                bean="${command}"
                value="${command?.lastName}"
                label="Apellido"
                prefixIcon="person"
                required="true" />

            <mat:emailField
                name="email"
                bean="${command}"
                value="${command?.email}"
                label="Email"
                prefixIcon="email"
                required="true" />

            <!-- Usar componentes BeerCSS directamente -->
            <div class="kds-alert info">
                <div class="kds-alert-icon">
                    <i class="material-symbols-outlined">info</i>
                </div>
                <div class="kds-alert-content">
                    <div class="kds-alert-title">Verifica tu email</div>
                    <div class="kds-alert-description">
                        Enviaremos un código de verificación a esta dirección
                    </div>
                </div>
            </div>

            <!-- Botones BeerCSS -->
            <div class="kds-onboarding-footer">
                <button type="button" class="kds-btn kds-btn-text" onclick="history.back()">
                    <span class="kds-icon"><i class="material-symbols-outlined">arrow_back</i></span>
                    Volver
                </button>

                <button type="submit" class="kds-btn kds-btn-primary">
                    Continuar
                    <span class="kds-icon"><i class="material-symbols-outlined">arrow_forward</i></span>
                </button>
            </div>
        </g:form>
    </div>
</div>
```

---

## Componentes Disponibles

### Layout Components

#### Onboarding Container
```gsp
<div class="kds-onboarding-container">
    <div class="kds-onboarding-header">
        <!-- Stepper aquí -->
    </div>

    <div class="kds-onboarding-main">
        <!-- Contenido del stage -->
    </div>

    <div class="kds-onboarding-footer">
        <!-- Botones de navegación -->
    </div>
</div>
```

#### Stepper
```gsp
<div class="kds-stepper">
    <div class="kds-step completed">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Selector</div>
    </div>
    <div class="kds-step current">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Perfil</div>
    </div>
    <div class="kds-step">
        <div class="kds-step-indicator"></div>
        <div class="kds-step-label">Comercial</div>
    </div>
</div>
```

**Estados:**
- `.kds-step` - Pendiente (gris)
- `.kds-step.current` - Actual (azul)
- `.kds-step.completed` - Completado (verde con check)

#### Stage Layout
```gsp
<div class="kds-stage" data-stage="0">
    <div class="kds-stage-header">
        <h1 class="kds-stage-title">Título del Stage</h1>
        <p class="kds-stage-subtitle">Descripción breve</p>
    </div>

    <div class="kds-stage-content">
        <!-- Contenido -->
    </div>
</div>
```

### UI Components

#### Buttons
```gsp
<!-- Primary Button -->
<button class="kds-btn kds-btn-primary">
    Continuar
    <span class="kds-icon"><i class="material-symbols-outlined">arrow_forward</i></span>
</button>

<!-- Outlined Button -->
<button class="kds-btn kds-btn-outlined">
    Cancelar
</button>

<!-- Text Button -->
<button class="kds-btn kds-btn-text">
    <span class="kds-icon"><i class="material-symbols-outlined">arrow_back</i></span>
    Volver
</button>

<!-- Outlined White (para fondos oscuros) -->
<button class="kds-btn kds-btn-outlined-white">
    Ya tengo cuenta
    <span class="kds-icon"><i class="material-symbols-outlined">login</i></span>
</button>
```

#### Alerts
```gsp
<!-- Info Alert -->
<div class="kds-alert info">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">info</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-title">Título informativo</div>
        <div class="kds-alert-description">Descripción del mensaje</div>
    </div>
</div>

<!-- Warning Alert -->
<div class="kds-alert warning">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">warning</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-title">Advertencia</div>
        <div class="kds-alert-description">Mensaje de advertencia</div>
    </div>
</div>

<!-- Error Alert -->
<div class="kds-alert error">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">error</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-title">Error</div>
        <div class="kds-alert-description">Mensaje de error</div>
    </div>
</div>

<!-- Success Alert -->
<div class="kds-alert success">
    <div class="kds-alert-icon">
        <i class="material-symbols-outlined">check_circle</i>
    </div>
    <div class="kds-alert-content">
        <div class="kds-alert-title">Éxito</div>
        <div class="kds-alert-description">Operación exitosa</div>
    </div>
</div>
```

#### Card Selector
```gsp
<div class="kds-grid-2col">
    <div class="kds-card-selector" data-value="chile" onclick="selectCard(this)">
        <div class="kds-card-selector-icon">
            <span style="font-size: 32px;">🇨🇱</span>
        </div>
        <div class="kds-card-selector-title">Chile</div>
        <div class="kds-card-selector-description">
            CLP • Transferencias inmediatas
        </div>
    </div>

    <div class="kds-card-selector" data-value="mexico" onclick="selectCard(this)">
        <div class="kds-card-selector-icon">
            <span style="font-size: 32px;">🇲🇽</span>
        </div>
        <div class="kds-card-selector-title">México</div>
        <div class="kds-card-selector-description">
            MXN • SPEI
        </div>
    </div>
</div>

<script>
function selectCard(card) {
    // Limpiar selección previa
    document.querySelectorAll('.kds-card-selector').forEach(c => {
        c.classList.remove('selected');
    });

    // Marcar como seleccionado
    card.classList.add('selected');
}
</script>
```

#### Welcome Hero
```gsp
<div class="kds-welcome-hero">
    <div class="kds-welcome-hero-content">
        <div class="kds-welcome-hero-icon">
            <i class="material-symbols-outlined" style="font-size: 80px;">rocket_launch</i>
        </div>
        <h1 class="kds-welcome-hero-title">Bienvenido a Khipu</h1>
        <p class="kds-welcome-hero-subtitle">
            Activa tu cuenta en minutos y comienza a recibir pagos
        </p>
        <div class="kds-welcome-hero-actions">
            <button class="kds-btn kds-btn-primary" onclick="startOnboarding()">
                Comenzar activación
                <span class="kds-icon"><i class="material-symbols-outlined">arrow_forward</i></span>
            </button>
        </div>
    </div>
</div>
```

---

## Patrones Comunes

### 1. Formulario con Validación Server-Side

```gsp
<!-- Controller: OnboardingController.groovy -->
<g:form controller="onboarding" action="saveProfile" name="profileForm">
    <mat:textField
        name="firstName"
        bean="${command}"
        value="${command?.firstName}"
        label="Nombre"
        required="true" />

    <!-- El MaterialTagLib automáticamente muestra errores -->
    <!-- si command.errors.hasFieldErrors('firstName') -->

    <button type="submit" class="kds-btn kds-btn-primary">Guardar</button>
</g:form>
```

### 2. Navegación entre Stages

```gsp
<!-- selector.gsp -->
<div class="kds-onboarding-footer">
    <g:link controller="onboarding" action="welcome" class="kds-btn kds-btn-text">
        <span class="kds-icon"><i class="material-symbols-outlined">arrow_back</i></span>
        Volver
    </g:link>

    <div class="button-group">
        <span class="kds-body-small kds-text-muted">Paso 1 de 8</span>
        <g:link controller="onboarding" action="profile"
                class="kds-btn kds-btn-primary"
                id="nextButton"
                params="[country: params.country, personType: params.personType]">
            Continuar
            <span class="kds-icon"><i class="material-symbols-outlined">arrow_forward</i></span>
        </g:link>
    </div>
</div>

<script>
    // Deshabilitar botón Next si no hay selección
    const nextButton = document.getElementById('nextButton');
    function updateNextButton() {
        const country = document.querySelector('.kds-card-selector.selected[data-type="country"]');
        const personType = document.querySelector('.kds-card-selector.selected[data-type="person"]');

        if (country && personType) {
            nextButton.classList.remove('disabled');
            nextButton.onclick = null;
        } else {
            nextButton.classList.add('disabled');
            nextButton.onclick = (e) => e.preventDefault();
        }
    }
</script>
```

### 3. Persistencia con Session

```groovy
// OnboardingController.groovy
class OnboardingController {

    def selector() {
        [country: session.onboarding?.country, personType: session.onboarding?.personType]
    }

    def saveSelector(String country, String personType) {
        if (!session.onboarding) {
            session.onboarding = [:]
        }
        session.onboarding.country = country
        session.onboarding.personType = personType
        session.onboarding.currentStage = 1

        redirect(action: 'profile')
    }

    def profile() {
        if (!session.onboarding?.country) {
            redirect(action: 'selector')
            return
        }
        [command: new ProfileCommand(session.onboarding)]
    }
}
```

### 4. Conditional Logic (Person Type)

```gsp
<!-- commercialData.gsp -->
<g:if test="${session.onboarding?.personType == 'natural'}">
    <!-- Formulario para Persona Natural -->
    <mat:textField
        name="rut"
        bean="${command}"
        value="${command?.rut}"
        label="RUT"
        help="Ej: 12.345.678-9"
        required="true" />
</g:if>
<g:else>
    <!-- Formulario para Persona Jurídica -->
    <mat:textField
        name="businessName"
        bean="${command}"
        value="${command?.businessName}"
        label="Razón Social"
        required="true" />

    <mat:textField
        name="rut"
        bean="${command}"
        value="${command?.rut}"
        label="RUT Empresa"
        help="Ej: 76.123.456-K"
        required="true" />
</g:else>
```

---

## Ejemplos Completos

### Ejemplo 1: Welcome Screen

```gsp
<!-- grails-app/views/onboarding/welcome.gsp -->
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="onboarding"/>
    <title>Bienvenido a Khipu - Onboarding</title>
</head>
<body>
    <!-- Welcome Hero -->
    <div class="kds-welcome-hero">
        <div class="kds-welcome-hero-content">
            <div class="kds-welcome-hero-icon">
                <i class="material-symbols-outlined" style="font-size: 80px;">rocket_launch</i>
            </div>
            <h1 class="kds-welcome-hero-title">Bienvenido a Khipu</h1>
            <p class="kds-welcome-hero-subtitle">
                Activa tu cuenta en minutos y comienza a recibir pagos de forma automática
            </p>
            <div class="kds-welcome-hero-actions">
                <g:link controller="onboarding" action="selector" class="kds-btn kds-btn-primary">
                    Comenzar activación
                    <span class="kds-icon"><i class="material-symbols-outlined">arrow_forward</i></span>
                </g:link>
            </div>
        </div>
    </div>

    <!-- Benefits Section -->
    <main style="padding: var(--kds-spacing-12) var(--kds-spacing-6); max-width: 1200px; margin: 0 auto;">
        <h2 class="kds-headline-large" style="text-align: center; margin-bottom: var(--kds-spacing-8);">
            ¿Por qué elegir Khipu?
        </h2>

        <div class="kds-grid-3col">
            <div class="kds-card-elevated" style="text-align: center;">
                <i class="material-symbols-outlined icon-filled"
                   style="font-size: 64px; color: var(--primary); margin-bottom: var(--kds-spacing-3);">
                    flash_on
                </i>
                <h3 class="kds-title-large">Rápido y seguro</h3>
                <p class="kds-body-medium kds-text-muted">
                    Pagos instantáneos directamente desde el banco de tus clientes
                </p>
            </div>

            <div class="kds-card-elevated" style="text-align: center;">
                <i class="material-symbols-outlined icon-filled"
                   style="font-size: 64px; color: var(--primary); margin-bottom: var(--kds-spacing-3);">
                    savings
                </i>
                <h3 class="kds-title-large">Costos reducidos</h3>
                <p class="kds-body-medium kds-text-muted">
                    Menores comisiones que tarjetas de crédito o débito
                </p>
            </div>

            <div class="kds-card-elevated" style="text-align: center;">
                <i class="material-symbols-outlined icon-filled"
                   style="font-size: 64px; color: var(--primary); margin-bottom: var(--kds-spacing-3);">
                    integration_instructions
                </i>
                <h3 class="kds-title-large">Fácil integración</h3>
                <p class="kds-body-medium kds-text-muted">
                    APIs y plugins listos para usar en tu plataforma
                </p>
            </div>
        </div>
    </main>
</body>
</html>
```

### Ejemplo 2: Selector Stage

```gsp
<!-- grails-app/views/onboarding/selector.gsp -->
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="onboarding"/>
    <title>Selector - Khipu Onboarding</title>
</head>
<body>
    <div class="kds-onboarding-container">
        <!-- Header con Stepper -->
        <div class="kds-onboarding-header">
            <div class="kds-stepper" style="max-width: 1200px; margin: 0 auto;">
                <div class="kds-step current">
                    <div class="kds-step-indicator"></div>
                    <div class="kds-step-label">Selector</div>
                </div>
                <div class="kds-step">
                    <div class="kds-step-indicator"></div>
                    <div class="kds-step-label">Perfil</div>
                </div>
                <!-- ... otros steps ... -->
            </div>
        </div>

        <!-- Main Content -->
        <div class="kds-onboarding-main">
            <div class="kds-stage" data-stage="0">
                <div class="kds-stage-header">
                    <h1 class="kds-stage-title">Comencemos con tu activación</h1>
                    <p class="kds-stage-subtitle">Primero necesitamos saber desde dónde nos contactas</p>
                </div>

                <div class="kds-stage-content">
                    <g:form controller="onboarding" action="saveSelector" name="selectorForm">
                        <!-- Country Selection -->
                        <div class="kds-stage-section">
                            <h3 class="kds-stage-section-title">
                                <i class="material-symbols-outlined">public</i> País
                            </h3>

                            <div class="kds-grid-2col" id="countrySelection">
                                <div class="kds-card-selector ${country == 'chile' ? 'selected' : ''}"
                                     data-value="chile" data-type="country" onclick="selectCard(this, 'country')">
                                    <div class="kds-card-selector-icon">
                                        <span style="font-size: 32px;">🇨🇱</span>
                                    </div>
                                    <div class="kds-card-selector-title">Chile</div>
                                    <div class="kds-card-selector-description">
                                        CLP • Transferencias inmediatas
                                    </div>
                                </div>

                                <div class="kds-card-selector ${country == 'mexico' ? 'selected' : ''}"
                                     data-value="mexico" data-type="country" onclick="selectCard(this, 'country')">
                                    <div class="kds-card-selector-icon">
                                        <span style="font-size: 32px;">🇲🇽</span>
                                    </div>
                                    <div class="kds-card-selector-title">México</div>
                                    <div class="kds-card-selector-description">
                                        MXN • SPEI
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" name="country" id="countryInput" value="${country}">
                        </div>

                        <!-- Person Type Selection -->
                        <div class="kds-stage-section">
                            <h3 class="kds-stage-section-title">
                                <i class="material-symbols-outlined">badge</i> Tipo de persona
                            </h3>

                            <div class="kds-grid-2col" id="personTypeSelection">
                                <div class="kds-card-selector ${personType == 'natural' ? 'selected' : ''}"
                                     data-value="natural" data-type="person" onclick="selectCard(this, 'person')">
                                    <div class="kds-card-selector-icon">
                                        <i class="material-symbols-outlined">person</i>
                                    </div>
                                    <div class="kds-card-selector-title">Persona Natural</div>
                                    <div class="kds-card-selector-description">
                                        Emprendedor individual o freelancer
                                    </div>
                                </div>

                                <div class="kds-card-selector ${personType == 'juridica' ? 'selected' : ''}"
                                     data-value="juridica" data-type="person" onclick="selectCard(this, 'person')">
                                    <div class="kds-card-selector-icon">
                                        <i class="material-symbols-outlined">business</i>
                                    </div>
                                    <div class="kds-card-selector-title">Persona Jurídica</div>
                                    <div class="kds-card-selector-description">
                                        Empresa o sociedad legalmente constituida
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" name="personType" id="personTypeInput" value="${personType}">
                        </div>

                        <!-- Info Alert -->
                        <div class="kds-alert info">
                            <div class="kds-alert-icon">
                                <i class="material-symbols-outlined">info</i>
                            </div>
                            <div class="kds-alert-content">
                                <div class="kds-alert-title">Ten a mano tu documentación</div>
                                <div class="kds-alert-description">
                                    Necesitarás RUT, comprobante de domicilio y documentos de identidad.
                                </div>
                            </div>
                        </div>
                    </g:form>
                </div>
            </div>
        </div>

        <!-- Footer con Botones -->
        <div class="kds-onboarding-footer">
            <g:link controller="onboarding" action="welcome" class="kds-btn kds-btn-text">
                <span class="kds-icon"><i class="material-symbols-outlined">arrow_back</i></span>
                Volver
            </g:link>

            <div class="button-group">
                <span class="kds-body-small kds-text-muted">Paso 1 de 8</span>
                <button type="submit" form="selectorForm" class="kds-btn kds-btn-primary" id="nextButton" disabled>
                    Continuar
                    <span class="kds-icon"><i class="material-symbols-outlined">arrow_forward</i></span>
                </button>
            </div>
        </div>
    </div>

    <script>
        let selectedCountry = '${country}';
        let selectedPersonType = '${personType}';

        function selectCard(card, type) {
            // Limpiar selección previa del mismo tipo
            const selector = type === 'country' ? '#countrySelection' : '#personTypeSelection';
            document.querySelectorAll(selector + ' .kds-card-selector').forEach(c => {
                c.classList.remove('selected');
            });

            // Marcar como seleccionado
            card.classList.add('selected');

            // Guardar valor
            const value = card.dataset.value;
            if (type === 'country') {
                selectedCountry = value;
                document.getElementById('countryInput').value = value;
            } else {
                selectedPersonType = value;
                document.getElementById('personTypeInput').value = value;
            }

            // Actualizar botón Next
            updateNextButton();
        }

        function updateNextButton() {
            const nextButton = document.getElementById('nextButton');
            nextButton.disabled = !(selectedCountry && selectedPersonType);
        }

        // Verificar estado inicial
        updateNextButton();
    </script>
</body>
</html>
```

---

## Best Practices

### 1. Separar Layout de Onboarding

Crea un layout específico para onboarding (`grails-app/views/layouts/onboarding.gsp`):

```gsp
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><g:layoutTitle default="Khipu Onboarding"/></title>

    <!-- CDN Resources -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@latest/dist/beercss/khipu-beercss.min.css">

    <g:layoutHead/>
</head>
<body>
    <g:layoutBody/>

    <script src="https://cdn.jsdelivr.net/npm/@khipu/design-system@latest/dist/beercss/khipu-beercss.min.js"></script>
</body>
</html>
```

### 2. Usar Command Objects

```groovy
// grails-app/controllers/com/khipu/payment/command/ProfileCommand.groovy
class ProfileCommand implements Validateable {
    String firstName
    String lastName
    String email
    String phone

    static constraints = {
        firstName blank: false, maxSize: 100
        lastName blank: false, maxSize: 100
        email blank: false, email: true
        phone blank: false, matches: /^\+?[0-9]{9,15}$/
    }
}
```

### 3. Validación Client-Side (Opcional)

```gsp
<script>
    // Validación en tiempo real con HTML5
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.checkValidity()) {
                input.parentElement.classList.add('invalid');
            } else {
                input.parentElement.classList.remove('invalid');
            }
        });
    });
</script>
```

### 4. Manejo de Errores

```gsp
<g:if test="${flash.error}">
    <div class="kds-alert error">
        <div class="kds-alert-icon">
            <i class="material-symbols-outlined">error</i>
        </div>
        <div class="kds-alert-content">
            <div class="kds-alert-title">Error</div>
            <div class="kds-alert-description">${flash.error}</div>
        </div>
    </div>
</g:if>

<g:if test="${flash.success}">
    <div class="kds-alert success">
        <div class="kds-alert-icon">
            <i class="material-symbols-outlined">check_circle</i>
        </div>
        <div class="kds-alert-content">
            <div class="kds-alert-title">Éxito</div>
            <div class="kds-alert-description">${flash.success}</div>
        </div>
    </div>
</g:if>
```

---

## Troubleshooting

### Problema: Estilos no se aplican

**Solución:** Verificar que el CDN esté cargado correctamente:

```javascript
// En la consola del navegador:
console.log(document.styleSheets);
// Debe aparecer khipu-beercss.min.css
```

### Problema: Icons no se muestran

**Solución:** Verificar que Material Symbols esté cargado:

```html
<!-- Asegurar que esto esté en <head> -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
```

### Problema: JavaScript no funciona

**Solución:** Verificar que el script esté al final del `<body>`:

```html
<body>
    <!-- Contenido -->

    <script src="https://cdn.jsdelivr.net/npm/@khipu/design-system@latest/dist/beercss/khipu-beercss.min.js"></script>
    <script>
        // Tu código aquí
    </script>
</body>
```

---

## Recursos Adicionales

- **Documentación Completa:** [design.khipu.com](https://design.khipu.com)
- **MaterialTagLib:** `/Code/payment/grails-app/taglib/com/khipu/ui/MaterialTagLib.groovy`
- **Demo HTML:** `/Code/design-system-github/design-system/src/beercss/demo/onboarding/`
- **COMPONENTS.md:** `/Code/design-system-github/design-system/src/beercss/COMPONENTS.md`

---

## Changelog

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 0.1.0-alpha.25 | 2026-03-23 | Versión inicial del onboarding con BeerCSS |
