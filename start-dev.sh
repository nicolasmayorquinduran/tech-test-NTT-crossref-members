#!/bin/bash

# Script para levantar todos los servicios en modo desarrollo
# Usa tmux para crear múltiples terminales

echo "🚀 Iniciando servicios NTT MFE en modo desarrollo..."

# Verificar si tmux está instalado
if ! command -v tmux &> /dev/null; then
    echo "❌ tmux no está instalado. Por favor instálalo primero:"
    echo "   macOS: brew install tmux"
    echo "   Linux: sudo apt-get install tmux"
    exit 1
fi

# Nombre de la sesión de tmux
SESSION="ntt-mfe"

# Matar sesión existente si existe
tmux kill-session -t $SESSION 2>/dev/null

# Crear nueva sesión con API
tmux new-session -d -s $SESSION -n "api" "cd api && npm run start:dev"

# Crear ventanas para cada MFE
tmux new-window -t $SESSION -n "host" "cd host && pnpm start"
tmux new-window -t $SESSION -n "login" "cd login && pnpm start"
tmux new-window -t $SESSION -n "banner" "cd banner && pnpm start"
tmux new-window -t $SESSION -n "members" "cd members && pnpm start"

# Adjuntar a la sesión
echo "✅ Todos los servicios iniciados en tmux"
echo ""
echo "📝 Comandos útiles:"
echo "   - Cambiar entre ventanas: Ctrl+b luego n (next) o p (previous)"
echo "   - Listar ventanas: Ctrl+b luego w"
echo "   - Salir de tmux: Ctrl+b luego d (detach)"
echo "   - Matar sesión: tmux kill-session -t $SESSION"
echo ""
echo "🌐 URLs disponibles:"
echo "   - Host: http://localhost:4200"
echo "   - Login: http://localhost:4201"
echo "   - Banner: http://localhost:4202"
echo "   - Members: http://localhost:4203"
echo "   - API: http://localhost:3001/docs"
echo ""

# Adjuntar a la sesión
tmux attach-session -t $SESSION
