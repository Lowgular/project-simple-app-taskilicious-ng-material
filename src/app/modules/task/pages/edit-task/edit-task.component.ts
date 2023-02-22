import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from "../../models/task";
import { TaskResponse } from "../../models/task-response";
import { TasksService } from "../../services/tasks/tasks.service";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  title: string = "Edit Task";
  taskId: string | null = null;
  taskData: Task | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.taskId = this._activatedRoute.snapshot.paramMap.get("taskId");
    this.getTask(this.taskId!);
  }

  getTask(taskId: string) {
    this.taskService.getOneTask(taskId).then(
      (data) => {
        this.taskData = data;
      },
      (error) => {
        this.taskData = undefined;
      }
    );
  }

  formResponse(event: TaskResponse) {
    if (event.message === "success") {
      this.router.navigate(["categories/categories/", event.categoryId]);
    }
  }
}
