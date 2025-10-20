#!/bin/bash

# Script para instalar dependencias en todos los proyectos

echo "📦 Instalando dependencias en todos los proyectos..."
echo ""

# API
echo "🔧 Instalando dependencias de API..."
cd api && npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias de API"
    exit 1
fi
cd ..

# Libs (debe instalarse antes que los MFEs que la usan)
echo "📚 Instalando y construyendo librería compartida..."
cd libs && pnpm install && pnpm build
if [ $? -ne 0 ]; then
    echo "❌ Error instalando/construyendo libs"
    exit 1
fi
cd ..

# Host
echo "🏠 Instalando dependencias de Host..."
cd host && pnpm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias de Host"
    exit 1
fi
cd ..

# Login
echo "🔐 Instalando dependencias de Login..."
cd login && pnpm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias de Login"
    exit 1
fi
cd ..

# Banner
echo "🎯 Instalando dependencias de Banner..."
cd banner && pnpm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias de Banner"
    exit 1
fi
cd ..

# Members
echo "👥 Instalando dependencias de Members..."
cd members && pnpm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias de Members"
    exit 1
fi
cd ..

echo ""
echo "✅ Todas las dependencias instaladas correctamente!"
echo ""
echo "🚀 Siguiente paso:"
echo "   - Desarrollo local: ./start-dev.sh"
echo "   - Con Docker: docker-compose up -d"
