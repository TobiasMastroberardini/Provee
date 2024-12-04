import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for two-way data binding
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent {
  // Propiedades para almacenar los datos del formulario
  nombre = '';
  email = '';
  telefono = '';
  direccion = '';
  password = '';

  constructor(private authService: AuthService) {}

  // Método para manejar el registro del usuario
  onRegister() {
    this.authService
      .register(
        this.nombre,
        this.email,
        this.telefono,
        this.direccion,
        this.password
      )
      .subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          // Aquí puedes manejar una redirección o mostrar un mensaje
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        },
      });
  }
}
