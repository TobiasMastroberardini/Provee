import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3005/api/carts';
  public userId$ = new BehaviorSubject<string | null>(null); // Permitir null

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.loadUserIdFromAuthService(); // Cargar userId al inicializar
  }

  // Método para cargar userId desde AuthService
  private loadUserIdFromAuthService(): void {
    this.authService.getUserLogged().subscribe((user) => {
      if (user) {
        this.setUserId(user.id); // Establecer el userId en el BehaviorSubject
      }
    });
  }

  // Obtener los elementos del carrito
  getCartItems(): Observable<any[]> {
    return this.userId$.pipe(
      switchMap((userId) => {
        if (!userId) {
          console.warn('No hay userId disponible.');
          return of([]); // Retorna un Observable vacío si no hay userId
        }
        return this.http.get<any[]>(`${this.baseUrl}/${userId}/items`).pipe(
          tap((items) => console.log('Items del carrito obtenidos:', items)),
          catchError((error) => {
            console.error('Error obteniendo items del carrito:', error);
            return of([]);
          })
        );
      })
    );
  }

  setUserId(id: string): void {
    this.userId$.next(id); // Asegúrate de que el id sea un string
  }

  // Agregar un producto al carrito
  addToCart(
    productId: number,
    quantity: number,
    price: number,
    name: string
  ): Observable<any> {
    const userId = this.userId$.value; // Obtener el valor actual del BehaviorSubject

    if (!userId) {
      console.error('Error: userId no está definido');
      return of(null); // Devuelve null si no hay userId
    }

    const payload = {
      userId, // Enviar el userId directamente
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

  // Método para actualizar la cantidad de un ítem en el carrito
  updateQuantity(itemId: string, quantity: number): Observable<any> {
    const userId = this.userId$.value; // Obtener el valor actual del BehaviorSubject

    if (!userId) {
      console.error('Error: userId no está definido');
      return of(null); // Devuelve null si no hay userId
    }

    const payload = {
      userId,
      quantity,
    };

    return this.http.put<any>(`${this.baseUrl}/items/${itemId}`, payload).pipe(
      tap(() => {
        this.alertService.showAlert('Cantidad actualizada');
      }),
      catchError((error) => {
        this.alertService.showAlert('Error al actualizar la cantidad');
        console.error(error);
        return of(null);
      })
    );
  }

  // Eliminar un producto del carrito
  deleteFromCart(itemId: string): Observable<any> {
    const userId = this.userId$.value; // Obtener el valor actual del BehaviorSubject

    if (!userId) {
      console.error('No se puede eliminar porque no ses obtuvo el userId.');
      return of(null); // Devuelve null si no hay userId
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
