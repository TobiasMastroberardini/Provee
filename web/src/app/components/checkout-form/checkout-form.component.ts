import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss',
})
export class CheckoutFormComponent {
  checkoutForm: FormGroup;
  isDelivery: boolean = false;
  // Lista de ciudades (puedes ampliarla)
  cities: string[] = [
    'La Plata',
    'Mar del Plata',
    'Bahía Blanca',
    'Tandil',
    'San Nicolás',
    'Pergamino',
    'Olavarría',
    'Junín',
  ];

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      deliveryOption: ['local'],
      city: [''],
      address: [''],
    });
  }

  toggleDelivery(option: string) {
    this.isDelivery = option === 'delivery';
    if (!this.isDelivery) {
      this.checkoutForm.patchValue({ city: '', address: '' });
    }
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.cartService.createPayment().subscribe(
        (response) => {
          window.location.href = response.init_point; // Redirige a la URL de Mercado Pago
        },
        (error) => {
          console.error('Error al crear el pago:', error);
          // Manejo de errores apropiado para el usuario
        }
      );
      alert('Datos enviados correctamente. Ahora puedes ir a pagar.');
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
