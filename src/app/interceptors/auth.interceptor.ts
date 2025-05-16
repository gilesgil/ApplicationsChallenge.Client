import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../Applications/services/auth.service';

// Functional interceptor for standalone applications
export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the token
  const token = authService.getToken();

  // Clone the request and add the token if available
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Handle the request and catch errors
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401 Unauthorized, redirect to login
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}

// Keep the class-based interceptor for compatibility with the module-based approach
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the token
    const token = this.authService.getToken();

    // Clone the request and add the token if available
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle the request and catch errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // If 401 Unauthorized, redirect to login
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
