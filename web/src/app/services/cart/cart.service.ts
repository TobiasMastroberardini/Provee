import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3005/api/carts';

  // Subject para eventos de éxito
  private alertSuccessSubject = new Subject<string>();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  // Obtener los items del carrito por ID de carrito
  getCartItems(cartId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${cartId}/items`);
  }

  addToCart(
    cartId: number,
    productId: number,
    quantity: number,
    price: number,
    name: string
  ): Observable<any> {
    const payload = {
      cart_id: cartId,
      product_id: productId,
      quantity,
      price,
      name,
    };
    console.log('Payload enviado al backend:', payload); // Para verificar el formato antes de enviar

    // Hacemos la petición
    return this.http.post<any>(`${this.baseUrl}/add`, payload).pipe(
      tap((response) => {
        // Si se agrega correctamente, emitimos un mensaje de éxito
        this.alertService.showAlert('Producto agregado al carrito');
      }),
      catchError((error) => {
        this.alertService.showAlert('Producto agregado al carrito');
        console.error(error);
        return of(null);
      })
    );
  }

  // Cambiado para aceptar el cartId y el itemId
  deleteFromCart(cartId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${itemId}/items/`);
  }
}
