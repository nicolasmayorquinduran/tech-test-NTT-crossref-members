# Configuración de la Librería Shared

La librería **shared** expone tokens de inyección que permiten a las aplicaciones proporcionar sus propios valores de configuración.

## Tokens Disponibles

### 1. API_CONFIG
Configuración para las peticiones HTTP.

```typescript
interface ApiConfig {
  baseUrl: string;      // URL base de la API
  timeout?: number;     // Timeout en milisegundos (default: 30000)
}
```

### 2. AUTH_CONFIG
Configuración para autenticación.

```typescript
interface AuthConfig {
  loginEndpoint?: string;   // Endpoint de login (default: '/login')
  logoutEndpoint?: string;  // Endpoint de logout (default: '/logout')
  tokenKey?: string;        // Nombre de la cookie/token (default: 'auth_token')
}
```

### 3. APP_CONFIG
Configuración general de la aplicación.

```typescript
interface AppConfig {
  production: boolean;  // Modo producción
  appName: string;      // Nombre de la aplicación
  version?: string;     // Versión de la aplicación
}
```

## Cómo Usar

### Paso 1: Crear archivo de configuración

Crea `src/environments/environment.ts`:

```typescript
import { ApiConfig, AuthConfig, AppConfig } from 'shared';

export const apiConfig: ApiConfig = {
  baseUrl: 'http://localhost:3001',
  timeout: 30000
};

export const authConfig: AuthConfig = {
  loginEndpoint: '/login',
  logoutEndpoint: '/logout',
  tokenKey: 'auth_token'
};

export const appConfig: AppConfig = {
  production: false,
  appName: 'Mi App',
  version: '1.0.0'
};
```

### Paso 2: Proveer configuración en el módulo

En tu `app.module.ts`:

```typescript
import { API_CONFIG, AUTH_CONFIG, APP_CONFIG } from 'shared';
import { apiConfig, authConfig, appConfig } from '../environments/environment';

@NgModule({
  // ...
  providers: [
    { provide: API_CONFIG, useValue: apiConfig },
    { provide: AUTH_CONFIG, useValue: authConfig },
    { provide: APP_CONFIG, useValue: appConfig }
  ]
})
export class AppModule { }
```

### Paso 3: Usar HttpService

El `HttpService` ahora construye automáticamente las URLs usando `baseUrl`:

```typescript
import { HttpService } from 'shared';

export class MiServicio {
  private http = inject(HttpService);

  obtenerDatos() {
    // Esto hará una petición a: http://localhost:3001/api/datos
    return this.http.get('/api/datos');
  }

  // También puedes usar URLs completas si es necesario
  obtenerExterno() {
    return this.http.get('https://api.externa.com/datos');
  }
}
```

## Características

- ✅ **Tipado fuerte**: TypeScript garantiza tipos correctos
- ✅ **Valores por defecto**: Cada token tiene valores razonables por defecto
- ✅ **Flexible**: Puedes sobrescribir solo lo que necesites
- ✅ **Testeable**: Fácil hacer mock en tests
- ✅ **Multi-ambiente**: Diferentes configuraciones para dev/prod

## Ejemplo Completo

```typescript
// environment.ts (desarrollo)
export const apiConfig: ApiConfig = {
  baseUrl: 'http://localhost:3001',
  timeout: 30000
};

// environment.prod.ts (producción)
export const apiConfig: ApiConfig = {
  baseUrl: 'https://api.miapp.com',
  timeout: 30000
};
```

Luego en `angular.json`, configura el reemplazo de archivos:

```json
{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}
```
