import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from 'src/app/category/create-category/create-category.component';
import { ListCategoryDetailsComponent } from 'src/app/category/list-category-details/list-category-details.component';
import { ListCategoryComponent } from 'src/app/category/list-category/list-category.component';


const routes: Routes = [
    { path: '', component: ListCategoryComponent },
    { path: 'create', component: CreateCategoryComponent },
    { path: 'edit/:id', component: CreateCategoryComponent },
    { path: ':id', component: ListCategoryDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }