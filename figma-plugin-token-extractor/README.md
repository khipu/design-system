# Khipu Token Extractor - Plugin de Figma

Plugin de Figma que extrae todas las variables y estilos de color del archivo K-Tokens y los convierte a formato JSON para sincronizar con el Design System.

## 📦 Instalación

### Paso 1: Compilar el plugin

El plugin está escrito en TypeScript. Necesitas compilarlo a JavaScript antes de usarlo:

```bash
# Desde el directorio del plugin
cd figma-plugin-token-extractor

# Compilar code.ts a code.js
npx tsc code.ts --target es2017 --lib es2017,dom --outDir .
```

Si no tienes TypeScript instalado globalmente:

```bash
npm install -g typescript
```

### Paso 2: Instalar en Figma Desktop

1. **Abrir Figma Desktop** (el plugin NO funciona en el navegador)
2. Ir a **Menu > Plugins > Development > Import plugin from manifest...**
3. Navegar a la carpeta `figma-plugin-token-extractor`
4. Seleccionar el archivo `manifest.json`
5. El plugin aparecerá en **Menu > Plugins > Development > Khipu Token Extractor**

## 🚀 Uso

### Ejecutar el plugin

1. **Abrir el archivo K-Tokens en Figma Desktop**
   - Archivo: `K-Tokens for Figma - Material UI`
   - File Key: `pYoSx3qiEHJqsX8hVKlNkz`

2. **Ejecutar el plugin**
   - Menu > Plugins > Development > Khipu Token Extractor
   - El plugin se ejecutará automáticamente

3. **Ver los resultados**
   - Se abrirá una ventana con dos pestañas:
     - **JSON Completo**: Todos los tokens en formato JSON
     - **Vista de Colores**: Vista previa visual de los colores primarios

4. **Copiar los datos**
   - Click en "Copiar JSON" para copiar todo al portapapeles
   - Pega el contenido en un archivo para revisarlo

### Formato del JSON exportado

```json
{
  "variables": {
    "metadata": {
      "extractedAt": "2024-02-05T...",
      "figmaFile": "K-Tokens",
      "totalCollections": 1
    },
    "collections": {
      "Material UI Theme": {
        "name": "Material UI Theme",
        "modes": {
          "759:0": "Light"
        },
        "variables": {
          "primary/main": {
            "name": "primary/main",
            "resolvedType": "COLOR",
            "values": {
              "Light": {
                "hex": "#8347AD",
                "rgba": {
                  "r": 131,
                  "g": 71,
                  "b": 173,
                  "a": 1
                },
                "opacity": 1
              }
            }
          }
        }
      }
    }
  },
  "styles": {
    "metadata": {
      "extractedAt": "2024-02-05T...",
      "figmaFile": "K-Tokens",
      "totalStyles": 3
    },
    "styles": {
      "primary/main": {
        "hex": "#8347AD",
        "rgba": {
          "r": 131,
          "g": 71,
          "b": 173,
          "a": 1
        }
      }
    }
  },
  "summary": {
    "totalCollections": 1,
    "totalVariables": 50,
    "totalStyles": 3
  }
}
```

## 🔄 Sincronizar tokens con el Design System

### Actualizar manualmente

1. Ejecutar el plugin en Figma
2. Copiar el JSON resultante
3. Revisar los valores de `variables.collections[...].variables`
4. Actualizar manualmente `src/tokens/index.ts` con los valores correctos

### Ejemplo de actualización

Si el JSON muestra:

```json
"primary/main": {
  "values": {
    "Light": { "hex": "#8347AD" }
  }
}
```

Actualizar en `src/tokens/index.ts`:

```typescript
export const colors = {
  primary: {
    main: '#8347AD',  // ← Actualizar con el valor de Figma
    // ...
  }
}
```

## 📝 Notas importantes

- **Solo funciona en Figma Desktop**: Los plugins con acceso a variables requieren la aplicación de escritorio
- **Extrae Variables de Figma**: Variables creadas con el sistema de Variables de Figma
- **También extrae Estilos**: Como fallback, también extrae Color Styles tradicionales
- **Conversión automática**: Convierte valores RGB a hexadecimal automáticamente
- **Múltiples modos**: Si tienes modos Dark/Light, extrae todos los valores

## 🛠️ Desarrollo

### Estructura de archivos

```
figma-plugin-token-extractor/
├── manifest.json      # Configuración del plugin
├── code.ts           # Código principal (TypeScript)
├── code.js           # Código compilado (generado)
├── ui.html           # Interfaz de usuario
└── README.md         # Este archivo
```

### Modificar el plugin

1. Editar `code.ts` con los cambios deseados
2. Recompilar: `npx tsc code.ts --target es2017 --lib es2017,dom --outDir .`
3. En Figma: Menu > Plugins > Development > Reload plugin
4. Ejecutar de nuevo para probar los cambios

## 🐛 Troubleshooting

### El plugin no aparece en Figma
- Asegúrate de estar usando **Figma Desktop**, no el navegador
- Verifica que `code.js` existe (debes compilar `code.ts` primero)
- Reintenta importar el manifest.json

### No se extraen variables
- Verifica que el archivo de Figma tiene Variables creadas
- Asegúrate de que las variables están en el archivo local (no en una librería externa)
- Revisa la pestaña "Estilos" como fallback

### Error de compilación TypeScript
```bash
# Instalar TypeScript si no lo tienes
npm install -g typescript

# O usar npx sin instalar
npx tsc code.ts --target es2017 --lib es2017,dom --outDir .
```

## 📚 Referencias

- [Figma Plugin API - Variables](https://www.figma.com/plugin-docs/api/Variable/)
- [Figma Plugin API - Styles](https://www.figma.com/plugin-docs/api/PaintStyle/)
- [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## 📄 Licencia

Uso interno de Khipu. No redistribuir.
