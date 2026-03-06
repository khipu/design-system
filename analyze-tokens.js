const fs = require('fs');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync('./figma-tokens-export.json', 'utf8'));

console.log('=== RESUMEN GENERAL ===');
console.log(`Total Colecciones: ${data.summary.totalCollections}`);
console.log(`Total Variables: ${data.summary.totalVariables}`);
console.log(`Total Estilos: ${data.summary.totalStyles}`);
console.log('');

console.log('=== COLECCIONES DISPONIBLES ===');
Object.keys(data.variables.collections).forEach(collectionName => {
  const collection = data.variables.collections[collectionName];
  const varCount = Object.keys(collection.variables).length;
  console.log(`- ${collectionName}: ${varCount} variables`);
  console.log(`  Modos: ${Object.values(collection.modes).join(', ')}`);
});
console.log('');

console.log('=== COLECCIÓN: palette ===');
const palette = data.variables.collections.palette;
if (palette) {
  Object.entries(palette.variables).forEach(([varName, varData]) => {
    if (varData.resolvedType === 'COLOR') {
      console.log(`\n${varName}:`);
      Object.entries(varData.values).forEach(([mode, value]) => {
        if (value.hex) {
          console.log(`  ${mode}: ${value.hex}`);
        } else if (value.type === 'alias') {
          console.log(`  ${mode}: alias to ${value.aliasTo}`);
        }
      });
    }
  });
}
console.log('');

console.log('=== COLECCIÓN: spacing ===');
const spacing = data.variables.collections.spacing;
if (spacing) {
  Object.entries(spacing.variables).forEach(([varName, varData]) => {
    console.log(`${varName}:`);
    Object.entries(varData.values).forEach(([mode, value]) => {
      console.log(`  ${mode}: ${value}px`);
    });
  });
}
console.log('');

console.log('=== COLECCIÓN: typography ===');
const typography = data.variables.collections.typography;
if (typography) {
  Object.entries(typography.variables).forEach(([varName, varData]) => {
    console.log(`${varName}:`);
    Object.entries(varData.values).forEach(([mode, value]) => {
      console.log(`  ${mode}: ${value}`);
    });
  });
}
console.log('');

console.log('=== COLECCIÓN: breakpoints ===');
const breakpoints = data.variables.collections.breakpoints;
if (breakpoints) {
  Object.entries(breakpoints.variables).forEach(([varName, varData]) => {
    console.log(`${varName}:`);
    Object.entries(varData.values).forEach(([mode, value]) => {
      console.log(`  ${mode}: ${value}px`);
    });
  });
}
console.log('');

console.log('=== COLECCIÓN: shape ===');
const shape = data.variables.collections.shape;
if (shape) {
  Object.entries(shape.variables).forEach(([varName, varData]) => {
    console.log(`${varName}:`);
    Object.entries(varData.values).forEach(([mode, value]) => {
      console.log(`  ${mode}: ${value}px`);
    });
  });
}
