import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CreateCategoryComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Método para cargar los productos desde el servicio
  loadCategories(): void {
    this.categoriesService.getAll().subscribe(
      (data) => {
        this.categories = data; // Asignar los productos a la variable de clase
      },
      (error) => {
        console.error('Error al cargar las categorias', error);
      }
    );
  }

  // Método para redirigir a la página de editar categoria
  redirectToEditCategory(category: any): void {
    this.router.navigate([`/edit-category/${category.id}`]); // Ajusta la ruta según tu configuración de enrutamiento
  }

  // Método para eliminar un producto
  delete(category: any): void {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar la categoria "${category.nombre}"?`
      )
    ) {
      this.categoriesService.delete(category.id).subscribe(
        () => {
          console.log('id:' + category.id);
          this.loadCategories(); // Volver a cargar las categorias después de eliminar
        },
        (error) => {
          console.log('id:' + category.id);

          console.error('Error al eliminar la categoria', error);
        }
      );
    }
  }
}
