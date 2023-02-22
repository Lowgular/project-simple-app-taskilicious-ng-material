import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskResponse } from "../../models/task-response";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
})
export class CreateTaskComponent implements OnInit {
  title: string = "Create new Task";
  categoryId: string | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId =
      this._activatedRoute.snapshot.queryParamMap.get("categoryId");
  }

  formResponse(event: TaskResponse) {
    if (event.message === "success") {
      this.router.navigate(["categories/categories/", event.categoryId]);
    }
  }
}
