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

  // services/products/product.service.ts
  getPaginatedProducts(page: number, limit: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/paginated/?page=${page}&limit=${limit}`
    );
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
  updateProduct(
    productId: number,
    product: any,
    selectedImages: File[]
  ): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      this.alertService.showAlert('No estás autenticado. Inicia sesión.');
      return of(null);
    }

    // Crear un FormData para enviar datos del producto y las imágenes
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('nombre', product.nombre);
    formData.append('descripcion', product.descripcion);
    formData.append(
      'cantidad_disponible',
      product.cantidad_disponible.toString()
    );
    formData.append('precio', product.precio);
    formData.append('categoria_id', product.categoria_id.toString());
    formData.append('estado', product.estado);
    formData.append('on_sale', product.on_sale ? '1' : '0');

    // Agregar imágenes si se seleccionaron
    selectedImages.forEach((image) => {
      formData.append('images', image, image.name); // 'images' es el nombre del campo de archivos
    });

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token al encabezado
    });

    return this.http
      .put<any>(`${this.baseUrl}/${productId}`, formData, { headers })
      .pipe(
        tap((response) => {
          this.alertService.showAlert('Producto editado correctamente');
        }),
        catchError((error) => {
          this.alertService.showAlert('Producto no editado desde servicio');
          console.error(error);
          return of(null);
        })
      );
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
