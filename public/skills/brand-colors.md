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
| **Dark** | `#5B3179` | Hover, énfasis, texto sobre fondos claros |
| **Light** | `#9B6BBD` | Fondos sutiles, estados deshabilitados |
| **Container** | `#F3E5FF` | Fondos de contenedores con marca |

### Color secundario: Cian

Complementa al púrpura. Aporta energía, accesibilidad y balance visual sin competir
con el primario. Úsalo en acciones secundarias, iconos, badges y acentos.

| Variante | HEX | Uso |
|----------|-----|-----|
| **Main** | `#3CB4E5` | Acciones secundarias, acentos |
| **Dark** | `#198EBE` | Hover, texto sobre fondos claros |
| **Light** | `#6AC6EB` | Fondos sutiles |

## Colores semánticos

Los colores semánticos comunican el estado del sistema de forma universal. **Son iguales en modo claro y oscuro** para mantener consistencia.

| Estado | Main | Dark | Uso |
|--------|------|------|-----|
| **Info** | `#0288D1` | `#01579B` | Mensajes informativos, tooltips, ayuda contextual |
| **Success** | `#2E7D32` | `#1B5E20` | Confirmaciones, pagos exitosos, validaciones correctas |
| **Warning** | `#EF6C00` | `#E65100` | Alertas, acciones que requieren atención, estados pendientes |
| **Error** | `#D32F2F` | `#C62828` | Errores, validaciones fallidas, acciones destructivas |

**Cuándo usar cada variante:** `main` es el color base — iconos, bordes, fondos de
badge y el color con que se identifica el estado. `dark` se reserva para el texto
del mensaje sobre fondos claros y para estados hover, donde el `main` no siempre
alcanza el contraste necesario.

Variantes claras, para fondos de alertas y badges:

| Estado | Light | Container |
|--------|-------|-----------|
| Info | `#03A9F4` | `#EFF6FF` |
| Success | `#4CAF50` | `#ECFDF5` |
| Warning | `#FF9800` | `#FFFBEB` |
| Error | `#EF5350` | `#FEF2F2` |

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
| Blanco `#FFFFFF` | Púrpura main `#8347AD` | 6.1:1 | ✅ AA |
| Púrpura main `#8347AD` | Blanco `#FFFFFF` | 6.1:1 | ✅ AA |
| Blanco `#FFFFFF` | Púrpura dark `#5B3179` | 9.7:1 | ✅ AAA |
| Púrpura container `#F3E5FF` | Púrpura main `#8347AD` | 5.0:1 | ✅ AA |
| Púrpura container `#F3E5FF` | Púrpura dark `#5B3179` | 8.1:1 | ✅ AAA |
| Blanco `#FFFFFF` | Púrpura light `#9B6BBD` | 4.0:1 | ⚠️ Solo texto grande |
| Blanco `#FFFFFF` | Gris de texto `#333333` | 12.6:1 | ✅ AAA |

**Colores que NO alcanzan AA como texto normal sobre blanco.** Sirven para iconos,
bordes y fondos, pero para texto usa su variante `dark`:

| Fondo | Texto | Ratio | Estado |
|-------|-------|-------|--------|
| Blanco `#FFFFFF` | Success main `#2E7D32` | 5.1:1 | ✅ AA |
| Blanco `#FFFFFF` | Error main `#D32F2F` | 5.0:1 | ✅ AA |
| Blanco `#FFFFFF` | Info main `#0288D1` | 3.9:1 | ⚠️ Solo texto grande → usa `#01579B` |
| Blanco `#FFFFFF` | Warning main `#EF6C00` | 3.1:1 | ⚠️ Solo texto grande → usa `#E65100` |
| Blanco `#FFFFFF` | Cian main `#3CB4E5` | 2.4:1 | ❌ Nunca como texto → usa `#198EBE` |

> El cian es un color de acento, no de texto. Sobre blanco no alcanza contraste ni
> para texto grande: úsalo en iconos, bordes y fondos, y para texto recurre al
> cian dark.

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

**Versión:** 1.1.0
**Última actualización:** 2026-09-10
**Más información:** https://design.khipu.com
