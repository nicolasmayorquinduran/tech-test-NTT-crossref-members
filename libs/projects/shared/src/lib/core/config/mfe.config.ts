/**
 * Tipos compartidos para configuración de Module Federation
 * Solo tipos/interfaces - Las configuraciones específicas están en cada MFE
 */

/**
 * Tipo para la configuración de un microfrontend remoto
 */
export interface MfeRemoteConfig {
  name: string;
  port: number;
  url: string;
  remoteEntry: string;
  exposes: Record<string, string>;
  exposePaths?: Record<string, string>;
}

/**
 * Tipo para la configuración del host
 */
export interface MfeHostConfig {
  name: string;
  port: number;
  url: string;
}

/**
 * Helper para construir configuración de loadRemoteModule
 * 
 * @example
 * ```typescript
 * const config = buildRemoteModuleConfig(
 *   'http://localhost:4201/remoteEntry.js',
 *   './AuthModule'
 * );
 * loadRemoteModule(config).then(m => m.AuthModule)
 * ```
 */
export function buildRemoteModuleConfig(remoteEntry: string, exposedModule: string) {
  return {
    type: 'module' as const,
    remoteEntry,
    exposedModule
  };
}
