import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from 'src/app/shared/components/categories-form/categories-form.component';
import { TaskFormComponent } from 'src/app/shared/components/task-form/task-form.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryTaskComponent } from './components/category-task/category-task.component';

const routes: Routes = [
  {

    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'category/:id',
    component: CategoriesFormComponent,
  },
  {
    path: 'categories/:id',
    component: CategoryTaskComponent,
  },
  {
    path: 'task/:id',
    component: TaskFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
