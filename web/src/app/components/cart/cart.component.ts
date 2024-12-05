import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/products/product.service';
import { CardCartComponent } from '../card-cart/card-cart.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardCartComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  loading: boolean = true;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const cartId = '1'; // Cambia esto a la forma en que obtienes el ID del carrito

    this.cartService.getCartItems().subscribe(
      (items) => {
        const productObservables = items.map((item: any) =>
          this.productService
            .getProductById(item.product_id)
            .toPromise()
            .then((product) => ({
              ...item,
              productDetails: product,
            }))
        );

        forkJoin(productObservables).subscribe(
          (productsWithDetails) => {
            this.cartItems = productsWithDetails;
            this.calculateTotal();
            this.loading = false;
          },
          (error) => {
            console.error('Error al obtener detalles del producto:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los items del carrito:', error);
      }
    );
  }

  onItemDeleted(itemId: string): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId); // Actualizar la lista de ítems
    this.calculateTotal(); // Actualizar el total
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
