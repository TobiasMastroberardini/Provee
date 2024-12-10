import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3005/api/products'; // Reemplaza con tu URL de API real

  constructor(private http: HttpClient, private alertService: AlertService) {}

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
  createProduct(
    nombre: string,
    precio: number,
    descripcion: string,
    estado: string,
    cantidad_disponible: number,
    categoria: number
  ): Observable<any> {
    const product = {
      nombre,
      precio,
      descripcion,
      cantidad_disponible,
      categoria_id: categoria,
      estado,
    };
    console.log(product);
    return this.http.post<any>(this.baseUrl, product).pipe(
      tap((response) => {
        // Si se agrega correctamente, emitimos un mensaje de éxito
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
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
