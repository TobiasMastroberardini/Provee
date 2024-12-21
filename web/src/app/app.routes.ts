import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductTableComponent } from './components/prooduct-table/prooduct-table.component';
import { RecoveryPassComponent } from './components/recovery-pass/recovery-pass.component';
import { SingupComponent } from './components/singup/singup.component';
import { SuccessComponent } from './components/success/success.component';
import { AdminGuard } from './guard/admin/admin.guard';
import { LoggedGuard } from './guard/logged/logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'product-info',
    component: ProductCardComponent,
  },
  {
    path: 'product-table',
    component: ProductTableComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'offers',
    component: ProductListComponent,
  },
  {
    path: 'products/:name', // :name representa un parámetro dinámico
    component: ProductListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'singup',
    component: SingupComponent,
  },
  {
    path: 'recovery-pass',
    component: RecoveryPassComponent,
  },
  {
    path: 'change-pass',
    component: ChangePassComponent,
  },
  {
    path: 'checkout-form',
    component: CheckoutFormComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'category-list',
    component: CategoryListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'order-list',
    component: OrderListComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'failure',
    component: SuccessComponent,
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
  },
  {
    path: '**', // Ruta para manejar URLs no encontradas
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {} // Asegúrate de exportar tu módulo de enrutamiento
