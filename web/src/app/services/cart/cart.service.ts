import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3005/api/carts';

  // Subject para eventos de éxito
  private alertSuccessSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  // Observable que los componentes pueden suscribirse
  getAlertSuccessObservable(): Observable<string> {
    return this.alertSuccessSubject.asObservable();
  }

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
        this.alertSuccessSubject.next('Item added to cart successfully!');
      })
    );
  }

  // Cambiado para aceptar el cartId y el itemId
  deleteFromCart(cartId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${itemId}/items/`);
  }
}
