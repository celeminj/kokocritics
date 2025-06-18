import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/User';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass ,NgIf,CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {} as User;

  avatarFile?: File; // aquí guardamos el archivo seleccionado

  @ViewChild('username') username!: NgModel;
  @ViewChild('email') email!: NgModel;
  @ViewChild('password') password!: NgModel;
  // NO uses ViewChild para avatarUrl porque no es NgModel
  errorMessage: any;
  emailDuplicated: boolean = false; // para manejar el error de email duplicado

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.avatarFile = file;
    }
  }

  registrarUser() {
    this.emailDuplicated = false; 
    // Validar campos antes de continuar
    this.username.control.markAsTouched();
    this.email.control.markAsTouched();
    this.password.control.markAsTouched();
    if (!this.avatarFile) {
      this.errorMessage = 'La imagen de perfil es obligatoria.';
      return;
    }

    if (this.username.invalid || this.email.invalid || this.password.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('avatarUrl', this.avatarFile!);  

    this.userService.register(formData).subscribe({
      next: data => {
        console.log('Registro correcto', data);
           localStorage.setItem('AvatarUrl', 'http://localhost:8000' + data.avatarUrl);
          localStorage.setItem('username', data.username);
        this.router.navigate(['/login']);
      },
      error: e => {
        console.error('Error en el registro', e);
        if (e.status === 400 && e.error.field === 'email') {
          this.emailDuplicated = true;
          this.errorMessage = e.error.message;
        }

         if (e.status === 409) {
          this.errorMessage = 'El nombre de usuario o el correo electrónico ya están en uso.';
        }
         if (e.status === 500) {
          this.errorMessage = 'Error interno del servidor. Por favor, inténtalo más tarde.';
        }
        this.errorMessage = e.error.message || 'Error en el registro';
      }
    });
  }
}

