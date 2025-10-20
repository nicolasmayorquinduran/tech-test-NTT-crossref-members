# Shared Libs

Rol: Librería compartida (EventBus, GlobalState, contratos, guards, servicios HTTP/Auth, tokens de configuración).

Solución:
- API limpia con JSDoc (inglés), sin comentarios inline.
- Tokens de configuración (`API_CONFIG`, `AUTH_CONFIG`, `APP_CONFIG`).
- Contratos y tipos compartidos para MFEs.

Uso:
- Importar `shared` desde cada MFE (paths configurados en tsconfig).
- Actualizar y reconstruir al cambiar contratos/servicios: `pnpm build` (en libs).
