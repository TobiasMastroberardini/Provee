import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3005/api/products'; // Reemplaza con tu URL de API real

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Método para obtener un producto por ID
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }

  // Método para crear un nuevo producto
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, product);
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
