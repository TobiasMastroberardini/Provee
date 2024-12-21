import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent {
  isModalVisible: boolean = false;
  nombre = '';

  constructor(
    private categoriesService: CategoriesService,
    private CategoryList: CategoryListComponent
  ) {}

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  createCategory() {
    const categoryData = {
      nombre: this.nombre, // Asegúrate de usar la misma clave esperada por el backend
    };

    this.categoriesService.create(categoryData).subscribe(
      (response) => {
        this.toggleModal(); // Cerrar el modal
        this.CategoryList.loadCategories();
      },
      (error) => {
        console.error('Error al crear la categoría', error);
      }
    );
  }
}
