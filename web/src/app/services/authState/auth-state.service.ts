import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor(private authService: AuthService) {}

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
