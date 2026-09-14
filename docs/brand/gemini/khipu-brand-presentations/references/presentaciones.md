# Contexto de marca — Khipu

Plataforma de pagos B2B para Chile y Latinoamérica. Facilitamos
transferencias bancarias, suscripciones y pagos automáticos entre empresas y
usuarios. Transmitimos confianza, modernidad y profesionalismo.

## Presentaciones

Aplicación de la marca en presentaciones corporativas (Keynote, PowerPoint,
Google Slides).

> **Plantilla de referencia:** `docs/brand/plantilla-presentacion.html`. Contiene
> las once plantillas de slide descritas aquí, listas para abrir en el navegador,
> revisar y exportar a PDF. Los valores de esta sección son los que esa plantilla
> implementa: si cambia uno, cambian ambos.

### Lienzo y márgenes

| Aspecto | Valor |
|---------|-------|
| Formato | 16:9 — nunca 4:3 |
| Resolución | 1920 × 1080 px (Full HD); mínimo 1280 × 720 px |
| Margen superior e inferior | 90 px |
| Margen izquierdo | 128 px |
| Margen derecho | 110 px |

El margen izquierdo es mayor que el derecho porque la huincha ocupa los primeros
21 px del lienzo. Los 128 px son el eje sobre el que se alinea **todo** el
contenido: logo, títulos, cuerpo y pie.

### Huincha lateral

Banda vertical de **21 px** en el borde izquierdo, en degradado descendente:

```
#8347AD   0%   ← púrpura de marca
#8347AD  65%      se mantiene puro
#3CB4E5 100%   ← cian, sólo en el tramo final
```

Es el elemento que da unidad al mazo. Va en **todas las slides de contenido** —
índice, divisor, contenido, columnas, cifras, gráficos, tabla — y **no va** en
portada, cierre ni imagen a sangre, donde el fondo ya cubre el lienzo.

El degradado es continuo, sin cortes: un corte marcaría una división que el
contenido no tiene.

### Tipografía

Escala completa sobre el lienzo de 1920 × 1080:

| Rol | Tamaño | Peso | Uso |
|-----|--------|------|-----|
| Título de portada | 62 pt | Bold (700) | Portada y cierre |
| Título de divisor | 96 pt | Bold (700) | Sólo la slide divisora |
| Título de slide | 38 pt | SemiBold (600) | Encabezado de cada slide interior |
| Subtítulo | 24 pt | Medium (500) | Bajadas y apoyos |
| Cuerpo | 21 pt | Regular (400) | Bullets, párrafos, tablas, leyendas |
| Fecha de portada | 17 pt | Medium (500) | Sólo portada y cierre |
| Nota al pie | 14 pt | Regular (400) | Fuentes, créditos, pie de slide |

**Reglas:**

- Máximo **3 pesos por vista**. El Bold se reserva para portada, divisor y cifras
  destacadas; los títulos de slide van en SemiBold.
- Los cuerpos grandes llevan interlínea más ajustada e interletrado ligeramente
  negativo (−0.01 a −0.025 em): un texto grande con el espaciado de uno pequeño
  se ve suelto.
- El quiebre de línea de un título de portada se decide a mano con un salto
  explícito, no se deja al ancho del contenedor.

### Logotipo

Su tratamiento **depende del tipo de slide**:

| Tipo de slide | Logotipo |
|---------------|----------|
| Portada, índice, divisor, cierre | Arriba a la izquierda, 230 px de ancho |
| Slides interiores | Al pie, 96 px, en gris, junto al nombre de la presentación |
| Imagen a sangre | Sin logotipo |

**Alineación óptica.** El SVG del logotipo trae un 16,4 % de aire interno a la
izquierda (el trazo arranca en x = 32,72 de un viewBox de 200). Alinear la caja
del archivo con el texto deja la "K" visiblemente corrida hacia dentro; alinear
el trazo al 100 % la deja volada hacia fuera, porque su costado recto pesa más
que el borde de una letra con curva. **Se compensa el 60 % de ese aire**, que es
el punto donde el logo se lee alineado.

En Keynote, Slides o PowerPoint, el mismo criterio: sacar el logotipo unos
15 px a la izquierda del margen de texto, no cuadrar su caja.

### Numeración de páginas

El folio no es una nota al pie: es un elemento gráfico.

```
────  03 /11
```

| Parte | Especificación |
|-------|----------------|
| Regla | 64 × 2 px, gris de línea |
| Página en curso | 26 pt Bold, púrpura de marca, dos dígitos (`03`, no `3`) |
| Total | 18 pt Medium, gris `#8C8C8C` |

Ambas cifras usan cifras tabulares para que no bailen entre slides. El gris del
total es el mismo con que se ve el logotipo del pie, de modo que marca y total
pesan igual y la página en curso manda sola.

### Las once plantillas

**1 · Portada.** Fondo púrpura con dos halos radiales: cian entrando desde fuera
del borde inferior izquierdo, luz púrpura clara en el ángulo opuesto. Sobre él,
una trama de puntos muy tenue que evita el *banding* en proyección. Logotipo
blanco arriba, filete blanco sobre el título, fecha abajo. Sin huincha.

**1b · Portada con fotografía** *(alternativa)*. El lienzo se parte en diagonal
según la **sección áurea**: el bloque de marca ocupa el 61,8 % y la fotografía el
38,2 % — relación 1 : φ. La diagonal cruza el eje en ese 61,8 % con 12 puntos de
inclinación (67,8 % arriba, 55,8 % abajo). La foto lleva un velo púrpura → cian
que la integra a la paleta y sostiene el contraste del texto. El título va un
escalón más bajo (56 pt) porque la diagonal le quita ancho.

**2 · Índice.** Filas con numeración `01`–`04` en púrpura, tema en SemiBold, una
línea de detalle debajo y el número de página a la derecha. La **sección en curso
va destacada** con fondo `#F3E5FF`, lo que permite repetir el índice antes de
cada bloque como marcador de avance. Divisiones con línea fina, sin cajas.

**3 · Divisor de sección.** Sólo tipografía. Fondo `#F7EDFF` — una variante del
marcador del índice, mismo matiz y saturación, apenas más clara para cubrir el
lienzo sin saturar. Eyebrow numerado en púrpura, título a 96 pt con **la palabra
clave destacada en púrpura** (no el título entero), bajada opcional en gris.

**4 · Contenido estándar.** Título y hasta seis bullets de una línea. Es la slide
por defecto.

**5 · Texto + imagen (50/50).** Dos columnas, imagen a la derecha en proporción
4:3.

**6 · Tres columnas.** Tarjetas con filete superior en púrpura. Mantener los
textos de largo parejo: si una columna necesita mucho más, merece su propia
slide.

**7 · Cuatro columnas con cifras.** Dato grande en púrpura (54 pt Bold) más
descripción breve. Siempre con la fuente del dato al pie.

**8 · Datos y gráficos.** Púrpura como serie principal, púrpura dark y cian como
secundarias. El título dice la conclusión, no el tema.

**9 · Tabla y estados.** Tabla con encabezado púrpura y filas alternadas. Los
colores semánticos aparecen sólo cuando el dato tiene carga de estado.

**10 · Imagen a pantalla completa.** Sin logotipo, huincha ni pie fijo: nada
compite con lo que se muestra. Un velo aparece únicamente en la franja inferior
cuando hay que titular o atribuir; si la imagen se explica sola, se elimina ese
bloque.

**11 · Cierre.** El mismo fondo radial de la portada, con el halo cian espejado a
la derecha. Mensaje de cierre o CTA y datos de contacto.

### Color en presentaciones

| Rol | HEX | Uso |
|-----|-----|-----|
| Púrpura main | `#8347AD` | Fondos de portada y cierre, acentos, serie principal de gráficos |
| Púrpura dark | `#5B3179` | Títulos sobre fondos claros, segunda serie |
| Superficie de sección | `#F7EDFF` | Fondo del divisor |
| Marcador de índice | `#F3E5FF` | Fila activa del índice |
| Cian | `#3CB4E5` | Halos radiales, remate de huincha, serie de apoyo |
| Blanco | `#FFFFFF` | Fondo principal, texto sobre púrpura |
| Gris de texto | `#333333` | Títulos y cuerpo |
| Gris medio | `#666666` | Nombre de la presentación, notas al pie |
| Gris tenue | `#8C8C8C` | Logotipo del pie y total de páginas |

Los **semánticos** (sección 9) se usan **sólo cuando el dato tiene carga de
estado** — un resultado positivo, una alerta, un riesgo. Nunca como colores
decorativos para diferenciar series.

### Redacción para slides

| ✅ Recomendado | ❌ Evitar |
|----------------|-----------|
| Títulos accionables: "Aumenta tus ventas con Khipu" | Títulos genéricos: "Beneficios" |
| Bullets cortos (máx. 1 línea) | Párrafos largos en bullets |
| Números concretos: "50% más rápido" | Vagos: "Mucho más rápido" |
| Preguntas directas: "¿Cómo funciona?" | Preguntas vagas: "Información adicional" |
| Verbos activos: "Conecta tu banco en 2 min" | Voz pasiva: "Las conexiones son realizadas" |
| "Tu negocio merece pagos simples" | "Su empresa requiere soluciones de pago" |

**Densidad:** máximo 6 líneas por slide · máximo 5-6 bullets · una idea principal
por slide · mínimo 16 pt para cuerpo.

**Puntuación en slides:**

| Elemento | ¿Punto final? |
|----------|---------------|
| Títulos de slides | ❌ No |
| Bullets de lista | ❌ No |
| Frases completas en el cuerpo | ✅ Sí, si son oraciones completas |
| Notas al pie | ✅ Sí |
| CTAs | ❌ No |

### Cómo incorporar una slide nueva

Antes de diseñar una plantilla nueva, **verifica que no exista ya**: nueve de
cada diez necesidades caben en las once anteriores, y un mazo con muchas
plantillas parecidas se ve inconsistente aunque cada una esté bien resuelta.

Si de verdad hace falta, la slide nueva debe cumplir esto:

**1. Respeta el lienzo.** Márgenes 90 / 110 / 90 / 128 px. Todo el contenido
alineado al eje de 128 px.

**2. Lleva huincha** si es una slide de contenido; no la lleva si su fondo cubre
el lienzo (portadas, cierre, imagen a sangre).

**3. Usa la escala tipográfica existente**, sin inventar tamaños intermedios. Si
un texto no calza en ningún rol de la tabla 12.3, probablemente el problema es el
contenido, no la escala.

**4. Ubica el logotipo según su tipo**: arriba si es apertura, estructura o
cierre; al pie en gris si es contenido; ausente si la imagen manda.

**5. Lleva folio** con el formato de 12.5, salvo que sea portada, cierre o
imagen a sangre.

**6. Toma los colores de la tabla 12.7.** No introduzcas tonos nuevos: si hace
falta un color que no está, es una decisión de marca y se resuelve en el sistema
de tokens, no en una slide.

**7. Deja respirar.** El contenido arranca bajo el logo o el borde superior y
termina sobre el pie; el aire sobrante se reparte abajo, no se distribuye
centrando todo verticalmente.

**8. Documenta la decisión.** Toda plantilla nueva se agrega a la lista de 12.6
con una línea que diga qué resuelve y cuándo usarla. Una plantilla sin criterio
de uso escrito termina usándose para cualquier cosa.

### Errores comunes

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| Más de 3 fuentes diferentes | Sólo Public Sans con 2-3 pesos | Consistencia visual |
| Fondos púrpura en todas las slides | Púrpura en portada, cierre y acentos | Evita saturación |
| Textos menores a 14 pt | Mínimo 16 pt para cuerpo | Legibilidad en proyección |
| Más de 7 bullets por slide | Máximo 5-6 | Sobrecarga cognitiva |
| Logos pixelados o estirados | SVG o alta resolución | Profesionalismo |
| Alinear la caja del logotipo | Alinear su trazo (ver 12.4) | El archivo trae aire interno |
| Semánticos como colores decorativos | Sólo cuando el dato tiene estado | El color comunica, no adorna |
| Párrafos largos | Bullets concisos | Escaneabilidad |
| Jerga técnica sin explicar | Términos claros o glosario | Audiencia diversa |

---
