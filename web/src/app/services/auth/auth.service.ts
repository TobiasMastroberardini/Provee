import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3005/api/auth';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectar PLATFORM_ID
  ) {}

  // Método para registrar un usuario
  register(
    nombre: string,
    email: string,
    telefono: string,
    direccion: string,
    password: string
  ): Observable<any> {
    const user = { nombre, email, telefono, direccion, password };
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      tap((response) => {
        this.alertService.showAlert('Usuario registrado correctamente');
      }),
      catchError((error) => {
        this.alertService.showAlert('Usuario no registrado');
        console.error(error);
        return of(null);
      })
    );
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          if (isPlatformBrowser(this.platformId)) {
            // Solo estamos en el navegador
            localStorage.setItem('authToken', response.token);
          }
          const userId = response.user?.id;
          // Busca el carrito del usuario y establece el cartId
          this.cartService.userId = userId;
          console.log('El id es:', userId);
          this.alertService.showAlert('Inicio de sesión exitoso');
        }
      }),
      catchError((error) => {
        this.alertService.showAlert('Error en el inicio de sesión');
        console.error(error);
        return of(null);
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken'); // Eliminar el token si estamos en el navegador
    }
    this.cartService.userId = null; // Limpiar el userId en CartService
    this.alertService.showAlert('Has cerrado sesión');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Verificamos si estamos en el navegador
      const token = localStorage.getItem('authToken');
      return !!token; // Devuelve true si el token existe, false si no
    }
    return false; // En el servidor no se considera autenticado
  }

  // Verificar el estado de autenticación
  initializeUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Solo ejecutamos en el navegador
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = this.decodeToken(token);
        console.log('Token decodificado:', decodedToken);
        if (decodedToken?.userId) {
          this.cartService.userId = decodedToken.userId;
          console.log('UserId cargado:', this.cartService.userId);
        }
      }
    } else {
      console.log('initializeUser no se puede ejecutar en el servidor');
    }
  }

  // Método para decodificar el token JWT
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Obtener el payload del token
      const decoded = atob(payload); // Decodificar el payload
      return JSON.parse(decoded); // Parsear el JSON
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }
}
