# Khipu Design System - Guía Rápida

## 🎯 Acceso Rápido

### Página de Inicio (Visión General)
```
http://localhost:5173/?index
```

### Showcase Interactivo
```
http://localhost:5173/?showcase
```

### Tour de Onboarding
```
http://localhost:5173/
```

## 🎨 Colores Principales

### Brand Colors
```css
/* Primary Actions */
bg-blue-600        /* #2563EB - CTAs, Links, Selección */
bg-blue-700        /* #1D4ED8 - Hover */
bg-blue-100        /* #DBEAFE - Highlights */
bg-blue-50         /* #EFF6FF - Hover suave */

/* Secondary */
bg-purple-600      /* #9333EA - Persona Jurídica */
bg-green-500       /* #22C55E - Éxito */
text-gray-900      /* #111827 - Títulos */
text-gray-600      /* #4B5563 - Texto normal */
```

## 📝 Tipografía Rápida

```tsx
/* Títulos */
<h2 className="text-3xl font-bold text-gray-900 mb-3">Título Principal</h2>
<h3 className="text-xl font-semibold text-gray-900 mb-2">Subtítulo</h3>

/* Texto */
<p className="text-gray-600">Texto normal</p>
<p className="text-sm text-gray-600">Texto secundario</p>
<p className="text-xs text-gray-500">Metadata/Hints</p>
```

## 🔘 Botones

```tsx
/* Botón Principal (CTA) */
<button className="w-full py-4 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all">
  Continuar
  <ArrowRight className="w-5 h-5" />
</button>

/* Botón Deshabilitado */
<button disabled className="w-full py-4 px-6 rounded-xl font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">
  Continuar
</button>

/* Botón Secundario (Header) */
<button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
  <HelpCircle className="w-5 h-5" />
  Ayuda
</button>

/* Botón Ícono */
<button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
  <RotateCcw className="w-5 h-5" />
</button>
```

## 📋 Cards

```tsx
/* Card Estándar de Formulario */
<div className="bg-white rounded-xl p-6 border border-gray-200">
  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
    <MapPin className="w-5 h-5 text-blue-600" />
    Título
  </label>
  {/* Contenido */}
</div>

/* Card de Selección - Seleccionada */
<button className="p-6 rounded-xl border-2 border-blue-600 bg-blue-50 shadow-md transition-all text-left">
  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
    <User className="w-6 h-6 text-blue-600" />
  </div>
  <h3 className="font-semibold text-gray-900 mb-2">Título</h3>
  <p className="text-sm text-gray-600">Descripción</p>
  <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm">
    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
      <Check className="w-3 h-3 text-white" strokeWidth={3} />
    </div>
    Seleccionado
  </div>
</button>

/* Card de Selección - No Seleccionada */
<button className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all text-left">
  {/* Mismo contenido sin badge */}
</button>
```

## 📝 Inputs

```tsx
/* Input Estándar */
<Input 
  placeholder="Placeholder" 
  className="bg-input-background border-input h-9 px-3"
/>

/* Select Personalizado */
<select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
  <option value="">Selecciona</option>
</select>

/* Label con Ícono */
<label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
  <MapPin className="w-5 h-5 text-blue-600" />
  Label
</label>
```

## 🏷️ Badges y Alerts

```tsx
/* Badge Recomendado */
<span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
  RECOMENDADO
</span>

/* Badge de Estado */
<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
  Completado
</span>

/* Alert de Éxito */
<div className="bg-green-50 border border-green-200 rounded-xl p-6">
  <div className="flex items-start gap-3">
    <CheckCircle2 className="w-6 h-6 text-green-600" />
    <div>
      <h4 className="font-semibold text-green-900 mb-1">Éxito</h4>
      <p className="text-sm text-green-700">Mensaje</p>
    </div>
  </div>
</div>

/* Alert de Advertencia */
<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
  <div className="flex items-start gap-3">
    <AlertCircle className="w-6 h-6 text-yellow-600" />
    <div>
      <h4 className="font-semibold text-yellow-900 mb-1">Advertencia</h4>
      <p className="text-sm text-yellow-700">Mensaje</p>
    </div>
  </div>
</div>
```

## 🎯 Logo Khipu

```tsx
/* Header (pequeño) */
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-xl">K</span>
</div>

/* Hero (grande) */
<div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
  <span className="text-white font-bold text-3xl">K</span>
</div>
```

## 📊 Progress Bar

```tsx
/* Paso Completado */
<div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
  <Check className="w-5 h-5" />
</div>

/* Paso Actual */
<div className="w-10 h-10 rounded-full bg-blue-600 text-white ring-4 ring-blue-100 flex items-center justify-center">
  2
</div>

/* Paso Pendiente */
<div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
  3
</div>

/* Línea Completada */
<div className="flex-1 h-0.5 bg-green-500"></div>

/* Línea Pendiente */
<div className="flex-1 h-0.5 bg-gray-200"></div>
```

## 🎨 Íconos (Lucide React)

```tsx
import { 
  ArrowRight,        // Navegación
  RotateCcw,         // Reiniciar
  HelpCircle,        // Ayuda
  User,              // Persona Natural (text-blue-600)
  Building2,         // Persona Jurídica (text-purple-600)
  CheckCircle2,      // Éxito (text-green-600)
  AlertCircle,       // Advertencia (text-yellow-600)
  Info,              // Información (text-blue-600)
  X,                 // Error (text-red-600)
  MapPin,            // Ubicación (text-blue-600)
  Upload,            // Subir
  Download,          // Descargar
  Check              // Confirmación
} from 'lucide-react';

/* Tamaños Estándar */
className="w-5 h-5"   // Botones, acciones (20px)
className="w-6 h-6"   // Cards, destacados (24px)
className="w-12 h-12" // Cards de selección (48px)
```

## 📐 Espaciado

```tsx
/* Gaps */
gap-2  // 8px  - Ícono + texto
gap-3  // 12px - Grupos relacionados
gap-4  // 16px - Grid de cards
gap-6  // 24px - Secciones de card
gap-8  // 32px - Secciones principales

/* Padding */
p-2    // 8px  - Botones ícono
p-4    // 16px - Cards compactas
p-6    // 24px - Cards estándar
p-8    // 32px - Cards grandes

py-4 px-6  // Botones CTA

/* Margin Bottom */
mb-2   // 8px  - Títulos pequeños
mb-3   // 12px - Títulos medianos
mb-4   // 16px - Secciones
mb-6   // 24px - Secciones grandes
mb-8   // 32px - Separación de bloques

/* Max Width */
max-w-2xl  // 672px  - Formularios
max-w-4xl  // 896px  - Contenedor principal
max-w-7xl  // 1280px - Header global
```

## 🔄 Border Radius

```tsx
rounded       // 4px  - Muy pequeño
rounded-md    // 6px  - Inputs, botones pequeños
rounded-lg    // 8px  - Botones, badges
rounded-xl    // 12px - Cards (MÁS COMÚN)
rounded-2xl   // 16px - Cards destacadas
rounded-full  // 100% - Círculos, badges
```

## 💫 Transiciones

```tsx
transition-all      // Botones interactivos
transition-colors   // Solo colores

/* Animación Custom Fade In */
className="animate-fadeIn"  // Definida en theme.css
```

## 🎯 Layout de Etapa Tipo

```tsx
<div className="max-w-2xl mx-auto">
  {/* Título */}
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-3">
      Etapa X: Título
    </h2>
    <p className="text-gray-600">Descripción</p>
  </div>

  {/* Contenido */}
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Formulario */}
    </div>
  </div>

  {/* CTA */}
  <button className="w-full py-4 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all">
    Continuar
    <ArrowRight className="w-5 h-5" />
  </button>
</div>
```

## 📦 Imports Comunes

```tsx
// Componentes UI
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';

// Íconos
import { 
  ArrowRight, User, Building2, HelpCircle, 
  CheckCircle2, AlertCircle, MapPin 
} from 'lucide-react';
```

## 🚨 Estados Importantes

```tsx
/* Hover */
hover:bg-blue-700      // Botones primarios
hover:bg-blue-50       // Botones secundarios
hover:bg-gray-100      // Botones neutros
hover:border-gray-300  // Cards

/* Focus */
focus-visible:ring-[3px] focus-visible:ring-ring/50

/* Disabled */
disabled:opacity-50 disabled:cursor-not-allowed

/* Selected */
border-2 border-blue-600 bg-blue-50 shadow-md
```

## 💡 Tips Rápidos

1. **Siempre usar** `rounded-xl` para cards principales
2. **Padding estándar** de cards: `p-6`
3. **Gap estándar** en botones con íconos: `gap-2`
4. **Títulos de etapa** siempre `text-3xl font-bold text-gray-900`
5. **Botones CTA** siempre `py-4 px-6 rounded-xl`
6. **Íconos en cards de selección**: `w-12 h-12` con fondo de color
7. **Logo Khipu**: gradiente `from-blue-600 to-blue-700`
8. **Transiciones**: siempre incluir `transition-all` o `transition-colors`

---

**Ver documentación completa**: `/DESIGN_SYSTEM.md`
**Ver showcase interactivo**: `/?showcase`