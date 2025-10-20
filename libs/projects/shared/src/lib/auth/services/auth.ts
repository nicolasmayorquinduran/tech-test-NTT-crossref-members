import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginDto } from '../../code-gen/custom-api/models/LoginDto';
import { LoginResponseDto } from '../../code-gen/custom-api/models/LoginResponseDto';
import { EventBusService } from '../../core/events/event-bus.service';
import { EventTypes } from '../../core/events/event-types';
import { GlobalStateService } from '../../core/state/global-state.service';
import { LogoutResponseDto } from '../../code-gen/custom-api/models/LogoutResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly eventBus = inject(EventBusService);
  private readonly globalState = inject(GlobalStateService);
  private readonly apiUrl = 'http://localhost:3001';

  /**
   * Performs login and persists user data via events.
   */
  login(credentials: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.ok && response.member) {
          this.eventBus.emit(EventTypes.MEMBER_LOGGED_IN, response.member as any);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Performs logout and clears user data via events.
   */
  logout(): void {
    this.http
      .post<LogoutResponseDto>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.eventBus.emit<void>(EventTypes.MEMBER_LOGGED_OUT, undefined as void);
        }),
        catchError(() => {
          this.eventBus.emit<void>(EventTypes.MEMBER_LOGGED_OUT, undefined as void);
          return of({ ok: false, message: 'logout error' } as unknown as LogoutResponseDto);
        })
      )
      .subscribe();
  }

  /**
   * Returns whether the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this.globalState.isAuthenticated();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Login failed';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
