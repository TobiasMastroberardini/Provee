import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
      console.log('Formulario enviado:', this.checkoutForm.value);
      alert('Datos enviados correctamente. Ahora puedes ir a pagar.');
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
