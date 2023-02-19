import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { CategoryRoutingModule } from 'src/app/category/category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CommonModule } from '@angular/common';
import { UIModule } from 'src/app/ui/ui.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryDetailsComponent } from './list-category-details/list-category-details.component';

@NgModule({
  declarations: [
    ListCategoryComponent,
    CreateCategoryComponent,
    ListCategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CategoryRoutingModule,
    UIModule
  ],
})
export class CategoryModule { }
