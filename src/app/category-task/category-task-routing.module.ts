import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryTaskComponent } from 'src/app/category-task/create-category-task/create-category-task.component';

const routes: Routes = [
    { path: 'create', component: CreateCategoryTaskComponent },
    { path: 'edit/:id', component: CreateCategoryTaskComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryTaskRoutingModule { }