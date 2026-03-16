# Guía de Integración - Design System Grails Plugin

## 📦 Plugin Publicado

**Artifact:** `org.grails.plugins:design-system-taglibs:0.1.1`
**Ubicación:** Nexus Thirdparty
**Repositorio:** `https://dev.khipu.com/nexus/content/repositories/thirdparty`
**Formato:** ZIP (Grails 2.x plugin)

---

## 🚀 Integración en ~/Code/payment

### Paso 1: Configurar Repositorio Nexus

**Importante:** El plugin se publica como ZIP en Nexus **thirdparty**, no en CodeArtifact.

No se requiere configuración especial de Gradle. Las credenciales se configuran directamente en `BuildConfig.groovy`.

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

        // ⚠️ CRÍTICO: thirdparty DEBE ir ANTES de releases
        // El repositorio releases tiene un ZIP corrupto del plugin
        mavenRepo('https://dev.khipu.com/nexus/content/repositories/thirdparty') {
            auth([
                username: "deployment",
                password: "93h50sj2di2hd923"
            ])
            grailsPlugins()
        }

        mavenRepo('https://dev.khipu.com/nexus/content/repositories/releases') {
            auth([
                username: "deployment",
                password: "93h50sj2di2hd923"
            ])
            grailsPlugins()
            grailsHome()
            mavenLocal()
        }

        grailsCentral()
        mavenCentral()
    }

    dependencies {
        // Tus dependencias existentes...
    }

    plugins {
        // Tus plugins existentes...

        // ✨ Khipu Design System Taglibs
        compile ':design-system-taglibs:0.1.1'

        // Otros plugins...
    }
}
```

### Paso 3: Usar Taglibs (CSS se carga automáticamente)

El plugin incluye CSS en `web-app/css/design-system.css` que se sirve automáticamente desde:
```
http://localhost:8080/payment/plugins/design-system-taglibs-0.1.1/css/design-system.css
```

**Opcional:** Si necesitas incluir el CSS explícitamente en tu layout:

```gsp
<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Khipu Payment"/></title>

    <!-- ✨ Khipu Design System CSS (opcional - se carga automáticamente) -->
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'design-system.css', plugin: 'design-system-taglibs')}"/>

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

Cuando se publique una nueva versión en Nexus thirdparty:

```bash
# 1. Actualizar versión en BuildConfig.groovy
plugins {
    compile ':design-system-taglibs:0.1.2'  // Nueva versión
}

# 2. Limpiar cache completamente
rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
rm -rf target/work/plugins/design-system-taglibs-*

# 3. Refrescar dependencias
grails refresh-dependencies

# 4. Ejecutar app
grails run-app
```

**O usar el script de actualización:**
```bash
./refresh-design-system.sh 0.1.2
```

---

## 🧪 Verificar Instalación

### Verificar que el plugin se descargó

```bash
# Verificar plugin instalado en directorio de trabajo
ls -la target/work/plugins/ | grep design-system-taglibs

# Debería mostrar:
# design-system-taglibs-0.1.1/
```

### Verificar ZIP descargado correctamente

```bash
# Verificar tamaño del ZIP en Maven Local (debe ser ~11 KB, NO 8.7K)
ls -lh ~/.m2/repository/org/grails/plugins/design-system-taglibs/0.1.1/*.zip

# Verificar contenido del plugin
ls -la target/work/plugins/design-system-taglibs-0.1.1/
# Debe contener: grails-app/, web-app/, src/, plugin.xml, etc.
```

### Verificar CSS disponible

Después de ejecutar `grails run-app`, verifica en el navegador:

```
http://localhost:8080/payment/plugins/design-system-taglibs-0.1.1/css/design-system.css
```

O verificar contenido:
```bash
cat target/work/plugins/design-system-taglibs-0.1.1/web-app/css/design-system.css | head -20
# Debe mostrar CSS variables como --kds-color-primary-main
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

### Error: "Plugin design-system-taglibs not found"

**Causa:** Nexus thirdparty no está configurado o está en el orden incorrecto.

**Solución:**
1. Verificar BuildConfig.groovy:
   ```bash
   grep -A 10 "repositories {" grails-app/conf/BuildConfig.groovy
   ```

2. Verificar que thirdparty esté ANTES de releases

3. Limpiar caché completamente:
   ```bash
   rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
   rm -rf target/work/plugins/design-system-taglibs-*
   grails clean
   ```

4. Refrescar dependencias:
   ```bash
   grails refresh-dependencies
   ```

### Error: "Zip is not a valid plugin"

**Causa:** ZIP descargado está corrupto (8.7K en lugar de 11K).

**Solución:**
```bash
# Verificar orden de repositorios - thirdparty DEBE estar ANTES de releases
grep -B 5 -A 10 "thirdparty\|releases" grails-app/conf/BuildConfig.groovy

# Limpiar completamente
rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
rm -rf target/work/plugins/design-system-taglibs-*

# Refrescar
grails refresh-dependencies

# Verificar descarga correcta
ls -lh ~/.m2/repository/org/grails/plugins/design-system-taglibs/0.1.1/*.zip
# Debe mostrar ~11 KB, NO 8.7K
```

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

1. Verificar que el archivo CSS esté en el plugin:
   ```bash
   ls target/work/plugins/design-system-taglibs-0.1.1/web-app/css/design-system.css
   ```

2. Verificar que el CSS esté accesible (con grails run-app corriendo):
   ```
   http://localhost:8080/payment/plugins/design-system-taglibs-0.1.1/css/design-system.css
   ```

3. Verificar contenido del CSS:
   ```bash
   cat target/work/plugins/design-system-taglibs-0.1.1/web-app/css/design-system.css | grep "color-primary-main"
   # Debe mostrar: --kds-color-primary-main: #8347AD;
   ```

4. Verificar en el HTML generado:
   ```bash
   curl http://localhost:8080/payment/[controller]/[action] | grep design-system
   ```

### Nexus no accesible

**Verificar conectividad:**
```bash
# Probar acceso a Nexus thirdparty
curl -I "https://dev.khipu.com/nexus/content/repositories/thirdparty/"
# Debe retornar HTTP 200

# Probar con credenciales
curl -u deployment:93h50sj2di2hd923 \
  "https://dev.khipu.com/nexus/content/repositories/thirdparty/org/grails/plugins/design-system-taglibs/maven-metadata.xml"
```

---

## 📞 Soporte

**Documentación completa:**
- `grails/README.md` - Overview del módulo Grails
- `grails/PUBLISHING.md` - Guía de publicación
- `docs/grails/PAYMENT_MIGRATION_GUIDE.md` - ✅ Guía de migración completa (actualizada)
- `docs/grails/GRAILS_IMPLEMENTATION_PLAN.md` - Plan de implementación
- `docs/grails/README.md` - Overview y getting started

**Componentes disponibles (v0.1.1):**
- ✅ KdsButton (3 variantes, 6 colores, 3 tamaños)
- ✅ KdsTextField (text, email, number, password)
- ✅ KdsCard (header, content, actions)
- ✅ KdsAlert (success, error, warning, info)
- ✅ KdsCheckbox
- ✅ KdsTypography (10 variantes)
- ✅ KdsTabs
- ✅ KdsSpinner

**Próximos componentes:**
- KdsSelect (planned)
- KdsRadio (planned)
- KdsModal (planned)

**Versión actual:** 0.1.1
**Publicado en:** Nexus Thirdparty (dev.khipu.com/nexus/content/repositories/thirdparty)
**Formato:** ZIP (Grails 2.x plugin)
