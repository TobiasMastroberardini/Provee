import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  isModalVisible: boolean = false;
  categories: any[] = [];

  nombre = '';
  precio = 0;
  estado: string = 'disponible'; // Por defecto, el estado es 'disponible'
  estadoCheckbox: boolean = true; // El checkbox está marcado por defecto  descripcion = '';
  categoria = 1;
  descripcion = '';
  cantidad_disponible = 0;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService
  ) {}

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  ngOnInit(): void {
    // Fetch the products when the component initializes
    this.categoriesService.getAll().subscribe(
      (data) => {
        this.categories = data; // Assuming the API returns an array of products
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  updateEstado(): void {
    this.estado = this.estadoCheckbox ? 'disponible' : 'no_disponible';
  }

  createProduct() {
    this.productService
      .createProduct(
        this.nombre,
        this.precio,
        this.descripcion,
        this.estado,
        this.cantidad_disponible,
        this.categoria
      )
      .subscribe(
        (response) => {
          console.log('Producto creado', response);
          this.toggleModal(); // Cerrar el modal después de agregar el producto
        },
        (error) => {
          console.error('Error al crear producto', error);
        }
      );
    console.log('Enviado');
  }
}
