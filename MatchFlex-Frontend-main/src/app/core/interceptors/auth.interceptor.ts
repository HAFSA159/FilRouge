import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the AuthService to get the token
  const authService = inject(AuthService);
  const token = authService.getToken(); // Assuming your AuthService has a method like getToken()

  // If token exists, clone the request and add the Authorization header
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,  // Add the Authorization header
      },
    });
  }

  // Continue with the modified request
  return next(req);
};
