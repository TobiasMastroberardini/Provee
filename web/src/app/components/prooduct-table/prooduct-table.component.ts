import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { CreateProductComponent } from '../create-product/create-product.component'; // Ajusta la ruta según corresponda

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, CreateProductComponent],
  templateUrl: './prooduct-table.component.html',
  styleUrl: './prooduct-table.component.scss',
})
export class ProductTableComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para cargar los productos desde el servicio
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; // Asignar los productos a la variable de clase
      },
      (error) => {
        console.error('Error al cargar los productos', error);
      }
    );
  }

  // Método para redirigir a la página de agregar producto
  redirectToAddProduct(): void {
    this.router.navigate(['/add-product']); // Ajusta la ruta según tu configuración de enrutamiento
  }

  // Método para redirigir a la página de editar producto
  redirectToEditProduct(product: any): void {
    this.router.navigate([`/edit-product/${product.id}`]); // Ajusta la ruta según tu configuración de enrutamiento
  }

  // Método para eliminar un producto
  deleteProduct(product: any): void {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar el producto "${product.nombre}"?`
      )
    ) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this.loadProducts(); // Volver a cargar los productos después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }
}
