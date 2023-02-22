import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ITask } from "src/app/Models/iTask";
import { TaskService } from "src/app/Services/TaskService/task.service";

@Component({
  selector: "app-edit-task-form",
  templateUrl: "./edit-task-form.component.html",
  styleUrls: ["./edit-task-form.component.scss"],
})
export class EditTaskFormComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onFormSubmit(task: ITask) {
    this.taskService.editTask(task).subscribe({
      next: (obs) => {
        this.router.navigate(['categories',task.categoryId]);
        this.snackBar.open("Task Edited!", "Ok", { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(err.error, "", { duration: 3000 });
        console.log(err);
      },
    });
  }
}
