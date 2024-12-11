import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3005/api/products'; // Reemplaza con tu URL de API real

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  // Método para obtener todos los productos
  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Método para obtener un producto por ID
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }

  getByFilter(filter: string) {
    return this.http.get<any>(`${this.baseUrl}/filter?${filter}`);
  }

  // Método para crear un nuevo producto
  createProduct(productData: FormData): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      this.alertService.showAlert('No estás autenticado. Inicia sesión.');
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });

    return this.http.post<any>(this.baseUrl, productData, { headers }).pipe(
      tap((response) => {
        this.alertService.showAlert('Producto agregado correctamente');
      }),
      catchError((error) => {
        this.alertService.showAlert('Producto no agregado');
        console.error(error);
        return of(null);
      })
    );
  }

  // Método para actualizar un producto existente
  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${productId}`, product);
  }

  // Método para eliminar un producto
  deleteProduct(productId: number): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      this.alertService.showAlert('No estás autenticado. Inicia sesión.');
      return of(null); // Si no hay token, no se permite crear el producto
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });

    return this.http.delete(`${this.baseUrl}/${productId}`, { headers });
  }
}
