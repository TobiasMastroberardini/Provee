import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    WhatsappComponent,
    AlertSuccessComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web';
  alertMessage: string = 'Your cart was updated!';
}
