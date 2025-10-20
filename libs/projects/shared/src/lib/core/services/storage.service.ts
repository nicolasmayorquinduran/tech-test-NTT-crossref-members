import { Injectable } from '@angular/core';
import { StorageKey } from '../enums/storage-key.enum';

/**
 * Servicio interno para gestionar localStorage.
 * No se exporta en el public-api de la librería.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get<T>(key: StorageKey): T | undefined {
    if (typeof localStorage === 'undefined') return undefined;
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  }

  set<T>(key: StorageKey, value: T): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: StorageKey): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.clear();
  }
}
