import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss'],
})
export class CardCartComponent {
  @Input() product: any; // Detalles del producto
  @Input() quantity: number = 1; // Cantidad del producto
  @Input() item: any; // Ítem del carrito que incluye detalles del producto
  @Output() itemDeleted: EventEmitter<string> = new EventEmitter(); // Evento para notificar al componente padre

  constructor(private cartService: CartService) {}

  deleteItem(item: any): void {
    const itemId = item.id;

    // Eliminar el ítem del carrito
    this.cartService.deleteFromCart(item.cart_id, itemId).subscribe(
      (response) => {
        console.log('Producto eliminado del carrito:', response);
        this.itemDeleted.emit(itemId); // Emitir el ID del ítem eliminado al componente padre
      },
      (error) => {
        console.error('Error al eliminar el producto del carrito:', error);
      }
    );
  }
}
