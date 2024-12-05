import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';

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

  constructor(private cartService: CartService, private cart: CartComponent) {}

  incrementQuantity(item: any): void {
    item.quantity++; // Incrementa la cantidad en el objeto
    this.updateItemQuantity(item); // Actualiza la cantidad en el servicio
    this.cart.calculateTotal();
  }

  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      // Evitar que la cantidad sea menor que 1
      item.quantity--; // Decrementa la cantidad en el objeto
      this.updateItemQuantity(item); // Actualiza la cantidad en el servicio
      this.cart.calculateTotal();
    }
  }

  updateQuantity(item: any, event: Event): void {
    // Verifica que event.target no sea null y es del tipo HTMLInputElement
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.value) {
      // Verificamos que inputElement y inputElement.value sean válidos
      const quantity = parseInt(inputElement.value, 10);

      if (quantity > 0) {
        item.quantity = quantity; // Actualiza la cantidad en el objeto
        this.updateItemQuantity(item); // Llama al método para actualizar en el servicio
      }
    }
  }

  updateItemQuantity(item: any): void {
    this.cartService
      .updateQuantity(item.id, item.quantity)
      .subscribe((response) => {
        if (response) {
          console.log('Cantidad actualizada en el servicio:', response);
        } else {
          console.error('Error al actualizar la cantidad');
        }
      });
  }

  deleteItem(item: any): void {
    const itemId = item.id;

    // Eliminar el ítem del carrito
    this.cartService.deleteFromCart(itemId).subscribe(
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
