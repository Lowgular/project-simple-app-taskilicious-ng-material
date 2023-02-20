import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CategoryRoutingModule } from "./category-routing.module";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { CategoriesListComponent } from "./components/categories-list/categories-list.component";
import { CategoriesFormComponent } from "./components/categories-form/categories-form.component";
import { MaterialModule } from "src/app/material/material.module";
import { CreateCategoryComponent } from "./pages/create-category/create-category.component";
import { EditCategoryComponent } from "./pages/edit-category/edit-category.component";
import { CategoryDetailComponent } from "./pages/category-detail/category-detail.component";
import { TaskModule } from "../task/task.module";

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryDetailComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    TaskModule,
  ],
})
export class CategoryModule {}
