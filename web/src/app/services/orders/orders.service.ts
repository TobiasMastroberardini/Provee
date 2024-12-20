import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'http://localhost:3005/api/orders'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    // Usa `any` en lugar de una interfaz específica
    return this.http.get<any[]>(this.baseUrl);
  }

  getOrderItems(orderId: number): Observable<any[]> {
    // También `any`
    return this.http.get<any[]>(`${this.baseUrl}/${orderId}/items`);
  }
}
