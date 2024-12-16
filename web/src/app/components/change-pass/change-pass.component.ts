import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss',
})
export class ChangePassComponent {
  passwordForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private passwordService: AuthService) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[A-Z])/), // Al menos una mayúscula
          Validators.pattern(/(?=.*[0-9])/), // Al menos un número
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  // Verifica que las contraseñas coincidan
  passwordsMatch(): boolean {
    const { newPassword, confirmPassword } = this.passwordForm.value;
    return newPassword === confirmPassword;
  }

  // Enviar el formulario
  onSubmit() {
    if (!this.passwordsMatch()) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.passwordService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        alert('Contraseña cambiada con éxito.');
        this.passwordForm.reset();
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Error al cambiar la contraseña.';
      },
    });
  }

  // Limpiar el formulario
  clearForm() {
    this.passwordForm.reset();
    this.errorMessage = null;
  }
}
