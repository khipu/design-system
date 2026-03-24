# Sistema de Diseño - Khipu Onboarding Tour

## 📋 Índice
1. [Introducción](#introducción)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Componentes Base](#componentes-base)
5. [Componentes Complejos](#componentes-complejos)
6. [Iconografía](#iconografía)
7. [Layout y Espaciado](#layout-y-espaciado)
8. [Animaciones y Transiciones](#animaciones-y-transiciones)
9. [Patrones de Diseño](#patrones-de-diseño)

---

## 🎨 Introducción

Este documento describe el sistema de diseño completo del tour virtual de onboarding de Khipu. Todos los componentes están construidos con **React**, **Tailwind CSS v4**, **Radix UI** y **TypeScript**.

### Stack Tecnológico
- **React** 18+
- **Tailwind CSS** v4.0
- **Radix UI** (componentes base accesibles)
- **Lucide React** (iconografía)
- **TypeScript**
- **Class Variance Authority** (variantes de componentes)

### Acceso al Showcase Interactivo
Para ver todos los componentes en acción, agrega `?showcase` a la URL:
```
http://localhost:5173/?showcase
```

---

## 🎨 Paleta de Colores

### Colores Primarios

| Nombre | Hex/Value | Variable CSS | Uso |
|--------|-----------|--------------|-----|
| **Primary** | `#030213` | `--primary` | Botones principales, elementos destacados |
| **Primary Foreground** | `#FFFFFF` | `--primary-foreground` | Texto sobre color primario |
| **Background** | `#FFFFFF` | `--background` | Fondo principal |
| **Foreground** | `oklch(0.145 0 0)` | `--foreground` | Texto principal |

### Colores de Marca (Brand)

| Color | Hex | Clase Tailwind | Uso |
|-------|-----|----------------|-----|
| **Blue 600** | `#2563EB` | `bg-blue-600` | Botones CTA, links, elementos seleccionados |
| **Blue 700** | `#1D4ED8` | `bg-blue-700` | Hover de botones principales |
| **Blue 100** | `#DBEAFE` | `bg-blue-100` | Fondos de selección, highlights |
| **Blue 50** | `#EFF6FF` | `bg-blue-50` | Hover suave, fondos informativos |

### Colores Secundarios

| Color | Hex | Clase Tailwind | Uso |
|-------|-----|----------------|-----|
| **Purple 600** | `#9333EA` | `bg-purple-600` | Iconos Persona Jurídica |
| **Purple 100** | `#F3E8FF` | `bg-purple-100` | Fondos Persona Jurídica |
| **Green 500** | `#22C55E` | `bg-green-500` | Estados de éxito, progreso completado |
| **Green 100** | `#DCFCE7` | `bg-green-100` | Fondos de éxito |

### Colores de Feedback

| Color | Hex | Variable/Clase | Uso |
|-------|-----|----------------|-----|
| **Destructive** | `#D4183D` | `--destructive` | Errores, acciones destructivas |
| **Yellow 500** | `#EAB308` | `bg-yellow-500` | Advertencias |
| **Orange 500** | `#F97316` | `bg-orange-500` | Alertas importantes |
| **Blue 500** | `#3B82F6` | `bg-blue-500` | Información |

### Escala de Grises

| Nombre | Hex | Uso Principal |
|--------|-----|---------------|
| **Gray 50** | `#F9FAFB` | Fondos suaves, áreas de contenido |
| **Gray 100** | `#F3F4F6` | Hover, estados inactivos |
| **Gray 200** | `#E5E7EB` | Bordes, divisores |
| **Gray 300** | `#D1D5DB` | Bordes de inputs |
| **Gray 400** | `#9CA3AF` | Placeholders, texto deshabilitado |
| **Gray 500** | `#6B7280` | Texto secundario |
| **Gray 600** | `#4B5563` | Texto normal |
| **Gray 700** | `#374151` | Texto importante |
| **Gray 800** | `#1F2937` | Títulos |
| **Gray 900** | `#111827` | Títulos principales |

### Variables CSS Personalizadas

```css
:root {
  --primary: #030213;
  --background: #ffffff;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --input-background: #f3f3f5;
  --border: rgba(0, 0, 0, 0.1);
  --destructive: #d4183d;
  --radius: 0.625rem;
}
```

---

## 📝 Tipografía

### Jerarquía de Títulos

| Elemento | Tamaño | Peso | Line Height | Uso |
|----------|--------|------|-------------|-----|
| **H1** | `var(--text-2xl)` | 500 (Medium) | 1.5 | Títulos principales de pantalla |
| **H2** | `var(--text-xl)` | 500 (Medium) | 1.5 | Subtítulos de sección |
| **H3** | `var(--text-lg)` | 500 (Medium) | 1.5 | Títulos de cards |
| **H4** | `var(--text-base)` | 500 (Medium) | 1.5 | Subtítulos menores |

### Tamaños de Texto (Tailwind)

| Clase | Tamaño | Uso |
|-------|--------|-----|
| `text-5xl` | 48px | Hero headers, landing pages |
| `text-3xl` | 30px | Títulos de etapas principales |
| `text-xl` | 20px | Subtítulos destacados |
| `text-lg` | 18px | Texto destacado, labels principales |
| `text-base` | 16px | **Texto por defecto**, párrafos, inputs, botones |
| `text-sm` | 14px | Descripciones, texto secundario |
| `text-xs` | 12px | Labels de progreso, metadata, hints |

### Pesos de Fuente

| Clase | Peso | Uso |
|-------|------|-----|
| `font-normal` | 400 | Texto de párrafos, inputs |
| `font-medium` | 500 | **Por defecto en títulos**, labels, botones |
| `font-semibold` | 600 | Subtítulos destacados, CTAs |
| `font-bold` | 700 | Títulos principales, énfasis fuerte |

### Colores de Texto

| Clase | Uso |
|-------|-----|
| `text-gray-900` | Títulos, texto principal |
| `text-gray-600` | Descripciones, texto de apoyo |
| `text-gray-500` | Metadata, hints |
| `text-gray-400` | Estados deshabilitados |
| `text-blue-600` | Links, acciones interactivas |

---

## 🧩 Componentes Base

### Botones

#### Variantes

```tsx
import { Button } from './components/ui/button';

// Default (Primary)
<Button>Continuar</Button>

// Secondary
<Button variant="secondary">Guardar</Button>

// Outline
<Button variant="outline">Volver</Button>

// Ghost
<Button variant="ghost">Cancelar</Button>

// Destructive
<Button variant="destructive">Eliminar</Button>

// Link
<Button variant="link">Ver más</Button>
```

#### Tamaños

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><PlusIcon /></Button>
```

#### Botones Personalizados del Tour

**Botón Continuar (Habilitado)**
```tsx
<button className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all">
  Continuar
  <ArrowRight className="w-5 h-5" />
</button>
```

**Botón Continuar (Deshabilitado)**
```tsx
<button 
  disabled
  className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed"
>
  Continuar
  <ArrowRight className="w-5 h-5" />
</button>
```

**Botón de Ayuda (Header)**
```tsx
<button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
  <HelpCircle className="w-5 h-5" />
  <span className="font-medium">Ayuda</span>
</button>
```

**Botón de Reinicio (Header)**
```tsx
<button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
  <RotateCcw className="w-5 h-5" />
</button>
```

### Inputs

#### Input Estándar

```tsx
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="tu@email.com" 
  />
</div>
```

#### Estilos de Input

- **Background**: `bg-input-background` (#F3F3F5)
- **Border**: `border border-input` (transparent en estado normal)
- **Altura**: `h-9` (36px)
- **Padding**: `px-3 py-1`
- **Focus**: `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring`
- **Error**: `aria-invalid:border-destructive aria-invalid:ring-destructive/20`

#### Select Personalizado

```tsx
<select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
  <option value="">Selecciona una opción</option>
  <option value="1">Opción 1</option>
</select>
```

### Cards

#### Card Base

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Título de Card</CardTitle>
    <CardDescription>Descripción del contenido</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido de la card</p>
  </CardContent>
</Card>
```

#### Card de Formulario

```tsx
<div className="bg-white rounded-xl p-6 border border-gray-200">
  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
    <MapPin className="w-5 h-5 text-blue-600" />
    Título de Sección
  </label>
  <Input placeholder="Campo de formulario" />
</div>
```

#### Card de Selección (Persona Natural/Jurídica)

**Estado Seleccionado**
```tsx
<button className="p-6 rounded-xl border-2 border-blue-600 bg-blue-50 shadow-md transition-all text-left">
  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
    <User className="w-6 h-6 text-blue-600" />
  </div>
  <h3 className="font-semibold text-gray-900 mb-2">Persona Natural</h3>
  <p className="text-sm text-gray-600">Para emprendedores y freelancers</p>
  <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm">
    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
      <Check className="w-3 h-3 text-white" strokeWidth={3} />
    </div>
    Seleccionado
  </div>
</button>
```

**Estado No Seleccionado**
```tsx
<button className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all text-left">
  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
    <Building2 className="w-6 h-6 text-purple-600" />
  </div>
  <h3 className="font-semibold text-gray-900 mb-2">Persona Jurídica</h3>
  <p className="text-sm text-gray-600">Para empresas constituidas</p>
</button>
```

### Badges y Alerts

#### Badges

```tsx
import { Badge } from './components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

#### Badges Personalizados

```tsx
// Badge Recomendado
<span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
  RECOMENDADO
</span>

// Badge de Estado
<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
  Completado
</span>
```

#### Alerts

```tsx
import { Alert, AlertDescription } from './components/ui/alert';

// Info
<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>Información general</AlertDescription>
</Alert>

// Error
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>Error crítico</AlertDescription>
</Alert>
```

#### Alerts Personalizados

```tsx
// Éxito
<div className="bg-green-50 border border-green-200 rounded-xl p-6">
  <div className="flex items-start gap-3">
    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-green-900 mb-1">Éxito</h4>
      <p className="text-sm text-green-700">Operación completada correctamente</p>
    </div>
  </div>
</div>

// Advertencia
<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
  <div className="flex items-start gap-3">
    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-yellow-900 mb-1">Advertencia</h4>
      <p className="text-sm text-yellow-700">Acción que requiere atención</p>
    </div>
  </div>
</div>
```

---

## 🔧 Componentes Complejos

### Progress Bar (Barra de Progreso)

```tsx
// Estados de los círculos de progreso
const stepStates = {
  completed: "bg-green-500 text-white", // Con ícono Check
  current: "bg-blue-600 text-white ring-4 ring-blue-100",
  pending: "bg-gray-200 text-gray-500"
};

// Líneas conectoras
const lineStates = {
  completed: "bg-green-500",
  pending: "bg-gray-200"
};
```

**Estructura del Componente**
```tsx
<div className="bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Paso completado */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white">
        <Check className="w-5 h-5" />
      </div>
      
      {/* Línea conectora */}
      <div className="flex-1 h-0.5 mx-2 bg-green-500"></div>
      
      {/* Paso actual */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white ring-4 ring-blue-100">
        2
      </div>
      
      {/* Línea conectora */}
      <div className="flex-1 h-0.5 mx-2 bg-gray-200"></div>
      
      {/* Paso pendiente */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-500">
        3
      </div>
    </div>
  </div>
</div>
```

### Header del Tour

```tsx
<header className="bg-white border-b border-gray-200 sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Logo y Título */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">K</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Khipu</h1>
          <p className="text-xs text-gray-500">Activación de cuenta</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Ayuda</span>
        </button>
      </div>
    </div>
  </div>
</header>
```

### Logo Khipu

**Tamaño Header (pequeño)**
```tsx
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-xl">K</span>
</div>
```

**Tamaño Hero (grande)**
```tsx
<div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
  <span className="text-white font-bold text-3xl">K</span>
</div>
```

### Card de Plan (Pricing)

```tsx
<div className="border-2 border-blue-600 rounded-xl p-6 bg-blue-50 relative shadow-lg">
  {/* Badge flotante */}
  <div className="absolute -top-3 left-6">
    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
      RECOMENDADO
    </span>
  </div>
  
  <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">Plan Starter</h3>
  <p className="text-gray-600 mb-4">Ideal para comenzar</p>
  
  <div className="flex items-baseline gap-2 mb-6">
    <span className="text-4xl font-bold text-gray-900">2.9%</span>
    <span className="text-gray-600">+ $150 por transacción</span>
  </div>
  
  <ul className="space-y-3 mb-6">
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700">Característica del plan</span>
    </li>
  </ul>
  
  <Button className="w-full">Seleccionar Plan</Button>
</div>
```

### CTA de Contacto

```tsx
<div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
  <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Tienes dudas?</h3>
  <p className="text-gray-600 mb-6">
    Nuestro equipo está aquí para ayudarte
  </p>
  <Button className="w-full md:w-auto">
    <HelpCircle className="w-5 h-5" />
    Contáctanos
  </Button>
</div>
```

---

## 🎭 Iconografía

### Librería: Lucide React

```bash
npm install lucide-react
```

### Tamaños de Íconos

| Clase | Tamaño | Uso |
|-------|--------|-----|
| `w-4 h-4` | 16px | Íconos inline, muy pequeños |
| `w-5 h-5` | 20px | **Estándar**, botones, acciones |
| `w-6 h-6` | 24px | Destacados, cards |
| `w-10 h-10` | 40px | Progress bar, indicadores grandes |
| `w-12 h-12` | 48px | Cards de selección, hero |

### Íconos Principales

#### Navegación y Acciones
```tsx
import { ArrowRight, RotateCcw, HelpCircle, Settings, Search, Filter } from 'lucide-react';

<ArrowRight className="w-5 h-5" />
<RotateCcw className="w-5 h-5" />
<HelpCircle className="w-5 h-5" />
```

#### Estados y Feedback
```tsx
import { CheckCircle2, Check, AlertCircle, Info, X } from 'lucide-react';

<CheckCircle2 className="w-5 h-5 text-green-600" />
<AlertCircle className="w-5 h-5 text-yellow-600" />
<Info className="w-5 h-5 text-blue-600" />
<X className="w-5 h-5 text-red-600" />
```

#### Usuarios y Entidades
```tsx
import { User, Building2 } from 'lucide-react';

<User className="w-6 h-6 text-blue-600" /> // Persona Natural
<Building2 className="w-6 h-6 text-purple-600" /> // Persona Jurídica
```

#### Contenido
```tsx
import { Upload, Download, Edit, Trash2, Plus, Minus } from 'lucide-react';

<Upload className="w-5 h-5" />
<Trash2 className="w-5 h-5 text-red-600" />
```

#### Ubicación
```tsx
import { MapPin } from 'lucide-react';

<MapPin className="w-5 h-5 text-blue-600" />
```

### Colores de Íconos por Contexto

| Contexto | Clase | Ejemplo |
|----------|-------|---------|
| Persona Natural | `text-blue-600` | User icon |
| Persona Jurídica | `text-purple-600` | Building2 icon |
| Éxito | `text-green-600` | CheckCircle2 |
| Advertencia | `text-yellow-600` | AlertCircle |
| Error | `text-red-600` | X icon |
| Información | `text-blue-600` | Info icon |
| Neutral | `text-gray-600` | Settings icon |
| Secundario | `text-gray-500` | - |
| Deshabilitado | `text-gray-400` | - |

---

## 📐 Layout y Espaciado

### Sistema de Espaciado

Basado en múltiplos de 4px (0.25rem):

| Valor | Píxeles | Rem | Uso Común |
|-------|---------|-----|-----------|
| `1` | 4px | 0.25rem | Gaps mínimos |
| `2` | 8px | 0.5rem | Entre ícono y texto |
| `3` | 12px | 0.75rem | Grupos relacionados |
| `4` | 16px | 1rem | Grid, listas |
| `6` | 24px | 1.5rem | Cards internas |
| `8` | 32px | 2rem | Secciones |
| `12` | 48px | 3rem | Secciones grandes |
| `16` | 64px | 4rem | Hero sections |

### Gaps Comunes

| Clase | Uso |
|-------|-----|
| `gap-2` | Entre ícono y texto en botones |
| `gap-3` | Elementos de un grupo relacionado |
| `gap-4` | Grid de cards, elementos de lista |
| `gap-6` | Cards internas, secciones |
| `gap-8` | Secciones principales |

### Padding en Componentes

**Botones**
- Small: `px-3 py-2` (h-8)
- Default: `px-4 py-2` (h-9)
- Large: `px-6` (h-10)
- Custom CTA: `px-6 py-4`

**Cards**
- Estándar: `p-6`
- Grande: `p-8`
- Compacta: `p-4`

**Inputs**
- Estándar: `px-3 py-1` (h-9)
- Select personalizado: `px-4 py-3`

**Contenedores**
- Header: `px-6 py-4`
- Main content: `px-6 py-8`
- Progress bar: `px-6 py-4`

### Border Radius

| Clase | Valor | Uso |
|-------|-------|-----|
| `rounded` | 4px | Elementos muy pequeños |
| `rounded-md` | 6px | Inputs, botones pequeños |
| `rounded-lg` | 8px | Botones, badges, elementos medianos |
| `rounded-xl` | 12px | **Cards, contenedores principales** |
| `rounded-2xl` | 16px | Cards destacadas, hero sections |
| `rounded-full` | 9999px | Badges, avatars, íconos circulares |

### Anchos Máximos

| Clase | Valor | Uso |
|-------|-------|-----|
| `max-w-2xl` | 672px | Formularios, contenido de lectura |
| `max-w-4xl` | 896px | **Contenedor principal del tour** |
| `max-w-7xl` | 1280px | Header, contenedor global |

### Sombras

| Clase | Uso |
|-------|-----|
| `shadow-sm` | Elementos elevados sutilmente |
| `shadow-md` | **Cards seleccionadas, elementos destacados** |
| `shadow-lg` | Cards de planes, elementos muy destacados |

---

## 🎬 Animaciones y Transiciones

### Transiciones Estándar

```css
/* Botones y elementos interactivos */
transition-all

/* Solo colores */
transition-colors
```

### Animación Fade In (Custom)

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
```

Uso:
```tsx
<div className="animate-fadeIn">
  Contenido con fade in
</div>
```

---

## 🎯 Patrones de Diseño

### 1. Formularios de Etapas

**Estructura típica:**
```tsx
<div className="max-w-2xl mx-auto">
  {/* Título de Etapa */}
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-3">
      Etapa X: Título
    </h2>
    <p className="text-gray-600">Descripción de la etapa</p>
  </div>

  {/* Cards de Formulario */}
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Contenido del formulario */}
    </div>
  </div>

  {/* Botón de Acción */}
  <button className="w-full py-4 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all">
    Continuar
  </button>
</div>
```

### 2. Labels con Íconos

```tsx
<label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
  <MapPin className="w-5 h-5 text-blue-600" />
  Selecciona tu país
</label>
```

### 3. Estados de Selección

**Diferenciación visual clara:**
- Seleccionado: `border-2 border-blue-600 bg-blue-50 shadow-md`
- No seleccionado: `border-2 border-gray-200 bg-white`
- Hover: `hover:border-gray-300`

### 4. Feedback Visual

**Siempre incluir:**
- Estados de hover
- Estados de focus (rings)
- Estados disabled
- Mensajes de error/éxito

### 5. Consistencia de Espaciado

- Margen entre título y contenido: `mb-8`
- Espacio entre cards: `space-y-6`
- Padding de cards: `p-6`
- Padding de botones grandes: `py-4 px-6`

---

## 📁 Estructura de Archivos

```
/src
├── /app
│   ├── App.tsx                    # Componente principal
│   ├── /components
│   │   ├── OnboardingFlow.tsx     # Flujo de onboarding
│   │   ├── ProgressBar.tsx        # Barra de progreso
│   │   ├── WelcomeSurvey.tsx      # Popup de encuesta
│   │   ├── DesignSystemShowcase.tsx  # Showcase del sistema
│   │   ├── /stages                # Componentes de etapas
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── StageSelector.tsx
│   │   │   ├── StageProfile.tsx
│   │   │   ├── StageCommercialData.tsx
│   │   │   ├── StageDocuments.tsx
│   │   │   ├── StageBankConnection.tsx
│   │   │   ├── StagePricingPlan.tsx
│   │   │   ├── StageContract.tsx
│   │   │   ├── StageValidation.tsx
│   │   │   └── StageActivation.tsx
│   │   └── /ui                    # Componentes base (Radix UI)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── alert.tsx
│   │       ├── switch.tsx
│   │       ├── tabs.tsx
│   │       └── ...
├── /styles
│   ├── theme.css              # Tokens y variables CSS
│   ├── fonts.css              # Imports de fuentes
│   ├── tailwind.css           # Configuración Tailwind
│   └── index.css              # Estilos globales
```

---

## 🚀 Inicio Rápido

### 1. Instalación de Dependencias

```bash
npm install lucide-react class-variance-authority
npm install @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs
```

### 2. Importar Componentes

```tsx
// Componentes base
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

// Íconos
import { ArrowRight, User, Building2 } from 'lucide-react';
```

### 3. Usar Clases de Tailwind

```tsx
<div className="max-w-4xl mx-auto px-6 py-8">
  <h2 className="text-3xl font-bold text-gray-900 mb-6">
    Título de Sección
  </h2>
  
  <Card>
    <CardContent>
      <p className="text-gray-600">Contenido</p>
    </CardContent>
  </Card>
</div>
```

---

## 📝 Checklist de Implementación

Al implementar un nuevo componente o pantalla, asegúrate de:

- [ ] Usar colores de la paleta definida
- [ ] Seguir la jerarquía de tipografía
- [ ] Aplicar espaciado consistente (múltiplos de 4px)
- [ ] Incluir estados de hover y focus
- [ ] Añadir transiciones suaves
- [ ] Implementar estados disabled cuando aplique
- [ ] Usar íconos de Lucide React
- [ ] Mantener border-radius consistente
- [ ] Responsive design (mobile-first)
- [ ] Accesibilidad (ARIA labels, keyboard navigation)

---

## 🎓 Recursos Adicionales

- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/
- **Lucide Icons**: https://lucide.dev/
- **Class Variance Authority**: https://cva.style/

---

## 📧 Contacto

Para preguntas o aclaraciones sobre el sistema de diseño, contactar al equipo de diseño de Khipu.

---

**Última actualización:** Marzo 2026
**Versión:** 1.0
