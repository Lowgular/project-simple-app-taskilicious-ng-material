import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('src/app/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('src/app/task/task.module').then((m) => m.TaskModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
