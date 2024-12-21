import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent implements OnInit {
  category: any = {};
  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      const id = parseInt(categoryId, 10);
      this.categoryService.getById(id).subscribe({
        next: (data) => {
          if (data) {
            this.category = data;
          } else {
            console.error('Categoría no encontrada');
            this.router.navigate(['/category-list']);
          }
        },
        error: (err) => {
          console.error('Error al obtener categoría:', err);
          this.router.navigate(['/category-list']);
        },
      });
    } else {
      console.error('ID de la categoría no válido');
      this.router.navigate(['/category-list']);
    }
  }

  onSubmit(): void {
    // Si no se ha seleccionado ninguna imagen, se procede con el producto sin imágenes
    this.categoryService.update(this.category.id, this.category).subscribe(
      () => {
        alert('Producto actualizado exitosamente');
        this.router.navigate(['/category-list']);
      },
      (error) => {
        console.error('Error al actualizar categoria:', error);
        alert('Hubo un error al actualizar el categoria.');
      }
    );
  }
}
