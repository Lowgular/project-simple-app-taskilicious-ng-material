import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { CreateCategoryComponent } from "./pages/create-category/create-category.component";

const routes: Routes = [
  { path: "", component: CategoriesComponent },
  { path: "create", component: CreateCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
