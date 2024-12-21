import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'http://localhost:3005/api/orders'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrders(): Observable<any[]> {
    // Usa `any` en lugar de una interfaz específica
    return this.http.get<any[]>(this.baseUrl);
  }

  getOrderItems(orderId: number): Observable<any[]> {
    // También `any`
    return this.http.get<any[]>(`${this.baseUrl}/${orderId}/items`);
  }

  getOrdersByUser(): Observable<any[]> {
    return this.getId().pipe(
      switchMap((userId) => {
        if (userId) {
          return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
        } else {
          console.error('No se pudo obtener el ID del usuario.');
          return of([]); // Retornamos un array vacío si no hay usuario
        }
      })
    );
  }

  private getId(): Observable<number | null> {
    return this.authService
      .getUserLogged()
      .pipe(map((user) => (user ? user.id : null)));
  }
}
