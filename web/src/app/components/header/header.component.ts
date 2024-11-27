import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class HeaderComponent {
  isMenuOpen = false; // Estado del menú

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Cambiar el estado del menú
  }
}
