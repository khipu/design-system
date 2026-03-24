# 🎨 Sistema de Diseño Khipu - Documentación Completa

> Documentación completa del sistema de diseño del tour virtual de onboarding de Khipu TEF.

---

## 📚 Índice de Documentación

### 1. 🖥️ **Showcase Interactivo** 
El lugar más rápido para ver todos los componentes en acción.

**Acceso:** Agrega `?showcase` a tu URL local
```
http://localhost:5173/?showcase
```

**Qué incluye:**
- Paleta de colores completa con valores
- Sistema de tipografía con ejemplos visuales
- Todos los componentes de UI (botones, inputs, cards, etc.)
- Variantes y estados de cada componente
- Iconografía categorizada
- Sistema de layout y espaciado
- Componentes complejos del tour

**Ideal para:** Diseñadores, desarrolladores que quieren explorar visualmente

---

### 2. 📖 **DESIGN_SYSTEM.md**
Documentación completa y detallada del sistema.

**Archivo:** `/DESIGN_SYSTEM.md`

**Qué incluye:**
- Paleta de colores completa con variables CSS
- Jerarquía de tipografía detallada
- Especificaciones de todos los componentes base
- Componentes complejos del tour
- Sistema de iconografía (Lucide React)
- Layout y espaciado con medidas exactas
- Animaciones y transiciones
- Patrones de diseño
- Estructura de archivos del proyecto

**Ideal para:** Referencia completa, onboarding de nuevos miembros del equipo

---

### 3. ⚡ **QUICK_REFERENCE.md**
Guía rápida de consulta con snippets de código.

**Archivo:** `/QUICK_REFERENCE.md`

**Qué incluye:**
- Colores principales con clases de Tailwind
- Snippets de tipografía
- Código de botones más usados
- Cards estándar
- Inputs y formularios
- Badges y alerts
- Íconos comunes con imports
- Espaciado y layout rápido
- Tips y mejores prácticas

**Ideal para:** Consulta rápida durante desarrollo, copy-paste de código común

---

### 4. 💻 **COMPONENT_EXAMPLES.md**
Ejemplos completos y funcionales listos para copiar.

**Archivo:** `/COMPONENT_EXAMPLES.md`

**Qué incluye:**
- Estructura completa de página de etapa
- Header del tour completo
- Cards de selección con estados
- Formularios completos con validación
- Progress bar funcional
- Colección completa de botones
- Alerts y notificaciones
- Cards de planes de precios
- CTAs de contacto
- Estados de carga (skeletons, spinners)

**Ideal para:** Implementación rápida, copiar componentes completos

---

## 🚀 Inicio Rápido

### Para Diseñadores

1. **Ver el Showcase Interactivo:**
   ```
   http://localhost:5173/?showcase
   ```

2. **Revisar la paleta de colores y tipografía** en la sección correspondiente

3. **Explorar los componentes** navegando por las pestañas

4. **Exportar especificaciones** usando DESIGN_SYSTEM.md

### Para Desarrolladores Frontend

1. **Instalar dependencias:**
   ```bash
   npm install lucide-react class-variance-authority
   npm install @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs
   ```

2. **Consulta rápida:** QUICK_REFERENCE.md

3. **Copiar componentes completos:** COMPONENT_EXAMPLES.md

4. **Ver showcase interactivo** para verificar implementación:
   ```
   http://localhost:5173/?showcase
   ```

### Para Product Managers / Stakeholders

1. **Ver el Showcase Interactivo** para entender los componentes visuales

2. **Leer DESIGN_SYSTEM.md** sección "Patrones de Diseño" para entender flujos

3. **Revisar estructura de archivos** para comprender organización del código

---

## 🎯 Documentos por Caso de Uso

| Caso de Uso | Documento Recomendado |
|-------------|----------------------|
| Quiero ver cómo se ven los componentes | **Showcase Interactivo** (`?showcase`) |
| Necesito implementar un botón rápido | **QUICK_REFERENCE.md** |
| Voy a crear una nueva página de etapa | **COMPONENT_EXAMPLES.md** |
| Necesito las especificaciones exactas de colores | **DESIGN_SYSTEM.md** |
| Onboarding de nuevo miembro del equipo | **DESIGN_SYSTEM.md** + **Showcase** |
| ¿Qué spacing usar entre elementos? | **QUICK_REFERENCE.md** sección Espaciado |
| ¿Qué ícono usar para X acción? | **Showcase** pestaña Iconografía |
| Necesito un formulario completo | **COMPONENT_EXAMPLES.md** sección Formularios |

---

## 📁 Estructura de Archivos del Proyecto

```
/
├── DESIGN_SYSTEM.md              # Documentación completa
├── QUICK_REFERENCE.md            # Guía rápida
├── COMPONENT_EXAMPLES.md         # Ejemplos de código
├── SISTEMA_DISENO_README.md      # Este archivo
│
├── /src
│   ├── /app
│   │   ├── App.tsx                        # Componente raíz
│   │   ├── /components
│   │   │   ├── DesignSystemShowcase.tsx   # Showcase interactivo
│   │   │   ├── OnboardingFlow.tsx         # Flujo principal
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── WelcomeSurvey.tsx
│   │   │   │
│   │   │   ├── /stages                    # Etapas del tour
│   │   │   │   ├── WelcomeScreen.tsx
│   │   │   │   ├── StageSelector.tsx
│   │   │   │   ├── StageProfile.tsx
│   │   │   │   ├── StageCommercialData.tsx
│   │   │   │   ├── StageDocuments.tsx
│   │   │   │   ├── StageBankConnection.tsx
│   │   │   │   ├── StagePricingPlan.tsx
│   │   │   │   ├── StageContract.tsx
│   │   │   │   ├── StageValidation.tsx
│   │   │   │   └── StageActivation.tsx
│   │   │   │
│   │   │   └── /ui                        # Componentes base
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── card.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── alert.tsx
│   │   │       └── ...
│   │   │
│   │   └── /styles
│   │       ├── theme.css              # Variables CSS y tokens
│   │       ├── fonts.css
│   │       ├── tailwind.css
│   │       └── index.css
│
└── /guidelines
    └── Guidelines.md                  # Guías del proyecto
```

---

## 🎨 Stack Tecnológico

- **React** 18+
- **TypeScript**
- **Tailwind CSS** v4.0
- **Radix UI** (componentes accesibles)
- **Lucide React** (iconografía)
- **Class Variance Authority** (variantes de componentes)
- **Vite** (build tool)

---

## 🌈 Paleta de Colores (Resumen)

### Colores Principales
- **Blue 600** (#2563EB) - Acciones primarias, CTAs
- **Purple 600** (#9333EA) - Persona Jurídica
- **Green 500** (#22C55E) - Estados de éxito
- **Gray 900** (#111827) - Textos principales

### Variables CSS Clave
```css
--primary: #030213
--background: #ffffff
--input-background: #f3f3f5
--destructive: #d4183d
--radius: 0.625rem (10px)
```

Ver detalles completos en **DESIGN_SYSTEM.md** sección "Paleta de Colores"

---

## 📐 Sistema de Espaciado

Basado en múltiplos de **4px** (0.25rem):

| Clase | Valor | Uso Común |
|-------|-------|-----------|
| `gap-2` | 8px | Ícono + texto |
| `gap-4` | 16px | Grid de cards |
| `p-6` | 24px | **Padding estándar de cards** |
| `py-4 px-6` | 16px/24px | **Botones CTA** |
| `rounded-xl` | 12px | **Border radius estándar** |

Ver tabla completa en **DESIGN_SYSTEM.md** o **QUICK_REFERENCE.md**

---

## 🧩 Componentes Principales

### Base
- Button (6 variantes + tamaños)
- Input (con estados focus/error)
- Card (estructura modular)
- Badge (4 variantes)
- Alert (con variantes de feedback)
- Label, Switch, Tabs...

### Complejos del Tour
- **Progress Bar** - Barra de progreso de etapas
- **Header** - Cabecera con logo y acciones
- **Cards de Selección** - Persona Natural/Jurídica
- **Formularios** - Con labels e iconos
- **Pricing Plans** - Cards de planes de cobro
- **CTA de Contacto** - Call-to-action

Ver ejemplos completos en **COMPONENT_EXAMPLES.md**

---

## 🎯 Mejores Prácticas

### Siempre usar:
- ✅ `rounded-xl` para cards principales
- ✅ `p-6` para padding de cards
- ✅ `gap-2` entre ícono y texto en botones
- ✅ `text-3xl font-bold text-gray-900` para títulos de etapas
- ✅ `transition-all` o `transition-colors` en elementos interactivos
- ✅ Íconos de `lucide-react` a tamaño `w-5 h-5` (20px) estándar
- ✅ Gradiente `from-blue-600 to-blue-700` para logo Khipu

### Evitar:
- ❌ Crear nuevos colores fuera de la paleta
- ❌ Usar font-sizes arbitrarios (usar escala de Tailwind)
- ❌ Border radius inconsistentes
- ❌ Espaciado que no sean múltiplos de 4px
- ❌ Mezclar estilos de botones

---

## 🔍 Buscar Información Rápida

### "¿Qué color usar para...?"
→ **QUICK_REFERENCE.md** sección Colores

### "¿Cómo hacer un botón de...?"
→ **COMPONENT_EXAMPLES.md** sección Botones

### "¿Qué ícono usar?"
→ **Showcase Interactivo** pestaña Iconografía

### "¿Cuánto spacing entre...?"
→ **QUICK_REFERENCE.md** sección Espaciado

### "¿Cómo es la estructura de una etapa?"
→ **COMPONENT_EXAMPLES.md** ejemplo #1

### "Especificaciones exactas de un componente"
→ **DESIGN_SYSTEM.md** sección correspondiente

---

## 🤝 Contribuir al Sistema de Diseño

### Al agregar un nuevo componente:

1. **Implementar** siguiendo las guías de DESIGN_SYSTEM.md
2. **Agregar al Showcase** en `DesignSystemShowcase.tsx`
3. **Documentar** en COMPONENT_EXAMPLES.md si es un componente complejo
4. **Actualizar QUICK_REFERENCE.md** si es un patrón común
5. **Validar** accesibilidad (ARIA labels, keyboard navigation)
6. **Verificar** responsive design (mobile-first)

### Checklist de Nuevos Componentes:
- [ ] Usa colores de la paleta
- [ ] Sigue jerarquía de tipografía
- [ ] Espaciado consistente (múltiplos de 4px)
- [ ] Estados hover/focus/disabled
- [ ] Transiciones suaves
- [ ] Responsive
- [ ] Accesible
- [ ] Documentado

---

## 📧 Contacto y Soporte

Para preguntas sobre el sistema de diseño:
- **Equipo de Diseño:** [Contacto del equipo]
- **Equipo de Frontend:** [Contacto del equipo]

---

## 📝 Changelog

### Versión 1.0 (Marzo 2026)
- ✅ Sistema de diseño completo documentado
- ✅ Showcase interactivo implementado
- ✅ 4 documentos de referencia creados
- ✅ Todos los componentes del tour documentados
- ✅ Ejemplos de código completos

---

## 🎓 Recursos Adicionales

- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Radix UI:** https://www.radix-ui.com/
- **Lucide Icons:** https://lucide.dev/
- **Class Variance Authority:** https://cva.style/
- **React:** https://react.dev/

---

## 🚀 Empezar Ahora

1. **Ver visualmente:** `http://localhost:5173/?showcase`
2. **Leer documentación:** Abrir `DESIGN_SYSTEM.md`
3. **Copiar código:** Revisar `COMPONENT_EXAMPLES.md`
4. **Consulta rápida:** Tener abierto `QUICK_REFERENCE.md`

---

**Sistema de Diseño Khipu v1.0**  
**Última actualización:** Marzo 2026

---

## 📊 Resumen de Archivos

| Archivo | Tamaño | Propósito | Audiencia |
|---------|--------|-----------|-----------|
| **Showcase Interactivo** | App React | Exploración visual | Todos |
| **DESIGN_SYSTEM.md** | ~15KB | Documentación completa | Todos |
| **QUICK_REFERENCE.md** | ~5KB | Referencia rápida | Desarrolladores |
| **COMPONENT_EXAMPLES.md** | ~12KB | Código copy-paste | Desarrolladores |
| **Este README** | ~4KB | Índice y navegación | Todos |

---

¡Bienvenido al Sistema de Diseño de Khipu! 🎨✨
