import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service'; // Servicio para obtener el estado de autenticación y roles

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si el usuario está autenticado y es admin
    return this.authService.isAdmin().pipe(
      map((isAdmin) => {
        if (isAdmin) {
          return true; // Permitir acceso si es admin
        } else {
          // Si no es admin, redirigir a la página de acceso denegado o login
          this.router.navigate(['/not-authorized']);
          return false; // Bloquear acceso
        }
      }),
      catchError(() => {
        // En caso de error, redirigir a la página de acceso denegado o login
        this.router.navigate(['/not-authorized']);
        return of(false);
      })
    );
  }
}
