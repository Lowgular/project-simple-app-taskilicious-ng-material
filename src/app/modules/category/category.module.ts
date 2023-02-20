import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoryRoutingModule } from "./category-routing.module";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { CategoriesListComponent } from "./components/categories-list/categories-list.component";
import { CategoriesFormComponent } from "./components/categories-form/categories-form.component";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
  ],
  imports: [CommonModule, CategoryRoutingModule, MaterialModule],
})
export class CategoryModule {}
