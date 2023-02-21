import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { MaterialsModule } from '../shared/materials.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryDetailsComponent,
    TaskCreateComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CategoryModule {}
