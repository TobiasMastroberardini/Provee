import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3005/api/carts';

  constructor(private http: HttpClient) {}

  // Obtener los items del carrito por ID de carrito
  getCartItems(cartId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${cartId}/items`).pipe(
      map((response) => response.items || []) // Extrae los items, o devuelve un array vacío si no existen
    );
  }

  addToCart(
    cartId: number,
    productId: number,
    quantity: number,
    price: number
  ): Observable<any> {
    const payload = {
      cart_id: cartId,
      product_id: productId,
      quantity,
      price,
    };
    console.log('Payload enviado al backend:', payload); // Para verificar el formato antes de enviar
    return this.http.post<any>(`${this.baseUrl}/add`, payload);
  }

  deleteFromCart(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${itemId}/items`);
  }
}
