import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { GlobalStateService } from '../../core/state/global-state.service';

/**
 * Guard that protects routes by verifying user authentication.
 */
export const authGuard: CanActivateFn = () => {
  const globalState = inject(GlobalStateService);
  const router = inject(Router);
  
  if (globalState.isAuthenticated()) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};
