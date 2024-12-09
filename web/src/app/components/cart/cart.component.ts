import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { PaymentService } from '../../services/payment/payment.service';
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
    private productService: ProductService,
    private http: HttpClient,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
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

  proceedToPayment() {
    this.cartService.createPayment().subscribe(
      (response) => {
        window.location.href = response.init_point; // Redirige a la URL de Mercado Pago
      },
      (error) => {
        console.error('Error al crear el pago:', error);
        // Manejo de errores apropiado para el usuario
      }
    );
  }
}
