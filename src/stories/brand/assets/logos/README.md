# Logos de Khipu

## Instrucciones para Descargar los Logos

Los logos oficiales de Khipu requieren autenticación para acceder. Para completar esta guía:

### Opción 1: Descarga Manual
1. Ve a [docs.khipu.com/resources/payment-logos](https://docs.khipu.com/resources/payment-logos)
2. Haz clic en "Descargar" en cada logo
3. Guarda los archivos SVG en esta carpeta con los siguientes nombres:

**Logos Horizontales:**
- `khipu-200x75-purple.svg`
- `khipu-200x75-color.svg`
- `khipu-200x75-black.svg`

**Logos Cuadrados:**
- `khipu-140x140-purple.svg`
- `khipu-140x140-purple-negative.svg`
- `khipu-140x140-simple.svg`
- `khipu-140x140-black.svg`
- `khipu-140x140-white.svg`
- `khipu-140x140-white-negative.svg`

### Opción 2: Desde el CDN Interno
Si tienes acceso autorizado al CDN de Khipu:

```bash
cd src/stories/brand/assets/logos

# Logos horizontales
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x75-purple.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x75-color.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x75-black.svg"

# Logos cuadrados
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x140-s-purple.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x140-s-purple-negative.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x140-s.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x140-s-black.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x140-s-white.svg"
curl -O "https://s3.amazonaws.com/static.khipu.com/buttons/2016x140-s-white-negative.svg"
```

Una vez descargados, los logos se mostrarán automáticamente en Storybook.
