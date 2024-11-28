import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/products/product.service';
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

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const cartId = '1'; // ID del carrito (puedes obtenerlo dinámicamente)

    this.cartService.getCartItems(cartId).subscribe(
      (items) => {
        this.cartItems = [];

        // Para cada ítem, obtener los detalles del producto
        items.forEach((item: any) => {
          this.productService.getProductById(item.product_id).subscribe(
            (product) => {
              this.cartItems.push({
                ...item,
                productDetails: product, // Añadir detalles del producto al ítem
              });
            },
            (error) => {
              console.error(
                `Error al obtener detalles del producto con ID ${item.product_id}:`,
                error
              );
            }
          );
        });
      },
      (error) => {
        console.error('Error al obtener los items del carrito:', error);
      }
    );
  }
}
