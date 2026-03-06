# Guía de Integración - Design System Grails Plugin

## 📦 Plugin Publicado

**Artifact:** `com.khipu:design-system-grails:0.1.0-alpha.1`
**Ubicación:** AWS CodeArtifact
**Repositorio:** `maven-packages`
**Dominio:** `khipu`

---

## 🚀 Integración en ~/Code/payment

### Paso 1: Configurar Autenticación con CodeArtifact

#### Opción A: Usando AWS CLI (Recomendado)

Crea el archivo `~/.gradle/init.gradle` si no existe:

```groovy
import java.util.concurrent.TimeUnit

def getCodeArtifactToken() {
    def domain = 'khipu'
    def domainOwner = '375783675928'
    def region = 'us-east-1'

    try {
        def proc = ['aws', 'codeartifact', 'get-authorization-token',
                    '--domain', domain,
                    '--domain-owner', domainOwner,
                    '--region', region,
                    '--query', 'authorizationToken',
                    '--output', 'text'].execute()

        proc.waitFor(10, TimeUnit.SECONDS)
        if (proc.exitValue() == 0) {
            return proc.text.trim()
        }
    } catch (Exception e) {
        println "⚠️ Warning: Could not get CodeArtifact token: ${e.message}"
    }
    return null
}

allprojects {
    repositories {
        maven {
            name 'CodeArtifact'
            url 'https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/maven-packages/'
            credentials {
                username 'aws'
                password getCodeArtifactToken()
            }
        }
    }
}
```

#### Opción B: Variables de Entorno

Antes de ejecutar comandos Grails, configura las credenciales:

```bash
# Ejecutar antes de grails run-app o cualquier comando
source ~/scripts/khipu-codeartifact-grails.sh
```

### Paso 2: Configurar BuildConfig.groovy

Edita `grails-app/conf/BuildConfig.groovy` en el proyecto **payment**:

```groovy
grails.project.dependency.resolution = {
    inherits("global") {
        // Heredar configuración global
    }

    log "warn"
    checksums true
    legacyResolve false

    repositories {
        inherits true

        grailsPlugins()
        grailsHome()
        mavenLocal()
        grailsCentral()
        mavenCentral()

        // AWS CodeArtifact para Design System
        mavenRepo([
            name: 'CodeArtifact',
            url: 'https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/maven-packages/'
        ]) {
            // Las credenciales se obtienen de ~/.gradle/init.gradle
        }
    }

    dependencies {
        // Tus dependencias existentes...
    }

    plugins {
        // Tus plugins existentes...

        // ✨ Khipu Design System
        compile 'com.khipu:design-system-grails:0.1.0-alpha.1'

        // Otros plugins...
    }
}
```

### Paso 3: Incluir CSS en el Layout

Edita tu layout principal (ej: `grails-app/views/layouts/main.gsp`):

```gsp
<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Khipu Payment"/></title>

    <!-- ✨ Khipu Design System CSS -->
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-tokens.css', plugin: 'design-system-grails')}"/>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-components.css', plugin: 'design-system-grails')}"/>

    <!-- CSS existente -->
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}"/>

    <g:layoutHead/>
</head>
<body>
    <g:layoutBody/>
</body>
</html>
```

### Paso 4: Usar Taglibs en tus GSPs

Ahora puedes usar el taglib `kds:button` en cualquier vista:

```gsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Pago Khipu</title>
</head>
<body>
    <div class="container">
        <h1>Realizar Pago</h1>

        <g:form action="procesarPago" method="POST">
            <!-- Campos del formulario... -->

            <div class="form-actions">
                <!-- Botón primario de submit -->
                <kds:button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth="true">
                    PAGAR AHORA
                </kds:button>

                <!-- Botón secundario para cancelar -->
                <kds:button
                    variant="outlined"
                    color="secondary"
                    onclick="window.history.back()">
                    Cancelar
                </kds:button>
            </div>
        </g:form>

        <!-- Botón de ayuda -->
        <kds:button
            variant="text"
            href="/ayuda"
            target="_blank">
            ¿Necesitas ayuda?
        </kds:button>
    </div>
</body>
</html>
```

---

## 🔄 Actualizar el Plugin

Cuando se publique una nueva versión:

```bash
# 1. Actualizar versión en BuildConfig.groovy
plugins {
    compile 'com.khipu:design-system-grails:0.1.0-alpha.2'  // Nueva versión
}

# 2. Limpiar y refrescar dependencias
grails clean
grails refresh-dependencies
grails run-app
```

---

## 🧪 Verificar Instalación

### Verificar que el plugin se cargó

```bash
# En el proyecto payment
grails list-plugins | grep design-system
```

Debería mostrar:
```
design-system-grails-0.1.0-alpha.1
```

### Verificar CSS disponible

Después de ejecutar `grails run-app`, verifica en el navegador:

```
http://localhost:8080/payment/static/plugins/design-system-grails/css/kds-tokens.css
http://localhost:8080/payment/static/plugins/design-system-grails/css/kds-components.css
```

### Verificar taglib disponible

Crea una vista de prueba en `grails-app/views/test/button.gsp`:

```gsp
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Test Button</title>
</head>
<body>
    <h1>Test Khipu Design System Buttons</h1>

    <h2>Variants</h2>
    <kds:button variant="contained">Contained</kds:button>
    <kds:button variant="outlined">Outlined</kds:button>
    <kds:button variant="text">Text</kds:button>

    <h2>Colors</h2>
    <kds:button color="primary">Primary</kds:button>
    <kds:button color="secondary">Secondary</kds:button>
    <kds:button color="success">Success</kds:button>
    <kds:button color="error">Error</kds:button>

    <h2>States</h2>
    <kds:button loading="true">Loading...</kds:button>
    <kds:button disabled="true">Disabled</kds:button>

    <h2>Sizes</h2>
    <kds:button size="small">Small</kds:button>
    <kds:button size="medium">Medium</kds:button>
    <kds:button size="large">Large</kds:button>
</body>
</html>
```

---

## 📚 Referencia Rápida del API

### kds:button

| Atributo | Tipo | Default | Valores |
|----------|------|---------|---------|
| `variant` | String | `contained` | `contained`, `outlined`, `text` |
| `color` | String | `primary` | `primary`, `secondary`, `success`, `error`, `warning`, `info` |
| `size` | String | `large` | `small`, `medium`, `large` |
| `type` | String | `button` | `button`, `submit`, `reset` |
| `fullWidth` | Boolean | `false` | `true`, `false` |
| `disabled` | Boolean | `false` | `true`, `false` |
| `loading` | Boolean | `false` | `true`, `false` |
| `href` | String | - | URL (renderiza como `<a>`) |
| `target` | String | - | `_blank`, `_self`, etc. |
| `onclick` | String | - | JavaScript handler |
| `id`, `class`, `style` | String | - | Atributos HTML estándar |
| `data-*`, `aria-*` | String | - | Atributos personalizados |

### Ejemplos Comunes

```gsp
<!-- Submit button con loading -->
<g:form action="save">
    <kds:button
        type="submit"
        loading="${procesando}"
        fullWidth="true">
        ${procesando ? 'Guardando...' : 'Guardar'}
    </kds:button>
</g:form>

<!-- Botón de acción peligrosa -->
<kds:button
    color="error"
    onclick="if(confirm('¿Eliminar?')) { document.getElementById('deleteForm').submit(); }">
    Eliminar
</kds:button>

<!-- Link estilizado -->
<kds:button
    variant="text"
    href="${createLink(controller: 'help', action: 'index')}"
    target="_blank">
    Ver documentación
</kds:button>

<!-- Botón condicional -->
<kds:button
    disabled="${!usuario.puedeEditar}"
    title="${usuario.puedeEditar ? '' : 'No tienes permisos'}">
    Editar
</kds:button>
```

---

## 🐛 Troubleshooting

### Error: "Plugin design-system-grails not found"

1. Verificar que CodeArtifact esté configurado en `~/.gradle/init.gradle`
2. Regenerar token: `source ~/scripts/khipu-codeartifact-grails.sh`
3. Limpiar caché: `grails clean && rm -rf ~/.grails/2.5.4/cached-installed-plugins`
4. Refrescar: `grails refresh-dependencies`

### Error: "Tag [button] does not exist. No tag library found for namespace: kds"

El plugin no se cargó correctamente:
```bash
# Verificar que esté en BuildConfig.groovy
grep "design-system-grails" grails-app/conf/BuildConfig.groovy

# Limpiar y reconstruir
grails clean
grails compile
grails run-app
```

### CSS no se aplica

1. Verificar que los archivos CSS estén accesibles:
   ```
   http://localhost:8080/[app-name]/static/plugins/design-system-grails/css/kds-tokens.css
   ```

2. Verificar en el HTML generado que los links estén presentes:
   ```bash
   curl http://localhost:8080/[app-name]/[controller]/[action] | grep kds
   ```

3. Verificar orden de carga (Design System CSS debe ir antes del CSS de la app)

### Token de CodeArtifact expiró

Los tokens duran 12 horas. Regenerar:
```bash
source ~/scripts/khipu-codeartifact-grails.sh
# Luego reiniciar la app
```

---

## 📞 Soporte

**Documentación completa:**
- `grails/README.md` - Overview del módulo Grails
- `grails/PUBLISHING.md` - Guía de publicación
- `docs/grails/GRAILS_IMPLEMENTATION_PLAN.md` - Plan de implementación
- `docs/grails/FORM_COMPONENTS_PLAN.md` - Plan de componentes de formulario

**Próximos componentes:**
- KdsAlertTagLib
- KdsTextFieldTagLib
- KdsCheckboxTagLib
- KdsSelectTagLib
- KdsFormTagLib

**Versión actual:** 0.1.0-alpha.1
**Componentes disponibles:** KdsButton
