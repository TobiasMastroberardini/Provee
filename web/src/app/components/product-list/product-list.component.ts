import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent  implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Fetch the products when the component initializes
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;  // Assuming the API returns an array of products
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
