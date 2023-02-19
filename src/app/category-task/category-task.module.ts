import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { UIModule } from 'src/app/ui/ui.module';
import { CreateCategoryTaskComponent } from 'src/app/category-task/create-category-task/create-category-task.component';
import { CategoryTaskRoutingModule } from 'src/app/category-task/category-task-routing.module';


@NgModule({
  declarations: [
    CreateCategoryTaskComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CategoryTaskRoutingModule,
    UIModule,
  ],
})
export class CategoryTaskModule { }
