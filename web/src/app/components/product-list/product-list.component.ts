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
    this.route.url.subscribe((urlSegments) => {
      const currentPath = urlSegments.map((segment) => segment.path).join('/');
      // Verifica si la URL es 'offers' y obtiene los productos en oferta
      if (currentPath === 'offers') {
        this.fetchByFilter('on_sale=1'); // Llama a la función para obtener productos en oferta
        return;
      }
    });

    this.route.params.subscribe((params) => {
      const name = params['name']; // Obtiene el valor del parámetro 'name'
      this.productName = name; // Guarda el nombre del producto

      if (name === 'offers') {
        this.fetchByFilter('on_sale=1'); // Si el nombre es 'offers', obtiene productos en oferta
      } else if (name) {
        this.fetchByFilter(`nombre=${name}`); // Llama a la función para obtener productos por nombre
      } else {
        this.fetchProducts(); // Si no hay parámetro 'name', obtiene todos los productos
      }
    });
  }

  fetchProducts(): void {
    // Fetch all products
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
    // Fetch products with a filter
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
