import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-admin.component.html',
  styleUrl: './input-admin.component.scss',
})
export class InputAdminComponent {
  searchQuery: string = '';

  constructor(
    private router: Router // Inyecta Router
  ) {}
  // Función para actualizar la URL con el valor del input de búsqueda
  updateUrl(): void {
    if (this.searchQuery) {
      // Navegar a la ruta /products con el parámetro query `nombre`
      this.router.navigate(['/category-list'], {
        queryParams: { nombre: this.searchQuery },
      });
    }
  }
}
