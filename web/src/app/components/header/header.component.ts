import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router y ActivatedRoute
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  private authSubscription: Subscription | null = null;
  isLogged: boolean = false;
  searchQuery: string = ''; // Variable para almacenar el valor del input de búsqueda

  constructor(
    private authService: AuthService,
    private router: Router, // Inyecta Router
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authSubscription = this.authService.isLogged$.subscribe((status) => {
      this.isLogged = status;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Cambiar el estado del menú
  }

  logout() {
    this.authService.logout(); // Cerrar sesión
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe(); // Cancelar la suscripción
    }
  }

  // Función para actualizar la URL con el valor del input de búsqueda
  updateUrl(): void {
    if (this.searchQuery) {
      // Navegar a la ruta /products/(searchQuery)
      this.router.navigate([`/products/${this.searchQuery}`]); // Cambia la ruta a /products/valorDelInput
    }
  }
}
