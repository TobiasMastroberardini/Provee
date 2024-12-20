import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
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
}
