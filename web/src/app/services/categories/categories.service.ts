import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'https://provee.onrender.com/api/categories';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getByFilter(filter: string) {
    return this.http.get<any>(`${this.apiUrl}/filter?${filter}`);
  }

  create(categoryData: any): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      this.alertService.showAlert('No estás autenticado. Inicia sesión.');
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Asegúrate de indicar que estás enviando JSON
    });

    return this.http.post<any>(this.apiUrl, categoryData, { headers }).pipe(
      tap((response) => {
        this.alertService.showAlert('Categoría agregada correctamente');
      }),
      catchError((error) => {
        this.alertService.showAlert('No se pudo agregar la categoría');
        console.error(error);
        return of(null);
      })
    );
  }

  update(id: number, category: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      this.alertService.showAlert('No estás autenticado. Inicia sesión.');
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, category, { headers })
      .pipe(
        tap((response) => {
          this.alertService.showAlert('Categoria agregada correctamente');
        }),
        catchError((error) => {
          this.alertService.showAlert('Categoria no agregada');
          console.error(error);
          return of(null);
        })
      );
  }

  delete(id: number): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      this.alertService.showAlert('No estás autenticado. Inicia sesión.');
      return of(null); // Si no hay token, no se permite crear el producto
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
