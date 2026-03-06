# 🚀 Guía Rápida - Khipu Token Extractor

## ¿Qué hace este plugin?

Extrae todas las **Variables de Figma** del archivo K-Tokens y las convierte a JSON para sincronizar con el Design System.

## ⚡ Instalación Rápida

### 1. Abrir Figma Desktop (NO navegador)

### 2. Importar el plugin
```
Menu > Plugins > Development > Import plugin from manifest...
```

### 3. Seleccionar el archivo manifest.json
Navegar a: `/Users/juanp./Proyectos/design-system/figma-plugin-token-extractor/manifest.json`

## 🎯 Uso

### 1. Abrir el archivo K-Tokens en Figma
- Archivo: `K-Tokens for Figma - Material UI`

### 2. Ejecutar el plugin
```
Menu > Plugins > Development > Khipu Token Extractor
```

### 3. Copiar los datos
- Se abrirá una ventana con dos pestañas:
  - **JSON Completo**: Todos los tokens
  - **Vista de Colores**: Preview visual de Primary colors
- Click en **"Copiar JSON"**

### 4. Revisar los valores de Primary
En el JSON copiado, busca:

```json
{
  "variables": {
    "collections": {
      "Material UI Theme": {
        "variables": {
          "primary/main": {
            "values": {
              "Light": { "hex": "#??????" }
            }
          },
          "primary/light": {
            "values": {
              "Light": { "hex": "#??????" }
            }
          },
          "primary/dark": {
            "values": {
              "Light": { "hex": "#??????" }
            }
          }
        }
      }
    }
  }
}
```

### 5. Actualizar tokens del Design System

Copiar los valores hex y actualizar en:
`src/tokens/index.ts`:

```typescript
export const colors = {
  primary: {
    main: '#??????',   // ← primary/main de Figma
    light: '#??????',  // ← primary/light de Figma
    dark: '#??????',   // ← primary/dark de Figma
    contrastText: '#FFFFFF',
  }
}
```

## 💡 Tips

- **Solo funciona en Figma Desktop** (los plugins con acceso a Variables requieren la app)
- Si no ves variables, el plugin también extrae **Color Styles** como fallback
- El JSON incluye metadata útil: fecha de extracción, nombre del archivo, totales

## ❓ Troubleshooting

### El plugin no aparece
- ¿Estás en Figma Desktop? (no funciona en navegador)
- Verifica que `code.js` existe en la carpeta

### No se extraen variables
- Verifica que el archivo tiene Variables creadas (no solo Styles)
- Revisa la pestaña "Estilos" como fallback

### Necesitas recompilar
Si modificas `code.ts`:
```bash
cd /Users/juanp./Proyectos/design-system/figma-plugin-token-extractor
npx tsc
```

Luego en Figma: `Menu > Plugins > Development > Reload plugin`

---

📖 Para más detalles, consulta el [README.md](./README.md) completo
