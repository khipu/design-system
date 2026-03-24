# 🎨 Sistema de Diseño Khipu - Tour Virtual de Onboarding

> Sistema de diseño completo para el tour virtual de activación de cuentas TEF de Khipu

---

## 🚀 Inicio Rápido

### Página de Inicio del Sistema de Diseño
La forma más completa de ver todo lo que incluye el sistema:

```bash
npm run dev
```

Luego accede a: **http://localhost:5173/?index**

### Ver el Showcase Interactivo
Para explorar componentes en vivo:

**http://localhost:5173/?showcase**

![Khipu Design System](https://img.shields.io/badge/Design%20System-Khipu-2563EB?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📚 Documentación

Este proyecto incluye **3 interfaces visuales** y **5 documentos** del sistema de diseño:

### Interfaces Visuales

| Interface | URL | Para Quién | Propósito |
|-----------|-----|------------|-----------|
| 🏠 **[Página de Inicio](/?index)** | `?index` | Todos | Visión general del sistema |
| 🖥️ **[Showcase Interactivo](/?showcase)** | `?showcase` | Todos | Ver componentes en vivo |
| 🎯 **[Tour de Onboarding](/)** | `/` | Todos | Ver el tour completo |

### Documentos Markdown

| Documento | Para Quién | Propósito |
|-----------|------------|-----------|
| 📖 **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** | Todos | Documentación completa |
| ⚡ **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Desarrolladores | Referencia rápida |
| 💻 **[COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)** | Desarrolladores | Código completo |
| ✅ **[DESIGN_CHECKLIST.md](./DESIGN_CHECKLIST.md)** | Todos | Validación de implementación |
| 📋 **[SISTEMA_DISENO_README.md](./SISTEMA_DISENO_README.md)** | Todos | Índice general |

---

## 🎯 Para Diseñadores

### 1️⃣ Explora la Página de Inicio
```
http://localhost:5173/?index
```

Aquí encontrarás:
- ✅ Visión general de todos los componentes
- ✅ Estadísticas del sistema
- ✅ Acceso rápido a toda la documentación
- ✅ Ejemplos de componentes complejos

### 2️⃣ Explora el Showcase Interactivo
```
http://localhost:5173/?showcase
```

Aquí encontrarás:
- ✅ Paleta de colores completa
- ✅ Tipografía con jerarquías
- ✅ Todos los componentes de UI
- ✅ Iconografía categorizada
- ✅ Sistema de layout y espaciado

### 3️⃣ Revisa las Especificaciones
Abre **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** para:
- Valores exactos de colores (hex, RGB, variables CSS)
- Medidas precisas de espaciado
- Especificaciones de tipografía
- Guías de uso de componentes

### 4️⃣ Valida Implementaciones
Usa **[DESIGN_CHECKLIST.md](./DESIGN_CHECKLIST.md)** para verificar que las implementaciones cumplan el sistema.

---

## 💻 Para Desarrolladores

### 1️⃣ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 2️⃣ Dependencias del Sistema de Diseño

```bash
# Íconos
npm install lucide-react

# Componentes base
npm install @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs

# Variantes de componentes
npm install class-variance-authority
```

### 3️⃣ Referencia Rápida

Para implementación rápida, abre **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)**:

```tsx
// Ejemplo: Botón CTA
<button className="w-full py-4 px-6 rounded-xl font-semibold 
  bg-blue-600 hover:bg-blue-700 text-white transition-all">
  Continuar
  <ArrowRight className="w-5 h-5" />
</button>
```

### 4️⃣ Copiar Componentes Completos

Abre **[COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)** para:
- Estructuras completas de páginas
- Formularios listos para usar
- Cards de selección
- Progress bars
- Headers, footers, CTAs

### 5️⃣ Verificar Implementación

Antes de commit, revisa **[DESIGN_CHECKLIST.md](./DESIGN_CHECKLIST.md)**:
- ✅ Colores correctos
- ✅ Espaciado consistente
- ✅ Transiciones incluidas
- ✅ Responsive design
- ✅ Accesibilidad

---

## 🎨 Sistema de Diseño: Visión General

### Paleta de Colores

| Color | Uso | Clase Tailwind |
|-------|-----|----------------|
| 🔵 Blue 600 | CTAs, acciones primarias | `bg-blue-600` |
| 🟣 Purple 600 | Persona Jurídica | `bg-purple-600` |
| 🟢 Green 500 | Éxito, completado | `bg-green-500` |
| ⚫ Gray 900 | Títulos principales | `text-gray-900` |

### Componentes Principales

- **Buttons** - 6 variantes (default, secondary, outline, ghost, destructive, link)
- **Inputs** - Con estados focus/error/disabled
- **Cards** - Modulares con headers y contenido
- **Progress Bar** - Indicador de etapas del tour
- **Badges** - 4 variantes para estados
- **Alerts** - Feedback visual (éxito, error, info, warning)

### Iconografía

Todos los íconos usan **Lucide React**:

```tsx
import { 
  ArrowRight,    // Navegación
  User,          // Persona Natural
  Building2,     // Persona Jurídica
  CheckCircle2,  // Éxito
  HelpCircle     // Ayuda
} from 'lucide-react';
```

---

## 📁 Estructura del Proyecto

```
/
├── 📄 README.md                         # Este archivo
├── 📖 DESIGN_SYSTEM.md                  # Documentación completa
├── ⚡ QUICK_REFERENCE.md                # Guía rápida
├── 💻 COMPONENT_EXAMPLES.md             # Ejemplos de código
├── ✅ DESIGN_CHECKLIST.md               # Checklist de validación
├── 📋 SISTEMA_DISENO_README.md          # Índice de documentos
│
├── /src
│   ├── /app
│   │   ├── App.tsx                      # App principal
│   │   ├── /components
│   │   │   ├── DesignSystemShowcase.tsx # 🎨 Showcase interactivo
│   │   │   ├── OnboardingFlow.tsx       # Flujo de onboarding
│   │   │   ├── ProgressBar.tsx
│   │   │   │
│   │   │   ├── /stages                 # Componentes de etapas
│   │   │   │   ├── StageSelector.tsx
│   │   │   │   ├── StageProfile.tsx
│   │   │   │   ├── StageCommercialData.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── /ui                     # Componentes base
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── card.tsx
│   │   │       └── ...
│   │   │
│   │   └── /styles
│   │       ├── theme.css               # Variables CSS y tokens
│   │       └── ...
│
└── /guidelines
    └── Guidelines.md                    # Guías del proyecto
```

---

## 🛠️ Stack Tecnológico

- **React** 18+ - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS** v4 - Estilos utility-first
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconografía
- **Class Variance Authority** - Variantes de componentes
- **Vite** - Build tool

---

## 🎯 Casos de Uso Rápidos

### "Necesito implementar un formulario"
👉 [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md#4-formularios)

### "¿Qué color usar para X?"
👉 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#-colores-principales)

### "¿Cómo se ve este componente?"
👉 [Showcase Interactivo](/?showcase)

### "Especificaciones exactas de diseño"
👉 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

### "Validar antes de commit"
👉 [DESIGN_CHECKLIST.md](./DESIGN_CHECKLIST.md)

---

## ✅ Checklist de Implementación

Antes de considerar una tarea completa:

- [ ] ✅ Usa colores de la paleta establecida
- [ ] ✅ Sigue jerarquía de tipografía
- [ ] ✅ Espaciado en múltiplos de 4px
- [ ] ✅ Border radius consistentes (`rounded-xl` para cards)
- [ ] ✅ Incluye transiciones en elementos interactivos
- [ ] ✅ Íconos de Lucide React con tamaños estándar
- [ ] ✅ Responsive design (mobile-first)
- [ ] ✅ Accesibilidad (ARIA labels, keyboard navigation)
- [ ] ✅ Estados hover/focus/disabled implementados
- [ ] ✅ Verificado en el showcase

---

## 🎨 Ejemplos Visuales

### Botón CTA
```tsx
<button className="w-full py-4 px-6 rounded-xl font-semibold 
  flex items-center justify-center gap-2 
  bg-blue-600 hover:bg-blue-700 text-white transition-all">
  Continuar
  <ArrowRight className="w-5 h-5" />
</button>
```

### Card de Formulario
```tsx
<div className="bg-white rounded-xl p-6 border border-gray-200">
  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
    <MapPin className="w-5 h-5 text-blue-600" />
    Selecciona tu país
  </label>
  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
    <option>Chile</option>
  </select>
</div>
```

### Logo Khipu
```tsx
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 
  rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-xl">K</span>
</div>
```

---

## 📱 Responsive Design

El sistema usa breakpoints de Tailwind:

- **Mobile**: Por defecto (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px)
- **Large**: `lg:` (≥ 1024px)

Ejemplo:
```tsx
<div className="grid md:grid-cols-2 gap-4">
  {/* 1 columna en mobile, 2 en desktop */}
</div>
```

---

## ♿ Accesibilidad

Todos los componentes incluyen:
- ✅ ARIA labels donde corresponde
- ✅ Focus rings visibles
- ✅ Navegación por teclado
- ✅ Contraste de color adecuado (WCAG AA)
- ✅ Labels asociados a inputs

---

## 🤝 Contribuir

### Al agregar un nuevo componente:

1. **Implementar** siguiendo las guías
2. **Agregar al Showcase** (`DesignSystemShowcase.tsx`)
3. **Documentar** en los archivos correspondientes
4. **Validar** con el checklist
5. **Verificar** accesibilidad y responsive

### Proceso de Validación:

1. ✅ Código sigue estándares del sistema
2. ✅ Componente funciona en el showcase
3. ✅ Documentación actualizada
4. ✅ Checklist completo
5. ✅ Tests de accesibilidad pasados

---

## 📊 Métricas del Sistema

- **Componentes Base:** 15+
- **Componentes Complejos:** 10+
- **Colores en Paleta:** 50+
- **Íconos Documentados:** 20+
- **Ejemplos de Código:** 30+
- **Páginas de Documentación:** 5

---

## 🔗 Enlaces Rápidos

| Recurso | Enlace |
|---------|--------|
| 🖥️ Showcase | `/?showcase` |
| 📖 Docs Completas | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) |
| ⚡ Referencia Rápida | [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) |
| 💻 Ejemplos | [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md) |
| ✅ Checklist | [DESIGN_CHECKLIST.md](./DESIGN_CHECKLIST.md) |
| 📋 Índice | [SISTEMA_DISENO_README.md](./SISTEMA_DISENO_README.md) |

---

## 📎 Recursos Externos

- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [React](https://react.dev/)

---

## 📧 Soporte

Para preguntas sobre el sistema de diseño:
- **Equipo de Diseño:** [contacto]
- **Equipo de Frontend:** [contacto]

---

## 📄 Licencia

Este sistema de diseño es propiedad de Khipu.

---

## 🎉 Comenzar Ahora

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar desarrollo
npm run dev

# 3. Ver showcase
# Navega a: http://localhost:5173/?showcase

# 4. Abrir documentación
# Revisa: DESIGN_SYSTEM.md
```

---

**Sistema de Diseño Khipu v1.0** | Última actualización: Marzo 2026

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)](https://react.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Icons by Lucide](https://img.shields.io/badge/Icons%20by-Lucide-000000?style=flat)](https://lucide.dev)

---

<div align="center">
  
### 🎨 ¡Bienvenido al Sistema de Diseño de Khipu! 

**Consistencia · Calidad · Velocidad**

[Ver Showcase](/?showcase) • [Documentación](./DESIGN_SYSTEM.md) • [Ejemplos](./COMPONENT_EXAMPLES.md)

</div>