import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'create', component: CategoryCreateComponent },
  { path: ':id', component: CategoryDetailsComponent },
  { path: 'edit/:id', component: CategoryEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
