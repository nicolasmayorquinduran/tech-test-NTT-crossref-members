import { InjectionToken } from '@angular/core';

/**
 * Interfaz para la configuración de la API
 */
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
}

/**
 * Interfaz para la configuración de autenticación
 */
export interface AuthConfig {
  loginEndpoint?: string;
  logoutEndpoint?: string;
  tokenKey?: string;
}

/**
 * Interfaz para la configuración general de la aplicación
 */
export interface AppConfig {
  production: boolean;
  appName: string;
  version?: string;
}

/**
 * Token de inyección para la configuración de la API
 * Las aplicaciones deben proveer este valor
 * 
 * Ejemplo de uso:
 * providers: [
 *   { provide: API_CONFIG, useValue: { baseUrl: 'http://localhost:3001' } }
 * ]
 */
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    baseUrl: 'http://localhost:3000', 
    timeout: 30000
  })
});

/**
 * Token de inyección para la configuración de autenticación
 */
export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    loginEndpoint: '/login',
    logoutEndpoint: '/logout',
    tokenKey: 'auth_token'
  })
});

/**
 * Token de inyección para la configuración general de la aplicación
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    production: false,
    appName: 'App'
  })
});

/**
 * Configuraciones por defecto para desarrollo
 * Reutilizables por todas las aplicaciones del monorepo
 */
export const DEFAULT_DEV_API_CONFIG: ApiConfig = {
  baseUrl: 'http://localhost:3001',
  timeout: 30000
};

export const DEFAULT_AUTH_CONFIG: AuthConfig = {
  loginEndpoint: '/login',
  logoutEndpoint: '/logout',
  tokenKey: 'auth_token'
};

/**
 * Configuraciones por defecto para producción
 */
export const DEFAULT_PROD_API_CONFIG: ApiConfig = {
  baseUrl: 'https://api.production.com',
  timeout: 30000
};

/**
 * Helper para crear configuración de app con valores por defecto
 */
export function createAppConfig(appName: string, production: boolean, version = '1.0.0'): AppConfig {
  return {
    production,
    appName,
    version
  };
}

/**
 * Variables de entorno centralizadas para MFEs
 * Configuración de URLs y puertos para desarrollo y producción
 */

// Desarrollo
export const MFE_ENV = {
  development: {
    host: {
      url: 'http://localhost:4200',
      port: 4200
    },
    login: {
      url: 'http://localhost:4201',
      port: 4201
    },
    banner: {
      url: 'http://localhost:4202',
      port: 4202
    },
    members: {
      url: 'http://localhost:4203',
      port: 4203
    }
  },
  production: {
    host: {
      url: 'https://host.production.com',
      port: 443
    },
    login: {
      url: 'https://login.production.com',
      port: 443
    },
    banner: {
      url: 'https://banner.production.com',
      port: 443
    },
    members: {
      url: 'https://members.production.com',
      port: 443
    }
  }
};

/**
 * Helper para obtener las variables de entorno según el ambiente
 */
export function getMfeEnv(production: boolean = false) {
  return production ? MFE_ENV.production : MFE_ENV.development;
}

/**
 * Helper para construir remoteEntry URL
 */
export function buildRemoteEntryUrl(mfeUrl: string): string {
  return `${mfeUrl}/remoteEntry.js`;
}
