import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTaskComponent } from "./pages/create-task/create-task.component";
import { EditTaskComponent } from "./pages/edit-task/edit-task.component";

const routes: Routes = [
  { path: "create", component: CreateTaskComponent },
  { path: "edit/:taskId", component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
