# EventBus y Estado Global - Comunicación entre MFEs

Sistema de comunicación Publisher-Subscriber para Module Federation usando RxJS y Signals.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                      HOST                           │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  EventStateBridgeService                     │  │
│  │  - Inicializa listeners                      │  │
│  │  - Conecta EventBus → GlobalState            │  │
│  └──────────────────────────────────────────────┘  │
│                       ↓                             │
│  ┌──────────────────────────────────────────────┐  │
│  │  GlobalStateService (Signals)                │  │
│  │  - user: Signal<UserDto | null>              │  │
│  │  - isAuthenticated: computed                 │  │
│  └──────────────────────────────────────────────┘  │
│                       ↑                             │
│  ┌──────────────────────────────────────────────┐  │
│  │  EventBusService (RxJS Subject)              │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌────────▼──────┐
│  Remote: Login │         │  Remote: ...  │
│                │         │               │
│  EventBus.emit │         │  EventBus.on  │
│  (USER_LOGGED_IN)        │               │
└────────────────┘         └───────────────┘
```

## 📦 Componentes

### 1. EventBusService
Sistema de eventos centralizado usando RxJS Subject.

**Métodos:**
- `emit<T>(type: string, payload: T)` - Emitir evento
- `on<T>(eventType: string): Observable<T>` - Escuchar eventos específicos
- `all(): Observable<AppEvent>` - Escuchar todos los eventos

### 2. EventTypes
Catálogo de eventos disponibles y sus payloads tipados.

**Eventos disponibles:**
- `USER_LOGGED_IN` - Payload: `UserDto`
- `USER_LOGGED_OUT` - Payload: `void`

### 3. GlobalStateService
Estado global usando Signals de Angular.

**Propiedades:**
- `user` - ReadonlySignal<UserDto | null>
- `isAuthenticated` - computed signal
- `userName` - computed signal

**Métodos:**
- `setUser(user: UserDto | null)`
- `clearUser()`
- `updateUser(updates: Partial<UserDto>)`

### 4. EventStateBridgeService
Conecta EventBus con GlobalState (solo en HOST).

## 🚀 Uso en el HOST

### Paso 1: Inicializar en AppComponent

```typescript
// host/src/app/app.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { EventStateBridgeService, GlobalStateService } from 'shared';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Mi Aplicación</h1>
      @if (globalState.isAuthenticated()) {
        <div class="user-info">
          <span>Bienvenido, {{ globalState.userName() }}</span>
          <button (click)="logout()">Cerrar Sesión</button>
        </div>
      }
    </header>
    
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent implements OnInit {
  private readonly eventStateBridge = inject(EventStateBridgeService);
  protected readonly globalState = inject(GlobalStateService);

  ngOnInit(): void {
    // IMPORTANTE: Inicializar el puente de eventos
    this.eventStateBridge.initialize();
  }

  logout(): void {
    // Emitir evento de logout
    // O llamar al servicio de logout del remote
  }
}
```

### Paso 2: Consumir el Estado Global en cualquier componente

```typescript
// host/src/app/dashboard/dashboard.component.ts
import { Component, inject, effect } from '@angular/core';
import { GlobalStateService } from 'shared';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      @if (globalState.isAuthenticated()) {
        <h2>Dashboard de {{ globalState.userName() }}</h2>
        <p>Email: {{ globalState.user()?.email }}</p>
      } @else {
        <p>No estás autenticado</p>
      }
    </div>
  `
})
export class DashboardComponent {
  protected readonly globalState = inject(GlobalStateService);

  constructor() {
    // Reaccionar a cambios del usuario
    effect(() => {
      const user = this.globalState.user();
      if (user) {
        console.log('Usuario cambió:', user);
        // Hacer algo cuando el usuario cambia
      }
    });
  }
}
```

## 🔌 Uso en Remote MFEs

### Emitir eventos (Login Remote)

```typescript
// login/src/app/auth/components/login-form.component.ts
import { Component, inject } from '@angular/core';
import { EventBusService, EventTypes } from 'shared';

export class LoginFormComponent {
  private readonly eventBus = inject(EventBusService);

  onLoginSuccess(response: LoginResponseDto): void {
    // Emitir evento para que el Host lo escuche
    this.eventBus.emit(EventTypes.USER_LOGGED_IN, response.user);
    
    console.log('Evento USER_LOGGED_IN emitido');
  }
}
```

### Escuchar eventos (cualquier Remote)

```typescript
// otro-remote/src/app/some.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { EventBusService, EventTypes } from 'shared';

export class SomeComponent implements OnInit {
  private readonly eventBus = inject(EventBusService);

  ngOnInit(): void {
    // Escuchar cuando un usuario hace login
    this.eventBus.on(EventTypes.USER_LOGGED_IN).subscribe(user => {
      console.log('Usuario logueado desde otro MFE:', user);
    });
  }
}
```

## ➕ Agregar nuevos eventos

### 1. Definir el evento en EventTypes

```typescript
// shared/src/lib/core/events/event-types.ts
export const EventTypes = {
  USER_LOGGED_IN: 'user.logged_in',
  USER_LOGGED_OUT: 'user.logged_out',
  
  // Nuevo evento
  CART_UPDATED: 'cart.updated',
} as const;

export interface EventPayloads {
  [EventTypes.USER_LOGGED_IN]: UserDto;
  [EventTypes.USER_LOGGED_OUT]: void;
  
  // Payload del nuevo evento
  [EventTypes.CART_UPDATED]: { items: CartItem[]; total: number };
}
```

### 2. (Opcional) Agregar listener en EventStateBridge

```typescript
// shared/src/lib/core/events/event-state-bridge.service.ts
initialize(): void {
  // ... listeners existentes
  
  // Nuevo listener
  this.eventBus.on(EventTypes.CART_UPDATED).subscribe(cart => {
    // Actualizar estado global del carrito
  });
}
```

### 3. Emitir desde cualquier MFE

```typescript
this.eventBus.emit(EventTypes.CART_UPDATED, {
  items: [...],
  total: 150.00
});
```

## ✅ Ventajas de esta Arquitectura

- ✅ **Tipado fuerte** - TypeScript garantiza tipos correctos
- ✅ **Desacoplamiento** - Remotes no conocen al Host directamente
- ✅ **Reactividad** - Signals actualizan automáticamente la UI
- ✅ **Escalable** - Fácil agregar nuevos eventos
- ✅ **Testeable** - Servicios inyectables fáciles de mockear
- ✅ **Debugging** - Logs centralizados en EventStateBridge

## 🔍 Debugging

Para ver todos los eventos que pasan por el EventBus:

```typescript
// En el HOST
eventBus.all().subscribe(event => {
  console.log('[EventBus]', event.type, event.payload);
});
```

## ⚠️ Consideraciones

1. **EventStateBridge solo en HOST** - No inicializar en remotes
2. **Nombres únicos** - Usar namespace en eventos (ej: `cart.updated`)
3. **Payloads serializables** - No enviar clases, solo objetos planos
4. **Limpieza de suscripciones** - Usar `takeUntilDestroyed()` en componentes
