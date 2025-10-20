# Banner (MFE)

Rol: Componente de bienvenida que refleja estado global (autenticación y nombre) y ofrece CTA.

Solución:
- Contrato compartido `BannerComponentContract` en libs.
- Inyección dinámica desde el host y sincronización reactiva por `effect`.
- Link con contraste accesible.
- Control flow `@if`.

Ejecutar local:
- pnpm install
- pnpm start
