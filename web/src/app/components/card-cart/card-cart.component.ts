import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.scss',
})
export class CardCartComponent {
  @Input() product: any; // Detalles del producto
  @Input() quantity: number = 1; // Cantidad del producto
  @Input() item: any;

  constructor(private cartService: CartService) {}

  deleteItem(item: any): void {
    const id = item.id;
    this.cartService.deleteFromCart(id).subscribe(
      (response) => {
        console.log('Producto eliminado al carrito:', response);
      },
      (error) => {
        console.error(
          'Error en la tarjeta al eliminar producto al carrito:',
          error
        );
      }
    );
  }
}
