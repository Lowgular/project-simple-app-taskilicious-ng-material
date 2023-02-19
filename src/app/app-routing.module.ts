import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCategoriesComponent} from "./categories/list-categories/list-categories.component";
import {AddCategoryComponent} from "./categories/add-category/add-category.component";
import {EditCategoryComponent} from "./categories/edit-category/edit-category.component";
import {CategoryDetailComponent} from "./categories/category-detail/category-detail.component";
import {AddTaskComponent} from "./tasks/add-task/add-task.component";
import {EditTaskComponent} from "./tasks/edit-task/edit-task.component";

const routes: Routes = [
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    { path: 'categories', component: ListCategoriesComponent},
    { path: 'categories/create', component: AddCategoryComponent },
    { path: 'categories/:id', component: CategoryDetailComponent },
    { path: 'categories/edit/:id', component: EditCategoryComponent },
    { path: 'tasks/create', component: AddTaskComponent },
    { path: 'tasks/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
