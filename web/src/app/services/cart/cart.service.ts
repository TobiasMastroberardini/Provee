import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3005/api/carts';
  public userId: string | null = null; // ID del usuario

  constructor(private http: HttpClient, private alertService: AlertService) {}

  // Obtener los items del carrito
  getCartItems(): Observable<any[]> {
    if (this.userId) {
      return this.http.get<any[]>(`${this.baseUrl}/${this.userId}/items`).pipe(
        tap((items) => console.log('Items del carrito obtenidos:', items)),
        catchError((error) => {
          console.error('Error obteniendo items del carrito:', error);
          return of([]);
        })
      );
    } else {
      console.warn('No hay cartId disponible.');
      return of([]);
    }
  }

  // Agregar un producto al carrito
  addToCart(
    productId: number,
    quantity: number,
    price: number,
    name: string
  ): Observable<any> {
    if (!this.userId) {
      console.error('Error: userId no está definido');
      return of(null); // Devuelve null si no hay userId
    }

    const payload = {
      userId: this.userId, // Enviar el userId
      product_id: productId,
      quantity,
      price,
      name,
    };

    console.log('Payload enviado al backend:', payload);

    return this.http.post<any>(`${this.baseUrl}/add`, payload).pipe(
      tap(() => {
        this.alertService.showAlert('Producto agregado al carrito');
      }),
      catchError((error) => {
        this.alertService.showAlert('Error al agregar el producto al carrito');
        console.error(error);
        return of(null);
      })
    );
  }

  // Eliminar un producto del carrito
  deleteFromCart(itemId: string): Observable<any> {
    if (!this.userId) {
      console.error('No se puede eliminar porque no se obtuvo el cartId.');
      return of(null); // Devuelve null si no hay cartId
    }
    return this.http.delete<any>(`${this.baseUrl}/${itemId}/items`).pipe(
      tap(() => console.log('Item eliminado del carrito:', itemId)),
      catchError((error) => {
        console.error('Error al eliminar item del carrito:', error);
        return of(null);
      })
    );
  }
}
