import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product: any; // Recibe los datos del producto desde el padre
  private cartId = '1'; // ID del carrito, puedes obtenerlo dinámicamente según tu aplicación

  constructor(private cartService: CartService) {}

  addProductToCart(product: any): void {
    const cartId = 1; // ID del carrito (puedes obtenerlo dinámicamente si es necesario)
    const quantity = 1; // Cantidad predeterminada
    const price = product.precio; // Precio del producto (asegúrate de que exista en los datos)
    const name = product.nombre;
    const id = product.id;

    this.cartService.addToCart(cartId, id, quantity, price, name).subscribe(
      (response) => {
        console.log('Producto agregado al carrito:', response);
      },
      (error) => {
        console.error(
          'Error en la tarjeta al agregar producto al carrito:',
          error
        );
      }
    );
  }
}
