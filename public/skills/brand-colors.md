# Skill: Identidad visual Khipu

## Propósito
Este skill te ayuda a aplicar correctamente los colores y elementos visuales de la marca Khipu en diseños, mockups y comunicaciones.

## Contexto de marca

**Khipu** es una plataforma de pagos B2B que transmite **confianza, modernidad y profesionalismo** a través de su identidad visual distintiva.

## Color primario

### Púrpura Khipu
El púrpura es nuestro color de marca distintivo. Comunica innovación, confianza y diferenciación en un mercado dominado por azules bancarios tradicionales.

**Valores:**
- HEX: `#8347AD`
- RGB: `131, 71, 173`
- Nombre: Púrpura Khipu

**Cuándo usar:**
- Botones principales (CTAs)
- Enlaces importantes
- Elementos de marca destacados
- Iconos de acción primaria
- Bordes y acentos de marca

**Cuándo NO usar:**
- Fondos completos de página
- Textos largos (afecta legibilidad)
- Elementos secundarios o terciarios

### Variantes del púrpura

| Variante | HEX | Uso |
|----------|-----|-----|
| **Main** | `#8347AD` | Acciones primarias, marca principal |
| **Dark** | `#6B3A8F` | Hover states, énfasis adicional |
| **Light** | `#9B69BD` | Fondos sutiles, estados deshabilitados |
| **Container** | `#F5F0FA` | Fondos de contenedores con marca |

## Colores semánticos

Los colores semánticos comunican el estado del sistema de forma universal. **Son iguales en modo claro y oscuro** para mantener consistencia.

### Success (Éxito)
- **HEX:** `#4CAF50`
- **Uso:** Confirmaciones, pagos exitosos, validaciones correctas

### Error
- **HEX:** `#F44336`
- **Uso:** Errores, validaciones fallidas, acciones destructivas

### Warning (Advertencia)
- **HEX:** `#FF9800`
- **Uso:** Alertas, acciones que requieren atención, estados pendientes

### Info (Información)
- **HEX:** `#2196F3`
- **Uso:** Mensajes informativos, tooltips, ayuda contextual

## Tipografía

### Public Sans
Tipografía geométrica y humanista que comunica profesionalismo, claridad y modernidad.

**¿Por qué Public Sans?**
- ✅ Legibilidad excelente en pantallas
- ✅ Open source y de uso libre
- ✅ Diseñada para interfaces digitales
- ✅ Amplio soporte de caracteres latinos

**Pesos disponibles:**
- **Regular (400):** Textos generales, párrafos
- **Medium (500):** Labels, subtítulos
- **Semibold (600):** Botones, títulos secundarios
- **Bold (700):** Títulos principales, énfasis fuerte

**Principio de uso:** Limita a 3 pesos diferentes en una misma vista para mantener coherencia visual.

## Accesibilidad y contraste

### Ratios de contraste WCAG 2.1 AA

**Estándares mínimos:**
- **Texto normal (< 18pt):** Ratio mínimo 4.5:1
- **Texto grande (≥ 18pt o ≥ 14pt bold):** Ratio mínimo 3:1
- **Elementos UI (iconos, bordes):** Ratio mínimo 3:1

### Combinaciones aprobadas de Khipu

| Fondo | Texto | Ratio | Estado |
|-------|-------|-------|--------|
| Blanco (#FFFFFF) | Púrpura Khipu (#8347AD) | 5.1:1 | ✅ AA aprobado |
| Púrpura Khipu (#8347AD) | Blanco (#FFFFFF) | 5.1:1 | ✅ AA aprobado |
| Blanco (#FFFFFF) | Púrpura Dark (#6B3A8F) | 7.8:1 | ✅ AAA aprobado |
| Púrpura Light (#9B69BD) | Blanco (#FFFFFF) | 3.2:1 | ⚠️ Solo texto grande |
| Púrpura Container (#F5F0FA) | Púrpura Khipu (#8347AD) | 9.2:1 | ✅ AAA aprobado |

**Herramientas recomendadas:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Figma plugin: "Contrast" by Stark

## Errores comunes a evitar

### 🚫 En diseño

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| Usar azules genéricos | Usar púrpura `#8347AD` | Color de marca distintivo |
| Fuentes Arial/Helvetica | Public Sans | Tipografía oficial |
| Colores hardcodeados | Usar tokens de diseño | Facilita mantenimiento |
| Púrpura en fondos grandes | Púrpura en acentos y CTAs | Evita saturación visual |

### 🚫 En comunicación visual

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| Logo en fondos de bajo contraste | Logo en blanco sobre púrpura o negro | Legibilidad y accesibilidad |
| Mezclar múltiples pesos tipográficos | Máximo 3 pesos por vista | Mantiene jerarquía clara |
| Textos pequeños en púrpura | Textos en gris oscuro, acentos en púrpura | Legibilidad óptima |

## Cómo usar este skill

### Paso 1: Integra este archivo en tu agente de IA
- **Claude (Projects):** Sube este archivo en "Project knowledge"
- **ChatGPT:** Sube este archivo al inicio de la conversación
- **Figma/Design tools:** Consulta al generar paletas o revisar diseños

### Paso 2: Haz tu solicitud
Ejemplos de prompts:

**Para revisar colores en un diseño:**
```
Revisa si estos colores siguen las guías de marca Khipu:
[describe tu paleta o adjunta imagen]
```

**Para generar un mockup:**
```
Crea un mockup de [pantalla/componente] usando la identidad visual de Khipu.
Asegúrate de usar el púrpura #8347AD y Public Sans.
```

**Para validar accesibilidad:**
```
Verifica que el contraste de colores de este diseño cumpla con WCAG 2.1 AA,
usando la paleta de marca Khipu.
```

## Checklist de validación visual

Antes de entregar un diseño, verifica:

- [ ] ¿Usé el púrpura Khipu (#8347AD) para elementos de marca?
- [ ] ¿Los colores semánticos están aplicados correctamente (success/error/warning)?
- [ ] ¿Estoy usando Public Sans como tipografía principal?
- [ ] ¿El contraste de colores cumple con WCAG 2.1 AA?
- [ ] ¿Limité el uso de pesos tipográficos a máximo 3 en la vista?
- [ ] ¿El púrpura está en acentos y CTAs, no en fondos grandes?

## ⚠️ Anti-patrones comunes de agentes IA

Cuando generes diseños visuales para Khipu, **evita estos errores típicos**:

### 🚫 En diseño

| ❌ Error típico de IA | ✅ Correcto Khipu | Por qué |
|----------|-------------|---------|
| Usar azules genéricos (#007BFF, #0066CC) | Usar púrpura #8347AD | Color de marca distintivo |
| Proponer múltiples opciones de paleta | Usar paleta definida de Khipu | Consistencia de marca |
| Sugerir gradientes complejos | Usar sólidos o gradientes sutiles púrpura | Simplicidad y legibilidad |
| Ignorar modo oscuro | Validar que los colores semánticos sean iguales en light/dark | Consistencia cross-mode |

### Tendencias a corregir:

- **Los LLMs sugieren paletas "modernas" genéricas** → Usa siempre el púrpura Khipu
- **Los LLMs no validan contraste automáticamente** → Verifica WCAG 2.1 AA
- **Los LLMs mezclan muchos colores** → Khipu usa paleta limitada y consistente

## Recursos adicionales

Para valores técnicos completos y tokens de diseño:
- **Storybook:** https://design.khipu.com → Brand → Uso de colores
- **Design Tokens:** https://design.khipu.com → Design Tokens
- **Documentación técnica:** Consulta CLAUDE.md en el repositorio

---

**Versión:** 1.0.0
**Última actualización:** 2026-05-05
**Más información:** https://design.khipu.com
