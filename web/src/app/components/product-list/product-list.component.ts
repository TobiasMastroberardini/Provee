import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  productName: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to the route URL
    this.route.url.subscribe((urlSegments) => {
      const currentPath = urlSegments.map((segment) => segment.path).join('/');

      if (currentPath === 'offers') {
        console.log('Fetching products on sale');
        this.fetchByFilter('on_sale=1'); // Llama a la función para obtener productos en oferta
      } else {
        // Si quieres manejar otras rutas, puedes continuar aquí (opcional)
        this.route.params.subscribe((params) => {
          const name = params['name']; // Obtén el parámetro 'name'

          if (name) {
            this.productName = name; // Guardar el nombre del producto
            this.fetchByFilter(`nombre=${name}`); // Llamada para obtener productos por nombre
          } else {
            this.fetchProducts(); // Si no hay parámetro, obtener todos los productos
          }
        });
      }
    });
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
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
}
