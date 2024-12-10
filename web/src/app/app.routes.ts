import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductTableComponent } from './components/prooduct-table/prooduct-table.component';
import { RecoveryPassComponent } from './components/recovery-pass/recovery-pass.component';
import { SingupComponent } from './components/singup/singup.component';

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
    path: 'create-product',
    component: CreateProductComponent,
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
