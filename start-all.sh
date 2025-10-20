#!/bin/sh

# Iniciar API en background
cd /app/api && pnpm start &

# Iniciar Banner en background
cd /app/banner && pnpm start &

# Iniciar Login en background
cd /app/login && pnpm start &

# Iniciar Member en background
cd /app/member && pnpm start &

# Iniciar Host en foreground
cd /app/host && pnpm start
