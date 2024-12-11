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
  images: File[] = [];

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
    const formData = new FormData();

    // Agregar los datos del producto al FormData
    formData.append('nombre', this.nombre);
    formData.append('precio', this.precio.toString());
    formData.append('descripcion', this.descripcion);
    formData.append('estado', this.estado);
    formData.append('cantidad_disponible', this.cantidad_disponible.toString());
    formData.append('categoria_id', this.categoria.toString());

    // Agregar las imágenes al FormData
    this.images.forEach((file) => {
      formData.append('images', file); // El nombre 'images' debe coincidir con el backend
    });

    // Enviar los datos al servicio
    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log('Producto creado', response);
        this.toggleModal(); // Cerrar el modal
      },
      (error) => {
        console.error('Error al crear producto', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.images = Array.from(input.files); // Convertir FileList a array
    }
  }
}
