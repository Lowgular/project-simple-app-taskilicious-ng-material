import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { CreateCategoryFormComponent } from './Components/create-category-form/create-category-form.component';
import { CreateTaskFormComponent } from './Components/create-task-form/create-task-form.component';
import { EditCategoryFormComponent } from './Components/edit-category-form/edit-category-form.component';
import { EditTaskFormComponent } from './Components/edit-task-form/edit-task-form.component';
import { ShowCategoryListComponent } from './Components/show-category-list/show-category-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'categories', component: ShowCategoryListComponent },
  { path: 'edit-category/:id', component: EditCategoryFormComponent },
  { path: 'create-category', component: CreateCategoryFormComponent },
  { path: 'categories/:id', component: CategoryDetailsComponent},
  { path: 'create-task', component: CreateTaskFormComponent },
  { path: 'edit-task/:id', component: EditTaskFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
