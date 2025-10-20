# Host
Rol: Shell anfitrión que orquesta MFEs (login, banner, members) con Module Federation.

Solución:
- Angular + Module Federation (ngx-build-plus) para cargar remotos.
- Estado compartido con GlobalStateService (signals) y EventBus para login/logout.
- HostBannerShellComponent crea el componente remoto y sincroniza inputs con effect.
- Plantillas con nuevo control flow @if.
- Estilos globales para el navbar y botón de “Cerrar sesión”.

Ejecutar local:
- pnpm install
- pnpm run:all  # levanta host y remotos si están configurados
# o pnpm start sólo para el host (requiere remotos corriendo)

URLs:
- Host: http://localhost:4200
- API: http://localhost:3001
- Login: http://localhost:4201
- Banner: http://localhost:4202
- Members: http://localhost:4203
