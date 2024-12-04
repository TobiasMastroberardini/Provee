import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response) {
          console.log('Login exitoso', response);

          // Almacena el token en localStorage
          localStorage.setItem('authToken', response.token);

          // Inicializa el usuario en el servicio de autenticación
          this.authService.initializeUser();

          // Redirige a la página principal
          this.router.navigate(['/home']);
          this.alertService.showAlert('Has iniciado sesión exitosamente');
        }
      },
      error: (error) => {
        console.error('Error en el login', error);
        this.alertService.showAlert('Hubo un problema al iniciar sesión');
      },
    });
  }
}
