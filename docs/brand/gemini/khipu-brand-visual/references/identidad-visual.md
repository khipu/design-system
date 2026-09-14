# Contexto de marca — Khipu

Plataforma de pagos B2B para Chile y Latinoamérica. Facilitamos
transferencias bancarias, suscripciones y pagos automáticos entre empresas y
usuarios. Transmitimos confianza, modernidad y profesionalismo.

## Color

### Colores de marca

| Color | Main | Dark | Significado | Cuándo usarlo |
|-------|------|------|-------------|---------------|
| **Púrpura Khipu** | `#8347AD` | `#5B3179` | Innovación, confianza, diferenciación en un mercado dominado por azules y verdes | Acciones primarias, navegación activa, elementos de marca, enlaces importantes |
| **Cian** | `#3CB4E5` | `#198EBE` | Energía, accesibilidad, complementariedad | Acciones secundarias, iconos y badges, acentos, elementos decorativos |

**Cuándo NO usar el púrpura:** fondos completos de página, textos largos (afecta
legibilidad), elementos secundarios o terciarios.

**Variantes completas:**

| Variante | Púrpura | Cian | Uso |
|----------|---------|------|-----|
| **Main** | `#8347AD` | `#3CB4E5` | Color base: acciones primarias, marca principal |
| **Dark** | `#5B3179` | `#198EBE` | Hover, énfasis, texto sobre fondos claros |
| **Light** | `#9B6BBD` | `#6AC6EB` | Fondos sutiles, estados deshabilitados |
| **Container** | `#F3E5FF` | — | Fondos de contenedores con marca |

Sobre púrpura o cian en `main` o `dark`, el texto va en blanco (`#FFFFFF`).

### Colores semánticos

Comunican el estado del sistema. **Son iguales en modo claro y oscuro.**

| Estado | Main | Dark | Cuándo | Ejemplo de copy |
|--------|------|------|--------|-----------------|
| **Info** | `#0288D1` | `#01579B` | Mensajes informativos, tooltips, ayuda contextual | "Tu pago será procesado en 24-48 horas" |
| **Success** | `#2E7D32` | `#1B5E20` | Pagos exitosos, operaciones completadas, estados verificados | "¡Pago realizado exitosamente!" |
| **Warning** | `#EF6C00` | `#E65100` | Atención no crítica, límites próximos, acciones con consecuencias | "Esta acción no se puede deshacer" |
| **Error** | `#D32F2F` | `#C62828` | Errores de formulario, operaciones fallidas, acciones destructivas | "El pago no pudo ser procesado" |

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

### Accesibilidad

Estándares WCAG 2.1 AA: texto normal ≥ 4.5:1, texto grande (≥ 18pt o ≥ 14pt bold)
≥ 3:1, elementos de UI ≥ 3:1.

Verifica el contraste con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
o el plugin "Contrast" de Stark para Figma.

**Combinaciones verificadas** (ratio calculado sobre los valores de esta guía):

| Fondo | Texto | Ratio | Estado |
|-------|-------|-------|--------|
| Blanco `#FFFFFF` | Púrpura main `#8347AD` | 6.1:1 | ✅ AA |
| Púrpura main `#8347AD` | Blanco `#FFFFFF` | 6.1:1 | ✅ AA |
| Blanco `#FFFFFF` | Púrpura dark `#5B3179` | 9.7:1 | ✅ AAA |
| Púrpura container `#F3E5FF` | Púrpura main `#8347AD` | 5.0:1 | ✅ AA |
| Púrpura container `#F3E5FF` | Púrpura dark `#5B3179` | 8.1:1 | ✅ AAA |
| Blanco `#FFFFFF` | Gris de texto `#333333` | 12.6:1 | ✅ AAA |
| Blanco `#FFFFFF` | Success main `#2E7D32` | 5.1:1 | ✅ AA |
| Blanco `#FFFFFF` | Error main `#D32F2F` | 5.0:1 | ✅ AA |
| Blanco `#FFFFFF` | Púrpura light `#9B6BBD` | 4.0:1 | ⚠️ Solo texto grande |
| Blanco `#FFFFFF` | Info main `#0288D1` | 3.9:1 | ⚠️ Texto grande → usa `#01579B` |
| Blanco `#FFFFFF` | Warning main `#EF6C00` | 3.1:1 | ⚠️ Texto grande → usa `#E65100` |
| Blanco `#FFFFFF` | Cian main `#3CB4E5` | 2.4:1 | ❌ Nunca como texto → usa `#198EBE` |

> El cian es un color de acento, no de texto: sobre blanco no alcanza contraste ni
> para texto grande. Lo mismo aplica a info y warning en su variante `main`. Para
> texto, usa siempre la variante `dark`.

---

## Tipografía

**Public Sans** es la única fuente de la marca. Tipografía geométrica y humanista
creada por el equipo de diseño de USWDS (U.S. Web Design System).

Disponible gratis en [Google Fonts](https://fonts.google.com/specimen/Public+Sans).

**Por qué Public Sans:**

- **Legibilidad y accesibilidad** — Diseñada para máxima legibilidad en pantalla; cumple estándares de accesibilidad web. Funciona desde títulos grandes hasta texto pequeño y formularios.
- **Personalidad de marca** — Su estética geométrica transmite innovación y modernidad sin ser trendy. Contemporánea pero atemporal.
- **Versatilidad universal** — Una sola familia para todo crea una experiencia visual coherente y reduce complejidad.
- **Código abierto** — Sin costos de licenciamiento, garantiza consistencia en cualquier proyecto.

**Pesos y su rol:**

| Peso | Uso |
|------|-----|
| Regular (400) | Contenido general y lectura |
| Medium (500) | Labels, botones y énfasis sutil |
| SemiBold (600) | Encabezados y títulos importantes |
| Bold (700) | Máximo impacto y títulos display |

> **Principio de uso:** limita a 3 pesos diferentes en una misma vista para
> mantener coherencia visual.

---

## Logotipo

El logotipo es el elemento más importante de nuestra identidad visual.

### Variantes

**Horizontales:**

| Variante | Uso |
|----------|-----|
| Color | Espacio positivo (modo claro), impresos |
| Púrpura completo | Espacio negativo (modo oscuro color), impresos |
| Negro | Espacio negativo (modo oscuro), impresos |

**Cuadrados:**

| Variante | Uso |
|----------|-----|
| K Color | UI minimalista |
| K Púrpura | Íconos de app, favicons |
| K Blanco | Fondos oscuros |
| K Blanco negativo | Alto contraste |

Descarga: [design.khipu.com](https://design.khipu.com) → Brand → Uso de marca

### Espacios de protección

Área mínima equivalente a la altura de la letra "K" del logotipo, libre de
cualquier elemento gráfico, texto o contenido.

**Regla general:** al menos 24px de espacio libre alrededor del logo en todas las
direcciones, para aplicaciones digitales.

### Tamaños mínimos

- Pantallas de escritorio: 120px de ancho
- Dispositivos móviles: 100px de ancho
- Favicon e íconos: 32×32px

### Usos correctos

**Fondos:** blancos o gris claro, de alto contraste, superficies limpias sin
elementos competidores.

**Proporciones:** mantener siempre las originales, escalar proporcionalmente desde
las esquinas, nunca estirar ni comprimir.

**Alineación:** centrado cuando es el único elemento, a la izquierda en headers y
navegación, respetando los grids del layout.

### Usos incorrectos

No rotar · No deformar las proporciones · No cambiar los colores · No agregar
efectos (sombras, brillos, degradados) · No colocar sobre fondos con baja
legibilidad · No usar con bajo contraste · No agregar contornos o bordes.

---
