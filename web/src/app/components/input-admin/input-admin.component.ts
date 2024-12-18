import { Component, Input } from '@angular/core';
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
  @Input() search: string = '';
  constructor(
    private router: Router // Inyecta Router
  ) {}
  // Función para actualizar la URL con el valor del input de búsqueda
  updateUrl(): void {
    if (this.searchQuery) {
      console.log('esta es: ', this.search);
      // Navegar a la ruta /products con el parámetro query `nombre`
      this.router.navigate([this.search], {
        queryParams: { nombre: this.searchQuery },
      });
    }
  }
}
