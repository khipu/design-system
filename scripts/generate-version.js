#!/usr/bin/env node
/**
 * Escribe src/version.ts con la versión de package.json.
 *
 * Corre como parte de `npm run build`, así que lo publicado siempre lleva la versión
 * real aunque el archivo commiteado haya quedado atrás tras un bump.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const { version } = require(path.join(root, 'package.json'));
const target = path.join(root, 'src', 'version.ts');

const contents = `// Archivo generado por scripts/generate-version.js — no editar a mano.
export const KDS_VERSION = '${version}';
`;

const previous = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
if (previous === contents) {
  console.log(`generate-version: src/version.ts ya está en ${version}`);
} else {
  fs.writeFileSync(target, contents);
  console.log(`generate-version: src/version.ts actualizado a ${version}`);
}
