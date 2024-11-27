import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CardCartComponent } from '../card-cart/card-cart.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardCartComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Aquí se almacenarán los items del carrito

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cartId = '1'; // ID del carrito (puedes obtenerlo dinámicamente)
    this.cartService.getCartItems(cartId).subscribe(
      (data) => {
        this.cartItems = data;
        console.log('Items del carrito:', this.cartItems);
      },
      (error) => {
        console.error('Error al obtener los items del carrito:', error);
      }
    );
  }
}
