import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Applications/services/auth.service';
import { User } from '../../Applications/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (error) => {
          console.error('Error loading user:', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
