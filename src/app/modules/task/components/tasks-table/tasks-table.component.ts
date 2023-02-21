import { Component, Input, OnInit } from "@angular/core";
import { Task } from "../../models/task";
import { TasksService } from "../../services/tasks/tasks.service";

@Component({
  selector: "app-tasks-table",
  templateUrl: "./tasks-table.component.html",
  styleUrls: ["./tasks-table.component.scss"],
})
export class TasksTableComponent implements OnInit {
  @Input("categoryId") categoryId: string | undefined;
  tasksList: Task[] = [];
  displayedColumns: string[] = ["name", "categoryId", "edit", "remove"];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks(this.categoryId!);
  }

  getAllTasks(categoryId: string) {
    this.tasksService.getAllTasks(categoryId).then(
      (data) => {
        this.tasksList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeTask(taskId: string) {
    this.tasksService.removeTask(taskId).then(
      (data) => {
        this.getAllTasks(this.categoryId!);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
