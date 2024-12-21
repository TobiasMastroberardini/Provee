import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { ProductService } from '../../services/products/product.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  productName: string = '';
  productCategory: string = '';
  currentPage = 1; // Página actual
  totalPages = 0; // Total de páginas
  limit = 12; // Productos por página

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe(
      (data) => {
        this.categories = data; // Guardar las categorías obtenidas
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );

    // Subscribe to route changes
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['nombre']) {
        const name = queryParams['nombre'];
        this.productName = name;
        this.fetchByFilter(`nombre=${name}`); // Filtra por nombre
      } else if (queryParams['category']) {
        const category = queryParams['category'];
        this.productCategory = category;
        this.fetchByFilter(`categoria_id=${category}`); // Filtra por categoría
      } else {
        this.route.url.subscribe((urlSegments) => {
          const currentPath = urlSegments
            .map((segment) => segment.path)
            .join('/');
          if (currentPath === 'offers') {
            this.fetchByFilter('on_sale=1'); // Filtra por oferta
          } else {
            this.fetchProducts(); // Si no hay filtros, obtener todos los productos
          }
        });
      }
    });
  }

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

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  fetchByFilter(filter: string): void {
    this.productService.getByFilter(filter).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching filtered products', error);
      }
    );
  }
}
