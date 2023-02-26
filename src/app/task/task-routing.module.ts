import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskEditComponent } from './task/task.component';

const routes: Routes = [
  { path: 'create', component: TaskEditComponent },
  { path: 'edit/:id', component: TaskEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
