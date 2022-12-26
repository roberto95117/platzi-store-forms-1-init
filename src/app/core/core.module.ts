import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsService } from './services/products/products.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/categories/category.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProductsService,
    AuthService,
    CategoryService
  ]
})
export class CoreModule { }
