import { Injectable, inject } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { EventTypes } from './event-types';
import { GlobalStateService } from '../state/global-state.service';
import { MemberDto } from '../../code-gen/custom-api/models/MemberDto';

/**
 * Servicio puente entre EventBus y GlobalState
 * Escucha eventos del bus y actualiza el estado global
 * 
 * IMPORTANTE: Solo debe inicializarse en el HOST
 */
@Injectable({
  providedIn: 'root'
})
export class EventStateBridgeService {
  private readonly eventBus = inject(EventBusService);
  private readonly globalState = inject(GlobalStateService);

  /**
   * Inicializar listeners de eventos
   * Llamar esto SOLO en el AppComponent del HOST
   */
  initialize(): void {
    // Escuchar login exitoso
    this.eventBus.on<MemberDto>(EventTypes.MEMBER_LOGGED_IN).subscribe(member => {
      console.log('[EventStateBridge] Member logueado:', member);
      this.globalState.setMember(member);
    });

    // Escuchar logout
    this.eventBus.on(EventTypes.MEMBER_LOGGED_OUT).subscribe(() => {
      console.log('[EventStateBridge] Member deslogueado');
      this.globalState.clearMember();
    });

    console.log('[EventStateBridge] Inicializado correctamente');
  }
}
