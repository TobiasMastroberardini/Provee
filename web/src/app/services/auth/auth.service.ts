import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3005/api/auth';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private cookies: CookieService
  ) {}

  // Método para registrar un usuario
  register(user: any): Observable<any> {
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
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token); // Guarda el token en las cookies
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
    // Limpiar el token
    this.cookies.delete('token'); // Elimina el token de las cookies
    this.alertService.showAlert('Has cerrado sesión exitosamente'); // Notificación de cierre de sesión
  }

  setToken(token: string) {
    this.cookies.set('token', token); // Almacena el token en las cookies
  }

  getToken() {
    return this.cookies.get('token'); // Recupera el token de las cookies
  }

  getUserLogged(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token disponible');
      return of(null); // Retorna un Observable vacío si no hay token
    }

    const headers = { Authorization: `Bearer ${token}` }; // Agrega el token como encabezado
    return this.http.get<any>(`${this.baseUrl}/token`, { headers }).pipe(
      tap((user) => {
        console.log('Usuario autenticado:', user);
      }),
      catchError((error) => {
        console.error('Error al obtener usuario:', error);
        return of(null); // Retorna un Observable vacío en caso de error
      })
    );
  }
}
