import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3005/api/auth'; // Reemplaza con tu URL de API real

  constructor(private http: HttpClient) {}

  // Método para registrar usuario
  register(
    nombre: string,
    email: string,
    telefono: string,
    direccion: string,
    pass: string
  ): Observable<any> {
    const user = {
      nombre,
      email,
      telefono,
      direccion,
      password: pass,
    };
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}
