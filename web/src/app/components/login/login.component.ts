import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.authService.login(user).subscribe(
      (data) => {
        this.authService.setToken(data.token);
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
