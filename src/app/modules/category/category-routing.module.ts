import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { CategoryDetailComponent } from "./pages/category-detail/category-detail.component";
import { CreateCategoryComponent } from "./pages/create-category/create-category.component";
import { EditCategoryComponent } from "./pages/edit-category/edit-category.component";

const routes: Routes = [
  { path: "", component: CategoriesComponent },
  { path: "categories/:categoryId", component: CategoryDetailComponent },
  { path: "create", component: CreateCategoryComponent },
  { path: "edit/:categoryId", component: EditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
