import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class NavbarComponent {
  constructor(private router: Router) {}
baseUrl = 'https://localhost:44375';
  
    getAvatarUrl(): string {
      const avatar = localStorage.getItem('AvatarUrl');
      if (!avatar) return 'icons/ps2.svg'; // avatar por defecto

      // Si la URL no empieza por http, la concatenamos
      if (!avatar.startsWith('https')) {
        return this.baseUrl + avatar;
      }
      return avatar;
    }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    localStorage.removeItem('AvatarUrl');
    this.router.navigate(['/login']);
  }
}
