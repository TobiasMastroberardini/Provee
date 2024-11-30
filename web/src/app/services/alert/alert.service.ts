// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<string | null>(null);
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string) {
    this.alertSubject.next(message);
    setTimeout(() => this.alertSubject.next(null), 3000); // Oculta la alerta después de 3 segundos
  }
}
