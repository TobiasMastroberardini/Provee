import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3005/api/products'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to fetch products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }
}
