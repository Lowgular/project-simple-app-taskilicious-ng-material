import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TaskRoutingModule } from "./task-routing.module";
import { TasksTableComponent } from "./components/tasks-table/tasks-table.component";
import { MaterialModule } from "src/app/material/material.module";
import { CreateTaskComponent } from "./pages/create-task/create-task.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

@NgModule({
  declarations: [TasksTableComponent, CreateTaskComponent, TaskFormComponent, EditTaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [TasksTableComponent],
})
export class TaskModule {}
