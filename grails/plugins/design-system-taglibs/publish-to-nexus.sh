#!/bin/bash

# Script para publicar el plugin a Nexus usando Maven
# Uso: ./publish-to-nexus.sh

set -e

PLUGIN_VERSION="0.1.0"
PLUGIN_ZIP="grails-design-system-taglibs-${PLUGIN_VERSION}.zip"
NEXUS_URL="https://dev.khipu.com/nexus/content/repositories/thirdparty"
NEXUS_ID="khipu-nexus-thirdparty"
GROUP_ID="org.grails.plugins"
ARTIFACT_ID="design-system-taglibs"
USERNAME="deployment"
PASSWORD="93h50sj2di2hd923"

echo "📦 Publicando Design System Taglibs v${PLUGIN_VERSION} a Nexus usando Maven..."

# Verificar que el ZIP existe
if [ ! -f "$PLUGIN_ZIP" ]; then
    echo "❌ Error: No se encontró ${PLUGIN_ZIP}"
    echo "Ejecuta primero: zip -r ${PLUGIN_ZIP} grails-app/ web-app/ DesignSystemTaglibsGrailsPlugin.groovy application.properties plugin.xml"
    exit 1
fi

# Crear POM sin packaging=zip (Maven no lo soporta)
echo "📝 Creando POM..."
cat > pom.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>${GROUP_ID}</groupId>
    <artifactId>${ARTIFACT_ID}</artifactId>
    <version>${PLUGIN_VERSION}</version>
    <packaging>pom</packaging>
    <name>Khipu Design System Taglibs</name>
    <description>Grails taglibs para el Sistema de Diseño de Khipu</description>
</project>
EOF

# Publicar usando Maven deploy:deploy-file
# Nota: usamos -Dpackaging=zip en el comando, no en el POM
echo "📤 Subiendo plugin a Nexus con Maven..."
mvn deploy:deploy-file \
  -DgroupId=${GROUP_ID} \
  -DartifactId=${ARTIFACT_ID} \
  -Dversion=${PLUGIN_VERSION} \
  -Dpackaging=zip \
  -Dfile=${PLUGIN_ZIP} \
  -DgeneratePom=false \
  -DpomFile=pom.xml \
  -DrepositoryId=${NEXUS_ID} \
  -Durl=${NEXUS_URL} \
  -s settings.xml

rm pom.xml

echo ""
echo "✅ Plugin publicado exitosamente!"
echo ""
echo "Para usar en payment, agrega a BuildConfig.groovy:"
echo "  compile ':design-system-taglibs:${PLUGIN_VERSION}'"
