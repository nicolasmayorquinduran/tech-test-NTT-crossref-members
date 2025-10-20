import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Evento base para el EventBus
 */
export interface AppEvent<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

/**
 * EventBus centralizado para comunicación entre MFEs
 * 
 * Uso:
 * - Remote MFE: emite eventos con eventBus.emit()
 * - Host: escucha eventos con eventBus.on()
 */
@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new Subject<AppEvent>();

  /**
   * Emitir un evento al bus
   */
  emit<T>(type: string, payload: T): void {
    const event: AppEvent<T> = {
      type,
      payload,
      timestamp: Date.now()
    };
    this.eventSubject.next(event);
  }

  /**
   * Escuchar eventos de un tipo específico
   */
  on<T>(eventType: string): Observable<T> {
    return this.eventSubject.asObservable().pipe(
      filter(event => event.type === eventType),
      map(event => event.payload as T)
    );
  }

  /**
   * Escuchar todos los eventos
   */
  all(): Observable<AppEvent> {
    return this.eventSubject.asObservable();
  }
}
