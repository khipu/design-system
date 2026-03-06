# Khipu Design System Taglibs for Grails 2.x

Plugin de Grails que provee taglibs del Sistema de Diseño de Khipu para aplicaciones Grails/GSP.

## 📦 Instalación en Payment

### 1. Agregar dependencia en `BuildConfig.groovy`

```groovy
dependencies {
    compile ':design-system-taglibs:0.1.0'
}
```

El repositorio ya está configurado en payment para descargar desde Nexus thirdparty.

### 2. Refrescar dependencias

```bash
grails refresh-dependencies
```

## 🎨 Taglibs Disponibles

### KdsButton
```gsp
<kds:button text="Pagar Ahora"
            variant="contained"
            color="primary"
            fullWidth="true" />

<kds:button text="Cancelar"
            variant="outlined"
            color="secondary" />
```

### KdsTextField
```gsp
<kds:textField name="email"
               label="Email"
               type="email"
               required="true"
               helperText="Ingresa tu correo electrónico" />

<kds:textField name="amount"
               label="Monto"
               type="number"
               value="${amount}"
               error="${errors.amount}" />
```

### KdsCard
```gsp
<kds:card>
    <kds:cardHeader title="Selecciona tu banco" />
    <kds:cardContent>
        <p>Elige el banco para realizar el pago</p>
    </kds:cardContent>
    <kds:cardActions>
        <kds:button text="Continuar" variant="contained" />
    </kds:cardActions>
</kds:card>
```

### KdsTypography
```gsp
<kds:typography variant="heading1">Título Principal</kds:typography>
<kds:typography variant="body">Texto de párrafo regular</kds:typography>
<kds:typography variant="caption">Texto pequeño</kds:typography>
```

### KdsAlert
```gsp
<kds:alert type="success" message="Pago procesado exitosamente" />
<kds:alert type="error" message="Error al procesar el pago" />
<kds:alert type="warning" message="Revisa los datos ingresados" />
<kds:alert type="info" message="El proceso puede tardar unos minutos" />
```

### KdsCheckbox
```gsp
<kds:checkbox name="terms"
              label="Acepto los términos y condiciones"
              required="true" />

<kds:checkbox name="subscribe"
              label="Deseo recibir notificaciones"
              checked="true" />
```

### KdsTabs
```gsp
<kds:tabs>
    <kds:tab label="Transferencia" active="true">
        Contenido de transferencia bancaria
    </kds:tab>
    <kds:tab label="Tarjeta">
        Contenido de pago con tarjeta
    </kds:tab>
</kds:tabs>
```

### KdsSpinner
```gsp
<kds:spinner size="medium" />
<kds:spinner size="large" color="primary" />
```

## 🔄 Workflow de Actualización (Design System → Payment)

### Paso 1: Modificar taglibs en design-system

```bash
cd /Users/fortunatoherrerakhipu/Code/design-system/grails/plugins/design-system-taglibs

# Editar taglibs en: grails-app/taglib/com/khipu/designsystem/
# Editar CSS en: web-app/css/design-system.css
```

### Paso 2: Actualizar versión

Editar en **3 archivos**:

1. `DesignSystemTaglibsGrailsPlugin.groovy`:
```groovy
def version = "0.1.1"  // Incrementar
```

2. `plugin.xml`:
```xml
<plugin name='design-system-taglibs' version='0.1.1' ...>
```

3. `publish-to-nexus.sh`:
```bash
PLUGIN_VERSION="0.1.1"  # Actualizar
```

### Paso 3: Empaquetar plugin

```bash
# Crear ZIP con estructura correcta
zip -r grails-design-system-taglibs-0.1.1.zip \
    DesignSystemTaglibsGrailsPlugin.groovy \
    application.properties \
    plugin.xml \
    grails-app/ \
    web-app/ \
    src/
```

### Paso 4: Publicar a Nexus

```bash
./publish-to-nexus.sh
```

**Salida esperada:**
```
📦 Publicando Design System Taglibs v0.1.1 a Nexus usando Maven...
📝 Creando POM...
📤 Subiendo plugin a Nexus con Maven...
Uploaded to khipu-nexus-thirdparty: ...design-system-taglibs-0.1.1.zip (11 kB at 4.4 kB/s)
✅ Plugin publicado exitosamente!
```

### Paso 5: Actualizar payment

```bash
cd /Users/fortunatoherrerakhipu/Code/payment

# 1. Actualizar versión en BuildConfig.groovy
# Cambiar: compile ':design-system-taglibs:0.1.0'
#      A: compile ':design-system-taglibs:0.1.1'

# 2. Limpiar caché
rm -rf target/work/plugins/design-system-taglibs-*
rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs

# 3. Refrescar dependencias
grails refresh-dependencies

# 4. Verificar instalación
# Debe mostrar: "Installed plugin design-system-taglibs-0.1.1"
```

## 🧪 Testing

### Página de prueba en payment:

URL: http://localhost:8080/payment/designSystemTest

```bash
cd /Users/fortunatoherrerakhipu/Code/payment
grails run-app

# Navegar a: http://localhost:8080/payment/designSystemTest
```

La página de prueba muestra todos los taglibs disponibles con ejemplos.

## 📂 Estructura del Plugin

```
design-system-taglibs/
├── DesignSystemTaglibsGrailsPlugin.groovy  # Plugin descriptor (REQUERIDO)
├── application.properties                  # Grails metadata (REQUERIDO)
├── plugin.xml                              # Plugin manifest (REQUERIDO)
├── grails-app/
│   └── taglib/com/khipu/designsystem/
│       ├── KdsButtonTagLib.groovy
│       ├── KdsTextFieldTagLib.groovy
│       ├── KdsCardTagLib.groovy
│       ├── KdsTypographyTagLib.groovy
│       ├── KdsAlertTagLib.groovy
│       ├── KdsCheckboxTagLib.groovy
│       ├── KdsTabsTagLib.groovy
│       └── KdsSpinnerTagLib.groovy
├── web-app/
│   └── css/
│       └── design-system.css               # CSS variables (--kds-*)
├── src/
│   ├── test/groovy/com/khipu/designsystem/
│   └── main/resources/css/
├── settings.xml                            # Maven settings para Nexus
├── publish-to-nexus.sh                     # Script de publicación
└── README.md                               # Esta documentación
```

## 🔧 Troubleshooting

### "Zip is not a valid plugin"

**Causa:** ZIP descargado está corrupto o incompleto.

**Solución:**
```bash
# 1. Verificar versión correcta en BuildConfig.groovy
# 2. Limpiar caché completamente
rm -rf ~/.m2/repository/org/grails/plugins/design-system-taglibs
rm -rf target/work/plugins/design-system-taglibs-*

# 3. Verificar archivo en Nexus es completo (debe ser ~11 KB)
curl -I -u deployment:93h50sj2di2hd923 \
  "https://dev.khipu.com/nexus/content/repositories/thirdparty/org/grails/plugins/design-system-taglibs/0.1.0/design-system-taglibs-0.1.0.zip"

# 4. Refrescar
grails refresh-dependencies
```

### Plugin no se descarga de Nexus

**Verificar orden de repositorios en BuildConfig.groovy:**
```groovy
// thirdparty DEBE estar ANTES de releases
mavenRepo('https://dev.khipu.com/nexus/content/repositories/thirdparty') {
    auth([...])
    grailsPlugins()
}
mavenRepo('https://dev.khipu.com/nexus/content/repositories/releases') {
    auth([...])
    grailsPlugins()
}
```

### Cambios en taglibs no se reflejan

```bash
# 1. Incrementar versión del plugin
# 2. Re-empaquetar y publicar
# 3. Actualizar versión en payment
# 4. Limpiar caché y refrescar
```

## 📋 Checklist de Release

- [ ] Editar código de taglibs/CSS
- [ ] Incrementar versión en 3 archivos (Plugin.groovy, plugin.xml, publish-to-nexus.sh)
- [ ] Crear ZIP: `zip -r grails-design-system-taglibs-X.Y.Z.zip ...`
- [ ] Publicar: `./publish-to-nexus.sh`
- [ ] Verificar en Nexus: `curl -I ...`
- [ ] Actualizar versión en payment BuildConfig.groovy
- [ ] Limpiar caché payment
- [ ] Refrescar dependencies: `grails refresh-dependencies`
- [ ] Verificar instalación: debe mostrar "Installed plugin design-system-taglibs-X.Y.Z"
- [ ] Test manual: http://localhost:8080/payment/designSystemTest

## 🎯 Notas Importantes

1. **Siempre usar repositorio thirdparty** - El repositorio releases no acepta artifacts tipo ZIP
2. **Versión debe coincidir** - Los 3 archivos deben tener la misma versión
3. **Archivos requeridos** - El ZIP DEBE incluir: DesignSystemTaglibsGrailsPlugin.groovy, application.properties, plugin.xml
4. **Tamaño del ZIP** - Debe ser ~11 KB completo, 8.7 KB indica archivo corrupto
5. **Java 7 compatible** - El código debe ser compatible con Java 7 para payment

## 📞 Soporte

Para problemas o preguntas:
- Ver logs: `grails refresh-dependencies --stacktrace`
- Verificar Nexus: https://dev.khipu.com/nexus/
- Revisar CLAUDE.md en `/Users/fortunatoherrerakhipu/Code/design-system/`
