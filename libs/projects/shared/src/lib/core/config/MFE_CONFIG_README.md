# Module Federation - Configuración Centralizada (Shared Library)

La configuración de Module Federation está centralizada en la librería `shared` para que sea accesible tanto por `host` como por `login` y cualquier otro MFE.

## 📁 Archivos

### `mfe.config.js` (JavaScript)
Configuración para webpack configs. JavaScript puro para compatibilidad con webpack.

### `mfe.config.ts` (TypeScript)
Wrapper con type safety para uso en código Angular (routing, componentes, servicios).

## ✅ Beneficios

- **Acceso unificado**: Tanto `host` como `login` usan la misma fuente
- **Type safety**: Helper TypeScript con autocompletado
- **Versionado**: La configuración viaja con la librería shared
- **Sin duplicación**: Single source of truth
- **Refactoring seguro**: Cambios se propagan automáticamente

## 🔧 Uso

### En Webpack Configs (JavaScript)

```javascript
// En login/webpack.config.js o host/webpack.config.js
const MFE_CONFIG = require('../libs/projects/shared/src/lib/core/config/mfe.config.js');

// Usar la configuración
name: MFE_CONFIG.login.name,
exposes: { ... }
```

### En Código Angular (TypeScript)

```typescript
// En cualquier archivo TypeScript de host o login
import { getRemoteModuleConfig, MFE_CONFIG } from 'shared';

// En routing
loadRemoteModule(
  getRemoteModuleConfig('login', 'AuthModule')
).then(m => m.AuthModule)

// Acceso directo a configuración
console.log(MFE_CONFIG.login.url); // 'http://localhost:4201'
```

## 📝 Agregar un Nuevo MFE

1. **Editar `/libs/projects/shared/src/lib/core/config/mfe.config.js`**:

```javascript
const MFE_CONFIG = {
  // ... existentes
  
  nuevoMfe: {
    name: 'mfNuevo',
    port: 4202,
    url: 'http://localhost:4202',
    exposes: {
      MiModulo: './MiModulo'
    },
    exposePaths: {
      MiModulo: './src/app/mi-modulo/mi-modulo.module.ts'
    }
  }
};

MFE_CONFIG.nuevoMfe.remoteEntry = `${MFE_CONFIG.nuevoMfe.url}/remoteEntry.js`;
```

2. **Actualizar tipos en `mfe.config.ts`** (opcional para mejor autocomplete):

```typescript
export function getRemoteModuleConfig(
  mfe: keyof Pick<typeof MFE_CONFIG, 'login' | 'nuevoMfe'>, // Agregar aquí
  exposedModule: ...
)
```

3. **Usar en routing**:

```typescript
import { getRemoteModuleConfig } from 'shared';

loadRemoteModule(
  getRemoteModuleConfig('nuevoMfe', 'MiModulo')
)
```

## 🚀 Reiniciar después de cambios

Después de modificar `mfe.config.js`, reinicia los servidores:

```bash
# Detener todos los servidores (Ctrl+C)
# Reiniciar desde host
cd host
pnpm run:all
```

## 📦 Estructura

```
/libs/projects/shared/src/lib/core/config/
  ├── mfe.config.js          # Configuración JS (para webpack)
  ├── mfe.config.ts          # Wrapper TS (para Angular)
  └── MFE_CONFIG_README.md   # Esta documentación

/host/
  ├── webpack.config.js      # Importa desde shared
  └── src/app/
      └── app-routing-module.ts  # import { ... } from 'shared'

/login/
  └── webpack.config.js      # Importa desde shared
```

## 🎯 Exportación

La configuración se exporta automáticamente desde `shared`:

```typescript
// En public-api.ts
export * from './lib/core/config/mfe.config';
```

Por eso puedes hacer:
```typescript
import { getRemoteModuleConfig, MFE_CONFIG } from 'shared';
```
