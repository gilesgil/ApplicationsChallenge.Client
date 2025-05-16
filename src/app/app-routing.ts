import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ApplicationsListComponent } from './Applications/Pages/applications-list/applications-list.component';
import { inject } from '@angular/core';
import { AuthService } from './Applications/services/auth.service';
import { Router } from '@angular/router';

// Auth guard function
const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'applications',
    component: ApplicationsListComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/applications', pathMatch: 'full' },
  { path: '**', redirectTo: '/applications' }
];
