import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoryComponent } from './components/add-edit-category/add_edit_category.component';
import { AddEditTaskComponent } from './components/add-edit-task/add_edit_task.component';
import { HomeComponent } from './components/home/home.component';
import { InfoCategoryComponent } from './components/info-category/info-category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'tasks/create', pathMatch: 'full', component: AddEditTaskComponent},
  { path: 'tasks/edit/:id', pathMatch: 'full', component: AddEditTaskComponent},
  { path: 'categories/create', pathMatch: 'full', component: AddEditCategoryComponent},
  { path: 'categories/:id', pathMatch: 'full', component: InfoCategoryComponent},
  { path: 'edit/:id', pathMatch: 'full', component: AddEditCategoryComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
