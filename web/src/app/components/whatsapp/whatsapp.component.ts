import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss',
})
export class WhatsappComponent {
  phoneNumber: string = '1234567890'; // Reemplaza con el número de teléfono

  openWhatsApp(): void {
    const message = 'Hola, me gustaría obtener más información.'; // Mensaje predefinido
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank');
  }
}
