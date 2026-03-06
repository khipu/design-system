# Payment Migration Guide - Design System Integration

Guía completa para integrar el Design System de Khipu en el proyecto payment (Grails 2.5.4).

---

## 📋 Índice

1. [Resumen](#resumen)
2. [Prerequisitos](#prerequisitos)
3. [Configuración Inicial](#configuración-inicial)
4. [Migración de Componentes](#migración-de-componentes)
5. [Patrones de Uso](#patrones-de-uso)
6. [Scripts de Actualización](#scripts-de-actualización)
7. [Troubleshooting](#troubleshooting)
8. [Checklist de Migración](#checklist-de-migración)

---

## 🎯 Resumen

**Qué vas a lograr:**
- ✅ Acceso a 8 taglibs del Design System (`<kds:button>`, `<kds:textField>`, etc.)
- ✅ Colores y estilos consistentes con khipu-web y Android
- ✅ CSS variables del Design System (`--kds-color-primary-main`, etc.)
- ✅ Actualizaciones automáticas al publicar nuevas versiones
- ✅ Zero-config: plugin descarga desde Nexus, no copy-paste

**Impacto en payment:**
- 📝 1 archivo modificado: `BuildConfig.groovy`
- 📦 1 script agregado: `refresh-design-system.sh`
- 🎨 CSS variables disponibles en todas las vistas GSP
- 🔄 Migración gradual: puedes usar taglibs junto a código existente

---

## 🔧 Prerequisitos

**Antes de empezar:**

1. **Maven instalado** (para descargar plugin de Nexus):
```bash
brew install maven
mvn -version  # Verificar
```

2. **Acceso a Nexus** (ya configurado en BuildConfig.groovy):
```groovy
grails.project.repos.release.username = "deployment"
grails.project.repos.release.password = "93h50sj2di2hd923"
```

3. **Java 7 compatible** (payment ya usa Java 7, el plugin es compatible)

---

## ⚙️ Configuración Inicial

### Paso 1: Configurar Repositorio Nexus en BuildConfig.groovy

**Archivo:** `grails-app/conf/BuildConfig.groovy`

**Ubicación:** Sección `repositories` (alrededor de línea 88-104)

**Cambio requerido:** Agregar repositorio `thirdparty` **ANTES** del repositorio `releases`.

**ANTES:**
```groovy
repositories {
    // ... otros repos ...

    mavenRepo('https://dev.khipu.com/nexus/content/repositories/releases') {
        auth([
            username: grails.project.repos.release.username,
            password: grails.project.repos.release.password
        ])
        grailsPlugins()
        grailsHome()
        mavenLocal()
    }

    grailsCentral()
    mavenCentral()
}
```

**DESPUÉS:**
```groovy
repositories {
    // ... otros repos ...

    // ⚠️ IMPORTANTE: thirdparty DEBE ir ANTES de releases
    // El repositorio releases tiene un ZIP corrupto del plugin
    mavenRepo('https://dev.khipu.com/nexus/content/repositories/thirdparty') {
        auth([
            username: grails.project.repos.release.username,
            password: grails.project.repos.release.password
        ])
        grailsPlugins()
    }

    mavenRepo('https://dev.khipu.com/nexus/content/repositories/releases') {
        auth([
            username: grails.project.repos.release.username,
            password: grails.project.repos.release.password
        ])
        grailsPlugins()
        grailsHome()
        mavenLocal()
    }

    grailsCentral()
    mavenCentral()
}
```

**⚠️ CRÍTICO:** El orden importa. Si `releases` está antes, Grails descargará un ZIP corrupto (8.7K en lugar de 11K) y fallará con "Zip is not a valid plugin".

---

### Paso 2: Agregar Dependencia del Plugin

**Archivo:** `grails-app/conf/BuildConfig.groovy`

**Ubicación:** Sección `plugins` (alrededor de línea 159-161)

**Agregar:**
```groovy
plugins {
    // ... otros plugins existentes ...

    // Khipu Design System Taglibs
    compile ':design-system-taglibs:0.1.0'
}
```

**Versiones disponibles:**
- `0.1.0` - Primera versión estable
- Ver versiones publicadas: https://dev.khipu.com/nexus/#browse/browse:thirdparty

---

### Paso 3: Agregar Script de Actualización

**Crear archivo:** `refresh-design-system.sh` en la raíz de payment

**Contenido:**
```bash
#!/bin/bash

# Script para actualizar el plugin Design System en payment
# Uso: ./refresh-design-system.sh [version]
# Ejemplo: ./refresh-design-system.sh 0.1.1

set -e

VERSION=${1:-"current"}

echo "🧹 Limpiando cache de Design System Taglibs..."

# Limpiar Maven Local
if [ -d ~/.m2/repository/org/grails/plugins/design-system-taglibs ]; then
    rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
    echo "  ✓ Maven Local limpiado"
else
    echo "  - Maven Local ya estaba limpio"
fi

# Limpiar plugin cache
if [ -d target/work/plugins/design-system-taglibs-* ]; then
    rm -rf target/work/plugins/design-system-taglibs-*
    echo "  ✓ Plugin cache limpiado"
else
    echo "  - Plugin cache ya estaba limpio"
fi

# Si se especificó una versión, actualizar BuildConfig.groovy
if [ "$VERSION" != "current" ]; then
    echo ""
    echo "📝 Actualizando versión a $VERSION en BuildConfig.groovy..."

    # Backup
    cp grails-app/conf/BuildConfig.groovy grails-app/conf/BuildConfig.groovy.bak

    # Actualizar versión
    sed -i '' "s/compile ':design-system-taglibs:[^']*'/compile ':design-system-taglibs:$VERSION'/" grails-app/conf/BuildConfig.groovy

    echo "  ✓ Versión actualizada a $VERSION"
    echo "  (Backup guardado en BuildConfig.groovy.bak)"
fi

echo ""
echo "🔄 Refrescando dependencias de Grails..."
echo ""

grails refresh-dependencies

echo ""
echo "✅ Proceso completado!"
echo ""
echo "Verificaciones:"
echo "- El output debe mostrar: 'Installed plugin design-system-taglibs-X.Y.Z'"
echo "- Verifica el directorio: target/work/plugins/design-system-taglibs-*"
echo ""
echo "Para probar: grails run-app"
echo "Luego navega a: http://localhost:8080/payment/designSystemTest"
```

**Hacer ejecutable:**
```bash
chmod +x refresh-design-system.sh
```

---

### Paso 4: Instalar Plugin por Primera Vez

```bash
cd /path/to/payment

# Refrescar dependencias (descarga desde Nexus)
grails refresh-dependencies

# Verificar instalación exitosa
# Debe mostrar: "Installed plugin design-system-taglibs-0.1.0"
```

**Output esperado:**
```
Downloading: org/grails/plugins/design-system-taglibs/0.1.0/design-system-taglibs-0.1.0.zip
Installing zip design-system-taglibs-0.1.0.zip...
Installed plugin design-system-taglibs-0.1.0
Dependencies refreshed.
```

**Verificar instalación:**
```bash
# Verificar directorio del plugin
ls -la target/work/plugins/design-system-taglibs-0.1.0/

# Verificar taglibs (debe listar 8 archivos)
find target/work/plugins/design-system-taglibs-0.1.0/grails-app/taglib -name "*.groovy"
```

---

## 🔄 Migración de Componentes

### Vista General de Taglibs Disponibles

| Taglib | Reemplaza | Uso Principal |
|--------|-----------|---------------|
| `<kds:button>` | HTML `<button>`, `<input type="submit">` | Botones primarios, secundarios, outlines |
| `<kds:textField>` | HTML `<input>`, `<g:textField>` | Campos de texto, email, número, password |
| `<kds:card>` | `<div class="card">` custom | Contenedores de contenido |
| `<kds:typography>` | `<h1>`, `<p>`, custom headings | Títulos, párrafos, labels |
| `<kds:alert>` | `<div class="alert">` custom | Mensajes de éxito, error, warning, info |
| `<kds:checkbox>` | `<g:checkBox>`, `<input type="checkbox">` | Checkboxes con labels |
| `<kds:tabs>` | JavaScript tabs custom | Navegación por tabs |
| `<kds:spinner>` | Loading spinners custom | Indicadores de carga |

---

### Ejemplo 1: Botones

**ANTES (HTML plano o Bootstrap):**
```gsp
<!-- Botón primario -->
<button type="submit" class="btn btn-primary">Pagar Ahora</button>

<!-- Botón secundario -->
<button type="button" class="btn btn-default" onclick="location.href='${cancelUrl}'">
    Cancelar
</button>

<!-- Botón con ícono -->
<button class="btn btn-success">
    <i class="fa fa-check"></i> Confirmar
</button>
```

**DESPUÉS (Design System):**
```gsp
<!-- Botón primario -->
<kds:button text="Pagar Ahora"
            variant="contained"
            color="primary"
            type="submit" />

<!-- Botón secundario -->
<kds:button text="Cancelar"
            variant="outlined"
            color="secondary"
            onclick="location.href='${cancelUrl}'" />

<!-- Botón con ícono (agrega ícono con slot o CSS) -->
<kds:button text="Confirmar"
            variant="contained"
            color="success" />
```

**Beneficios:**
- ✅ Colores consistentes con khipu-web y Android
- ✅ Hover states automáticos
- ✅ Ripple effect (opcional)
- ✅ Accesibilidad (ARIA labels automáticos)

---

### Ejemplo 2: Campos de Formulario

**ANTES:**
```gsp
<!-- Campo de texto básico -->
<div class="form-group">
    <label for="email">Email:</label>
    <g:textField name="email"
                 value="${email}"
                 class="form-control"
                 required="true" />
    <g:if test="${errors.email}">
        <span class="error-message">${errors.email}</span>
    </g:if>
</div>

<!-- Campo numérico -->
<div class="form-group">
    <label for="amount">Monto:</label>
    <input type="number"
           name="amount"
           value="${amount}"
           class="form-control"
           min="1000"
           required />
</div>
```

**DESPUÉS:**
```gsp
<!-- Campo de texto (label incluido) -->
<kds:textField name="email"
               label="Email"
               value="${email}"
               type="email"
               required="true"
               error="${errors.email}"
               helperText="${errors.email ?: 'Ingresa tu correo electrónico'}" />

<!-- Campo numérico -->
<kds:textField name="amount"
               label="Monto"
               value="${amount}"
               type="number"
               required="true"
               helperText="Monto mínimo: \$1.000" />
```

**Beneficios:**
- ✅ Label integrado (no necesitas `<label>` separado)
- ✅ Estados de error automáticos (border rojo, mensaje)
- ✅ Helper text para ayuda contextual
- ✅ Focus states consistentes

---

### Ejemplo 3: Cards (Contenedores)

**ANTES:**
```gsp
<div class="card">
    <div class="card-header">
        <h3>Selecciona tu banco</h3>
    </div>
    <div class="card-body">
        <p>Elige el banco desde el cual realizarás el pago</p>

        <!-- Lista de bancos -->
        <div class="bank-list">
            <!-- ... -->
        </div>
    </div>
    <div class="card-footer">
        <button class="btn btn-primary">Continuar</button>
    </div>
</div>
```

**DESPUÉS:**
```gsp
<kds:card>
    <kds:cardHeader title="Selecciona tu banco" />

    <kds:cardContent>
        <kds:typography variant="body">
            Elige el banco desde el cual realizarás el pago
        </kds:typography>

        <!-- Lista de bancos -->
        <div class="bank-list">
            <!-- ... -->
        </div>
    </kds:cardContent>

    <kds:cardActions>
        <kds:button text="Continuar"
                    variant="contained"
                    color="primary" />
    </kds:cardActions>
</kds:card>
```

**Beneficios:**
- ✅ Estructura semántica clara
- ✅ Padding y spacing consistentes
- ✅ Sombras y border radius del Design System

---

### Ejemplo 4: Mensajes de Alerta

**ANTES:**
```gsp
<!-- Éxito -->
<g:if test="${flash.success}">
    <div class="alert alert-success">
        <i class="fa fa-check-circle"></i>
        ${flash.success}
    </div>
</g:if>

<!-- Error -->
<g:if test="${flash.error}">
    <div class="alert alert-danger">
        <i class="fa fa-exclamation-triangle"></i>
        ${flash.error}
    </div>
</g:if>
```

**DESPUÉS:**
```gsp
<!-- Éxito -->
<g:if test="${flash.success}">
    <kds:alert type="success" message="${flash.success}" />
</g:if>

<!-- Error -->
<g:if test="${flash.error}">
    <kds:alert type="error" message="${flash.error}" />
</g:if>

<!-- Info -->
<kds:alert type="info"
           message="El proceso puede tardar unos minutos" />

<!-- Warning -->
<kds:alert type="warning"
           message="Revisa los datos ingresados antes de continuar" />
```

**Beneficios:**
- ✅ Íconos automáticos según tipo
- ✅ Colores semánticos (verde, rojo, azul, amarillo)
- ✅ Animaciones de entrada (opcional)

---

### Ejemplo 5: Tipografía

**ANTES:**
```gsp
<!-- Títulos -->
<h1>Pago de Mandato</h1>
<h2>Detalles del Pago</h2>
<h3 class="section-title">Información del Banco</h3>

<!-- Párrafos -->
<p class="lead">Estás a punto de autorizar un mandato de pago recurrente.</p>
<p>El monto será cobrado mensualmente.</p>

<!-- Labels -->
<span class="label-small">ESTADO:</span>
<span class="card-title">Banco de Chile</span>
```

**DESPUÉS:**
```gsp
<!-- Títulos -->
<kds:typography variant="heading1">Pago de Mandato</kds:typography>
<kds:typography variant="heading2">Detalles del Pago</kds:typography>
<kds:typography variant="heading3">Información del Banco</kds:typography>

<!-- Párrafos -->
<kds:typography variant="bodyLarge">
    Estás a punto de autorizar un mandato de pago recurrente.
</kds:typography>
<kds:typography variant="body">
    El monto será cobrado mensualmente.
</kds:typography>

<!-- Labels -->
<kds:typography variant="label">ESTADO:</kds:typography>
<kds:typography variant="cardTitle">Banco de Chile</kds:typography>
```

**Variantes disponibles:**
- `display1` - Hero text (h1, 57px)
- `heading1` - h1 (48px)
- `heading2` - h3 (34px)
- `heading3` - h6 (20px, bold)
- `bodyLarge` - Intro text (18px)
- `body` - Regular text (16px)
- `bodySmall` - Small text (14px)
- `caption` - Caption (12px)
- `label` - Labels uppercase (14px, bold, uppercase)
- `cardTitle` - Card titles (18px, medium)

---

### Ejemplo 6: Checkboxes y Términos

**ANTES:**
```gsp
<div class="form-group">
    <label>
        <g:checkBox name="acceptTerms" value="${acceptTerms}" />
        Acepto los <a href="/terms">términos y condiciones</a>
    </label>
    <g:if test="${errors.acceptTerms}">
        <span class="error">${errors.acceptTerms}</span>
    </g:if>
</div>
```

**DESPUÉS:**
```gsp
<kds:checkbox name="acceptTerms"
              label="Acepto los términos y condiciones"
              checked="${acceptTerms}"
              required="true" />

<!-- O con link embebido: -->
<kds:checkbox name="acceptTerms" required="true">
    Acepto los <a href="/terms" target="_blank">términos y condiciones</a>
</kds:checkbox>
```

---

### Ejemplo 7: Loading States

**ANTES:**
```gsp
<!-- Spinner inline -->
<div id="loading-spinner" style="display: none;">
    <i class="fa fa-spinner fa-spin"></i> Cargando...
</div>

<!-- Spinner fullscreen -->
<div class="loading-overlay" id="loadingOverlay">
    <div class="spinner"></div>
    <p>Procesando pago...</p>
</div>
```

**DESPUÉS:**
```gsp
<!-- Spinner inline -->
<div id="loading-spinner" style="display: none;">
    <kds:spinner size="small" />
    <span>Cargando...</span>
</div>

<!-- Spinner con mensaje -->
<div class="loading-overlay" id="loadingOverlay">
    <kds:spinner size="large" color="primary" />
    <kds:typography variant="body">Procesando pago...</kds:typography>
</div>

<!-- Botón con loading state -->
<kds:button text="Procesar Pago"
            variant="contained"
            color="primary"
            id="payButton" />

<script>
// En tu JavaScript
$('#payButton').attr('disabled', true).text('Procesando...');
// Mejor: agregar clase loading y mostrar spinner
</script>
```

---

## 🎨 Patrones de Uso

### Pattern 1: Formulario de Pago Completo

```gsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Pago de Mandato</title>
    <meta name="layout" content="main"/>
</head>
<body>

<div class="container">
    <kds:card>
        <kds:cardHeader title="Autorizar Mandato de Pago" />

        <kds:cardContent>
            <g:if test="${flash.error}">
                <kds:alert type="error" message="${flash.error}" />
            </g:if>

            <g:form action="processMandatePayment" method="POST">
                <!-- Email -->
                <kds:textField name="email"
                               label="Email"
                               value="${mandate?.email}"
                               type="email"
                               required="true"
                               error="${errors.email}"
                               helperText="Recibirás la confirmación en este correo" />

                <!-- RUT -->
                <kds:textField name="rut"
                               label="RUT"
                               value="${mandate?.rut}"
                               required="true"
                               error="${errors.rut}"
                               helperText="Ej: 12.345.678-9" />

                <!-- Monto -->
                <kds:textField name="amount"
                               label="Monto mensual"
                               value="${mandate?.amount}"
                               type="number"
                               required="true"
                               error="${errors.amount}"
                               helperText="Monto que se cobrará cada mes" />

                <!-- Términos -->
                <kds:checkbox name="acceptTerms"
                              required="true">
                    Acepto los <a href="/terms" target="_blank">términos y condiciones</a>
                    del mandato de pago recurrente
                </kds:checkbox>

                <!-- Botones -->
                <div class="button-group" style="margin-top: 24px;">
                    <kds:button text="Autorizar Mandato"
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth="true" />

                    <kds:button text="Cancelar"
                                variant="text"
                                color="secondary"
                                onclick="window.history.back()"
                                fullWidth="true" />
                </div>
            </g:form>
        </kds:cardContent>
    </kds:card>
</div>

</body>
</html>
```

---

### Pattern 2: Lista de Bancos con Cards

```gsp
<div class="bank-selection">
    <kds:typography variant="heading2">Selecciona tu banco</kds:typography>
    <kds:typography variant="body" style="margin-bottom: 24px;">
        Elige el banco desde el cual se realizarán los pagos
    </kds:typography>

    <div class="bank-grid">
        <g:each in="${banks}" var="bank">
            <kds:card onclick="selectBank('${bank.id}')">
                <kds:cardContent>
                    <img src="${bank.logoUrl}"
                         alt="${bank.name}"
                         class="bank-logo" />
                    <kds:typography variant="cardTitle">
                        ${bank.name}
                    </kds:typography>
                    <kds:typography variant="bodySmall">
                        ${bank.accountTypes.join(', ')}
                    </kds:typography>
                </kds:cardContent>
            </kds:card>
        </g:each>
    </div>
</div>

<style>
.bank-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}
.bank-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 12px;
}
</style>
```

---

### Pattern 3: Tabs para Métodos de Pago

```gsp
<kds:tabs>
    <kds:tab label="Transferencia" active="true">
        <kds:card>
            <kds:cardContent>
                <kds:typography variant="body">
                    Paga mediante transferencia bancaria desde tu banco
                </kds:typography>

                <!-- Formulario de transferencia -->
                <kds:textField name="bankAccount"
                               label="Cuenta bancaria" />

                <kds:button text="Continuar con Transferencia"
                            variant="contained"
                            color="primary" />
            </kds:cardContent>
        </kds:card>
    </kds:tab>

    <kds:tab label="Tarjeta de Crédito">
        <kds:card>
            <kds:cardContent>
                <kds:typography variant="body">
                    Paga con tarjeta de crédito o débito
                </kds:typography>

                <!-- Formulario de tarjeta -->
                <kds:textField name="cardNumber"
                               label="Número de tarjeta" />

                <kds:button text="Continuar con Tarjeta"
                            variant="contained"
                            color="primary" />
            </kds:cardContent>
        </kds:card>
    </kds:tab>
</kds:tabs>
```

---

### Pattern 4: Layout con CSS Variables

Puedes usar las CSS variables del Design System directamente en tu CSS custom:

```gsp
<style>
/* Usar tokens de color */
.custom-header {
    background-color: var(--kds-color-primary-main);
    color: var(--kds-color-text-on-primary);
    padding: var(--kds-spacing-4);
}

/* Usar tokens de spacing */
.content-section {
    margin-top: var(--kds-spacing-6);
    padding: var(--kds-spacing-card-padding-y) var(--kds-spacing-card-padding-x);
}

/* Usar tokens de tipografía */
.custom-text {
    font-family: var(--kds-typography-body-font-family);
    font-size: var(--kds-typography-body-font-size);
    line-height: var(--kds-typography-body-line-height);
}

/* Usar tokens de border radius */
.custom-box {
    border-radius: var(--kds-border-radius-md);
    box-shadow: var(--kds-shadows-elevation-2);
}
</style>
```

**Variables CSS disponibles:** Ver `grails/plugins/design-system-taglibs/web-app/css/design-system.css`

---

## 🔄 Scripts de Actualización

### Actualizar a Nueva Versión

```bash
cd /path/to/payment

# Método 1: Con script (recomendado)
./refresh-design-system.sh 0.1.1

# Método 2: Manual
# 1. Editar BuildConfig.groovy
#    compile ':design-system-taglibs:0.1.1'
# 2. Limpiar cache
rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
rm -rf target/work/plugins/design-system-taglibs-*
# 3. Refrescar
grails refresh-dependencies
```

### Verificar Versión Instalada

```bash
# Ver versión en BuildConfig
grep "design-system-taglibs" grails-app/conf/BuildConfig.groovy

# Ver versión instalada
ls -d target/work/plugins/design-system-taglibs-*

# Ver contenido del plugin
ls -la target/work/plugins/design-system-taglibs-0.1.0/
```

### Rollback a Versión Anterior

```bash
# 1. Cambiar versión en BuildConfig.groovy
#    compile ':design-system-taglibs:0.1.0'

# 2. Usar script de refresh
./refresh-design-system.sh 0.1.0
```

---

## 🐛 Troubleshooting

### Error: "Zip is not a valid plugin"

**Causa:** ZIP descargado está corrupto (8.7K en lugar de 11K).

**Solución:**
```bash
# 1. Verificar orden de repositorios en BuildConfig.groovy
#    thirdparty DEBE estar ANTES de releases

# 2. Limpiar completamente
rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
rm -rf target/work/plugins/design-system-taglibs-*

# 3. Refrescar
grails refresh-dependencies

# 4. Verificar descarga correcta
ls -lh ~/.m2/repository/org/grails/plugins/design-system-taglibs/0.1.0/*.zip
# Debe mostrar ~11 KB, NO 8.7K
```

---

### Error: "No signature of method: kds"

**Causa:** Plugin no instalado o no encontrado.

**Solución:**
```bash
# Verificar que el plugin esté en BuildConfig.groovy
grep "design-system-taglibs" grails-app/conf/BuildConfig.groovy

# Refrescar dependencies
grails refresh-dependencies

# Verificar instalación
grails run-app
# Debe mostrar: "Installed plugin design-system-taglibs-X.Y.Z"
```

---

### CSS Variables No Funcionan

**Causa:** CSS del plugin no se está cargando.

**Solución:**
```bash
# Verificar que el CSS existe en el plugin
ls target/work/plugins/design-system-taglibs-*/web-app/css/design-system.css

# El CSS se sirve automáticamente desde:
# http://localhost:8080/payment/plugins/design-system-taglibs-0.1.0/css/design-system.css

# Verificar en el navegador (DevTools > Network)
# Debe cargar: /plugins/design-system-taglibs-X.Y.Z/css/design-system.css
```

**Opción alternativa:** Importar CSS explícitamente en layout:

```gsp
<%-- grails-app/views/layouts/main.gsp --%>
<head>
    <!-- ... otros imports ... -->
    <link rel="stylesheet"
          href="${resource(dir: 'plugins/design-system-taglibs-0.1.0/css', file: 'design-system.css')}" />
</head>
```

---

### Estilos No Se Aplican

**Causa:** CSS del plugin tiene menor especificidad que tus estilos existentes.

**Solución:**

**Opción 1:** Usar `!important` temporalmente:
```css
/* Tu CSS custom */
.kds-button-primary {
    background-color: var(--kds-color-primary-main) !important;
}
```

**Opción 2:** Aumentar especificidad:
```css
/* Más específico */
.payment-form .kds-button-contained {
    background-color: var(--kds-color-primary-main);
}
```

**Opción 3:** Cargar CSS del plugin después de tus estilos custom.

---

### Página de Prueba No Aparece

**Error:** 404 en `/payment/designSystemTest`

**Causa:** Controller o vista no creada.

**Solución:** Crear página de prueba:

```bash
# Crear controller
cat > grails-app/controllers/com/khipu/designsystem/DesignSystemTestController.groovy << 'EOF'
package com.khipu.designsystem

class DesignSystemTestController {
    def index() {
        render(view: 'index')
    }
}
EOF

# Crear vista (copiar de grails/plugins/.../examples/test-page.gsp)
mkdir -p grails-app/views/designSystemTest
# ... crear index.gsp con ejemplos de taglibs
```

O ver el ejemplo completo en: `grails/plugins/design-system-taglibs/README.md`

---

## ✅ Checklist de Migración

### Configuración Inicial
- [ ] Maven instalado (`brew install maven`)
- [ ] Repositorio `thirdparty` agregado a BuildConfig.groovy (ANTES de `releases`)
- [ ] Dependencia del plugin agregada: `compile ':design-system-taglibs:0.1.0'`
- [ ] Script `refresh-design-system.sh` creado y ejecutable
- [ ] Primera instalación: `grails refresh-dependencies`
- [ ] Verificado: "Installed plugin design-system-taglibs-0.1.0"
- [ ] Página de prueba creada: `/designSystemTest`
- [ ] CSS del plugin carga correctamente (DevTools > Network)

### Migración Gradual
- [ ] Identificar páginas a migrar (priorizar: login, registro, pago)
- [ ] Reemplazar botones HTML con `<kds:button>`
- [ ] Reemplazar campos de formulario con `<kds:textField>`
- [ ] Reemplazar divs de card custom con `<kds:card>`
- [ ] Reemplazar heading tags con `<kds:typography>`
- [ ] Reemplazar alerts con `<kds:alert>`
- [ ] Reemplazar checkboxes con `<kds:checkbox>`
- [ ] Testing manual de cada página migrada
- [ ] Code review de cambios

### Actualización y Mantenimiento
- [ ] Script de refresh funciona: `./refresh-design-system.sh`
- [ ] Proceso de actualización documentado para el equipo
- [ ] Monitoring de nuevas versiones del plugin
- [ ] Plan de rollback en caso de problemas

---

## 📚 Recursos Adicionales

**Documentación del Plugin:**
- README completo: `grails/plugins/design-system-taglibs/README.md`
- Ejemplos de todos los taglibs
- API reference completo

**Grails Implementation Guide:**
- `docs/grails/GRAILS_IMPLEMENTATION_PLAN.md`
- Detalles técnicos de implementación

**Demo Workflow:**
- `docs/DEMO_AND_RELEASE.md`
- Workflow completo de publicación y actualización

**Design System Repo:**
- https://bitbucket.org/khipu/design-system
- Tokens, componentes React, Android

---

## 🎯 Próximos Pasos

1. **Completar configuración inicial** (30 min)
   - Modificar BuildConfig.groovy
   - Instalar plugin
   - Crear página de prueba

2. **Migrar primera página** (2 horas)
   - Elegir página simple (ej: login)
   - Reemplazar componentes básicos
   - Testing

3. **Migrar páginas críticas** (1-2 semanas)
   - Pago de mandatos
   - Selección de bancos
   - Confirmación

4. **Migración completa** (4-6 semanas)
   - Todas las vistas GSP
   - Remover estilos custom obsoletos
   - Documentar patrones específicos de payment

---

**Última Actualización:** 2026-02-25
**Versión del Plugin:** 0.1.0
**Grails Version:** 2.5.4
**Java Version:** 7 compatible
**Mantenido por:** Design System Team
