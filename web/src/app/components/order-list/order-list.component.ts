import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  orders: any[] = []; // Usar `any` para las órdenes
  loading: boolean = true;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  private authSubscription: Subscription | null = null;

  constructor(
    private orderService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLogged$.subscribe((status) => {
      this.isLogged = status;
      this.setIsAdmin();
    });
  }

  setIsAdmin(): void {
    if (this.isLogged) {
      this.authService.isAdmin().subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
        console.log('Evaluado isAdmin:', isAdmin, this.isAdmin);

        // Cargar órdenes después de evaluar si es admin
        if (this.isAdmin) {
          this.loadOrders();
        } else {
          this.loadOrdersByUser();
        }
      });
    } else {
      this.isAdmin = false;
    }
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: any[]) => {
        this.orders = data.map((order) => ({
          ...order,
          items: [], // Inicializamos el array de items
        }));
        this.loading = false;

        // Ahora obtenemos los items para cada orden
        this.orders.forEach((order) => {
          this.orderService.getOrderItems(order.id).subscribe(
            (items: any[]) => {
              order.items = items; // Asignamos los items a la orden correspondiente
            },
            (error) => {
              console.error(
                `Error fetching items for order ${order.id}:`,
                error
              );
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.loading = false;
      }
    );
  }

  loadOrdersByUser() {
    this.orderService.getOrdersByUser().subscribe(
      (data: any[]) => {
        this.orders = data.map((order) => ({
          ...order,
          items: [], // Inicializamos el array de items
        }));
        this.loading = false;

        // Ahora obtenemos los items para cada orden
        this.orders.forEach((order) => {
          this.orderService.getOrderItems(order.id).subscribe(
            (items: any[]) => {
              order.items = items; // Asignamos los items a la orden correspondiente
            },
            (error) => {
              console.error(
                `Error fetching items for order ${order.id}:`,
                error
              );
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.loading = false;
      }
    );
  }
}
