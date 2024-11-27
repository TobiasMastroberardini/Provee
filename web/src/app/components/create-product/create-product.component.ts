import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  isModalVisible: boolean = false;

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
