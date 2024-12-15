import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-recovery-pass',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recovery-pass.component.html',
  styleUrl: './recovery-pass.component.scss',
})
export class RecoveryPassComponent {
  email: string = ''; // Correo electrónico ingresado por el usuario
  message: string = ''; // Mensaje de éxito
  error: string = ''; // Mensaje de error

  constructor(private authService: AuthService) {}

  /**
   * Llamada al servicio para recuperar contraseña
   */
  onRecoverPassword(): void {
    if (!this.email) {
      this.error = 'Por favor, ingresa un correo válido.';
      this.message = '';
      return;
    }

    this.authService.recoverPassword(this.email).subscribe(
      (response) => {
        this.message = response.message; // Mensaje del backend
        this.error = ''; // Limpia mensajes de error
      },
      (err) => {
        this.error =
          err.error.message ||
          'Hubo un error al intentar recuperar la contraseña.';
        this.message = ''; // Limpia mensajes de éxito
      }
    );
  }
}
