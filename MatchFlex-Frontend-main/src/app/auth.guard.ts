import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // If already logged in and trying to access login, redirect to home
    if (state.url === '/login') {
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  return false; // Not authenticated, block access
};
