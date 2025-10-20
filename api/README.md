# API (NestJS)
Rol: API de autenticación (login/logout). Emite cookie HttpOnly y valida member en Crossref.

Solución:
- Endpoints: POST /login (valida contra Crossref y setea cookie), POST /logout (clear cookie).
- DTOs tipados (LoginDto, LoginResponseDto, MemberDto).
- Swagger disponible en /docs.

Ejecutar local:
- pnpm install
- pnpm start
- URL: http://localhost:3001
