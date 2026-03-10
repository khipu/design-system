# Recursos de Marca

Esta carpeta está destinada a almacenar documentos de referencia y recursos adicionales de la marca Khipu.

## 📁 Tipos de Archivos Recomendados

### Documentos de Referencia
- **PDFs de guías de marca**: Manuales de identidad visual completos
- **Especificaciones de diseño**: Documentos técnicos de Figma
- **Guidelines adicionales**: Políticas de uso de marca

### Assets Visuales
- **Variantes del logo**: Versiones monocromáticas, invertidas, etc.
- **Ilustraciones**: Elementos gráficos de marca
- **Iconografía**: Sets de íconos personalizados
- **Fotografías**: Banco de imágenes de marca

### Plantillas
- **Templates de marketing**: Banners, ads, posts sociales
- **Documentos corporativos**: Presentaciones, letterheads
- **Email templates**: Plantillas de correo

## 🔗 Cómo Referenciar Assets en Storybook

### Importar en archivos MDX

```mdx
import MiImagen from './assets/mi-imagen.png';

<img src={MiImagen} alt="Descripción" />
```

### Para PDFs

```mdx
[Descargar Guía de Marca completa](./assets/brand-guidelines.pdf)
```

## 📝 Estructura Sugerida

```
assets/
├── logos/
│   ├── khipu-logo-white.svg
│   ├── khipu-logo-black.svg
│   └── khipu-logo-monochrome.svg
├── guidelines/
│   ├── brand-guidelines-2024.pdf
│   └── design-specifications.pdf
├── illustrations/
│   └── ...
└── templates/
    └── ...
```

## ⚠️ Nota Importante

Los assets agregados aquí deben ser:
- ✅ De uso interno del equipo
- ✅ Optimizados para web (imágenes comprimidas)
- ✅ Con nombres descriptivos y consistentes
- ❌ No incluir información confidencial en assets públicos
