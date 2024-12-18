import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { InputAdminComponent } from '../input-admin/input-admin.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    CreateProductComponent,
    PaginationComponent,
    InputAdminComponent,
  ],
  templateUrl: './prooduct-table.component.html',
  styleUrl: './prooduct-table.component.scss',
})
export class ProductTableComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1; // Página actual
  totalPages: number = 0; // Total de páginas
  limit: number = 10; // Número de productos por página
  productName: string = '';
  productTable = 'product-table';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['nombre']) {
        const name = queryParams['nombre'];
        this.productName = name;
        this.fetchByFilter(`nombre=${name}`); // Filtra por nombre
      } else {
        this.fetchProducts(); // Si no hay filtros, obtener todos los productos
      }
    });
  }

  // Método para cargar los productos desde el servicio
  fetchProducts(): void {
    this.productService
      .getPaginatedProducts(this.currentPage, this.limit)
      .subscribe(
        (data) => {
          this.products = data.data; // Asume que los productos están en `data.data`
          this.totalPages = data.totalPages; // Total de páginas
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
  }

  fetchByFilter(filter: string): void {
    this.productService.getByFilter(filter).subscribe(
      (data) => {
        console.log(`Fetched products with filter ${filter}:`, data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching filtered products', error);
      }
    );
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
          this.fetchProducts(); // Volver a cargar los productos después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts(); // Recargar los productos para la página seleccionada
    }
  }
}
