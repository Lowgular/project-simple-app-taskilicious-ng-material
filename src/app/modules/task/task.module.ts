import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { TasksTableComponent } from "./components/tasks-table/tasks-table.component";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [TasksTableComponent],
  imports: [CommonModule, TaskRoutingModule, MaterialModule],
  exports: [TasksTableComponent],
})
export class TaskModule {}
