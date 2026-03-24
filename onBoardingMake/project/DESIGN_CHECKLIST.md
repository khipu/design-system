# ✅ Checklist de Implementación - Sistema de Diseño Khipu

> Guía visual de verificación para asegurar consistencia en la implementación

---

## 🎨 COLORES

### ✅ Verificar que estés usando:

**Acciones Principales**
- [ ] Blue 600 (`#2563EB` o `bg-blue-600`) para CTAs y acciones primarias
- [ ] Blue 700 (`#1D4ED8` o `bg-blue-700`) para hover de CTAs
- [ ] Blue 50/100 para fondos de elementos seleccionados

**Personas**
- [ ] Blue 600 para Persona Natural
- [ ] Purple 600 (`#9333EA`) para Persona Jurídica

**Feedback**
- [ ] Green 500 (`#22C55E`) para éxito/completado
- [ ] Yellow 500/600 para advertencias
- [ ] Red 600 (`text-red-600`) para errores
- [ ] Blue 500/600 para información

**Textos**
- [ ] `text-gray-900` (#111827) para títulos principales
- [ ] `text-gray-600` (#4B5563) para texto normal
- [ ] `text-gray-500` para texto secundario
- [ ] `text-gray-400` para estados deshabilitados

### ❌ Evitar:
- [ ] NO crear colores personalizados fuera de la paleta
- [ ] NO usar colores hardcodeados (#XXXXXX) directamente en JSX
- [ ] NO mezclar tonalidades de colores inconsistentes

---

## 📝 TIPOGRAFÍA

### ✅ Verificar jerarquía:

**Títulos de Etapas**
- [ ] `text-3xl font-bold text-gray-900 mb-3` para título principal
- [ ] `text-gray-600` para descripción debajo del título

**Títulos de Secciones**
- [ ] `text-xl font-semibold text-gray-900` para subtítulos

**Títulos de Cards**
- [ ] `text-lg font-semibold text-gray-900` para labels con íconos
- [ ] `font-semibold text-gray-900` para títulos dentro de cards

**Texto Normal**
- [ ] `text-base` (16px) para texto de párrafos por defecto
- [ ] `text-sm text-gray-600` para descripciones
- [ ] `text-xs text-gray-500` para hints y metadata

### ❌ Evitar:
- [ ] NO usar tamaños de fuente arbitrarios
- [ ] NO usar `text-2xl` o mayores excepto en títulos de etapa
- [ ] NO cambiar font-weight sin razón específica

---

## 🔘 BOTONES

### ✅ Botón CTA Principal:
```tsx
<button className="w-full py-4 px-6 rounded-xl font-semibold 
  flex items-center justify-center gap-2 
  bg-blue-600 hover:bg-blue-700 text-white transition-all">
```

**Verificar:**
- [ ] `py-4 px-6` para padding
- [ ] `rounded-xl` (12px) para border radius
- [ ] `gap-2` entre ícono y texto
- [ ] `transition-all` para animaciones
- [ ] Estado disabled con `bg-gray-200 text-gray-400 cursor-not-allowed`

### ✅ Botón Secundario (Header):
```tsx
<button className="flex items-center gap-2 px-4 py-2 
  text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
```

**Verificar:**
- [ ] `px-4 py-2` para padding
- [ ] `rounded-lg` (8px) para border radius
- [ ] `text-blue-600` para color
- [ ] `hover:bg-blue-50` para hover

### ❌ Evitar:
- [ ] NO usar padding inconsistente
- [ ] NO omitir estados hover/disabled
- [ ] NO usar border-radius diferentes

---

## 📋 CARDS

### ✅ Card de Formulario:
```tsx
<div className="bg-white rounded-xl p-6 border border-gray-200">
```

**Verificar:**
- [ ] `rounded-xl` (12px) border radius
- [ ] `p-6` (24px) padding interno
- [ ] `border border-gray-200` para el borde
- [ ] `space-y-6` entre múltiples cards

### ✅ Card de Selección (Seleccionada):
```tsx
<button className="p-6 rounded-xl border-2 
  border-blue-600 bg-blue-50 shadow-md transition-all text-left">
```

**Verificar:**
- [ ] `border-2 border-blue-600` cuando está seleccionada
- [ ] `bg-blue-50` para fondo de selección
- [ ] `shadow-md` para elevación
- [ ] Badge de "Seleccionado" con checkmark

### ✅ Card de Selección (No Seleccionada):
```tsx
<button className="p-6 rounded-xl border-2 
  border-gray-200 hover:border-gray-300 bg-white transition-all text-left">
```

**Verificar:**
- [ ] `border-2 border-gray-200` cuando no está seleccionada
- [ ] `hover:border-gray-300` para hover
- [ ] Sin badge de selección

### ❌ Evitar:
- [ ] NO usar `p-4` o `p-8` (estándar es `p-6`)
- [ ] NO usar `rounded-lg` (estándar es `rounded-xl`)
- [ ] NO omitir estados de selección visuales

---

## 📝 INPUTS Y FORMULARIOS

### ✅ Label con Ícono:
```tsx
<label className="flex items-center gap-2 
  text-lg font-semibold text-gray-900 mb-4">
  <MapPin className="w-5 h-5 text-blue-600" />
  Título del campo
</label>
```

**Verificar:**
- [ ] `text-lg font-semibold` para el label
- [ ] `gap-2` entre ícono y texto
- [ ] Ícono `w-5 h-5 text-blue-600`
- [ ] `mb-4` de margen inferior

### ✅ Input Estándar:
- [ ] Background `bg-input-background` (#F3F3F5)
- [ ] Altura `h-9` (36px)
- [ ] Padding `px-3 py-1`
- [ ] Border `border border-input`
- [ ] Focus con `focus-visible:ring-[3px] focus-visible:ring-ring/50`

### ✅ Select Personalizado:
```tsx
<select className="w-full px-4 py-3 bg-gray-50 
  border border-gray-300 rounded-lg 
  focus:outline-none focus:ring-2 focus:ring-blue-500">
```

**Verificar:**
- [ ] `px-4 py-3` para padding
- [ ] `bg-gray-50` background
- [ ] `rounded-lg` border radius
- [ ] `focus:ring-2 focus:ring-blue-500` para focus

### ❌ Evitar:
- [ ] NO omitir estados de error (`aria-invalid`)
- [ ] NO usar inputs sin labels
- [ ] NO olvidar placeholder text

---

## 🎯 LOGO KHIPU

### ✅ Logo Header (pequeño):
```tsx
<div className="w-10 h-10 
  bg-gradient-to-br from-blue-600 to-blue-700 
  rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-xl">K</span>
</div>
```

**Verificar:**
- [ ] Tamaño `w-10 h-10` (40px)
- [ ] Gradiente `from-blue-600 to-blue-700`
- [ ] `rounded-lg` border radius
- [ ] Letra "K" con `text-xl font-bold text-white`

### ✅ Logo Hero (grande):
- [ ] Tamaño `w-16 h-16` (64px)
- [ ] `rounded-xl` border radius
- [ ] Letra "K" con `text-3xl font-bold text-white`

### ❌ Evitar:
- [ ] NO cambiar el gradiente
- [ ] NO usar colores sólidos
- [ ] NO omitir el border-radius

---

## 🎭 ÍCONOS

### ✅ Tamaños Estándar:
- [ ] `w-5 h-5` (20px) para botones y acciones **[MÁS COMÚN]**
- [ ] `w-6 h-6` (24px) para cards destacadas
- [ ] `w-12 h-12` (48px) para cards de selección

### ✅ Colores por Contexto:
- [ ] `text-blue-600` para Persona Natural
- [ ] `text-purple-600` para Persona Jurídica
- [ ] `text-green-600` para éxito
- [ ] `text-yellow-600` para advertencias
- [ ] `text-red-600` para errores
- [ ] `text-gray-600` para acciones neutrales

### ✅ Importar de Lucide React:
```tsx
import { ArrowRight, User, Building2, MapPin, 
  CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
```

### ❌ Evitar:
- [ ] NO usar íconos de otras librerías
- [ ] NO usar tamaños inconsistentes
- [ ] NO omitir colores contextuales

---

## 📐 ESPACIADO

### ✅ Gaps Comunes:
- [ ] `gap-2` (8px) entre ícono y texto en botones
- [ ] `gap-3` (12px) entre elementos relacionados
- [ ] `gap-4` (16px) en grids de cards
- [ ] `gap-6` (24px) en secciones de cards

### ✅ Padding:
- [ ] `p-6` (24px) **[ESTÁNDAR para cards]**
- [ ] `py-4 px-6` (16px/24px) **[ESTÁNDAR para botones CTA]**
- [ ] `px-4 py-2` (16px/8px) para botones secundarios
- [ ] `p-2` (8px) para botones ícono

### ✅ Margin Bottom:
- [ ] `mb-3` (12px) después de títulos principales
- [ ] `mb-4` (16px) después de labels
- [ ] `mb-6` (24px) entre secciones
- [ ] `mb-8` (32px) después del título de etapa

### ✅ Space Between:
- [ ] `space-y-6` (24px) **[ESTÁNDAR entre cards]**
- [ ] `space-y-4` (16px) entre elementos de lista
- [ ] `space-y-3` (12px) entre features en plan

### ❌ Evitar:
- [ ] NO usar valores que no sean múltiplos de 4px
- [ ] NO mezclar diferentes espaciados para mismos elementos
- [ ] NO usar margin-top (preferir margin-bottom)

---

## 🔄 BORDER RADIUS

### ✅ Estándares:
- [ ] `rounded-xl` (12px) **[CARDS PRINCIPALES]**
- [ ] `rounded-lg` (8px) para botones, inputs, selects
- [ ] `rounded-full` para badges, avatares, checkmarks
- [ ] `rounded-2xl` (16px) para cards muy destacadas

### ❌ Evitar:
- [ ] NO usar `rounded-md` para cards (usar `rounded-xl`)
- [ ] NO mezclar diferentes radii sin razón

---

## 💫 TRANSICIONES

### ✅ Siempre incluir:
- [ ] `transition-all` en botones interactivos
- [ ] `transition-colors` en elementos que solo cambian color
- [ ] Duración implícita (300ms por defecto en Tailwind)

### ✅ Estados Hover:
- [ ] Botones primarios: `hover:bg-blue-700`
- [ ] Botones secundarios: `hover:bg-blue-50`
- [ ] Botones neutros: `hover:bg-gray-100`
- [ ] Cards: `hover:border-gray-300`

### ❌ Evitar:
- [ ] NO omitir transiciones en elementos interactivos
- [ ] NO usar animaciones muy largas (> 500ms)

---

## 📊 PROGRESS BAR

### ✅ Estados de Círculos:
- [ ] Completado: `bg-green-500 text-white` con ícono `<Check />`
- [ ] Actual: `bg-blue-600 text-white ring-4 ring-blue-100`
- [ ] Pendiente: `bg-gray-200 text-gray-500`

### ✅ Líneas Conectoras:
- [ ] Completada: `bg-green-500`
- [ ] Pendiente: `bg-gray-200`
- [ ] Altura: `h-0.5` (2px)

### ❌ Evitar:
- [ ] NO cambiar colores de estados
- [ ] NO omitir el ring en estado actual

---

## 🏷️ BADGES Y ALERTS

### ✅ Badge Recomendado:
```tsx
<span className="bg-blue-600 text-white 
  px-4 py-1 rounded-full text-xs font-semibold">
  RECOMENDADO
</span>
```

**Verificar:**
- [ ] `bg-blue-600 text-white`
- [ ] `rounded-full`
- [ ] `text-xs font-semibold`
- [ ] Texto en MAYÚSCULAS

### ✅ Alert de Éxito:
```tsx
<div className="bg-green-50 border border-green-200 rounded-xl p-6">
```

**Verificar:**
- [ ] Fondo claro (`bg-green-50`)
- [ ] Border del mismo color (`border-green-200`)
- [ ] `rounded-xl p-6`
- [ ] Ícono `CheckCircle2` color `text-green-600`

### ❌ Evitar:
- [ ] NO usar colores saturados en backgrounds de alerts
- [ ] NO omitir íconos en alerts

---

## 📱 RESPONSIVE

### ✅ Breakpoints:
- [ ] Mobile-first approach
- [ ] `md:` (768px) para tablets/desktop
- [ ] `sm:` (640px) para móviles grandes

### ✅ Grid Responsive:
```tsx
<div className="grid md:grid-cols-2 gap-4">
```

**Verificar:**
- [ ] 1 columna en mobile
- [ ] 2+ columnas en desktop (`md:grid-cols-2`)

### ❌ Evitar:
- [ ] NO usar layout fijo que no funcione en mobile
- [ ] NO olvidar probar en diferentes tamaños

---

## ♿ ACCESIBILIDAD

### ✅ Siempre incluir:
- [ ] `aria-label` en botones con solo ícono
- [ ] `aria-invalid="true"` en inputs con error
- [ ] `disabled` attribute en botones deshabilitados
- [ ] Labels asociados a inputs (con `htmlFor`)
- [ ] `title` en elementos interactivos

### ✅ Navegación por teclado:
- [ ] `focus-visible:ring-[3px]` en elementos interactivos
- [ ] `outline-none` solo si hay otro indicador de focus

### ❌ Evitar:
- [ ] NO omitir labels en formularios
- [ ] NO usar solo color para comunicar estados

---

## 🎯 ESTRUCTURA DE PÁGINA DE ETAPA

### ✅ Layout Estándar:
```tsx
<div className="max-w-2xl mx-auto">
  {/* Título */}
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-3">
      Etapa X: Título
    </h2>
    <p className="text-gray-600">Descripción</p>
  </div>

  {/* Cards de Contenido */}
  <div className="space-y-6">
    {/* Cards aquí */}
  </div>

  {/* Botón CTA */}
  <button className="w-full py-4 px-6 ...">
    Continuar
  </button>
</div>
```

**Verificar:**
- [ ] Container `max-w-2xl mx-auto`
- [ ] Título centrado con `text-center mb-8`
- [ ] `space-y-6` entre cards
- [ ] Botón CTA al final con `w-full`

---

## 📋 CHECKLIST FINAL

Antes de hacer commit, verificar:

### Código
- [ ] ✅ Todos los colores vienen de la paleta
- [ ] ✅ Tipografía sigue jerarquía establecida
- [ ] ✅ Espaciado en múltiplos de 4px
- [ ] ✅ Border radius consistentes
- [ ] ✅ Transiciones incluidas en elementos interactivos
- [ ] ✅ Íconos de Lucide React con tamaños estándar
- [ ] ✅ Componentes responsive
- [ ] ✅ Accesibilidad implementada

### Visual
- [ ] ✅ Se ve igual que el showcase
- [ ] ✅ Estados hover funcionan
- [ ] ✅ Estados disabled son claros
- [ ] ✅ Cards de selección muestran estado visualmente
- [ ] ✅ Funciona en mobile

### Documentación
- [ ] ✅ Componente agregado al showcase si es nuevo
- [ ] ✅ Ejemplos actualizados si corresponde

---

## 🚨 Errores Comunes

### ❌ NO HACER:

1. **Colores hardcodeados:**
   ```tsx
   // ❌ MAL
   <div className="bg-[#2563eb]">
   
   // ✅ BIEN
   <div className="bg-blue-600">
   ```

2. **Border radius inconsistentes:**
   ```tsx
   // ❌ MAL (cards con rounded-lg)
   <div className="bg-white rounded-lg p-6">
   
   // ✅ BIEN (cards con rounded-xl)
   <div className="bg-white rounded-xl p-6">
   ```

3. **Padding incorrecto en cards:**
   ```tsx
   // ❌ MAL
   <div className="bg-white rounded-xl p-4">
   
   // ✅ BIEN
   <div className="bg-white rounded-xl p-6">
   ```

4. **Botones sin transiciones:**
   ```tsx
   // ❌ MAL
   <button className="bg-blue-600 hover:bg-blue-700">
   
   // ✅ BIEN
   <button className="bg-blue-600 hover:bg-blue-700 transition-all">
   ```

5. **Íconos sin tamaño:**
   ```tsx
   // ❌ MAL
   <ArrowRight />
   
   // ✅ BIEN
   <ArrowRight className="w-5 h-5" />
   ```

---

## 📚 Referencias Rápidas

- **Ver showcase:** `?showcase`
- **Documentación completa:** `/DESIGN_SYSTEM.md`
- **Ejemplos de código:** `/COMPONENT_EXAMPLES.md`
- **Referencia rápida:** `/QUICK_REFERENCE.md`

---

**¡Mantén la consistencia! ✨**
