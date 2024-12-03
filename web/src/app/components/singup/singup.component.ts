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
  user = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    pass: '',
  };

  constructor(private authService: AuthService) {}

  register() {
    console.log('llego');
    const { nombre, email, telefono, direccion, pass } = this.user;

    if (nombre && email && telefono && direccion && pass) {
      this.authService.register(nombre, email, telefono, direccion, pass);
    } else {
      alert('Por favor complete todos los campos.');
    }
  }
}
