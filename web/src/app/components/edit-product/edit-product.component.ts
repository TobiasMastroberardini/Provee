import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  product: any = {};
  categorias: any[] = [];
  selectedImages: File[] = []; // Para almacenar las imágenes seleccionadas

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const id = parseInt(productId, 10); // Convertir a número
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          if (data) {
            this.product = data; // Precarga los datos del producto
          } else {
            console.error('Producto no encontrado');
            this.router.navigate(['/productos']); // Redirige si no se encuentra el producto
          }
        },
        error: (err) => {
          console.error('Error al obtener el producto:', err);
          this.router.navigate(['/productos']); // Maneja errores
        },
      });
    } else {
      console.error('ID del producto no válido');
      this.router.navigate(['/productos']); // Redirige si no hay ID válido
    }

    // Obtener categorías disponibles
    this.categoriesService.getAll().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al obtener categorías:', err),
    });
  }

  // Método para manejar la selección de imágenes
  onImageSelect(event: any): void {
    this.selectedImages = Array.from(event.target.files); // Asignar las imágenes seleccionadas
  }

  onSubmit(): void {
    // Si no se ha seleccionado ninguna imagen, se procede con el producto sin imágenes
    this.productService
      .updateProduct(this.product.id, this.product, this.selectedImages)
      .subscribe(
        () => {
          alert('Producto actualizado exitosamente');
          this.router.navigate(['/productos']);
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
          alert('Hubo un error al actualizar el producto.');
        }
      );
  }
}
