import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:3005/api/payment'; // Reemplaza con tu URL de API real

  constructor() {}
}
