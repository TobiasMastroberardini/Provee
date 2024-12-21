import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for two-way data binding
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el registro del usuario
  register() {
    const user = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion,
      password: this.password,
    };
    this.authService.register(user).subscribe((data) => {
      this.authService.setToken(data.token);
    });
    this.router.navigateByUrl('/login');
  }
}
