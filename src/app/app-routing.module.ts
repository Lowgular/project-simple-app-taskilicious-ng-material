import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/categories",
    pathMatch: "full",
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./modules/category/category.module").then(
        (m) => m.CategoryModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
