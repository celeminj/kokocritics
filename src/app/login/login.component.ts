import { Component, ViewChild } from '@angular/core';
import User from '../models/User';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { LoginRequest, LoginResponse } from '../auth/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  baseUrl = 'https://localhost:44375';
  avatarPath: string = '';

  user: LoginRequest = { username: '', password: '' };
  @ViewChild('username') username!: NgModel;
  @ViewChild('password') password!: NgModel;

  errorMessage: string | null = null;

  constructor(
    public authUserService: AuthService,
    private router: Router
  ) {}

  setAvatar(path: string) {
    this.avatarPath = path;
  }

  get fullAvatarUrl(): string {
    if (!this.avatarPath) {
      return 'img/favicon.ico'; // imagen por defecto
    }
    return `${this.baseUrl}${this.avatarPath}`;
  }

  loginUser() {
    this.username.control.markAsTouched();
    this.password.control.markAsTouched();

    if (this.username.invalid || this.password.invalid) {
      return;
    }

    this.loginUserDTO();
  }

  private loginUserDTO() {
    this.authUserService.login(this.user).subscribe({
      next: (data: LoginResponse) => {
        console.log('Inicio de sesión', data);

        this.setAvatar(data.user.avatarUrl || '');

        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('username', data.name);
        localStorage.setItem('AvatarUrl', this.fullAvatarUrl);

        this.router.navigate(['/']);
      },
      error: (e) => {
        // manejo de errores aquí si quieres
      }
    });
  }
}

