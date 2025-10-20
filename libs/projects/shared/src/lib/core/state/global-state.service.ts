import { Injectable, signal, computed, effect } from '@angular/core';
import { MemberDto } from '../../code-gen/custom-api/models/MemberDto';

/**
 * Servicio de estado global compartido entre Host y Remotes
 * Usa Signals para reactividad automática
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  /**
   * Member actual autenticado
   */
  private _member = signal<MemberDto | null>(null);
  readonly member = this._member.asReadonly();
  
  constructor() {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('global_member');
      if (raw) {
        try {
          this._member.set(JSON.parse(raw));
        } catch {}
      }
      effect(() => {
        const val = this._member();
        if (val) {
          localStorage.setItem('global_member', JSON.stringify(val));
        } else {
          localStorage.removeItem('global_member');
        }
      });
    }
  }

  /**
   * Indica si hay un member autenticado
   */
  readonly isAuthenticated = computed(() => this._member() !== null);

  /**
   * Nombre del member actual
   */
  readonly memberName = computed(() => this._member()?.['primary-name'] ?? '');

  /**
   * ID del member actual
   */
  readonly memberId = computed(() => this._member()?.id ?? null);

  /**
   * Establecer el member actual
   */
  setMember(member: MemberDto | null): void {
    this._member.set(member);
  }

  /**
   * Limpiar el member (logout)
   */
  clearMember(): void {
    this._member.set(null);
  }

  /**
   * Actualizar parcialmente el member
   */
  updateMember(updates: Partial<MemberDto>): void {
    const currentMember = this._member();
    if (currentMember) {
      this._member.set({ ...currentMember, ...updates });
    }
  }
}
