import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/category/category.module').then(m => m.CategoryModule) },
  { path: 'category', loadChildren: () => import('src/app/category/category.module').then(m => m.CategoryModule) },
  { path: 'task', loadChildren: () => import('src/app/category-task/category-task.module').then(m => m.CategoryTaskModule) },
  { path: "**", redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
