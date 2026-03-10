# MCP Deployment Guide

## 🎯 Resumen

El proyecto utiliza una **estrategia híbrida** con dos servidores MCP complementarios:

1. **Producción**: `storybook-mcp` externo (siempre disponible, herramientas limitadas)
2. **Local**: Addon nativo en `http://localhost:6006/mcp` (requiere Storybook corriendo, herramientas completas)

**Importante:** El addon nativo `@storybook/addon-mcp` NO funciona con GitHub Pages (requiere servidor Node.js). Por eso usamos el paquete externo `storybook-mcp` para producción.

---

## 🚀 Proceso de Deployment

### Paso 1: Commit y Push

```bash
git add -A
git commit -m "feat: upgrade Storybook to v10 and enable native MCP integration"
git push origin main
```

### Paso 2: GitHub Actions (Automático)

El workflow `.github/workflows/storybook.yml` se ejecutará automáticamente:

```yaml
# Workflow simplificado
jobs:
  build:
    - npm ci                    # Instala Storybook 10 + addon-mcp
    - npm run tokens:generate   # Genera tokens
    - npm run build-storybook   # Build con addon MCP incluido

  deploy:
    - Deploy to GitHub Pages    # Publica en design.khipu.com
```

**Duración estimada:** 2-3 minutos

### Paso 3: Verificación Post-Deploy

Una vez completado el workflow, verifica que el sitio esté disponible:

```bash
# Verificar sitio principal
curl -I https://design.khipu.com
# Debe retornar: HTTP/2 200

# Verificar que index.json esté disponible
curl https://design.khipu.com/index.json | head -20
```

**Nota:** El endpoint `/mcp` NO estará disponible porque GitHub Pages sirve archivos estáticos. El servidor MCP de producción usa el paquete externo `storybook-mcp` que lee `index.json` directamente.

---

## 🔧 Configuración MCP Actualizada

Los archivos `.mcp.json` y `public/mcp.json` ahora apuntan al servidor de producción por defecto:

```json
{
  "mcpServers": {
    "storybook": {
      "transport": "http",
      "url": "https://design.khipu.com/mcp",
      "description": "Production Storybook MCP - Always available"
    },
    "storybook-local": {
      "transport": "http",
      "url": "http://localhost:6006/mcp",
      "description": "Local development (requires npm run storybook)"
    }
  }
}
```

### Beneficios del Servidor de Producción

✅ **Siempre disponible**: No requiere Storybook corriendo localmente
✅ **Datos estables**: Componentes en versión publicada
✅ **Acceso global**: Cualquier agente puede acceder 24/7
✅ **Bajo latencia**: Servido via GitHub Pages CDN
✅ **Sin configuración adicional**: Funciona automáticamente después del deploy

---

## 📊 Comparación de Servidores

### Servidor de Producción (`storybook`)
- **Implementación**: `storybook-mcp` (paquete NPM externo)
- **Fuente de datos**: https://design.khipu.com/index.json (estático)
- **Disponibilidad**: 24/7
- **Requiere**: Nada (siempre activo)
- **Herramientas**: Limitadas (list-stories, get-story)
- **Uso ideal**:
  - Consultas de documentación publicada
  - Integración en CI/CD
  - Uso desde cualquier ubicación
  - Claude Code sin Storybook local

### Servidor Local (`storybook-local`)
- **Implementación**: `@storybook/addon-mcp` (addon nativo)
- **Fuente de datos**: http://localhost:6006/mcp (servidor en vivo)
- **Disponibilidad**: Solo con `npm run storybook`
- **Requiere**: Storybook corriendo localmente
- **Herramientas**: Completas (preview-stories, story-instructions)
- **Uso ideal**:
  - Desarrollo activo de componentes
  - Testing de cambios antes de commit
  - Obtener URLs de preview
  - Instrucciones para escribir stories

---

## 🔀 Selección Automática

Claude Code puede usar ambos servidores según el contexto:

1. **Por defecto**: Usa el servidor de producción
2. **Durante desarrollo activo**: Cambia automáticamente al servidor local si detecta que Storybook está corriendo
3. **Si local no disponible**: Fallback a producción

---

## 📝 Checklist de Deployment

Usa este checklist después de hacer el deploy:

- [ ] Push completado a `main`
- [ ] Workflow de GitHub Actions ejecutado exitosamente
- [ ] Sitio accesible en https://design.khipu.com
- [ ] Endpoint MCP responde: `curl -I https://design.khipu.com/mcp`
- [ ] Herramientas MCP listadas correctamente
- [ ] Claude Code detecta el servidor automáticamente
- [ ] Prueba con: "¿Qué componentes tenemos disponibles?"

---

## 🐛 Troubleshooting

### El endpoint /mcp no existe en producción

**Síntomas:**
```bash
curl https://design.khipu.com/mcp
# 404 Not Found
```

**Causas posibles:**
1. El workflow no completó exitosamente
2. El cache de GitHub Pages no se actualizó
3. El addon MCP no está en la configuración

**Soluciones:**
```bash
# 1. Verificar workflow
gh run list --workflow=storybook.yml --limit 1

# 2. Forzar rebuild
git commit --allow-empty -m "chore: trigger storybook rebuild"
git push

# 3. Verificar addon en main.ts
grep "addon-mcp" .storybook/main.ts
```

### El servidor MCP responde pero sin herramientas

**Síntomas:**
```json
{"result": {"tools": []}}
```

**Causa**: El addon está instalado pero no configurado correctamente

**Solución**: Verificar `.storybook/main.ts`:
```typescript
addons: [
  '@storybook/addon-mcp',  // ✅ Debe estar presente
],
```

---

## 🎉 Beneficios de Tener MCP en Producción

### Para Desarrolladores
- 🔍 Consultar documentación sin clonar el repo
- 📱 Acceso desde cualquier dispositivo
- 🤝 Compartir URLs de MCP con el equipo

### Para Agentes IA
- 🤖 Acceso 24/7 a componentes publicados
- 📚 Fuente de verdad actualizada automáticamente
- ⚡ Respuestas instantáneas sin setup local

### Para el Equipo
- 📖 Documentación siempre sincronizada con código
- 🔄 Actualizaciones automáticas en cada deploy
- 🌐 Acceso global sin VPN o permisos especiales

---

## 📚 Referencias

- [STORYBOOK_MCP.md](./STORYBOOK_MCP.md) - Guía completa de uso
- [CLAUDE.md](../CLAUDE.md) - Documentación técnica general
- [Storybook Deployment Workflow](../.github/workflows/storybook.yml)

---

**Última actualización:** 2026-03-09
**Versión de Storybook:** 10.2.16
**Versión del addon MCP:** 0.3.4
